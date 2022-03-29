import cogoToast from "cogo-toast";
import React, { useState } from "react";
import { HttpStatus } from "../../helpers/constants";
import { resetPassword } from '../../services/auth';
import { useParams } from 'react-router-dom'

export default function ResetPassword({ history }) {
    // TODO: Show message that says please login to continue if page is redirected
    const { token } = useParams();
    const [loading, setLoading] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false);
    const [conPasswordShown, setConPasswordShown] = useState(false);

    const [passwordResetData, setPasswordResetData] = useState({
        token,
        password: "",
        conPassword: ""
    });


    const handleChange = ({ target: { name, value } }) => {
        setPasswordResetData({ ...passwordResetData, [name]: value });
    };

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const toggleConPasswordVisiblity = () => {
        setConPasswordShown(conPasswordShown ? false : true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        resetPassword(passwordResetData).then((re) => {
            if (re.status === HttpStatus.OK) {
                cogoToast.success(`${re.message}. You will be redirected shortly`, { position: 'top-right', hideAfter: 5 })
                setTimeout(() => {
                    history.push("/");
                }, 5000)
            }
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
                                <h3 className="mb-1">Set A New Password</h3>
                                <span>Set a new password below</span>
                            </div>

                            <div className="col mb-4">
                                <div className="input-group">
                                    <span className="input-group-text input-group-text-0 border-end-0"><i className="iconly-Lock icli fs-22"></i></span>
                                    <input type={passwordShown ? "text" : "password"} required placeholder="Password" className="form-control form-control-0 py-3 ps-3 border-start-0 border-end-0" name="password" value={passwordResetData.password} onChange={handleChange} />
                                    <button type="button" onClick={togglePasswordVisiblity} className="input-group-text input-group-text-0 border-start-0 fs-12">
                                        {passwordShown ? "HIDE" : "SHOW"}
                                    </button>
                                </div>
                            </div>

                            <div className="col mb-4">
                                <div className="input-group">
                                    <span className="input-group-text input-group-text-0 border-end-0"><i className="iconly-Lock icli fs-22"></i></span>
                                    <input type={conPasswordShown ? "text" : "password"} required placeholder="Confirm Password" className="form-control form-control-0 py-3 ps-3 border-start-0 border-end-0" name="conPassword" value={passwordResetData.conPassword} onChange={handleChange} />
                                    <button type="button" onClick={toggleConPasswordVisiblity} className="input-group-text input-group-text-0 border-start-0 fs-12">
                                        {conPasswordShown ? "HIDE" : "SHOW"}
                                    </button>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 text-end">
                                    <button type="submit" className="btn btn-theme py-3 px-5 rounded-12 ft-2 fs-14 fw-600" disabled={loading}>
                                        {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Set Password"}
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