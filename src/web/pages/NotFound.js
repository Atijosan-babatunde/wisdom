import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="bg-white min-vh-100 max-vh-100 p-5">
            <div className="container">
                <div className="text-center">
                    <div className="mb-3">
                        <img src="/img/logo.svg" alt="logo" width="100" />
                    </div>

                    <p className="fw-600 fs-22 ft-1">Something isn't right</p>
                    <p className="ft-1 fw-600" style={{ fontSize: 330, color: '#E8E8E8', lineHeight: 1 }}>404</p>
                    <img className="fixed-middle" src="/img/Q2BAOd2 1.svg" alt="" />
                    <div style={{ height: 115 }}>&nbsp;</div>
                    <p className="fs-14 ft-2">The page you are looking for is missing or might have been deleted</p>
                    <Link to="/dashboard/" className="btn btn-theme py-3 px-4 fw-600 fs-12 ft-2 rounded-12">Go Back Home</Link>
                </div>
            </div>
        </div>
    )
}