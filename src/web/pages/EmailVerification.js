import cogoToast from "cogo-toast";
import React, { useEffect, useState, Fragment } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useInterval } from "../../hooks/useInterval";
import { resendOTP, verifyOTP } from "../../services/auth";


export default function EmailVerification({ history, location }) {
	const STATUS = {
		STARTED: 'Started',
		STOPPED: 'Stopped',
	}

	const INITIAL_COUNT = 300

	const [loading, setLoading] = useState(false);
	const [otpError, setOtpError] = useState(false)
	const [resendLoading, setResendLoading] = useState(false);

	const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT)
	const [status, setStatus] = useState(STATUS.STOPPED)

	const [token] = useLocalStorage('__v');

	const secondsToDisplay = secondsRemaining % 60
	const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60
	const minutesToDisplay = minutesRemaining % 60
	// const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60

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

	const handleStart = () => {
		setStatus(STATUS.STARTED)
	}
	const handleStop = () => {
		setStatus(STATUS.STOPPED)
	}
	const handleReset = () => {
		setStatus(STATUS.STOPPED)
		setSecondsRemaining(INITIAL_COUNT)
	}

	useInterval(
		() => {
			if (secondsRemaining > 0) {
				setSecondsRemaining(secondsRemaining - 1)
			} else {
				handleReset()
			}
		},
		status === STATUS.STARTED ? 1000 : null,
		// passing null stops the interval
	)

	const submit = () => {
		setOtpError(false)
		const code = Array.prototype.map.call(document.getElementsByClassName("take"), (e) => e.value).join("");
		setLoading(true);
		verifyOTP({
			code: parseInt(code, 10),
			token: window.localStorage.getItem("__v")
		}).then((e) => {
			console.log(e)
			if (e.status === "OK") {
				handleStop()
				window && window.localStorage && window.localStorage.removeItem("__v");
				window && window.localStorage && window.localStorage.removeItem("showBanner");
				window && window.localStorage && window.localStorage.setItem("user", JSON.stringify(e.payload.user));
				window && window.localStorage && window.localStorage.setItem("merchant", JSON.stringify(e.payload.merchant));
				history.push("/business-information/")
				return;
			} else {
				setOtpError(true)
			}
		}).catch((err) => {
			console.log(err);
			setOtpError(true)
		}).finally(() => {
			setLoading(false);
		})
	}

	const resend = () => {
		setResendLoading(true);
		handleStart();
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

							<div className="row mb-4">
								<h3 className="mb-2 fw-600 p-0">Verify your email address</h3>
								<span className="fs-14 p-0">{location && location.state && location.state.message}</span>
							</div>

							<div className={`row mb-3 pass gap-1 ${otpError ? " invalid-otp" : ""}`}>
								<input className="take col-2 text-center" type="text" maxLength="1" onFocus={() => setOtpError(false)} />
								<input className="take col-2 text-center" type="text" maxLength="1" />
								<input className="take col-2 text-center" type="text" maxLength="1" />
								<input className="take col-2 text-center" type="text" maxLength="1" />
								<input className="take col-2 text-center" type="text" maxLength="1" />
								<input className="take col-2 text-center" type="text" maxLength="1" />
							</div>

							<div className="mb-4">
								{otpError && <p className="fw-600 fs-12 text-danger"><i className="fa-solid fa-triangle-exclamation"></i> Invalid code. Please try again</p>}
							</div>

							<div className="row mt-5">
								<div className="col-6 text-end">
									<button onClick={resend} type="button" className="btn fs-14 fw-bold text-theme btn-outline-orange py-3" disabled={resendLoading || status === STATUS.STARTED}>
										{
											resendLoading
												? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
												: status === STATUS.STARTED ? 
													<span className="text-muted fw-600 fs-14">Resend code in {minutesToDisplay < 10  && 0}{minutesToDisplay} : {secondsToDisplay < 10  && 0}{secondsToDisplay}</span>
													: <Fragment>
														<i className="fa-solid fa-arrow-rotate-right"></i>
														<span>&nbsp; Resend Code</span>
													</Fragment>
										}
									</button>
								</div>
								<div className="col-6 text-end pe-0">
									<button className="btn btn-theme py-3 px-5 rounded-12 fs-12 fw-600" onClick={submit} disabled={loading} type="button">
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