import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { resendOTP, verifyOTP } from "../../services/auth";


export default function EmailVerification({ history, location }) {
	const [loading, setLoading] = useState(false);
	const [resendLoading, setResendLoading] = useState(false);

	const token = window && window.localStorage && window.localStorage.getItem("__v");
	console.log(token)
	useEffect(() => {
		var container = document.getElementsByClassName("container")[0];
		container.onkeyup = function (e) {
			var target = e.srcElement;
			var maxLength = parseInt(target.attributes["maxlength"].value, 10);
			var myLength = target.value.length;
			if (myLength >= maxLength) {
				var next = target;
				//TODO: Handle Backspace

				while ((next = next.nextElementSibling)) {
					if (next == null)
						break;
					if (next.tagName.toLowerCase() === "input") {
						next.focus();
						break;
					}
				}
			}
		}

		container.addEventListener("paste", function (ev) {
			const clip = ev.clipboardData.getData("text").trim();
			if (!/\d{6}/.test(clip)) return ev.preventDefault();
			const s = [...clip];
			Array.prototype.forEach.call(document.getElementsByClassName("take"), (e, i) => e.value = s[i]);
		})

		return (() => {
			container.onkeyup = null;
			document.removeEventListener("paste", null);
		})
	}, []);

	const submit = () => {
		const code = Array.prototype.map.call(document.getElementsByClassName("take"), (e) => e.value).join("");
		setLoading(true);
		verifyOTP({
			code: parseInt(code, 10),
			token: window.localStorage.getItem("__v")
		}).then((e) => {
			console.log(e)
			if (e.status === "OK") {
				window && window.localStorage && window.localStorage.removeItem("__v");
				window && window.localStorage && window.localStorage.removeItem("showBanner");
				window && window.localStorage && window.localStorage.setItem("user", JSON.stringify(e.payload.user));
				window && window.localStorage && window.localStorage.setItem("merchant", JSON.stringify(e.payload.merchant));
				history.push("/business-information/")
				return;
			}
		}).catch((err) => {
			console.log(err);
		}).finally(() => {
			setLoading(false);
		})
	}

	const resend = () => {
		setResendLoading(true);
		resendOTP({
			token: window.localStorage.getItem("__v")
		}).then((e) => {
			console.log(e)
			// if (e.status === "OK") {
				cogoToast.success("OTP Verification code has been resent", { position: "top-right", hideAfter: 5 })
			// }
		}).catch((err) => {
			console.log(err);
		}).finally(() => {
			setResendLoading(false);
		})
	}



	if (!token) {
		return history.push("/");
	}

	return (
		<div className="container-fluid bg-white">
			<div className="row vh-100">
				<div className="col-md-6 col-12 side-image d-none d-md-block">
				</div>
				<div className="col-md-6 col-12 px-lg-5 align-self-center justify-content-center w-form-responsive w-form-special-responsive mx-auto">
					<div className="container">
						<form>
							<div className="text-center mb-5">
								<img src="/img/logo.svg" alt="logo" width="130" />
							</div>

							<div className="mb-3">
								<h2 className="mb-1">Verify your email address</h2>
								<span>{location && location.state && location.state.message}</span>
							</div>

							<div className="row mb-4 pass gap-1">
								<input className="take col-2 text-center" type="text" maxLength="1" />
								<input className="take col-2 text-center" type="text" maxLength="1" />
								<input className="take col-2 text-center" type="text" maxLength="1" />
								<input className="take col-2 text-center" type="text" maxLength="1" />
								<input className="take col-2 text-center" type="text" maxLength="1" />
								<input className="take col-2 text-center" type="text" maxLength="1" />
							</div>

							<div className="row">
								<div className="col-6 text-end">
									<button onClick={resend} type="button" className="btn fs-14 fw-bold text-theme btn-outline-orange py-3 ps-5">
										{resendLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> :
											<Fragment>
												<i className="fa-solid fa-arrow-rotate-right"></i>
												<span>&nbsp; Resend Code</span>
											</Fragment>
										}
									</button>
								</div>
								<div className="col-6 text-end pe-0">
									<button className="btn btn-theme py-3 px-5 rounded-12" onClick={submit} disabled={loading} type="button">
										{
											loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Continue"
										}
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}