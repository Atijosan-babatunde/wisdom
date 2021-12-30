import { BaseContainer } from "../layouts/Containers";
import { Fragment, useState, useEffect } from "react";
import { getMerchantProfile, updatePassword, updateProfile } from "../../services/users";
import cogoToast from "cogo-toast";
import PasswordStrengthField from "../component/PasswordStrengthField";
import { isNullOrEmpty } from "../../helpers/util";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import { HttpStatus } from "../../helpers/constants";
import { getVerifications } from "../../services/verification";
import { getNubans } from "../../services/nuban";

const Account = () => {
	const [user, setUser] = useSessionStorage("user", {});
	const [merchant, setMerchant] = useSessionStorage("merchant", {});
	const [verifications, setVerifications] = useState([]);
	const [nubans, setNubans] = useState([]);
	const [oldPasswordShown, setOldPasswordShown] = useState(false);
	const [newPasswordShown, setNewPasswordShown] = useState(false);
	const [conPasswordShown, setConPasswordShown] = useState(false);
	const [passwordChangeLoading, setPasswordChangeLoading] = useState(false);
	const [profileChangeLoading, setProfileChangeLoading] = useState(false);

	useEffect(() => {
		if (
			(user && Object.keys(user).length <= 0) ||
			(merchant && Object.keys(merchant).length <= 0)
		) {

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

	});

	useEffect(() => {
		getVerifications().then((re) => {
			console.log(re)
			if (re.status === HttpStatus.OK) {
				setVerifications(re.payload.verifications)
			}
		}).catch(() => {
			// Console.log
			// Error state
		}).finally(() => {
			// Stop Loader
		})
	}, []);

	useEffect(() => {
		getNubans().then((res) => {
			if (res.status === HttpStatus.OK) {
				setNubans(res.payload)
			}
			// Show error
		}).catch(() => {
			// Show error

		}).finally(() => {
			// Stop Loader
		})
	}, [])

	const handlePasswordChange = (ev) => {
		setPasswordChangeLoading(true);
		ev.preventDefault();
		const payload = Object.fromEntries(new FormData(ev.target));
		updatePassword(payload).then((re) => {
			if (re.status === "OK") {
				cogoToast.success(re.message, { position: "top-right", hideAfter: 5 });
			} else {
				cogoToast.error(re.message, { position: "top-right", hideAfter: 5 })
			}
		}).catch(() => {
			cogoToast.error("Failed")
		}).finally(() => {
			setPasswordChangeLoading(false);
		})
	}

	const handleProfileChange = (ev) => {
		setProfileChangeLoading(true);
		ev.preventDefault();
		const payload = Object.fromEntries(new FormData(ev.target));
		updateProfile(payload).then((re) => {
			if (re.status === HttpStatus.OK) {
				setUser(re.payload.user);
				cogoToast.success(re.message, { position: "top-right", hideAfter: 5 })
			} else {
				cogoToast.error(re.message, { position: "top-right", hideAfter: 5 })
			}
		}).catch(() => {
			cogoToast.error("Failed")
		}).finally(() => {
			setProfileChangeLoading(false);
		})
	}

	const toggleOldPasswordVisiblity = () => {
		setOldPasswordShown(oldPasswordShown ? false : true);
	};

	const toggleNewPasswordVisiblity = () => {
		setNewPasswordShown(newPasswordShown ? false : true);
	};

	const toggleConPasswordVisiblity = () => {
		setConPasswordShown(conPasswordShown ? false : true);
	};

	return (
		<BaseContainer>
			<div className="container mt-5">
				<div className="row">
					<div className="col-xl-10 col-md-12 ps-md-5">
						<div className="row mb-3">
							<h1 className="page-header mb-2 mt-3 fw-bolder">My Account</h1>
							<p>Manage your account and payment information.</p>
						</div>

						<div className="row">
							<div className="card bg-white border-0 shadow-sm">
								<div className="card-body">
									<div className="tab-pane px-0" id="pills-verification" role="tabpanel" aria-labelledby="pills-verification-tab">
										<ul className="nav nav-pills top-tab nav-fill mb-5 flex-nowrap text-left" id="pills-tab" role="tablist">
											<li className="nav-item" role="presentation">
												<button className="nav-link active" id="pills-personal-tab" data-bs-toggle="pill" data-bs-target="#pills-personal" type="button" role="tab" aria-controls="pills-personal" aria-selected="true">
													<span className="fs-14 ft-2">PERSONAL INFO</span>
												</button>
											</li>
											<li className="nav-item" role="presentation">
												<button className="nav-link" id="pills-businessinfo-tab" data-bs-toggle="pill" data-bs-target="#pills-businessinfo" type="button" role="tab" aria-controls="pills-businessinfo" aria-selected="false">
													<span className="fs-14 ft-2">BUSINESS INFO</span>
												</button>
											</li>
											<li className="nav-item" role="presentation">
												<button className="nav-link" id="pills-security-tab" data-bs-toggle="pill" data-bs-target="#pills-security" type="button" role="tab" aria-controls="pills-security" aria-selected="false">
													<span className="fs-14 ft-2">SECURITY</span>
												</button>
											</li>
											<li className="nav-item" role="presentation">
												<button className="nav-link" id="pills-banks-tab" data-bs-toggle="pill" data-bs-target="#pills-banks" type="button" role="tab" aria-controls="pills-banks" aria-selected="false">
													<span className="fs-14 ft-2">PAYMENT METHODS</span>
												</button>
											</li>
										</ul>

										<div className="tab-content px-md-5 px-3" id="pills-tabContent">

											<div className="tab-pane mt-3 fade show active" id="pills-personal" role="tabpanel" aria-labelledby="pills-personal-tab">
												<form className="mb-5" onSubmit={handleProfileChange}>

													<div className="row mb-4">
														<div className="col-md-6 mb-md-0 mb-4">
															<label htmlFor="inputfirstName" className="form-label">FIRST NAME</label>
															<input type="text" className="form-control form-control-0 ps-3 py-3" name="firstName" placeholder="Enter First Name" required defaultValue={user.firstName} />
														</div>
														<div className="col-md-6">
															<label htmlFor="inputLastName" className="form-label">LAST NAME</label>
															<input type="text" className="form-control form-control-0 ps-3 py-3" name="lastName" placeholder="Enter Last Name" required defaultValue={user.lastName} />
														</div>
													</div>
													<div className="row mb-4">
														<div className="col-md-6 mb-md-0 mb-3">
															<label htmlFor="inputfirstName" className="form-label">PHONE</label>
															<div className="input-group mb-1">
																<button className="btn border border-end-0 dropdown-toggle form-select-0 fs-14" id="country_code" type="button" data-bs-toggle="dropdown" aria-expanded="false"><span className="flag-icon flag-icon-ng"></span> &nbsp;+234</button>
																<ul className="dropdown-menu">
																	<li data-value="234" className="dropdown-item fs-14"><span className="flag-icon flag-icon-ng"></span> &nbsp;+234</li>
																	<li data-value="1" className="dropdown-item fs-14"><span className="flag-icon flag-icon-us"></span> &nbsp;+1</li>
																	<li data-value="44" className="dropdown-item fs-14"><span className="flag-icon flag-icon-gb"></span> &nbsp;+44</li>
																	<li data-value="1" className="dropdown-item fs-14"><span className="flag-icon flag-icon-ca"></span> &nbsp;+1</li>
																</ul>
																<input type="text" className="form-control form-control-0 ps-3 py-3 border-start-0" name="phone" placeholder="Enter your phone" required defaultValue={user.phone} />
															</div>

															{(user.phone && !user.isPhoneVerified) &&
																<p className="fs-10 fw-600 text-theme ft-2">Your phone number is not verifed. </p>
															}
														</div>
														<div className="col-md-6">
															<label htmlFor="inputLastName" className="form-label">ADDRESS</label>
															<input type="text" className="form-control form-control-0 ps-3 py-3" name="address" placeholder="Enter your address" required defaultValue={user.address} />
														</div>
													</div>
													<div className="row mb-4">
														<div className="col-md-6">
															<label htmlFor="inputAddress" className="form-label">EMAIL ADDRESS</label>
															<input data-bs-toggle="tooltip" disabled readOnly type="text" className="form-control form-control-0 ps-3 py-3" id="inputAddress" placeholder="Enter Address" defaultValue={user.email} />
														</div>
													</div>
													<div className="col">
														<button type="submit" className="btn btn-theme py-3 px-5 rounded-12" disabled={profileChangeLoading}>
															{profileChangeLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Update Profile"}
														</button>
													</div>
												</form>
											</div>

											<div className="tab-pane mt-3 ms-2 fade" id="pills-businessinfo" role="tabpanel" aria-labelledby="pills-businessinfo-tab">
												<div className="row mb-3">
													{merchant?.isRCNumberValidated ?

														<Fragment>
															<div className="col-lg-8 col-md-12 mb-md-0 mb-4 my-auto">
																<div>
																	<i className="fa-solid fa-badge-check text-teal fs-22 align-middle me-3"></i>
																	<span className="align-middle fs-14">Good job. Your business information as been verified.</span>
																</div>
															</div>

															<div className="row mb-5">
																<div className="col-md-6 mb-lg-0 mb-3">
																	<label htmlFor="inputAddress" className="form-label">BUSINESS NAME</label>
																	<p>{merchant?.corporateName}</p>
																</div>

																<div className="col-md-6">
																	<label htmlFor="inputAddress" className="form-label">RC NUMBER</label>
																	<p>{merchant?.rcnumber}</p>
																</div>
															</div>

														</Fragment> :

														<Fragment>
															<div className="col mb-4">
																<i className="fa-regular align-middle fa-triangle-exclamation text-danger fs-22 me-4"></i>
																<span className="fs-14 align-middle">
																	{
																		(isNullOrEmpty(merchant?.rcnumber) || isNullOrEmpty(merchant?.corporateName))
																			? "Your business information is unverified. Please update your business information."
																			: "Your business information is currently under review."
																	}
																</span>
															</div>

															<div className="row mb-2">
																<div className="col-md-6 mb-lg-0 mb-3">
																	<label htmlFor="inputAddress" className="form-label">BUSINESS NAME</label>
																	<div className="input-group">
																		<span className="input-group-text input-group-text-0 "><i className="iconly-Work icli fs-22 border-end-0"></i></span>
																		<input type="text" placeholder="Business Name" className="form-control form-control-0 ps-3 py-3 border-start-0" name="business" defaultValue={merchant?.corporateName} />
																	</div>

																</div>

																<div className="col-md-6">
																	<label htmlFor="inputAddress" className="form-label">RC NUMBER</label>
																	<div className="input-group">
																		<span className="input-group-text input-group-text-0 "><i className="iconly-Work icli fs-22 border-end-0"></i></span>
																		<input type="text" placeholder="RC Number" className="form-control form-control-0 ps-3 py-3 border-start-0" name="rcnumber" defaultValue={merchant?.rcnumber} />
																	</div>
																</div>
															</div>

															<div className="col-12 text-end mb-3">
																<button className="btn btn-transaparent text-theme fs-14 fw-600 ft-2">Update Business Information</button>
															</div>
														</Fragment>
													}
												</div>

												<div className="row mb-3">
													<h5 className="fw-600 fs-16 ft-1">Social Networks</h5>

													<div className="row mb-4">
														<div className="col-6 mb-3">
															<label htmlFor="inputfirstName" className="form-label ft-2">Website (Optional)</label>
															<div className="input-group">
																<span className="input-group-text input-group-text-0"><i className="fa-light fa-globe fs-22 border-end-0"></i></span>
																<input type="text" placeholder="https://www.yourwebsite.com/" className="form-control form-control-0 ps-3 py-3 border-start-0" name="email" />
															</div>
														</div>

														<div className="col-6 mb-3">
															<label htmlFor="inputfirstName" className="form-label ft-2">Instagram (Business)</label>
															<div className="input-group">
																<span className="input-group-text input-group-text-0 "><i className="fa-brands fa-instagram fs-22 border-end-0"></i></span>
																<input type="text" placeholder="https://www.instagram.com/" className="form-control form-control-0 ps-3 py-3 border-start-0" name="email" />
															</div>
														</div>

														<div className="col-6 mb-3">
															<label htmlFor="inputfirstName" className="form-label ft-2">Instagram (Personal)</label>
															<div className="input-group">
																<span className="input-group-text input-group-text-0 "><i className="fa-brands fa-instagram fs-22 border-end-0"></i></span>
																<input type="text" placeholder="https://www.instagram.com/" className="form-control form-control-0 ps-3 py-3 border-start-0" name="email" />
															</div>
														</div>

														<div className="col-6 mb-3">
															<label htmlFor="inputfirstName" className="form-label ft-2">Facebook</label>
															<div className="input-group">
																<span className="input-group-text input-group-text-0 fs-22"><i className="fa-brands fa-facebook-f fs-18 border-end-0"></i></span>
																<input type="text" placeholder="https://www.facebook.com/" className="form-control form-control-0 ps-3 py-3 border-start-0" name="facebook" />
															</div>
														</div>

														<div className="col-6 mb-3">
															<label htmlFor="inputfirstName" className="form-label ft-2">Twitter</label>
															<div className="input-group">
																<span className="input-group-text input-group-text-0 fs-22"><i className="fa-brands fa-twitter fs-18 border-end-0"></i></span>
																<input type="text" placeholder="https://www.twitter.com/" className="form-control form-control-0 ps-3 py-3 border-start-0" name="twitter" />
															</div>
														</div>

														<div className="col-6 mb-3">
															<label htmlFor="inputfirstName" className="form-label ft-2">LinkedIn</label>
															<div className="input-group">
																<span className="input-group-text input-group-text-0 fs-22"><i className="fa-brands fa-linkedin fs-18 border-end-0"></i></span>
																<input type="text" placeholder="https://www.linkedin.com/in/" className="form-control form-control-0 ps-3 py-3 border-start-0" name="linkedin" />
															</div>
														</div>

														<div className="col-12 text-end mb-3">
															<button className="btn btn-transaparent text-theme fs-14 fw-600 ft-2">Update Social Information</button>
														</div>
													</div>
												</div>

												<div className="row mb-5">
													<Fragment>
														<h5 className="fw-600 mb-5 fs-16 ft-1">Company Documents</h5>
														<div className="row">
															{
																verifications && verifications.map((v, i) => {
																	return (
																		<div className="col-6 mb-4" key={i}>
																			<p className="fs-14 ft-2 text-uppercase fw-600 mb-1">Document {i + 1}</p>
																			{/* <p>{v.verificationType.name} <i className="far fa-eye"></i></p> */}

																			{!v.isApproved &&
																				<div class="btn-group w-75 border rounded-10 " role="group" aria-label="Button group with nested dropdown">
																					<button type="button" class="btn btn-white fs-14 ft-2 fw-600 py-3 px-4 text-start">{v.verificationType.name}</button>
																					<input type="file" id="actual-btn" hidden />
																					<div class="btn-group" role="group">
																						<button id="btnGroupDrop1" type="button" className="btn btn-white no-drop-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
																							<i className="fa-regular fa-ellipsis-vertical"></i>
																						</button>
																						<ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
																							<li><button className="fs-12 ft-2 dropdown-item fw-600">View</button></li>
																							<li><label htmlFor="actual-btn" className="fs-12 ft-2 dropdown-item text-danger fw-600">Update</label></li>
																						</ul>
																					</div>
																				</div>
																				// {/* <label className="border w-100 text-center border rounded-12 py-3 pointer-cursor" htmlFor="actual-btn">
																				// 	<i className="iconly-Upload fs-22 align-items-center"></i> &nbsp;
																				// 	<span className="text-theme align-items-center fs-14">Upload Company Document</span>
																				// </label> */}
																			}

																		</div>
																	)

																})
															}

														</div>
													</Fragment>
												</div>
											</div>

											<div className="tab-pane mt-3 ms-2 fade" id="pills-security" role="tabpanel" aria-labelledby="pills-security-tab">

												<form className="mb-5" onSubmit={handlePasswordChange}>
													<div className="row mb-4">
														<div className="col-md-6 mb-md-0 mb-4">
															<label htmlFor="inputAddress" className="form-label">CURRENT PASSWORD</label>
															<div className="input-group">
																<span className="input-group-text input-group-text-0 border-end-0"><i className="iconly-Lock icli fs-22"></i></span>
																<input type={oldPasswordShown ? "text" : "password"} required placeholder="Current password" className="form-control form-control-0 py-3 ps-3 border-start-0 border-end-0" name="old_password" />
																<button type="button" onClick={toggleOldPasswordVisiblity} className="input-group-text input-group-text-0 border-start-0 fs-12">
																	{oldPasswordShown ? "HIDE" : "SHOW"}
																</button>
															</div>
														</div>
														<div className="col-md-6">
															<label htmlFor="inputAddress" className="form-label">NEW PASSWORD</label>
															<PasswordStrengthField toggleDisplay={newPasswordShown} onClick={toggleNewPasswordVisiblity} required placeholder="Choose a new Password" className="form-control form-control-0 py-3 ps-3 border-start-0 border-end-0" name="new_password" />
														</div>
													</div>
													<div className="row mb-4">
														<div className="col-md-6">
															<label htmlFor="inputAddress" className="form-label">CONFIRM NEW PASSWORD</label>
															<div className="input-group">
																<span className="input-group-text input-group-text-0 border-end-0"><i className="iconly-Lock icli fs-22"></i></span>
																<input type={conPasswordShown ? "text" : "password"} required placeholder="Confirm new password" className="form-control form-control-0 py-3 ps-3 border-start-0 border-end-0" name="con_password" />
																<button type="button" onClick={toggleConPasswordVisiblity} className="input-group-text input-group-text-0 border-start-0 fs-12">
																	{conPasswordShown ? "HIDE" : "SHOW"}
																</button>
															</div>
														</div>
													</div>
													<div className="col">
														<button type="submit" className="btn btn-theme py-3 px-5 rounded-12" disabled={passwordChangeLoading}>
															{passwordChangeLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Update Password"}
														</button>
													</div>
												</form>
											</div>

											<div className="tab-pane mt-3 ms-2 fade" id="pills-banks" role="tabpanel" aria-labelledby="pills-banks-tab">
												<div className="col-6">
													<div className="row mb-5">
														<p className="fw-600 ft-1 fs-14 text-uppercase">Default Bank</p>
														<div class="btn-group w-75 border rounded-10 " role="group" aria-label="Button group with nested dropdown">
															<button type="button" class="btn btn-white fs-14 ft-2 fw-600 py-3 px-4 text-start">GTBank - 0231582488</button>

															<div class="btn-group" role="group">
																<button id="btnGroupDrop1" type="button" className="btn btn-white no-drop-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
																	<i className="fa-regular fa-ellipsis-vertical"></i>
																</button>
																<ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
																	<li><button className="fs-12 ft-2 dropdown-item text-danger fw-600">Remove</button></li>
																</ul>
															</div>
														</div>
													</div>
													<div className="row mb-3">
														<p className="fw-600 ft-1 fs-14 text-uppercase">Other Banks</p>
														{nubans && nubans.map((v, i) => {
															return (
																<div key={i} class="btn-group w-75 border rounded-10" role="group" aria-label="Button group with nested dropdown">
																	<button type="button" class="btn btn-white fs-14 ft-2 fw-600 py-3 px-4 text-start">GTBank - 0231582488</button>

																	<div class="btn-group" role="group">
																		<button id="btnGroupDrop1" type="button" className="btn btn-white no-drop-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
																			<i className="fa-regular fa-ellipsis-vertical"></i>
																		</button>
																		<ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
																			<li><button className="fs-12 ft-2 dropdown-item text-danger fw-600">Remove</button></li>
																			<li><button className="fs-12 ft-2 dropdown-item">Set as default</button></li>
																		</ul>
																	</div>
																</div>
															)
														})}

													</div>
													<div className="row mb-5">
														<button className="btn btn-transparent text-start fs-14 fw-600 ft-2 text-theme">
															<i className="fa fa-plus"></i>
															<span>&nbsp;Add Bank</span>
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</BaseContainer >
	)
}

export default Account