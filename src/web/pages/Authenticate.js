import cogoToast from "cogo-toast";
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { HttpStatus } from "../../helpers/constants";
import { isNullOrEmpty } from "../../helpers/util";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import { obtainAuthToken } from '../../services/auth';

export default function Authenticate({ history }) {
	// TODO: Show message that says please login to continue if page is redirected

	const [loading, setLoading] = useState(false);
	const [passwordShown, setPasswordShown] = useState(false);
	const [persistentUser, setPersistentUser] = useSessionStorage("user", {});
	const [persistentMerchant, setPersistentMerchant] = useSessionStorage("merchant", {});
	const [token, setToken] = useSessionStorage('__v', "");

	const [loginData, setLoginData] = useState({
		email: "",
		password: ""
	});

	
	const handleChange = ({ target: { name, value } }) => {
		setLoginData({ ...loginData, [name]: value });
	};

	const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown ? false : true);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		obtainAuthToken(loginData).then((re) => {
			if (re.status === HttpStatus.OK) {
				setPersistentUser(re.payload.user);
				setPersistentMerchant(re.payload.merchant);
				console.log(persistentUser);
				console.log(persistentMerchant);
				if (isNullOrEmpty(re?.payload?.merchant?.corporateName) || isNullOrEmpty(re?.payload?.merchant?.rcnumber)) {
					history.push({
						pathname: "/business-information/",
						state: {
							data: re
						}
					})
				} else {
					history.push("/dashboard/")
				}
				return;
			} else if (re.status === HttpStatus.ACCEPTED) {
				setToken(re.payload.token)
				history.push({
					pathname: "/verify-email/",
					state: { message: re.message }
				})
				return;
			}
			cogoToast.error(re.message, { position: "top-right", hideAfter: 5 })
		}).catch((er) => {
			console.log(er)
		}).finally(() => {
			console.log(token)
			setLoading(false);
		})
	};


	return (
		<div className="container-fluid bg-white">
			<div className="row vh-100">
				<div className="col-md-6 col-12 side-image d-none d-md-block">
				</div>
				<div className="col-md-6 col-12 px-lg-5 align-self-center justify-content-center w-form-responsive mx-auto">
					<div className="container">
						<form onSubmit={handleSubmit} className="mb-5">
							<div className="text-center mb-5">
								<img src="/img/logo.svg" alt="logo" width="130" />
							</div>

							<div className="mb-3">
								<h3 className="mb-1">Great to see you back <span>&#128075;&#127997;</span></h3>
								<span>Please sign in to continue</span>
							</div>

							<div className="col mb-3">
								<div className="input-group">
									<span className="input-group-text input-group-text-0 "><i className="iconly-Message icli fs-22 border-end-0"></i></span>
									<input type="email" placeholder="Email Address" className="form-control form-control-0 ps-3 py-3 border-start-0" name="email" value={loginData.email} onChange={handleChange} required />
								</div>
							</div>

							<div className="col mb-4">
								<div className="input-group">
									<span className="input-group-text input-group-text-0 border-end-0"><i className="iconly-Lock icli fs-22"></i></span>
									<input type={passwordShown ? "text" : "password"} required placeholder="Password" className="form-control form-control-0 py-3 ps-3 border-start-0 border-end-0" name="password" value={loginData.password} onChange={handleChange} />
									<button type="button" onClick={togglePasswordVisiblity} className="input-group-text input-group-text-0 border-start-0 fs-12">
										{passwordShown ? "HIDE" : "SHOW"}
									</button>
								</div>
							</div>

							<div className="row">
								<div className="col-6">
									<button type="submit" className="btn btn-theme py-3 px-5 rounded-12" disabled={loading}>
										{loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Login"}
									</button>
								</div>

								<div className="col-6 text-end align-self-center">
									<Link className="fw-bolder text-theme fw-responsive text-decoration-none" to="/forgot-password/">Forgot password ?</Link>
								</div>
							</div>
						</form>
						<div>
							<p>Don't have an Agent Account?<Link to="/get-started/" transition={"glide-right"}> <span className="fw-bold fw-responsive text-theme">Create One Now</span></Link></p>
						</div>
					</div>
				</div>
			</div>
		</div>

	)
}