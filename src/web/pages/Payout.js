import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BaseContainer } from '../layouts/Containers';
import GTable, { TransactionsClass } from '../component/GTable';
import { getTransactions } from '../../services/transactions';

const Payout = ({ history }) => {
	const searchRef = useRef(null);
	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		getTransactions().then((e) => {
			console.log(e)
			setTransactions(e.payload)
		}).catch((ex) => {
			console.log(ex)
		})
	}, []);

	return (
		<BaseContainer>
			<div className="container mt-5">
				<div className="row">
					<div className="col-xl-10 col-md-12 ps-md-5">
						<div className="row mb-3">
							<div className="col-lg-6 col-md-12">
								<h1 className="page-header mb-2 mt-3 fw-bolder">Payouts</h1>
								<p>Here's a quick overview of what is going on</p>
							</div>
							<div className="col-lg-6 col-md-12 align-self-center text-lg-end">
								<Link to="/create-application/" className="btn btn-theme py-3 fs-14 fw-600 btn-block px-5 rounded-12 w-md-100 ft-2">Export</Link>
							</div>
						</div>

						<div className="row">
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
		</BaseContainer>
	)
}

export default Payout;