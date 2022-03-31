// import introJs from 'intro.js';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { HttpStatus } from '../../helpers/constants';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { getApplications } from '../../services/application';
import { getCustomers } from '../../services/customers';
import { getMerchantProfile } from '../../services/users';
import { BaseContainer } from '../../web/layouts/Containers';
import GTable, { ApplicationsClass } from '../component/GTable';
import cogoToast from 'cogo-toast';
import { updateMerchant } from '../../services/merchsnts';
import { formatCurrency } from '../../helpers/util';

export default function Landing({ history }) {
	const searchRef = useRef(null);
	const [customers, setCustomers] = useState([]);
	const [applications, setApplications] = useState([]);
	const [user, setUser] = useSessionStorage("user", {});
	const [merchant, setMerchant] = useSessionStorage("merchant", {});
	const [step, setStep] = useState(0)
	const [showBanner, setShowBanner] = useLocalStorage("showBanner", "true");
	const [uploadActive, setUploadActive] = useState(false);
	const [file, setFile] = useState(null);
	const [progress, setProgress] = useState(0);
	const [loading, setLoading] = useState(false);

	const rf = useCallback(() => {
		console.log("USE RF CALLBACK")
		if ((user && Object.keys(user).length <= 0) || (merchant && Object.keys(merchant).length <= 0)) {
			getMerchantProfile().then((res) => {
				if (res.status === HttpStatus.OK) {
					setUser(res.payload.user)
					setMerchant(res.payload.merchant)
				}
				// else Logout
			}).catch(() => {
				// Logout
			})
		}
	}, [merchant, user, setUser, setMerchant]);

	const openBanner = useCallback(() => {
		console.log("OPEN MODAL CALLBACK")
		var myModal = new window.bootstrap.Modal(document.getElementById('welcomeModal'), {
			keyboard: false
		});

		if (showBanner === "true") {
			myModal.show();
			setShowBanner("false");
		}

		return (() => {
			myModal.hide();
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function uploadLogo(e) {
		if (e.target.files.length > 0 && e.target.files.length === 1) {
			const allowedFileMime = ['image/jpeg', 'image/png'];
			const toUpload = (e.target.files[0]);

			if (!allowedFileMime.includes(toUpload?.type)) {
				cogoToast.error("Unsupported file format selected. Please choose a supported format", { position: "top-right", hideAfter: 3 })
				return;
			};

			// File size limit 5MB
			if (toUpload.size > 5242880) {
				cogoToast.error("Maximum allowed file size is 5MB. Please select a valid file.", { position: "top-right", hideAfter: 3 });
				return;
			};

			const formData = new FormData();

			formData.append("file", toUpload);

			setFile(toUpload);
			console.log(toUpload)
			setUploadActive(true);

			console.log(file)

			let xhr = new XMLHttpRequest();
			xhr.open("PUT", `${process.env.REACT_APP_BASE_API}/merchant/`);
			xhr.withCredentials = true;
			xhr.upload.addEventListener("loadstart", function () {

			}, false);

			xhr.upload.addEventListener("progress", ({ loaded, total }) => {
				let fileLoaded = Math.floor((loaded / total) * 100);
				let fileTotal = Math.floor(total / 1000);

				setProgress(fileLoaded);

				console.log(fileLoaded)
				console.log(fileTotal)
			}, false);

			xhr.onreadystatechange = function () {
				if (this.readyState === 4 && this.status === 200) {
					try {
						let json = JSON.parse(this.responseText)
						setMerchant(json.payload.merchant);
					} catch (ex) {
						cogoToast.error("Invalid response recieved")
					}
				}
			};

			xhr.upload.addEventListener("load", function (e) {
				setUploadActive(false)
			}, false);


			xhr.send(formData);
		}
	}

	// const [pageLoading, setPageLoading]
	// const [showHint, setShowHint] = useLocalStorage("showHint", true);
	// TODO: Change to Promise.all

	useEffect(() => {
		console.log("USE RF")
		rf();
	}, [rf]);

	useEffect(() => {
		console.log("OPEN BANNER")
		openBanner()
	}, [openBanner]);

	useEffect(() => {
		getCustomers().then((e) => {
			console.log(e)
			setCustomers(e.payload)
		}).catch((ex) => {
			console.log(ex)
		})
	}, []);

	useEffect(() => {
		getApplications().then(e => {
			console.log(e);
			setApplications(e.payload);
		}).catch((ex) => {
			console.log(ex);
		})
	}, [])

	const updateSocial = (ev) => {
		ev.preventDefault();
		setLoading(true)
		const payload = Object.fromEntries(new FormData(ev.target));
		console.log(payload)
		updateMerchant(payload).then((re) => {
			if (re.status === HttpStatus.OK) {
				// update merchant
				// remove verification banner if verified
				cogoToast.success(re.message)
				setMerchant(re.payload.merchant)
				setStep(2)
			} else {
				cogoToast.error(re.message)
			}
		}).catch((e) => {
			console.log(e)
		}).finally(() => {
			setLoading(false)
			// Stop loader
		})
	}

	// useEffect(() => {
	// 	introJs({
	// 		onclose: () => { setShowHint(false) }
	// 	}).start();
	// 	introJs().addHints();

	// 	return (() => {
	// 		introJs().removeHints();
	// 	})
	// })


	return (
		<BaseContainer>
			<div className="container mt-5">
				<div className="row">
					<div className="col-xl-12 col-md-12 ps-md-5">

						<div className="row mb-3" data-intro='Hello step one!' data-title="Welcome">
							<h1 className="page-header mb-2 mt-3">Hey there, <span className="fw-bold">{user.firstName}</span><span> &#128075;&#127997;</span></h1>
							<p className="ft-2">Here's a quick overview of what is going on</p>
						</div>

						<div className="row">
							<div className="col-md-12 mb-3 order-2 order-md-first">
								<div className="row">

									<div className="col-md-3 col-sm-6">
										<div className="card mb-2 border-0 shadow-sm" data-intro='Customers'>
											<div className="card-body">
												<div className="d-flex">
													<div className="flex-grow-1">
														<h5 className="small-card-header mb-3">
															TOTAL CUSTOMERS
														</h5>
														<p className="small-card-para mb-2">{(customers && customers.length) || 0}</p>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className="col-md-3 col-sm-6">
										<div className="card mb-2 border-0 shadow-sm" data-intro='Customers'>
											<div className="card-body">
												<div className="d-flex">
													<div className="flex-grow-1">
														<h5 className="small-card-header mb-3">
															TICKETED CUSTOMERS
														</h5>
														<p className="small-card-para mb-2">{(applications && applications.length && applications.filter(v => v.status !== "PENDING").length) || 0}</p>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className="col-md-3 col-sm-6">
										<div className="card mb-2 border-0 shadow-sm" data-intro='Customers'>
											<div className="card-body">
												<div className="d-flex">
													<div className="flex-grow-1">
														<h5 className="small-card-header mb-3">
															PENDING APPLICATIONS
														</h5>
														<p className="small-card-para mb-2">{(applications && applications.length && applications.filter(v => v.status === "PENDING").length) || 0}</p>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className="col-md-3 col-sm-6">
										<div className="card mb-2 border-0 shadow-sm" data-intro='Customers'>
											<div className="card-body">
												<div className="d-flex">
													<div className="flex-grow-1">
														<h5 className="small-card-header mb-3">
															TOTAL TRANSACTION VALUE
														</h5>
														<p className="small-card-para mb-2">{formatCurrency(applications && applications.length && applications.reduce((x, v) => (x + parseFloat(v.amount)), 0), 0)}</p>
													</div>
												</div>
											</div>
										</div>
									</div>

								</div>
							</div>

							<div className="col-md-12 order-first order-md-2">

								<div className="card mb-3 bg-white border-0 shadow-sm" data-intro='Use Quick links to access actions'>
									<div className="card-header bg-transparent">
										QUICK LINKS
									</div>
									<div className="container mb-4">
										<div className="row">

											<div className="col-4 col-md-3 d-flex justify-content-center">
												<Link to="/create-application/" className="text-center">
													<div className="mx-auto rounded-circle bg-custom-theme d-flex align-items-center justify-content-center h-p-60 w-p-60 mb-2">
														<i className="fa-light fa-grid-2-plus fs-22 text-white"></i>
													</div>
													<p className="text-dark fs-14 ft-2">New Client Application</p>
												</Link>
											</div>
											<div className="col-4 col-md-3 d-flex justify-content-center">
												<Link to="/customers/" className="text-center">
													<div className="mx-auto rounded-circle bg-custom-teal d-flex align-items-center justify-content-center h-p-60 w-p-60 mb-2">
														<span className="fa-rotate-by" style={{ "--fa-rotate-angle": "45deg" }}>
															<i className="fa-light fa-ticket-airline fa-flip-horizontal fs-22 text-white"></i>
														</span>
													</div>
													<p className="text-dark fs-14 ft-2">Ticketed Customers</p>
												</Link>
											</div>
											<div className="col-4 col-md-3 d-flex justify-content-center">
												<Link to="/campaign/" className="text-center">
													<div className="mx-auto rounded-circle bg-custom-blue d-flex align-items-center justify-content-center h-p-60 w-p-60 mb-2">
														<i className="fa-light fa-monitor-waveform fs-22 text-white"></i>
													</div>
													<p className="text-dark fs-14 ft-2">Campaign Monitoring</p>
												</Link>
											</div>
											<div className="col-4 col-md-3 d-flex justify-content-center">
												<Link to="/live-chat/" className="text-center">
													<div className="mx-auto rounded-circle bg-custom-dark d-flex align-items-center justify-content-center h-p-60 w-p-60 mb-2">
														<i className="fa-regular fa-headset fs-22 text-white"></i>
													</div>
													<p className="text-dark fs-14 ft-2">Customer Service</p>
												</Link>
											</div>

										</div>
									</div>
								</div>
							</div>

							<div className="col-md-12 order-last">
								<div className="card bg-white border-0 shadow-sm">
									<div className="card-header bg-transparent mb-2 mt-3">
										<div className="row align-middle">
											<div className="col-6">
												<h1 className="fs-12 fw-bolder text-uppercase">RECENT TICKETS REQUEST</h1>
											</div>
											<div className="col-6">
												<div className="input-group">
													<span className="input-group-text input-group-text-0 rounded-start">
														<i className="iconly-Search icli fs-22 border-end-0"></i>
													</span>
													<input data-hint="use this to search and filter" ref={searchRef} type="text" placeholder="Search..." className="form-control form-control-0 rounded-end ps-3 py-2 border-start-0" id="tbSearch" />
												</div>
											</div>
										</div>
									</div>
									<div className="card-body" data-intro='Use Quick links to access actions'>
										<GTable data={applications} searchEl={searchRef} class={ApplicationsClass} history={history} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="modal fade" id="welcomeModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				{step === 0 &&
					<div className="modal-dialog modal-dialog-centered" style={{ maxWidth: 800 }}>
						<div className="modal-content rounded-12">
							<div className="modal-header border-0">
								<button type="button" className="btn-close fs-10 mt-2 me-3 z-index-3" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div className="modal-body">
								<div className="col-12 d-none d-md-block" style={{ marginTop: "-15em" }}>
									<img src="/img/welcome.png" alt="welcome" />
								</div>

								<div className="container text-right mt-4 px-lg-5 px-md-4 px-3">
									<h5 className="fw-bolder fs-30 ft-2 mb-2" id="welcomeModalLabel">Welcome</h5>
									<p className="fs-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porta quam eget finibus facilisis. Nullam in magna quis turpis dapibus varius sed a nulla. Integer vel nulla at mauris scelerisque aliquet convallis sed enim</p>
								</div>

								<div className="container px-lg-5 px-md-4 px-3">
									<div className="d-flex justify-content-between">
										<p className="fs-12 align-middle ft-2 align-self-end mb-1">1 of 3</p>
										<button type="button" onClick={() => setStep(1)} className="btn btn-theme fs-14 py-3 px-5 rounded-12">Continue</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				}

				{step === 1 &&
					<div className="modal-dialog modal-dialog-centered" style={{ maxWidth: 800 }}>
						<div className="modal-content rounded-12">
							<div className="modal-header border-0">
								<button type="button" className="btn-close fs-10 mt-2 me-3" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div className="modal-body">
								<div className="container px-lg-4 px-md-4 px-3">
									<div className="row mb-3">
										<h5 className="fw-bolder fs-18 mb-1" id="welcomeModalLable">Set up Business Profile</h5>
										<p className="fs-12">Finish setting up your business profile on GoFlex</p>
									</div>

									<div className="row mb-5">
										<div className="col-2 px-0">
											<input type="file" id="upload-circle" hidden onChange={uploadLogo} />
											{(file || merchant?.logo) ? <img src={file ? URL.createObjectURL(file) : merchant?.logo} className="rounded-circle" height="100" width="100" alt="account" /> :
												<label htmlFor="upload-circle" className="mx-auto rounded-circle bg-custom-theme d-flex align-items-center justify-content-center h-p-80 w-p-80 mb-2 hover-dim">
													<i className="fa-light fa-camera fs-22 text-white"></i>
												</label>
											}
										</div>
										<div className="col-10">
											<p className="text-theme fs-14 fw-bold mb-1">Upload Business Logo</p>
											<p className="ft-2 fs-12">( PNG, JPG | 5MB Max)</p>
											{(file || merchant?.logo) && <label htmlFor="upload-circle" className="fw-600 ft-2 fs-12 text-link p-0 pointer-cursor">Change logo</label>}
											{uploadActive &&
												<div className="progress" style={{ height: 2 }}>
													<div className="progress-bar" role="progressbar" style={{ width: `${progress}%` }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
												</div>
											}
										</div>
									</div>

									<form onSubmit={updateSocial}>
										<div className="row mb-4">
											<div className="col-6">
												<label htmlFor="inputfirstName" className="form-label ft-2">Website (Optional)</label>
												<div className="input-group">
													<span className="input-group-text input-group-text-0"><i className="fa-light fa-globe fs-22 border-end-0"></i></span>
													<input type="text" placeholder="https://www.yourwebsite.com/" defaultValue={merchant?.website} className="form-control form-control-0 ps-3 py-3 border-start-0" name="website" />
												</div>
											</div>

											<div className="col-6">
												<label htmlFor="inputfirstName" className="form-label ft-2">Instagram (Business)</label>
												<div className="input-group">
													<span className="input-group-text input-group-text-0 "><i className="fa-brands fa-instagram fs-22 border-end-0"></i></span>
													<input type="text" placeholder="https://www.instagram.com/" defaultValue={merchant?.instagramBusiness} className="form-control form-control-0 ps-3 py-3 border-start-0" name="instagramBusiness" />
												</div>
											</div>
										</div>

										<div className="row mb-5">
											<div className="col-6">
												<label htmlFor="inputfirstName" className="form-label ft-2">Instagram (Personal)</label>
												<div className="input-group">
													<span className="input-group-text input-group-text-0 "><i className="fa-brands fa-instagram fs-22 border-end-0"></i></span>
													<input type="text" placeholder="https://www.instagram.com/" defaultValue={merchant?.instagramPersonal} className="form-control form-control-0 ps-3 py-3 border-start-0" name="instagramPersonal" />
												</div>
											</div>

											<div className="col-6">
												<label htmlFor="inputfirstName" className="form-label ft-2">Bookings you provide</label>
												<div>
													<div className="form-check form-check-inline">
														<input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
														<label className="form-check-label ft-2 fs-12" htmlFor="inlineCheckbox1">Flights</label>
													</div>
													<div className="form-check form-check-inline">
														<input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
														<label className="form-check-label ft-2 fs-12" htmlFor="inlineCheckbox2">Hotel</label>
													</div>
													<div className="form-check form-check-inline">
														<input className="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" />
														<label className="form-check-label ft-2 fs-12" htmlFor="inlineCheckbox3">Airbnb / Shortlets</label>
													</div>
													<div className="form-check form-check-inline">
														<input className="form-check-input" type="checkbox" id="inlineCheckbox4" value="option3" />
														<label className="form-check-label ft-2 fs-12" htmlFor="inlineCheckbox3">Packages</label>
													</div>
												</div>
											</div>
										</div>


										<div className="row mb-3">
											<div className="d-flex justify-content-between">
												<p className="fs-12 align-middle ft-2 align-self-end mb-1">2 of 3</p>
												<button disabled={loading || uploadActive} className="btn btn-theme fs-14 py-3 px-5 rounded-12">
													{loading ?
														<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Continue"
													}
												</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				}

				{step === 2 &&
					<div className="modal-dialog modal-dialog-centered" style={{ maxWidth: 800 }}>
						<div className="modal-content rounded-12">
							<div className="modal-header justify-content-between border-0 border-bottom px-4 mb-4">
								<img alt="logo" src="/img/logo.svg" width="80" />
								<button type="button" data-bs-dismiss="modal" aria-label="Close" className="btn btn-theme fs-12 fw-600 rounded-12 px-4 py-3">Go To Dashboard</button>
							</div>
							<div className="modal-body">
								<div className="container px-lg-3 px-md-3 px-3">
									<div className="row mb-3">
										<h4 className="fw-bolder fs-18 mb-1" id="welcomeModalLable">Welcome to GoFlex, <span className="fw-normal text-theme">{user.firstName}</span></h4>
										<p className="fs-12">We're super excited to have you on our platform, Here are some resources to guide you on gettting started.</p>
									</div>

									<div className="row mb-4">
										<p className="fw-bold fs-14">Learn how to</p>
										<div className="col-lg-4 col-12">
											<button className="btn btn-transparent btn-labeled p-2 border rounded-10 d-flex w-100 align-items-center">
												<span className="bg-custom-dim p-3 rounded-10 me-3"><i className="fa-solid fa-file-lines fs-22 text-theme"></i></span>
												<span className="fs-14 fw-600 text-start">Create a Booking Application</span>
											</button>
										</div>
										<div className="col-lg-4 col-12">
											<button className="btn btn-transparent btn-labeled p-2 border rounded-10 d-flex w-100 align-items-center">
												<span className="bg-custom-dim p-3 rounded-10 me-3"><i className="fa-solid fa-file-lines fs-22 text-theme"></i></span>
												<span className="fs-14 fw-600 text-start">Set up a payout account</span>
											</button>
										</div>
										<div className="col-lg-4 col-12">
											<button className="btn btn-transparent btn-labeled p-2 border rounded-10 d-flex w-100 align-items-center">
												<span className="bg-custom-dim p-3 rounded-10 me-3"><i className="fa-solid fa-file-lines fs-22 text-theme"></i></span>
												<span className="fs-14 fw-600 text-start">Manage your go flex customers</span>
											</button>
										</div>
									</div>

									<div className="row mb-5">
										<p className="fw-bold fs-14">Get more help</p>
										<div className="col-lg-4 col-12">
											<button className="btn btn-transparent btn-labeled p-2 border rounded-10 d-flex w-100 align-items-center">
												<span className="bg-custom-dim p-3 rounded-10 me-3"><i className="fa-solid fa-circle-question fs-22 text-theme"></i></span>
												<span className="fs-14 fw-600 text-start">Read Support Docs</span>
											</button>
										</div>
										<div className="col-lg-4 col-12">
											<button className="btn btn-transparent btn-labeled p-2 border rounded-10 d-flex w-100 align-items-center">
												<span className="bg-custom-dim p-3 rounded-10 me-3"><i className="fa-solid fa-circle-play fs-22 text-theme"></i></span>
												<span className="fs-14 fw-600 text-start">Watch Tutorials</span>
											</button>
										</div>
										<div className="col-lg-4 col-12">
											<button className="btn btn-transparent btn-labeled p-2 border rounded-10 d-flex w-100 align-items-center">
												<span className="bg-custom-dim p-3 rounded-10 me-3"><i className="fa-solid fa-messages fs-22 text-theme"></i></span>
												<span className="fs-14 fw-600 text-start">Contact Support</span>
											</button>
										</div>
									</div>

									<div className="row mb-4">
										<p className="fw-bold fs-14">Share GoFlex with others</p>
										<div className="col-lg-4 col-12">
											<button className="btn btn-transparent btn-labeled p-2 border rounded-10 d-flex w-100 align-items-center">
												<span className="py-2 px-2 me-3"><i className="fa-brands fa-facebook text-facebook fa-2x"></i></span>
												<span className="fs-14 fw-600 text-start">Share on Facebook</span>
											</button>
										</div>
										<div className="col-lg-4 col-12">
											<button className="btn btn-transparent btn-labeled p-2 border rounded-10 d-flex w-100 align-items-center">
												<span className="py-2 px-2 me-3"><i className="fa-brands fa-twitter text-twitter fa-2x"></i></span>
												<span className="fs-14 fw-600 align-middle">Share on Twitter</span>
											</button>
										</div>
									</div>
									{/* <div className="row mb-2">
										<div className="d-flex justify-content-between mb-4">
											<p className="fs-12 align-middle ft-2 align-self-end mb-1">3 of 3</p>
											<button type="button" data-bs-dismiss="modal" className="btn btn-theme fs-12 py-3 px-4 rounded-12">Get Started</button>
										</div>
									</div> */}

								</div>
							</div>
						</div>
					</div>
				}
			</div>
		</BaseContainer>
	)
}