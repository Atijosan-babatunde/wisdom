import { BaseContainer } from "../layouts/Containers";
import { Fragment, useState, useEffect } from "react";
import { getMerchantProfile, updatePassword, updateProfile } from "../../services/users";
import cogoToast from "cogo-toast";
import PasswordStrengthField from "../component/PasswordStrengthField";
import { isNullOrEmpty } from "../../helpers/util";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import { HttpStatus } from "../../helpers/constants";

const Account = () => {
	const [user, setUser] = useSessionStorage("user", {});
	const [merchant, setMerchant] = useSessionStorage("merchant", {});
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
						</div>

						<div className="row bg-white pt-4 rounded">
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
											<span className="fs-14 ft-2">BANKS</span>
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
												<div className="col-md-6 mb-md-0 mb-4">
													<label htmlFor="inputfirstName" className="form-label">PHONE</label>
													<input type="text" className="form-control form-control-0 ps-3 py-3" name="phone" placeholder="Enter your phone" required defaultValue={user.phone} />
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
										<div className="row mb-5">
											{merchant?.isRCNumberValidated ?
												<div className="col-lg-8 col-md-12 mb-md-0 mb-4 my-auto">
													<div>
														<i className="fa-solid fa-badge-check text-teal fs-22 align-middle me-3"></i>
														<span className="align-middle fs-14">Good job. Your business information as been verified.</span>
													</div>
												</div> :
												<div className="col">
													<i className="fa-regular align-middle fa-triangle-exclamation text-danger fs-22 me-4"></i>
													<span className="fs-14 align-middle">
														{
															(isNullOrEmpty(merchant?.rcnumber) || isNullOrEmpty(merchant?.corporateName))
																? "Your business information is unverified. Please update your business information."
																: "Your business information is currently under review."
														}</span>
												</div>
											}
										</div>

										{/* <div className="row mb-5">
											<div className="col-lg-8 col-md-12 mb-md-0 mb-4 my-auto">
												<div>
													<i className="fa-solid fa-badge-check text-teal fs-22 align-middle me-3"></i>
													<span className="align-middle fs-14">Good job. Your business information as been verified.</span>
												</div>
											</div>
											<div className="col-lg-4 col-md-12">
												<button className="btn fw-bolder py-3 px-4 border br-12 rounded-12">Update business information</button>
											</div>
										</div> */}

										{/* <div className="row mb-5">
											<div className="col">
												<i className="fa-regular align-middle fa-triangle-exclamation text-danger fs-22 me-4"></i>
												<span className="fs-14 align-middle">Your business information is unverified. Please update your business information.</span>
											</div>
										</div> */}

										<div className="row mb-5">
											<div className="col-md-6 mb-lg-0 mb-3">
												<label htmlFor="inputAddress" className="form-label">BUSINESS NAME</label>
												{isNullOrEmpty(merchant?.corporateName)
													?
													<div className="input-group">
														<span className="input-group-text input-group-text-0 "><i className="iconly-Work icli fs-22 border-end-0"></i></span>
														<input type="text" placeholder="Business Name" className="form-control form-control-0 ps-3 py-3 border-start-0" name="business" required />
													</div>
													: <p>{merchant?.corporateName}</p>
												}

											</div>

											<div className="col-md-6">
												<label htmlFor="inputAddress" className="form-label">RC NUMBER</label>
												{isNullOrEmpty(merchant?.rcnumber) ?
													<div className="input-group">
														<span className="input-group-text input-group-text-0 "><i className="iconly-Work icli fs-22 border-end-0"></i></span>
														<input type="text" placeholder="RC Number" className="form-control form-control-0 ps-3 py-3 border-start-0" name="rcnumber" required />
													</div> : <p>{merchant?.rcnumber}</p>
												}
											</div>
										</div>


										{
											(isNullOrEmpty(merchant?.rcnumber) || isNullOrEmpty(merchant?.corporateName)) &&
											<Fragment>
												<h5 className="fw-bolder mb-3 fs-16">Company Documents</h5>
												<div className="row">
													<div className="col-md-6">
														<input type="file" id="actual-btn" hidden />
														<label className="border w-100 text-center border rounded-12 py-3 pointer-cursor" htmlFor="actual-btn">
															<i className="iconly-Upload fs-22 align-items-center"></i> &nbsp;
															<span className="text-theme align-items-center fs-14">Upload Company Document</span>
														</label>
													</div>
												</div>
											</Fragment>
										}


										{/* <div className="row">
											<div className="col-md-6">
												<p className="fs-12 fw-bolder">BUSINESS NAME</p>
												<p>Johnson's Agency</p>
											</div>
											<div className="col-md-6">
												<p className="fs-12 fw-bolder">RC NUMBER</p>
												<p>2039694076</p>
											</div>
										</div>

										<h5 className="fw-bolder mb-5 mt-5">Company Documents</h5>

										<div className="row">
											<div className="col-md-6">
												<p className="fs-12 fw-bolder mb-2">DOCUMENT1</p>
												<p>CAC-Document.pdf <i className="far fa-eye"></i></p>
											</div>
											<div className="col-md-6">
												<p className="fs-12 fw-bolder mb-2">DOCUMENT2</p>
												<p>CAC-Document.pdf <i className="far fa-eye"></i></p>
											</div>

										</div> */}
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

									<div className="tab-pane mt-3 ms-2 fade" id="pills-banks" role="tabpanel" aria-labelledby="pills-banks-tab"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div >
		</BaseContainer >
	)
}

export default Account