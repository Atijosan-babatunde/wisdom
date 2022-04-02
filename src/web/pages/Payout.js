import React, { Fragment, useEffect, useRef, useState } from 'react';
import { BaseContainer } from '../layouts/Containers';
import GTable, { TransactionsClass } from '../component/GTable';
import { getTransactions } from '../../services/transactions';
import { getNubans } from "../../services/nuban";
import { HttpStatus } from "../../helpers/constants";







const Payout = ({ history }) => {
	const searchRef = useRef(null);
	const [transactions, setTransactions] = useState([]);
	const [nubans, setNubans] = useState([]);
	const [defaultNuban, setDefaultNuban] = useState({});

	useEffect(() => {
		getTransactions().then((e) => {
			console.log(e)
			setTransactions(e.payload)
		}).catch((ex) => {
			console.log(ex)
		})
	}, []);

	useEffect(() => {
		getNubans().then((res) => {
			console.log("NUBAN", res.payload)
			if (res.status === HttpStatus.OK) {
				setDefaultNuban(res.payload.find(v => v.isPrimary) || {})
				setNubans(res.payload)
				
			}
			// Show error
		}).catch(() => {
			// Show error

		}).finally(() => {
			// Stop Loader
		})
	}, [])




	


	return (
		<BaseContainer>
			<div className="container mt-5">
				<div className="row">
					<div className="col-xl-12 col-md-12 ps-md-5">
						<div className="row mb-3">
							<div className="col-lg-6 col-md-12">
								<h1 className="page-header mb-2 mt-3 fw-bolder">Payouts</h1>
								<p>Manage your payout accounts and history</p>
							</div>
						</div>

						<div className="row mb-4">
							{
								nubans && nubans.length <= 0 ?
							<div className="col-8">
								<div className="row">
									<div className="col-6">
										<div className="card mb-2 border-0 shadow-sm" data-intro='Customers'>
											<div className="card-body">
												<div className="d-flex">
													<div className="flex-grow-1">
														<h5 className="small-card-header mb-3">
															TOTAL PAYOUT
														</h5>
														<p className="small-card-para mb-2">0</p>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-6">
										<div className="card mb-2 border-0 shadow-sm" data-intro='Customers'>
											<div className="card-body">
												<div className="d-flex">
													<div className="flex-grow-1">
														<h5 className="small-card-header mb-3">
															THIS MONTH'S PAYOUT
														</h5>
														<p className="small-card-para mb-2">0</p>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-6">
										<div className="card mb-2 border-0 shadow-sm" data-intro='Customers'>
											<div className="card-body">
												<div className="d-flex">
													<div className="flex-grow-1">
														<h5 className="small-card-header mb-3">
															THIS WEEK'S PAYOUT
														</h5>
														<p className="small-card-para mb-2">0</p>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-6">
										<div className="card mb-2 border-0 shadow-sm" data-intro='Customers'>
											<div className="card-body">
												<div className="d-flex">
													<div className="flex-grow-1">
														<h5 className="small-card-header mb-3">
															TODAY'S PAYOUT
														</h5>
														<p className="small-card-para mb-2">0</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div> :
							<div className="col-4">
							    {defaultNuban && Object.keys(defaultNuban).length > 0 &&
								<Fragment>
								<div className="card mb-2 border-0 shadow-sm" data-intro='Customers'>
									<div className="card-body">
										<div className="bg-custom-dim text-center px-2 py-3 rounded-circle mb-4" style={{ height: 55, width: 55 }}>
											<i className="fa-solid fa-bank text-theme mx-auto fs-22"></i>
										</div>

										<div className="d-flex mb-4">
											<div className="flex-grow-1">
												<h5 className="mb-1 fs-12 text-uppercase">VERIFIED PAYOUT ACCOUNT</h5>
												<h3 className="fw-600 mb-1">{defaultNuban.bankName} </h3>
												<p className="fs-12 mb-2">{defaultNuban.accountNumber}</p>
											</div>
										</div>
										<button className="btn btn-outline-custom-theme px-4 py-2 fs-12 rounded-10 fw-600">Edit</button>
									</div>
								</div>
								</Fragment>
                            }  
							</div>
                          }
						</div>

						<div className="row">
							<div className="col-12">
								<div className="card bg-white border-0 shadow-sm">
									<div className="card-header bg-transparent mb-2 mt-3">
										<div className="row align-middle">

											<div className="input-group">
												<span className="input-group-text input-group-text-0 rounded-start">
													<i className="iconly-Search icli fs-22 border-end-0"></i>
												</span>
												<input ref={searchRef} type="text" placeholder="Search..." className="form-control form-control-0 rounded-end ps-3 py-2 border-start-0" id="tbSearch" />
											</div>
										</div>
									</div>
									<div className="card-body">
										<GTable data={transactions} searchEl={searchRef} class={TransactionsClass} history={history} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</BaseContainer>
	)
}

export default Payout;