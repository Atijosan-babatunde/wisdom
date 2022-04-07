import { Fragment, useEffect, useState } from "react";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import { resendOTP } from "../../services/auth";

export default function VerifyPhone({ history }) {
    const [loading, setLoading] = useState(false);
    const [user] = useSessionStorage("user", {});

    function closeModal() {
        history.goBack();
    }

    useEffect(() => {
        var myModal = new window.bootstrap.Modal(document.getElementById('staticBackdrop'), {
            keyboard: false
        });
        if (user && typeof user === "object" && Object.keys(user).length > 0 && !user?.isPhoneVerified) {
            myModal.show()
            setLoading(true)
            resendOTP().then(() => {

            }).catch(() => {

            }).finally(() => {
                setLoading(false)
            })
        } else {
            closeModal();
        }

        return (() => {
            myModal.hide();
        })
    }, [])

    useEffect(() => {

        // Check if is verified from 
    }, [])

    return (
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content rounded-12">
                    <div className="modal-header border-0">
                        <button type="button" className="btn-close fs-10 mt-2 me-3" data-bs-dismiss="modal" onClick={closeModal} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <div className="row mb-4 pass gap-1">
                                <input className="take col-2 text-center" type="text" maxLength="1" />
                                <input className="take col-2 text-center" type="text" maxLength="1" />
                                <input className="take col-2 text-center" type="text" maxLength="1" />
                                <input className="take col-2 text-center" type="text" maxLength="1" />
                                <input className="take col-2 text-center" type="text" maxLength="1" />
                                <input className="take col-2 text-center" type="text" maxLength="1" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}