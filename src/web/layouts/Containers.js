import React from 'react';
import * as Nav from './Navigations';
import { Link } from 'react-router-dom';

export const BaseContainer = ({ children, loading, error }) => {

    // useEffect(() => {
    //     var ele =  document.getElementById("nav-icon3");
    //     ele.addEventListener('click', function(){
    //         console.log(this)
    //          this.classList.toggle("open")
    //      });

    //      return (() => {
    //          ele.removeEventListener('click')
    //      })
    // })

    function toggleMenu() {
        var ele = document.getElementById("nav-icon3");
        ele.classList.toggle("open")
    }


    return (loading
        ? <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
        : error
            ? <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            : <div className="container-fluid ps-0">
                <div className="row vh-100">
                    <div className="col-md-4 col-lg-3 col-xl-2 d-none d-md-flex d-flex pe-0"><Nav.Header /></div>
                    <div className="col-md-8 col-lg-9 col-xl-10 col-12 px-0">
                        <nav className="navbar navbar-expand-md navbar-light bg-white">
                            <div className="container-fluid flex-md-row-reverse">

                                <button type="button" onClick={toggleMenu} className="navbar-toggler border-0">
                                    {/* <span className="navbar-toggler-icon"></span> */}
                                    <div id="nav-icon3">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </button>
                                <Link to={"/dashboard/"} className="navbar-brand d-md-none">
                                    <img src="/img/logo.svg" height="28" alt="logo" />
                                </Link>
                                <div>
                                    <div className="navbar-nav ms-auto">
                                        <Link to="/account/" className="nav-item nav-link">
                                            <img src="/img/account.svg" alt="account" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </nav>
                        {children}
                    </div>
                </div>
            </div>
    )
}