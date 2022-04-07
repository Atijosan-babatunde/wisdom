import cogoToast from 'cogo-toast';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HttpStatus } from '../../helpers/constants';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { updateMerchant } from '../../services/merchsnts';

export default function SocialAccount({ history }) {
    const [loading, setLoading] = useState(false);
    const [merchant, setMerchant] = useSessionStorage("merchant", {});

    function submit(e) {
        e.preventDefault();
        setLoading(true)
		const payload = Object.fromEntries(new FormData(e.target));
		console.log(payload)
		updateMerchant(payload).then((re) => {
			if (re.status === HttpStatus.OK) {
				// update merchant
				// remove verification banner if verified
				setMerchant(re.payload.merchant)
                history.push("/dashboard/")
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
                                <h4 className="mb-1 fw-bold">One more thing...</h4>
                                <span>Please add at least one social media handle</span>
                            </div>

                            <div className="col mb-3">
                                <div className="input-group">
                                    <span className="input-group-text input-group-text-0 fs-22"><i className="fa-brands fa-facebook-f fs-18 border-end-0"></i></span>
                                    <input type="text" placeholder="https://www.facebook.com/" defaultValue={merchant?.facebook} className="form-control form-control-0 ps-3 py-3 border-start-0" name="facebook" />
                                </div>
                            </div>

                            <div className="col mb-3">
                                <div className="input-group">
                                    <span className="input-group-text input-group-text-0 fs-22"><i className="fa-brands fa-twitter fs-18 border-end-0"></i></span>
                                    <input type="text" placeholder="https://www.twitter.com/" defaultValue={merchant?.twitter} className="form-control form-control-0 ps-3 py-3 border-start-0" name="twitter" />
                                </div>
                            </div>

                            <div className="col mb-3">
                                <div className="input-group">
                                    <span className="input-group-text input-group-text-0 fs-22"><i className="fa-brands fa-instagram fs-18 border-end-0"></i></span>
                                    <input type="text" placeholder="@brand_name" defaultValue={merchant?.instagramBusiness} className="form-control form-control-0 ps-3 py-3 border-start-0" name="instagram" />
                                </div>
                            </div>

                            <div className="col mb-5">
                                <div className="input-group">
                                    <span className="input-group-text input-group-text-0 fs-22"><i className="fa-brands fa-linkedin fs-18 border-end-0"></i></span>
                                    <input type="text" placeholder="https://www.linkedin.com/in/" defaultValue={merchant?.linkedin} className="form-control form-control-0 ps-3 py-3 border-start-0" name="linkedin" />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 text-end">
                                    <Link className="text-dark fw-600 ft-2 fs-14 me-5" to="/dashboard/">Do This Later</Link>

                                    <button type="submit" className="btn btn-theme py-3 px-5 rounded-12" disabled={loading}>{
                                        loading ?
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Finish"
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