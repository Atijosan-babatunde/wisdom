import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
export default function SocialAccount({ history }) {
    const maxDate = new Date();
    const [loading, setLoading] = useState(false);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {

    }, []);

    function submit(e) {
        e.preventDefault();

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
                                    <input type="text" placeholder="https://wwww.facebook.com/" className="form-control form-control-0 ps-3 py-3 border-start-0" name="facebook" />
                                </div>
                            </div>

                            <div className="col mb-3">
                                <div className="input-group">
                                    <span className="input-group-text input-group-text-0 fs-22"><i className="fa-brands fa-twitter fs-18 border-end-0"></i></span>
                                    <input type="text" placeholder="https://wwww.twitter.com/" className="form-control form-control-0 ps-3 py-3 border-start-0" name="twitter" />
                                </div>
                            </div>

                            <div className="col mb-5">
                                <div className="input-group">
                                    <span className="input-group-text input-group-text-0 fs-22"><i className="fa-brands fa-linkedin fs-18 border-end-0"></i></span>
                                    <input type="text" placeholder="https://wwww.linkedin.com/in/" className="form-control form-control-0 ps-3 py-3 border-start-0" name="linkedin" />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 text-end">
                                    <Link className="text-dark fw-600 ft-2 fs-14 me-5" to="/dashboard/">Do This Later</Link>

                                    <button type="submit" className="btn btn-theme py-3 px-5 rounded-12" disabled={loading}>{
                                        loading ?
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Submit"
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