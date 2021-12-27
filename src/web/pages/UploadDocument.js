import cogoToast from 'cogo-toast';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createBusiness } from '../../services/verification';

export default function UploadDocument({ history, location }) {
	const [loading, setLoading] = useState(false);
	const [uploadActive, setUploadActive] = useState(false);
	const [file, setFile] = useState(null);
	const [progress, setProgress] = useState(0)

	function uploadDocument(e) {
		if (e.target.files.length > 0 && e.target.files.length === 1) {
			const allowedFileMime = ['application/pdf', 'image/jpeg', 'image/png'];
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

			formData.append("type", "cac")
			formData.append("file", toUpload);

			setFile(toUpload);
			setUploadActive(true);

			let xhr = new XMLHttpRequest();
			xhr.open("POST", `${process.env.REACT_APP_BASE_API}/verification/`);
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

			xhr.upload.addEventListener("load", function () {

			}, false);

			xhr.send(formData);
		}
	}

	function submit(e) {
		e.preventDefault();
		console.log(e.target)
		setLoading(true)
		createBusiness(
			{
				corporateName: e.target.business.value,
				rcnumber: e.target.rcnumber.value
			}
		).then((data) => {
			console.log(data)
			if (data.status === "OK") {
				history.push("/bank-information/")
			}
		}).catch((err) => {
			console.log(err)
		}).finally(() => {
			setLoading(false)
		})
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
								<h4 className="mb-1 fw-bold">What about your business ?</h4>
								<span>Tell us about the business you run</span>
							</div>

							<div className="col mb-3">
								<div className="input-group">
									<span className="input-group-text input-group-text-0 "><i className="iconly-Work icli fs-22 border-end-0"></i></span>
									<input type="text" placeholder="Business Name" className="form-control form-control-0 ps-3 py-3 border-start-0" name="business" required defaultValue={location?.state?.data?.merchant?.corporateName} />
								</div>
							</div>

							<div className="col mb-5">
								<div className="input-group">
									<span className="input-group-text input-group-text-0 "><i className="iconly-Work icli fs-22 border-end-0"></i></span>
									<input type="text" placeholder="RC Number" className="form-control form-control-0 ps-3 py-3 border-start-0" name="rcnumber" required defaultValue={location?.state?.data?.merchant?.rcnumber} />
								</div>
							</div>

							<div className="row mb-1">
								<p className="fw-bold fs-16 mb-3">Company Documents</p>
								<p className="fs-12">Submit douments like CAC Documents,<br /> Documents of Association, etc.</p>
							</div>

							{
								uploadActive && <div className="row mb-2">
									<div className="border w-100 text-center border rounded-12 py-3 pointer-cursor position-relative overflow-hidden">
										<span className="align-items-center fs-14 position-relative">{file.name}</span>
										<span className="btn-progress-bar">
											<span className="btn-progress-inner" style={{ width: `${progress}%` }}></span>
										</span>
									</div>
								</div>

							}

							<div className="row mb-3">
								<input type="file" id="actual-btn" onChange={uploadDocument} hidden />
								<label className="border w-100 text-center border rounded-12 py-3 pointer-cursor" htmlFor="actual-btn">
									<i className="iconly-Upload fs-22 align-items-center"></i> &nbsp;
									<span className="text-theme align-items-center fs-14">Upload Company Document</span>
								</label>
								<p className="fs-12 mt-2 p-0 text-theme">Only .pdf .jpeg .jpg .png file types allowed. Max size 5MB</p>
							</div>

							<div className="row">
								<div className="col-12 text-end">
									<Link className="text-dark me-5 fw-600 ft-2 fs-14" to="/social-profile/">Do This Later</Link>
									<button type="submit" className="btn btn-theme py-3 px-5 rounded-12" disabled={loading}>{
										loading ?
											<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Next"
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