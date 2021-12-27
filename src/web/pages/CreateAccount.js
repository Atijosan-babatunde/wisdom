import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { fetchCookie, removeCookie } from "../../helpers/cookie";
import { createAccount } from "../../services/users";

export default function CreateAccount({ history }) {

	const [loading, setLoading] = useState(false);
	const [passwordShown, setPasswordShown] = useState(false);
	const [loginData, setLoginData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: ""
	});

	const handleChange = ({ target: { name, value } }) => {
		setLoginData({ ...loginData, [name]: value });
	};

	const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown ? false : true);
	};

	const handleKeyup = () => {
		const indicator = document.querySelector(".indicator");
		const input = document.querySelector("#PPP");
		const weak = document.querySelector(".weak");
		const medium = document.querySelector(".medium");
		const strong = document.querySelector(".strong");
		const text = document.querySelector(".indicator-text");
		let regExpWeak = /[a-z]/;
		let regExpMedium = /\d+/;
		let regExpStrong = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/;
		let no = 0;

		if (input.value !== "") {
			indicator.style.display = "block";
			indicator.style.display = "flex";
			if (input.value.length <= 3 && (input.value.match(regExpWeak) || input.value.match(regExpMedium) || input.value.match(regExpStrong))) no = 1;
			if (input.value.length >= 6 && ((input.value.match(regExpWeak) && input.value.match(regExpMedium)) || (input.value.match(regExpMedium) && input.value.match(regExpStrong)) || (input.value.match(regExpWeak) && input.value.match(regExpStrong)))) no = 2;
			if (input.value.length >= 6 && input.value.match(regExpWeak) && input.value.match(regExpMedium) && input.value.match(regExpStrong)) no = 3;
			if (no === 1) {
				weak.classList.add("active");
				text.style.display = "block";
				text.textContent = "Your password is too week";
				text.classList.add("weak");
			}
			if (no === 2) {
				medium.classList.add("active");
				text.textContent = "Your password is medium";
				text.classList.add("medium");
			} else {
				medium.classList.remove("active");
				text.classList.remove("medium");
			}
			if (no === 3) {
				weak.classList.add("active");
				medium.classList.add("active");
				strong.classList.add("active");
				text.textContent = "Your password is strong";
				text.classList.add("strong");
			} else {
				strong.classList.remove("active");
				text.classList.remove("strong");
			}
		} else {
			indicator.style.display = "none";
			text.style.display = "none";
		}
	}

	useEffect(() => {
		if (fetchCookie("_token")){
			removeCookie("_token")
		}
		if (fetchCookie("1Q_SPA")){
			removeCookie("1Q_SPA");
		}

		(function () {
			// Fetch all the forms we want to apply custom Bootstrap validation styles to
			var forms = document.querySelectorAll('.needs-validation')

			// Loop over them and prevent submission
			Array.prototype.slice.call(forms)
				.forEach(function (form) {
					form.addEventListener('submit', function (event) {
						if (!form.checkValidity()) {
							event.preventDefault()
							event.stopPropagation()
						}

						form.classList.add('was-validated')
					}, false)
				})
		})()
	}, [])

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		createAccount(loginData).then((re) => {
			console.log(re);
			if (re.status === "CREATED") {
				window && window.localStorage && window.localStorage.setItem("__v", re.payload.token)
				history.push({
					pathname: "/verify-email/",
					state: { message: re.message }
				})
				return;
			}
		}).catch((err) => {
			console.log(err)
		}).finally(() => {
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
								<h2 className="mb-1">Let's get to know you</h2>
								<span>Tell us about yourself</span>
							</div>

							<div className="col mb-3">
								<div className="input-group">
									<span className="input-group-text input-group-text-0 "><i className="iconly-Add-User icli fs-22 border-end-0"></i></span>
									<input type="text" placeholder="First Name" name="firstName" className="form-control form-control-0 ps-3 py-3 border-start-0" onChange={handleChange} required />
								</div>
							</div>

							<div className="col mb-3">
								<div className="input-group">
									<span className="input-group-text input-group-text-0 "><i className="iconly-Add-User icli fs-22 border-end-0"></i></span>
									<input type="text" placeholder="Last Name" name="lastName" className="form-control form-control-0 ps-3 py-3 border-start-0" onChange={handleChange} required />
								</div>
							</div>

							<div className="col mb-3">
								<div className="input-group">
									<span className="input-group-text input-group-text-0 "><i className="iconly-Message icli fs-22 border-end-0"></i></span>
									<input type="email" placeholder="Email Address" name="email" className="form-control form-control-0 ps-3 py-3 border-start-0" onChange={handleChange} required />
								</div>
							</div>

							<div className="col mb-4">
								<div className="input-group">
									<span className="input-group-text input-group-text-0 border-end-0"><i className="iconly-Lock icli fs-22"></i></span>
									<input id="PPP" onKeyUp={handleKeyup} type={passwordShown ? "text" : "password"} required placeholder="Password" name="password" className="form-control form-control-0 py-3 ps-3 border-start-0 border-end-0" onChange={handleChange} />
									<button type="button" onClick={togglePasswordVisiblity} className="input-group-text input-group-text-0 border-start-0 fs-12">
										{passwordShown ? "HIDE" : "SHOW"}
									</button>
								</div>
								<div className="indicator">
									<span className="weak"></span>
									<span className="medium"></span>
									<span className="strong"></span>
								</div>
								<div className="indicator-text fs-12"></div>
							</div>

							<div className="row">
								<div className="col-12 text-end">
									<button type="submit" className="btn btn-theme py-3 px-5 rounded-12" disabled={loading}>{
										loading ?
											<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Create account"
									}</button>
								</div>
							</div>
						</form>
						<div>
							<p>Already have an Agent Account? <Link className="fw-bold fw-responsive text-theme" to="/">Log In</Link></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}