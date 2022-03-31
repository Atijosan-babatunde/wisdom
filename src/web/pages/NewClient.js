import React, { Fragment, useEffect, useRef, useState } from 'react';
// import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { BaseContainer } from '../layouts/Containers';
import { createApplication } from '../../services/loans';
import cogoToast from 'cogo-toast';
import { shareApplication } from '../../services/share';
import { getAvailableAirports } from '../../services/application';
import { HttpStatus } from '../../helpers/constants';
import FormWizard from '../component/FormWizard';
import { Province } from '../../helpers/util';

function ShareApplication({ reference }) {
	const linkRef = useRef(null);

	const copyText = () => {
		(linkRef && linkRef.current) &&
			(
				navigator.clipboard.writeText(linkRef.current.value) &&
				cogoToast.success("Copied", { position: "top-right", hideAfter: 3 })
			)
	}

	const shareViaEMail = () => {
		shareApplication(reference, "email").then(() => {
			cogoToast.success("Link shared via E-mail", { position: "top-right", hideAfter: 5 })
		}).catch(() => {
			cogoToast.error("Unable to share application", { position: 'top-right', hideAfter: 5 })
		})
	}

	const shareViaSMS = () => {
		shareApplication(reference, "sms").then(() => {
			cogoToast.success("Link shared via SMS", { position: "top-right", hideAfter: 5 })
		}).catch(() => {
			cogoToast.error("Unable to share application", { position: 'top-right', hideAfter: 5 })
		})
	}

	// const shareViaWhatsapp = () => {
	// 	shareApplication(reference, "whatsapp").then(() => {
	// 		cogoToast.success("Link shared via Whatsapp", { position: "top-right", hideAfter: 5 })
	// 	}).catch(() => {
	// 		cogoToast.error("Unable to share application", { position: 'top-right', hideAfter: 5 })
	// 	})
	// }

	return (
		<section className="px-5">
			<p className="fs-14 fw-bold mb-4">Share the link below to your customer to complete their application</p>
			<div className="col mb-4">
				<label htmlFor="inputAddress" className="form-label fw-bold">APPLICATION LINK</label>
				<input type="text" ref={linkRef} className="form-control form-control-0 ps-3 py-3 bg-white" id="inputAddress" defaultValue={`https://js.goflex.ng/application/${reference}`} placeholder="Enter Address" readOnly />
				<div className="d-flex flex-column-reverse align-items-end mt-2">
					<button className="form-text bg-transparent border-0 text-teal fw-bold" onClick={copyText} type="button">COPY</button>
				</div>
			</div>
			<div className="row mb-5">
				<p className="fs-14 fw-bold mb-3">SHARE LINK VIA</p>
				<div className="col-12 mb-4">
					<button onClick={shareViaEMail} className="bg-transparent border-0" type="button">
						<i className="iconly-Message icli fs-22 align-middle me-3"></i>
						<span className="align-middle">Email</span>
					</button>
				</div>
				<div className="col-12 mb-4">
					<button onClick={shareViaSMS} className="bg-transparent border-0" type="button">
						<i className="iconly-Call icli fs-22 align-middle me-3"></i>
						<span className="align-middle">SMS</span>
					</button>
				</div>
				<div className="col-12">
					<a href="whatsapp://send?text=The text to share!" data-action="share/whatsapp/share" className="bg-transparent text-dark border-0 text-decoration-none" type="button">
						<i className="fa-brands fa-whatsapp fs-22 align-middle me-3"></i>
						<span className="align-middle">Whatsapp</span>
					</a>
				</div>
			</div>
		</section>
	)
}

function CustomerInformation({ onPrevious, onSubmit, loading }) {
	const [countryCode, setCountryCode] = useState("234");

	function submit(e) {
		e.preventDefault();
		const entries = Object.fromEntries(new FormData(e.target))
		entries['countryCode'] = countryCode;
		onSubmit({ customer: entries });
	}

	function updateDropdown(e) {
		document.querySelector("#country_code").innerHTML = e.target.innerHTML;
		setCountryCode(e.target.dataset.value)
		console.log(e.target.dataset)
	}

	useEffect(() => {
		const selector = document.querySelectorAll(".dropdown-menu li.dropdown-item");
		selector.forEach((el) => {
			el.addEventListener('click', updateDropdown);
		})

		return (() => {
			selector.forEach((el) => {
				el.removeEventListener('click', updateDropdown);
			})
		})
	}, [])

	return (
		<form onSubmit={submit}>
			<div className="row mb-4">
				<div className="col-md-6">
					<label htmlFor="inputfirstName" className="form-label">FIRST NAME</label>
					<input type="text" name="firstName" className="form-control form-control-0 ps-3 py-3" placeholder="Enter First Name" required />
				</div>
				<div className="col-md-6">
					<label htmlFor="inputLastName" className="form-label">LAST NAME</label>
					<input type="text" name="lastName" className="form-control form-control-0 ps-3 py-3" placeholder="Enter Last Name" required />
				</div>
			</div>
			<div className="col mb-4">
				<label htmlFor="inputAddress" className="form-label">ADDRESS</label>
				<input type="text" name="address" className="form-control form-control-0 ps-3 py-3" id="inputAddress" placeholder="Enter Address" required />
			</div>
			<div className="row mb-4">
				<div className="col-md-6">
					<label htmlFor="inputCountry" className="form-label">COUNTRY</label>
					<select name="country" defaultValue="" className="form-select form-select-0 ps-3 py-3 text-light text-dark" required>
						<option value="" disabled>Select Country</option>
						<option>Nigeria</option>
					</select>
				</div>
				<div className="col-md-6">
					<label htmlFor="inputCountry" className="form-label">STATE</label>
					<select name="city" defaultValue="" className="form-select form-select-0 ps-3 py-3 text-light text-dark" required>
						<option value="" disabled>Select State</option>
						{Province.getStates().name.map((v) => {
							return <option key={v}>{v}</option>
						})}
					</select>
				</div>
			</div>
			<div className="row">
				<div className="col-md-6">
					<label htmlFor="inputEmail" className="form-label">CUSTOMER EMAIL</label>
					<input name="email" type="text" className="form-control form-control-0 ps-3 py-3" id="inputEmail" placeholder="Enter Email Address" required />
				</div>

				{/* <div className="col-md-6">
					<label htmlFor="inputPhone" className="form-label">CUSTOMER PHONE NUMBER</label>
					<div className="input-group mb-3">
						<select name="countryCode" defaultValue="NG" className="form-select form-select-0 text-light text-dark">
							<option value="NG">+234</option>
						</select>
						<input name="phone" type="text" className="form-control form-control-0 ps-3 py-3" id="inputPhone" placeholder="+234 810 XXX XXXX" required />
					</div>
				</div> */}

				<div className="col-md-6">
					<label htmlFor="inputPhone" className="form-label">CUSTOMER PHONE NUMBER</label>
					<div className="input-group mb-3">
						<button className="btn border border-end-0 dropdown-toggle form-select-0 fs-14" id="country_code" type="button" data-bs-toggle="dropdown" aria-expanded="false"><span className="flag-icon flag-icon-ng"></span> &nbsp;+234</button>
						<ul className="dropdown-menu">
							<li data-value="234" className="dropdown-item fs-14"><span className="flag-icon flag-icon-ng"></span> &nbsp;+234</li>
							<li data-value="1" className="dropdown-item fs-14"><span className="flag-icon flag-icon-us"></span> &nbsp;+1</li>
							<li data-value="44" className="dropdown-item fs-14"><span className="flag-icon flag-icon-gb"></span> &nbsp;+44</li>
							<li data-value="1" className="dropdown-item fs-14"><span className="flag-icon flag-icon-ca"></span> &nbsp;+1</li>
						</ul>
						<input type="text" name="phone" className="form-control form-control-0 ps-3 py-3 border-start-0" placeholder="Enter your phone number" required />
					</div>
				</div>
			</div>
			<div className=" text-end mt-5 mb-5">
				<button type="button" onClick={onPrevious} className="btn btn-outline-custom-theme py-3 px-5 rounded-12 me-4" >
					Back
				</button>
				<button type="submit" className="btn btn-theme py-3 px-5 rounded-12" disabled={loading}>
					{
						loading ?
							<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Create"
					}
				</button>
			</div>
		</form>
	)
}

function TripDetails({ onNext }) {
	const dte = new Date();

	const [startDate, setStartDate] = useState(dte);
	const [endDate, setEndDate] = useState(dte);
	const [tripType, setTripType] = useState("round_trip");
	const [bookingType, setBookingType] = useState("flight");
	const [airports, setAirports] = useState([]);

	function compare( a, b ) {
		if ( a.name < b.name ){
		  return -1;
		}
		if ( a.name > b.name ){
		  return 1;
		}
		return 0;
	  }

	useEffect(() => {
		getAvailableAirports().then((res) => {
			if (res.status === HttpStatus.OK) {
				setAirports(res.payload.response);
			} else {
				// Show error modal or Empty States
			}
		}).catch(() => {
			// Show error modal or Empty States
		})
	}, [])

	function submit(e) {
		e.preventDefault();
		const dd = Object.fromEntries(new FormData(e.target));
		const { toIataCode, fromIataCode } = e.target;
		if (toIataCode) dd.to = toIataCode[toIataCode.selectedIndex].text;
		if (fromIataCode) dd.from = fromIataCode[fromIataCode.selectedIndex].text;
		onNext(dd)
	}

	function loadTypes(e) {
		const { value: booking_type } = e.target;
		setBookingType(booking_type);
	}

	function handleTripTypeChange(e) {
		const { value: trip_type } = e.target;
		setTripType(trip_type);
	}

	return (
		<form onSubmit={submit}>
			<div className="row mb-4">
				<div className="col-md-6">
					<label htmlFor="inputCountry" className="form-label fw-bold">BOOKING TYPE</label>
					<select onChange={loadTypes} name="bookingType" className="form-select form-select-0 ps-3 py-3 text-light text-dark" required>
						<option value="flight">Flight Ticket</option>
						<option value="hotel">Hotel Booking</option>
						<option value="package">Trip Package / Bundle</option>
					</select>
					{/* <Select
					 options={[
						{value: "Flight", label: "Flight"}
					]} /> */}
				</div>

				{bookingType === "hotel" && <div className="col-md-6">
					<label htmlFor="inputfirstName" className="form-label">HOTEL NAME</label>
					<input type="text" name="hotelName" className="form-control form-control-0 ps-3 py-3" placeholder="Enter name of hotel" required />
				</div>}

				{bookingType === "package" && <div className="col-md-6">
					<label htmlFor="inputfirstName" className="form-label">PACKAGE NAME</label>
					<input type="text" name="tripSponsor" className="form-control form-control-0 ps-3 py-3" placeholder="Enter name of package" required />
				</div>}

				{bookingType === "flight" && <div className="col-md-6">
					<label htmlFor="inputCountry" className="form-label fw-bold">TRIP TYPE</label>
					<select name="flightType" onChange={handleTripTypeChange} className="form-select form-select-0 ps-3 py-3 text-light text-dark" required>
						<option value="round_trip">Round Trip</option>
						<option value="one_way">One-Way Trip</option>
						<option value="multi_city">Multi-City</option>
					</select>
				</div>}
			</div>

			{bookingType === "flight" &&
				<div className="row mb-4">
					<div className="col-md-6">
						<label htmlFor="inputCountry" className="form-label fw-bold">FROM</label>
						<select name="fromIataCode" defaultValue="" className="select2 form-select form-select-0 ps-3 py-3 text-light text-dark" required>
							<option value="" disabled>Select City</option>
							{airports && airports.sort(compare).map((v) => {
								return <option key={v.icao_code} value={v.iata_code}>{v.name}</option>
							})}
						</select>
					</div>
					<div className="col-md-6">
						<label htmlFor="inputCountry" className="form-label fw-bold">TO</label>
						<select name="toIataCode" id="inputCity" className="form-select form-select-0 ps-3 py-3 text-light text-dark" required>
							<option>Select City</option>
							{airports && airports.sort(compare).map((v) => {
								return <option key={v.icao_code} value={v.iata_code}>{v.name}</option>
							})}
						</select>
					</div>
				</div>
			}

			<div className="row mb-4">
				{bookingType === "flight" &&
					<Fragment>
						<div className="col-md-6">
							<label htmlFor="inputCountry" className="form-label fw-bold">FLIGHT CLASS</label>
							<select name="flightClass" defaultValue="" className="select2 form-select form-select-0 ps-3 py-3 text-light text-dark" required>
								<option value="" disabled>Select Flight Class</option>
								<option value="Economy" >Economy</option>
								<option value="Premium Economy" >Premium Economy</option>
								<option value="Business" >Business</option>
								<option value="First Class" >First Class</option>
							</select>
						</div>
						<div className="col-md-6">
							<label htmlFor="inputCountry" className="form-label fw-bold">PASSENGERS</label>
							<input type="number" name="passengersCount" className="form-control form-control-0 ps-3 py-3" placeholder="How many passengers ?" required />
						</div>
					</Fragment>
				}

				{bookingType === "hotel" &&
					<Fragment>
						<div className="col-md-6">
							<label htmlFor="inputCountry" className="form-label fw-bold">STATE</label>
							<select name="state" defaultValue="" className="form-select form-select-0 ps-3 py-3 text-light text-dark" required>
								<option value="" disabled>Select State</option>
								{Province.getStates().name.map((v) => {
									return <option key={v}>{v}</option>
								})}
							</select>
						</div>
						<div className="col-md-6">
							<label htmlFor="inputCountry" className="form-label fw-bold">CITY</label>
							<input name="hotelCity" type="text" className="form-control form-control-0 ps-3 py-3" placeholder="Enter city" required />
							{/* <select name="hotelCity" id="inputCity" className="form-select form-select-0 ps-3 py-3 text-light text-dark" required>
								<option>Select City</option>
								<option>Abuja</option>
							</select> */}
						</div>
					</Fragment>
				}


				{bookingType === "package" &&
					<Fragment>
						<div className="col-md-12 mb-4">
							<label htmlFor="inputCountry" className="form-label fw-bold">PACKAGE DESCRIPTION</label>
							<textarea rows="3" name="description" type="text" className="resize-none form-control form-control-0 ps-3 py-3" placeholder="Tell use more about the package" required></textarea>
						</div>
						<div className="col-md-12">
							<label htmlFor="inputCountry" className="form-label fw-bold">DESTINATION</label>
							<input name="destinations" type="text" className="form-control form-control-0 ps-3 py-3 mb-1" placeholder="Enter destination" required />
							<div className="text-end">
								<button className="btn btn-transparent text-theme ft-2 fs-12 fw-600">
									<i className="fa-solid fa-plus"></i>
									<span>&nbsp;Add Destination</span>
								</button>
							</div>
						</div>
					</Fragment>
				}
			</div>
			<div className="row mb-4">

				{bookingType === "flight" &&
					<Fragment>
						<div className="col-md-6">
							<label htmlFor="inputfirstName" className="form-label">DEPARTURE DATE</label>
							<DatePicker dateFormat="dd/MM/yyyy" name="departureDate" className="form-control form-control-0 ps-3 py-3" minDate={startDate} selected={startDate} startDate={startDate} endDate={endDate} onChange={(date) => setStartDate(date)} />

						</div>
						{tripType === "round_trip" &&
							<div className="col-md-6 mb-4">
								<label htmlFor="inputLastName" className="form-label">RETURN DATE</label>
								<DatePicker dateFormat="dd/MM/yyyy" name="returnDate" className="form-control form-control-0 ps-3 py-3" startDate={startDate} endDate={endDate} minDate={startDate} selected={endDate} onChange={(date) => setEndDate(date)} />
							</div>}
					</Fragment>
				}

				{bookingType === "hotel" &&
					<Fragment>
						<div className="col-md-6">
							<label htmlFor="inputfirstName" className="form-label">HOTEL ADDRESS</label>
							<input name="hotelLocation" type="text" className="form-control form-control-0 ps-3 py-3" placeholder="Hotel Address" required />

						</div>
						<div className="col-md-6 mb-4">
							<label htmlFor="inputPhone" className="form-label">DURATION OF STAY</label>

							{/* <select name="durationType" defaultValue="NG" className="form-select form-select-0 text-light text-dark">
									<option value="days">Days</option>
									<option value="weeks">Weeks</option>
									<option value="months">Months</option>
								</select> */}
							<div className="input-group mb-3">

								<input name="duration" type="text" className="form-control form-control-0 ps-3 py-3 border-end-0" id="inputPhone" placeholder="Enter a number" required />

								<button className="btn border border-start-0 dropdown-toggle form-select-0 fs-14" id="durationType" type="button" data-bs-toggle="dropdown" aria-expanded="false">Days </button>
								<ul className="dropdown-menu">
									<li data-value="days" className="dropdown-item fs-14">Days </li>
									<li data-value="weeks" className="dropdown-item fs-14">Weeks</li>
									<li data-value="months" className="dropdown-item fs-14">Months</li>
								</ul>
								{/* <input type="text" name="phone" className="form-control form-control-0 ps-3 py-3 border-start-0" placeholder="Enter your phone number" required /> */}
							</div>
						</div>
					</Fragment>}

				<div className="col-md-6 mb-4">
					<label htmlFor="inputfirstName" className="form-label">COST OF TRIP</label>
					<input name="amount" type="text" className="form-control form-control-0 ps-3 py-3" placeholder="Amount" required />
				</div>

				{bookingType === "package" &&
					<div className="col-md-6 mb-4">
						<label htmlFor="inputPhone" className="form-label">DURATION OF STAY</label>
						<div className="input-group mb-3">
							<input name="duration" type="text" className="form-control form-control-0 ps-3 py-3" id="inputPhone" placeholder="Enter a number" required />
							<select name="durationType" defaultValue="NG" className="form-select form-select-0 text-light text-dark">
								<option value="days">Days</option>
								<option value="weeks">Weeks</option>
								<option value="months">Months</option>
							</select>
						</div>
					</div>
				}
				<div className={`col-md-6${(tripType === "round_trip" && bookingType !== "package") && " text-end"}`}>
					<button className="btn btn-theme py-3 px-5 rounded-12" >
						Continue
					</button>
				</div>
			</div>
		</form>
	)
}

const NewClient = (
) => {
	const [currentStep, setCurrentStep] = useState(0);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({});
	const [reference, setReference] = useState(null);

	const next = (data = {}) => {
		if (data) Object.assign(formData, data);
		console.log(formData)
		setFormData(formData);
		setCurrentStep(currentStep + 1);
	}

	const previous = () => {
		setCurrentStep(currentStep - 1);
	}

	const submit = (data = {}) => {
		if (data) Object.assign(formData, data);
		setFormData(formData)
		setLoading(true)
		createApplication(formData).then((re) => {
			if (re.status === "OK") {
				// cogoToast.success(re.message, { position: 'top-right', hideAfter: 5 })
				setReference(re.payload.reference);
				var myModal = new window.bootstrap.Modal(document.getElementById('successModal'), {
					keyboard: false
				});


				myModal.show();
				next();
			} else if (re.status === "CONFLICT") {
				cogoToast.error("Phone number already associated with another account", { position: 'top-right', hideAfter: 5 })
			}
		}).catch((e) => {
			console.log(e)
			cogoToast.error("failed", { position: "top-right", hideAfter: 5 });
		}).finally(() => {
			setLoading(false);
		})
	}

	return (
		<BaseContainer>
			<div className="container mt-5">
				<div className="row">
					<div className="col-xl-12 col-md-12 bg-white ps-md-5 pt-5 rounded">
						<div className="row mb-5">
							<h4 className="mb-1 fw-bolder">New Client Application</h4>
							<p className="fs-14">Quickly create a new GoFlex Application for your customers</p>
						</div>

						<FormWizard step={currentStep}>
							<TripDetails title="Trip Details" onNext={next} />

							<CustomerInformation onSubmit={submit} loading={loading} onNext={next} onPrevious={previous} title="Customer Information" />

							<ShareApplication reference={reference} onNext={next} onPrevious={previous} title="Share Application Link" />
						</FormWizard>
					</div>
				</div>
			</div>

			<div className="modal fade" id="successModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered" style={{ width: 500 }}>
					<div className="modal-content rounded-12">
						<div className="modal-header border-0">
							<button type="button" className="btn-close fs-10 mt-2 me-3" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body pt-0">
							<div className="container px-lg-5 px-md-4 px-3">
								<div className="text-center">
									<img src="https://media0.giphy.com/media/ehz3LfVj7NvpY8jYUY/giphy.gif" height="200" width="200" alt="completed" />
									<p className="fs-22 fw-600 ft-2 mb-2">Great Job!</p>
									<p className="fs-14 ft-2 mb-3">You've successfully created your client application.</p>
									{/* Copy to clipboard on click */}
									<button className="btn border border-1 rounded-pill py-3 px-4 mb-3">
										<span className="align-middle me-1"><i className="iconly-Lock icbo fs-22 text-teal"></i></span>
										<span className="text-teal ft-2 fs-14 fw-600">https://</span>
										<span className="ft-2 fs-14">js.goflex.ng/application/{reference}/</span>
									</button>
									<p className="fs-12 ft-2"><abbr title="What next ?">What next ?</abbr> Share this application with the client</p>
									<button data-bs-dismiss="modal" className="btn btn-transaparent fs-14 text-theme fw-600 ft-2">Continue</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</BaseContainer >
	)
}

export default NewClient