import { Fragment } from "react"

export default function FormWizard({ children, step }) {
	return (
		<div className="row">

			<div className="col-xl-3 col-lg-4 col-md-12 d-flex d-lg-block justify-content-between">
				{children && children.length && children.length > 1 && children.map((v, i) => {
					return (
						<Fragment>
							<div key={i} className={`d-md-block d-lg-flex align-items-center text-center text-md-start mb-4${i === step ? " step-active" : ""}`}>
								{
									i < step
										? <div className="nav-no mx-auto mx-lg-0 has-icon"><i className="fa fa-check text-white"></i></div>
										: <div className="nav-no mx-auto mx-lg-0">{i + 1}</div>
								}

								<div className="nav-text ms-md-3 ms-0 fs-14">{v?.props?.title}</div>
							</div>
							{(i + 1) < children.length && <div className="hr mb-4 d-none d-lg-block"></div>}
						</Fragment>
					)
				})}
			</div>

			<div className="col-xl-9 col-lg-8 col-md-12">
				<div className="row">
					{children[step]}

				</div>
			</div>
		</div>
	)
}