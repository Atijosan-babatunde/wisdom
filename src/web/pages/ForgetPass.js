import React, { useState } from 'react';

const ForgetPass = ({ history }) => {
	const [loading] = useState(false);

	const handleSubmit = (e) => {
		console.log(e)
	};

	return (
		<div className="container-fluid bg-white">
			<div className="row vh-100">
				<div className="col-md-6 col-12 side-image d-none d-md-block">
				</div>
				<div className="col-md-6 col-12 px-lg-5 align-self-center justify-content-center w-form-responsive mx-auto">
					<div className="container">
						<form onSubmit={handleSubmit} className="needs-validation mb-5" noValidate>
							<div className="text-center mb-5">
								<img src="/img/logo.svg" alt="logo" width="130" />
							</div>

							<div className="mb-3">
								<h3 className="mb-1 fw-bolder">Enter your email address</h3>
								<span>We'll send you a link to reset your email address</span>
							</div>

							<div className="col mb-3">
								<div className="input-group has-validation">
									<span className="input-group-text input-group-text-0 "><i className="iconly-Message icli fs-22 border-end-0"></i></span>
									<input type="text" placeholder="Email Address" name="email" className="form-control form-control-0 ps-3 py-3 border-start-0" required />
									<div className="invalid-feedback">
										Please enter a valid email address.
									</div>
								</div>
							</div>

							<div className="row">
								<div className="col-12 text-end">
									<button type="submit" className="btn btn-theme py-3 px-5 rounded-12" disabled={loading}>{
										loading ?
											<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Reset password"
									}</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ForgetPass