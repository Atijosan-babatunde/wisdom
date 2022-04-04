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
import { updateMerchant } from "../../services/merchsnts";
import { Link } from "react-router-dom";

const Account = () => {
	const [user, setUser] = useSessionStorage("user", {});
	const [updating, setUpdating] = useState(false)
	const [merchant, setMerchant] = useSessionStorage("merchant", {});
	const [verifications, setVerifications] = useState([]);
	const [nubans, setNubans] = useState([]);
	const [defaultNuban, setDefaultNuban] = useState({});
	const [oldPasswordShown, setOldPasswordShown] = useState(false);
	const [newPasswordShown, setNewPasswordShown] = useState(false);
	const [conPasswordShown, setConPasswordShown] = useState(false);
	const [passwordChangeLoading, setPasswordChangeLoading] = useState(false);
	const [profileChangeLoading, setProfileChangeLoading] = useState(false);
	const [uploadActive, setUploadActive] = useState(false);
	const [file, setFile] = useState(null);
	const [progress, setProgress] = useState(0)

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
				setDefaultNuban(res.payload.find(v => v.isPrimary) || {})
				setNubans(res.payload)
				console.log("NUBANS", res.payload)
			}
			// Show error
		}).catch(() => {
			// Show error

		}).finally(() => {
			// Stop Loader
		})
	}, [])

	const updateBusinessInfo = (ev) => {
		ev.preventDefault()
		setUpdating(true)
		const payload = Object.fromEntries(new FormData(ev.target));
		console.log(payload)
		updateMerchant(payload).then((re) => {
			if (re.status === HttpStatus.OK) {
				// update merchant
				// remove verification banner if verified
				cogoToast.success(re.message)
				setMerchant(re.payload.merchant)
			} else {
				cogoToast.error(re.message)
			}
		}).catch((e) => {
			console.log(e)
		}).finally(() => {
			setUpdating(false)
			// Stop loader
		})
	}

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
			setUploadActive(true);

			let xhr = new XMLHttpRequest();
			xhr.open("PUT", `${process.env.REACT_APP_BASE_API}/merchant/`);
			xhr.withCredentials = true;
			xhr.upload.addEventListener("loadstart", function () {

			}, false);

			xhr.upload.addEventListener("progress", ({ loaded, total }) => {
				console.log(loaded)
				console.log(total)
				let fileLoaded = Math.floor((loaded / total) * 100);
				let fileTotal = Math.floor(total / 1000);

				setProgress(fileLoaded);

				console.log(fileLoaded)
				console.log(fileTotal)
			}, false);

			xhr.onreadystatechange = function () {
				if (this.readyState === 4 && this.status === 200) {
					console.log(this)
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
					<div className="col-xl-12 col-md-12 ps-md-5">
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
											<li className="nav-item" role="presentation">
												<button className="nav-link" id="pills-api-tab" data-bs-toggle="pill" data-bs-target="#pills-api" type="button" role="tab" aria-controls="pills-api" aria-selected="false">
													<span className="fs-14 ft-2">API &amp; WEBHOOKS</span>
												</button>
											</li>
										</ul>

										<div className="tab-content px-3" id="pills-tabContent">

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
																<div className="d-flex justify-content-between">
																	<p className="fs-12 fw-600 text-theme ft-2">Your phone number is not verifed. </p>
																	<Link to="verify-phone/" className="fs-12 fw-600 ft-2">Verify now</Link>
																</div>
															}
														</div>
														<div className="col-md-6">
															<label htmlFor="inputLastName" className="form-label">ADDRESS</label>
															<input type="text" className="form-control form-control-0 ps-3 py-3" name="address" placeholder="Enter your address" required defaultValue={user.address} />
														</div>
													</div>
													<div className="row mb-5">
														<div className="col-md-6">
															<label htmlFor="inputAddress" className="form-label">EMAIL ADDRESS</label>
															<input data-bs-toggle="tooltip" disabled readOnly type="text" className="form-control form-control-0 ps-3 py-3" id="inputAddress" placeholder="Enter Address" defaultValue={user.email} />
														</div>
													</div>
													<div className="col">
														<button type="submit" className="btn btn-theme py-3 px-5 rounded-12 fs-12 fw-600" disabled={profileChangeLoading}>
															{profileChangeLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Update Profile"}
														</button>
													</div>
												</form>
											</div>

											<div className="tab-pane mt-3 ms-2 fade" id="pills-businessinfo" role="tabpanel" aria-labelledby="pills-businessinfo-tab">

												<div className="row mb-3">
													{merchant?.isRCNumberValidated ?

														<Fragment>
															<div className="col mb-4">
																<div>
																	<i className="fa-solid fa-badge-check text-teal fs-22 align-middle me-3"></i>
																	<span className="align-middle fs-14">Good job. Your business information as been verified.</span>
																</div>
															</div>

															<div className="row mb-5">
																<div className="col-md-6 mb-lg-0 mb-3">
																	<label htmlFor="inputAddress" className="form-label">BUSINESS NAME</label>
																	<p className="ft-2 fs-14">{merchant?.corporateName}</p>
																</div>

																<div className="col-md-6">
																	<label htmlFor="inputAddress" className="form-label">RC NUMBER</label>
																	<p className="ft-2 fs-14">{merchant?.rcnumber}</p>
																</div>
															</div>

														</Fragment> :

														<form onSubmit={updateBusinessInfo}>
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
																		<input type="text" placeholder="Business Name" className="form-control form-control-0 ps-3 py-3 border-start-0" name="corporateName" defaultValue={merchant?.corporateName} />
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
																<button disabled={updating} className="btn btn-transaparent text-theme fs-14 fw-600 ft-2">Update Business Information</button>
															</div>
														</form>
													}
												</div>

												<div className="row mb-5">
													<div className="col-2 px-0">
														<input type="file" id="upload-circle" hidden onChange={uploadLogo} />
														{
															file || merchant?.logo ?
																<img src={file ? URL.createObjectURL(file) : merchant.logo} className="rounded-circle" height="100" width="100" alt="account" /> :
																<label htmlFor="upload-circle" className="me-auto rounded-circle bg-custom-theme d-flex align-items-center justify-content-center h-p-80 w-p-80 mb-2 hover-dim">
																	<i className="fa-light fa-camera fs-22 text-white"></i>
																</label>
														}

													</div>
													<div className="col-10 ps-0">
														<p className="text-theme fs-14 fw-bold mb-1">Upload Business Logo</p>
														<p className="ft-2 fs-12 mb-1">( PNG, JPG | 5MB Max)</p>
														{(file || merchant?.logo) && <label htmlFor="upload-circle" className="fw-600 ft-2 fs-12 text-link p-0 pointer-cursor">Change logo</label>}
														{uploadActive &&
															<div className="progress" style={{ height: 2 }}>
																<div className="progress-bar" role="progressbar" style={{ width: `${progress}%` }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
															</div>
														}
													</div>
												</div>

												<div className="row mb-3">
													<h5 className="fw-600 fs-16 ft-1">Social Networks</h5>

													<form onSubmit={updateBusinessInfo} className="row mb-4">
														<div className="col-lg-6 col-md-12 mb-3">
															<label htmlFor="inputfirstName" className="form-label ft-2">Website (Optional)</label>
															<div className="input-group">
																<span className="input-group-text input-group-text-0"><i className="fa-light fa-globe fs-22 border-end-0"></i></span>
																<input type="text" placeholder="https://www.yourwebsite.com/" defaultValue={merchant.website} className="form-control form-control-0 ps-3 py-3 border-start-0" name="website" />
															</div>
														</div>

														<div className="col-lg-6 col-md-12 mb-3">
															<label htmlFor="inputfirstName" className="form-label ft-2">Instagram (Business)</label>
															<div className="input-group">
																<span className="input-group-text input-group-text-0 "><i className="fa-brands fa-instagram fs-22 border-end-0"></i></span>
																<input type="text" placeholder="https://www.instagram.com/" defaultValue={merchant.instagramBusiness} className="form-control form-control-0 ps-3 py-3 border-start-0" name="instagramBusiness" />
															</div>
														</div>

														<div className="col-lg-6 col-md-12 mb-3">
															<label htmlFor="inputfirstName" className="form-label ft-2">Instagram (Personal)</label>
															<div className="input-group">
																<span className="input-group-text input-group-text-0 "><i className="fa-brands fa-instagram fs-22 border-end-0"></i></span>
																<input type="text" placeholder="https://www.instagram.com/" defaultValue={merchant.instagramPersonal} className="form-control form-control-0 ps-3 py-3 border-start-0" name="instagramPersonal" />
															</div>
														</div>

														<div className="col-lg-6 col-md-12 mb-3">
															<label htmlFor="inputfirstName" className="form-label ft-2">Facebook</label>
															<div className="input-group">
																<span className="input-group-text input-group-text-0 fs-22"><i className="fa-brands fa-facebook-f fs-18 border-end-0"></i></span>
																<input type="text" placeholder="https://www.facebook.com/" defaultValue={merchant.facebook} className="form-control form-control-0 ps-3 py-3 border-start-0" name="facebook" />
															</div>
														</div>

														<div className="col-lg-6 col-md-12 mb-4">
															<label htmlFor="inputfirstName" className="form-label ft-2">Twitter</label>
															<div className="input-group">
																<span className="input-group-text input-group-text-0 fs-22"><i className="fa-brands fa-twitter fs-18 border-end-0"></i></span>
																<input type="text" placeholder="https://www.twitter.com/" defaultValue={merchant.twitter} className="form-control form-control-0 ps-3 py-3 border-start-0" name="twitter" />
															</div>
														</div>

														<div className="col-lg-6 col-md-12 mb-5">
															<label htmlFor="inputfirstName" className="form-label ft-2">LinkedIn</label>
															<div className="input-group">
																<span className="input-group-text input-group-text-0 fs-22"><i className="fa-brands fa-linkedin fs-18 border-end-0"></i></span>
																<input type="text" placeholder="https://www.linkedin.com/in/" defaultValue={merchant.linkedin} className="form-control form-control-0 ps-3 py-3 border-start-0" name="linkedin" />
															</div>
														</div>

														<div className="col-12 text-end mb-3">
															<button disabled={updating} className="btn btn-theme fs-12 px-4 rounded-12 py-3 fw-600">
																{updating ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Update Social Information"}
															</button>
														</div>
													</form>
												</div>

												<div className="row mb-5">
													<Fragment>
														<h5 className="fw-600 mb-3 fs-16 ft-1">Company Documents</h5>
														<div className="row">
															{
																verifications && verifications.map((v, i) => {
																	return (
																		<div className="col-6 mb-4" key={i}>
																			<p className="fs-12 ft-2 text-uppercase fw-600 mb-2">Document {i + 1}</p>

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
												{
													nubans && nubans.length <= 0 ?
														<div className="row text-center">
															<div className="mb-2">
																<img src="/img/no_bank.svg" alt="No banks" height="200" width="200" />
															</div>

															<div className="mb-4">
																<p className="fs-16 ft-2 fw-bold mb-1">Bank Accounts</p>
																<p className="fs-12 ft-2">Add your preffered bank accounts to start receiving payouts</p>
															</div>

															<div className="mb-5">
																<Link to="add-bank/" className="btn btn-theme fw-600 py-3 px-5 fs-12 ft-2 rounded-10">
																	<i className="fa fa-plus"></i>
																	<span>&nbsp;Add a bank account</span>
																</Link>
															</div>
														</div> :

														<div className="col-6">
															<div className="row mb-5">

																{defaultNuban && Object.keys(defaultNuban).length > 0 &&
																	<Fragment>
																		<p className="fw-600 ft-1 fs-14 text-uppercase">Default Bank</p>
																		<div className="btn-group w-75 border rounded-10" role="group" aria-label="Button group with nested dropdown">
																			<button type="button" className="btn btn-white fs-14 ft-2 fw-600 py-3 px-4 text-start">
																				{defaultNuban.bankName} - {defaultNuban.accountNumber}
																			</button>

																			<div className="btn-group" role="group">
																				<button id="btnGroupDrop1" type="button" className="btn btn-white no-drop-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
																					<i className="fa-regular fa-ellipsis-vertical"></i>
																				</button>
																				<ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
																					<li><button className="fs-12 ft-2 dropdown-item text-danger fw-600">Remove</button></li>
																					<li><button className="fs-12 ft-2 dropdown-item">Set as default</button></li>
																				</ul>
																			</div>
																		</div>
																	</Fragment>
																}

															</div>
															<div className="row mb-3">

																{nubans && nubans.filter(v => !v.isPrimary).length > 0 ?
																	<Fragment>
																		<p className="fw-600 ft-1 fs-14 text-uppercase">Other Banks</p>
																		{nubans.filter(v => !v.isPrimary).map((v, i) => {
																			return (
																				<div key={i} className="btn-group w-75 border rounded-10" role="group" aria-label="Button group with nested dropdown">
																					<button type="button" className="btn btn-white fs-14 ft-2 fw-600 py-3 px-4 text-start">
																						{v.bankName} - {v.accountNumber}
																					</button>

																					<div className="btn-group" role="group">
																						<button id="btnGroupDrop1" type="button" className="btn btn-white no-drop-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
																							<i className="fa-regular fa-ellipsis-vertical"></i>
																						</button>
																						<ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
																							<li><button className="fs-12 ft-2 dropdown-item text-danger fw-600">Remove</button></li>
																							<li><button className="fs-12 ft-2 dropdown-item">Set as default</button></li>
																						</ul>
																					</div>
																				</div>
																			)
																		})
																		}
																	</Fragment>
																	: null
																}
															</div>

															<div className="row mb-5">
																<Link to="add-bank/" className="btn btn-transparent text-start fs-14 fw-600 ft-2 text-theme">
																	<i className="fa fa-plus"></i>
																	<span>&nbsp;Add Bank</span>
																</Link>
															</div>
														</div>
												}

											</div>

											<div className="tab-pane mt-3 ms-2 fade" id="pills-api" role="tabpanel" aria-labelledby="pills-api-tab">
												<div className="container">

													<div className="row">
														<div className="bg-white min-vh-100 max-vh-100 p-5">
															<div className="container">
																<div className="text-center mt-4">
																	<img className="mx-auto mb-5" src="/img/Q2BAOd2 1.svg" alt="" />
																	<p className="fw-600 fs-22 ft-1 mb-3">Coming Soon</p>
																	<p className="fs-14 ft-2">We are working on something awesome for you. Stay Tuned</p>
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
					</div>
				</div>
			</div>
		</BaseContainer >
	)
}

export default Account