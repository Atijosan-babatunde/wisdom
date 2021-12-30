import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { addNuban, getSupportedNubans } from '../../services/nuban';
import DatePicker from 'react-datepicker';
import cogoToast from 'cogo-toast';
// import "../component/style.css";

export default function EnterAccountDetails({ history }) {
	const maxDate = new Date();
	const [loading, setLoading] = useState(false);
	const [banks, setBanks] = useState([]);
	const [endDate, setEndDate] = useState(null);

	useEffect(() => {
		// CSS HACK
		document.querySelector(".react-datepicker__input-container").parentElement.style.width = "88%"
		getSupportedNubans().then((res) => {
			console.log(res)
			setBanks(res.payload)
		}).catch(() => {
			console.log("Error")
		})
	}, []);

	function submit(e) {
		e.preventDefault();
		setLoading(true);

		const { bank, account } = e.target;
		const bankName = bank[bank.selectedIndex].text;
		const bankCode = bank.value;
		const accountNumber = account.value;
		const bvn = e.target.bvn.value;

		addNuban({ bankName, bankCode, accountNumber, bvn }).then((re) => {
			if (re.status === "OK") {
				history.push("/social-profile/")
			} else {
				cogoToast.error(re.message, { position: "top-right", hideAfter: 5 })
			}
		}).catch((e) => {
			console.log(e)
		}).finally(() => {
			setLoading(false)
		});

	}

	return (
		<div className="container-fluid bg-white">
			<div className="row vh-100">
				<div className="col-md-6 col-12 side-image d-none d-md-block"></div>
				<div className="col-md-6 col-12 px-lg-5 align-self-center justify-content-center w-form-responsive mx-auto">
					<div className="container">
						<form onSubmit={submit}>
							<div className="text-center mb-5">
								<img src="/img/logo.svg" alt="logo" width="130" />
							</div>

							<div className="mb-3">
								<h4 className="mb-1 fw-bold">Enter your account details</h4>
								<span>We need this to process payments to you</span>
							</div>

							<div className="col mb-3">
								<div className="input-group">
									<span className="input-group-text input-group-text-0 "><i className="iconly-Home icli fs-22 border-end-0"></i></span>
									<select className="form-select form-select-0 ps-3 py-3 border-start-0" name="bank" required>
										<option disabled value="">Select Bank</option>
										{
											banks && banks.map((v) => {
												return <option key={v.id} value={v.code}>{v.name}</option>
											})
										}
									</select>
								</div>
							</div>

							<div className="col mb-4">
								<div className="input-group">
									<span className="input-group-text input-group-text-0 fs-22">#</span>
									<input type="text" pattern="^\d{10}$" placeholder="Account Number" title="Account number must contain 10 digits only" className="form-control form-control-0 ps-3 py-3 border-start-0" name="account" required />
								</div>
							</div>

							<div className="mb-4 hr"></div>

							<div className="row mb-1">
								<p className="fw-bold fs-16 mb-2">Additional Details</p>
								<p className="fs-12">We need this confirm your identity</p>
							</div>

							<div className="col mb-3">
								<div className="input-group">
									<span className="input-group-text input-group-text-0 fs-22"><i className="iconly-Shield-Done icli fs-22 border-end-0"></i></span>
									<input type="text" pattern="^\d{11}$" placeholder="BVN" title="BVN must contain 9 digits only" className="form-control form-control-0 ps-3 py-3 border-start-0" name="bvn" required />
								</div>
							</div>

							<div className="col mb-5">
								<div className="input-group">
									<span className="input-group-text input-group-text-0 fs-22"><i className="iconly-Calendar icli fs-22 border-end-0"></i></span>
									<DatePicker
										placeholderText="Date of Birth (DD / MM / YYYY)"
										maxDate={maxDate} className="form-control rounded-left-0 form-control-0 ps-3 py-3 border-start-0"
										onChange={(date) => setEndDate(date)}
										selected={endDate}
										dateFormat="dd/MM/yyyy"
										withPortal
										isClearable
										peekNextMonth
										showMonthDropdown
										showYearDropdown
										dropdownMode="select"

									>
										<div className="text-center mb-2 fs-14 fw-bold">Choose your Date of Birth (DD/MM/YYYY)</div>
									</DatePicker>

								</div>
							</div>

							<div className="row">
								<div className="col-12 text-end">
									<Link className="text-dark me-5 fw-600 ft-2 fs-14" to="/social-profile/">Do This Later</Link>
									<button type="submit" className="btn btn-theme py-3 px-5 rounded-12" disabled={loading}>{
										loading ?
											<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Continue"
									}</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
	// return (
	// 	<div className="mainn" style={{ width: '100%', display: 'flex', background: '#ffffff' }}>
	// 		<div className="side-image"></div>
	// 		<div className="right">
	// 			<div className="rightCap">
	// 				<img src="img/Logotype.png" alt="" />

	// 				<h2 className="mb-1">Enter your account details</h2>
	// 				<span className=" mb-3">We need this to process payments to you</span>

	// 				<form>
	// 					<div className=" inner1 col-md-12 mt-2">
	// 						<select id="selectBank" className=" text-light text-dark">
	// 							<option selected>Select Bank</option>
	// 							<option>...</option>
	// 						</select>
	// 					</div>

	// 					<div className="inner1">

	// 						<input
	// 							type="lastName"
	// 							placeholder="# Account Number"
	// 							className="form-control1"
	// 							id="exampleFormControlInput1"
	// 						/>
	// 					</div>
	// 					<hr />
	// 					<div className="col-12">
	// 						<h3>Additional Details</h3>
	// 						<span>We need this to confirm your identity</span>
	// 						<div className="inner1 mt-2">
	// 							<i className="far fa-shield-check"></i>
	// 							<input
	// 								type="firstName"
	// 								placeholder="BVN"
	// 								className="form-control1"
	// 								id="exampleFormControlInput1"
	// 							/>
	// 						</div>
	// 						<div className="inner1 mt-2">
	// 							<i className="far fa-calendar-alt"></i>
	// 							<input
	// 								type="firstName"
	// 								placeholder="Date of Birth (DD/MM/YYYY)"
	// 								className="form-control1"
	// 								id="exampleFormControlInput1"
	// 							/>
	// 						</div>


	// 						<div className="row bottom">
	// 							<div className="col-12">
	// 								<div className="grow-button text-end">
	// 									<button className=" grow"><Link className="top-p2" to="/">Submit</Link></button>
	// 								</div>
	// 							</div>


	// 						</div>
	// 					</div>
	// 				</form>
	// 			</div>
	// 		</div>
	// 	</div>

	// )
}