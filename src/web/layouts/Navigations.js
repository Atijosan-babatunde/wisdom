import { NavLink } from 'react-router-dom';
import { logout } from '../../services/auth';

export const Header = () => {


	return (
		<div className="d-flex flex-column flex-shrink-0 bg-light w-100 ps-3 pt-5 side-bar bg-white">
			<div className="mb-5 ps-3">
				<img src="/img/logo.svg" alt="logo" width="100" />
			</div>

			<div>
				<p className="fs-12 text-muted text-uppercase fw-bold">My Account</p>
			</div>
			<ul className="nav nav-pills flex-column mb-3">
				<li className="nav-item pb-2">
					<NavLink activeClassName="active" to={"/dashboard/"} className="nav-link" aria-current="page">
						<i className="fa-regular fa-objects-column align-middle me-3"></i>
						<span className="align-middle fs-14">Home</span>
					</NavLink>
				</li>

				<li className="nav-item pb-2">
					<NavLink activeClassName="active" to={"/applications/"} className="nav-link" aria-current="page">
						<i className="fa-light fa-diagram-cells align-middle me-3"></i>
						<span className="align-middle fs-14">Client Applications</span>
					</NavLink>
				</li>

				<li className="nav-item pb-2">
					<NavLink activeClassName="active" to={"/customers/"} className="nav-link" aria-current="page">
						<i className="fa-light fa-user align-middle me-3"></i>
						<span className="align-middle fs-14">Ticketed Customers</span>
					</NavLink>
				</li>

				<li className="nav-item pb-3">
					<NavLink activeClassName="active" to={"/campaigns/"} className="nav-link" aria-current="page">
						<i className="fa-light fa-bullhorn align-middle me-3"></i>
						<span className="align-middle fs-14">Campaigns</span>
					</NavLink>
				</li>
			</ul>

			<div>
				<p className="fs-12 text-muted text-uppercase fw-bold">More</p>
			</div>

			<ul className="nav nav-pills flex-column mb-4">

				<li className="nav-item pb-2">
					<NavLink activeClassName="active" to={"/payouts/"} className="nav-link" aria-current="page">
						<i className="fa-regular fa-ellipsis align-middle me-3"></i>
						<span className="align-middle fs-14">Payouts</span>
					</NavLink>
				</li>

				<li className="nav-item pb-2">
					<NavLink activeClassName="active" to={"/account/"} className="nav-link" aria-current="page">
						<i className="fa-light fa-user-pen align-middle me-3"></i>
						<span className="align-middle fs-14">My Account</span>
					</NavLink>
				</li>

				<li className="nav-item pb-2">
					<NavLink activeClassName="active" to={"/faq/"} className="nav-link" aria-current="page">
						<i className="fa-light fa-circle-question align-middle me-3"></i>
						<span className="align-middle fs-14">FAQs</span>
					</NavLink>
				</li>
{/* 
				<li className="nav-item pb-3">
					<NavLink activeClassName="active" to={"/live-chat/"} className="nav-link" aria-current="page">
						<i className="fa-light fa-message align-middle me-3"></i>
						<span className="align-middle fs-14">Live Chat</span>
					</NavLink>
				</li> */}
			</ul>

			<ul className="nav nav-pills flex-column mb-3">

				<li className="nav-item pb-2">
					<button onClick={logout} className="nav-link" aria-current="page">
						<i className="fa-solid fa-arrow-right-from-bracket align-middle me-3"></i>
						<span className="align-middle fs-14">Logout</span>
					</button>
				</li>
			</ul>
		</div>
	)
}

