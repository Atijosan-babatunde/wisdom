import React from 'react';
import { Link } from 'react-router-dom';
import GTable, { ApplicationsClass } from '../component/GTable';
import { BaseContainer } from '../layouts/Containers';

const Client = ({ history }) => {

    return (
        <BaseContainer>
            <div className="container">

                <div className="row">
                    <div className="bg-white min-vh-100 max-vh-100 p-5">
                        <div className="container">
                            <div className="text-center mt-4">
                                <img className="mx-auto mb-5" src="/img/Q2BAOd2 1.svg" alt="" />
                                <p className="fw-600 fs-22 ft-1 mb-3">Coming Soon</p>
                                <p className="fs-14 ft-2">We are working on something awesome for you. Stay Tuned</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </BaseContainer>
    )
}

export default Client