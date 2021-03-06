import React, { useEffect, useRef, useState } from 'react';
import { BaseContainer } from '../layouts/Containers';
import { getApplications } from '../../services/application';
import GTable, { ApplicationsClass } from '../component/GTable';

const Ticketed = ({ history }) => {
	const searchRef = useRef(null);
	const [applications, setApplications] = useState([]);
	useEffect(() => {
		getApplications().then(e => {
			console.log(e);
			setApplications(e.payload);
		}).catch((ex) => {
			console.log(ex);
		})
	}, [])

	return (
		<BaseContainer>
			<div className="container mt-5">
				<div className="row">
					<div className="col-xl-12 col-md-12 ps-md-5">
						<div className="row mb-3">
							<div className="col-md-12">
								<h1 className="page-header mb-2 mt-3 fw-bolder">Ticketed Customers</h1>
								<p>Here's a quick overview of what is going on</p>
							</div>
						</div>

						<div className="row">
							<div className="card bg-white border-0 shadow-sm">
								<div className="card-header bg-transparent mb-2 mt-3">
									<div className="row align-middle">

										<div className="input-group">
											<span className="input-group-text input-group-text-0 rounded-start">
												<i className="iconly-Search icli fs-22 border-end-0"></i>
											</span>
											<input ref={searchRef} type="text" placeholder="Search..." className="form-control form-control-0 rounded-end ps-3 py-2 border-start-0" id="tbSearch" />
										</div>
									</div>
								</div>
								<div className="card-body">
									<GTable data={applications && applications.filter((v) => v.status !== "PENDING")} searchEl={searchRef} class={ApplicationsClass} history={history} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</BaseContainer>
	)
}

export default Ticketed