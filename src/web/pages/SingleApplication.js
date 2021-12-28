import cogoToast from "cogo-toast";
import { Fragment, useEffect } from "react"
import { humanReadableTime } from "../../helpers/date";
import { formatCurrency } from "../../helpers/util";
import { shareApplication } from "../../services/share";

export default function SingleApplication({ history, location }) {
    function closeModal() {
        history.goBack();
    }

    useEffect(() => {
        var myModal = new window.bootstrap.Modal(document.getElementById('staticBackdrop'), {
            keyboard: false
        });

        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new window.bootstrap.Tooltip(tooltipTriggerEl)
        })

        myModal.show()

        return (() => {
            myModal.hide();
        })
    }, [])

    const copyText = (text) => {
        navigator.clipboard.writeText(text) &&
            cogoToast.success("Copied", { position: "top-right", hideAfter: 3 })
    }

    const shareViaEMail = () => {
		shareApplication(location.state.data.applicationReference, "email").then(() => {
			cogoToast.success("Link shared via E-mail", { position: "top-right", hideAfter: 5 })
		}).catch(() => {
			cogoToast.error("Unable to share application", { position: 'top-right', hideAfter: 5 })
		})
	}

    return (
        <Fragment>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content rounded-12">
                        <div className="modal-header border-0">
                            <button type="button" className="btn-close fs-10 mt-2 me-3" data-bs-dismiss="modal" onClick={closeModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container px-lg-5 px-md-4 px-3">
                                <div className="row mb-5">
                                    <div className="col-lg-6 col-sm-12">
                                        <h5 className="fw-bolder fs-18 mb-1" id="staticBackdropLabel">Loan Details</h5>
                                        <p className="fs-12">Applied on {humanReadableTime(location?.state?.data?.createdAt).fulldate}</p>
                                    </div>
                                    {location.state.data.status === "PENDING" &&
                                        <div className="col-lg-6 col-sm-12 text-start text-lg-end">
                                            <span className="badge bg-custom-warning text-warning-theme fs-12 py-2 px-3 text-uppercase">Pending</span>
                                        </div>
                                    }

                                    {location.state.data.status === "APPROVED" &&
                                        <div className="col-lg-6 col-sm-12 text-end">
                                            <span className="badge bg-custom-teal-2 text-teal-2 fs-12 py-2 px-3 text-uppercase">Approved</span>
                                        </div>
                                    }

                                    {location.state.data.status === "REJECTED" &&
                                        <div className="col-lg-6 col-sm-12 text-end">
                                            <span className="badge bg-danger fs-12 py-2 px-3 text-uppercase">Rejected</span>
                                        </div>
                                    }
                                </div>

                                <div className="row">
                                    <div className="col-lg-4 col-6 mb-4">
                                        <p className="fs-12 mb-1 fw-bolder text-uppercase">Customer name</p>
                                        <p className="fs-14">{location.state.data.customer.user.firstName} {location.state.data.customer.user.lastName}</p>
                                    </div>
                                    <div className="col-lg-4 col-6 mb-4">
                                        <p className="fs-12 mb-1 fw-bolder text-uppercase">Customer email</p>
                                        <p className="fs-14">{location.state.data.customer.user.email}</p>
                                    </div>
                                    <div className="col-lg-4 col-6 mb-4">
                                        <p className="fs-12 mb-1 fw-bolder text-uppercase">Repayment Amount</p>
                                        <p>-</p>
                                    </div>
                                    <div className="col-lg-4 col-6 mb-4">
                                        <p className="fs-12 mb-1 fw-bolder text-uppercase">Trip Type</p>
                                        <p className="fs-14">{location.state.data.applicationType.name}</p>
                                    </div>
                                    <div className="col-lg-4 col-6 mb-4">
                                        <p className="fs-12 mb-1 fw-bolder text-uppercase">Amount Borrowed</p>
                                        <p className="fs-14">NGN {formatCurrency(location.state.data.amount)}</p>
                                    </div>
                                    <div className="col-lg-4 col-6 mb-4">
                                        <p className="fs-12 mb-1 fw-bolder text-uppercase">Share Via</p>
                                        <div className="d-flex justify-content-between">
                                            <button className="btn btn-transaprent p-0" onClick={() => copyText(`https://js.goflex.ng/application/${location.state.data.applicationReference}`)} type="button" data-bs-toggle="tooltip" data-bs-placement="top" title="Copy link to clipboard">
                                                <i className="iconly-Paper icli fs-22 border-end-0"></i>
                                            </button>
                                            <button className="btn btn-transaprent p-0" onClick={shareViaEMail} type="button" data-bs-toggle="tooltip" data-bs-placement="top" title="Share via E-Mail">
                                                <i className="iconly-Message icli fs-22 border-end-0"></i>
                                            </button>
                                            <button className="btn btn-transaprent p-0" type="button" data-bs-toggle="tooltip" data-bs-placement="top" title="Share via SMS">
                                                <i className="iconly-Chat icli fs-22 border-end-0"></i>
                                            </button>
                                            <button className="btn btn-transaprent p-0 align-middle" type="button" data-bs-toggle="tooltip" data-bs-placement="top" title="Share via Whatsapp">
                                                <i className="fa-brands fs-22 fa-whatsapp"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}