import React from 'react';
import { BaseContainer } from '../layouts/Containers';

const Faq = () => {
	return (
		<BaseContainer>
			<div className="container mt-5">
				<div className="row">
					<div className="col-xl-12 col-md-12 ps-md-5">
						<div className="row mb-3">
							<h1 className="page-header mb-2 mt-3 fw-bolder">FAQ</h1>
							<p>Frequently Asked Questions</p>
						</div>

						<div className="row">
							<div className="card bg-white border-0 shadow-sm">
								<div className="card-body">
									<div className="row pt-5">
										<div className="col-md-6">
											<div className="accordion" id="sectionOne">

												<div className="accordion-item bg-transparent border-0 mb-3">
													<h2 className="accordion-header" id="headingOne">
														<button className="accordion-button border-1 border-custom shadow-none rounded-12 fw-bold fs-14" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
															Accordion Item #1
														</button>
													</h2>
													<div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#sectionOne">
														<div className="accordion-body">
															<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
														</div>
													</div>
												</div>

												<div className="accordion-item bg-transparent border-0 mb-4">
													<h2 className="accordion-header" id="headingTwo">
														<button className="accordion-button collapsed border-1 border-custom shadow-none rounded-12 fw-bold fs-14" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
															Accordion Item #1
														</button>
													</h2>
													<div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#sectionOne">
														<div className="accordion-body">
															<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
														</div>
													</div>
												</div>

												<div className="accordion-item bg-transparent border-0 mb-4">
													<h2 className="accordion-header" id="headingThree">
														<button className="accordion-button collapsed border-1 border-custom shadow-none rounded-12 fw-bold fs-14" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
															Accordion Item #1
														</button>
													</h2>
													<div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#sectionOne">
														<div className="accordion-body">
															<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
														</div>
													</div>
												</div>

												<div className="accordion-item bg-transparent border-0 mb-4">
													<h2 className="accordion-header" id="headingFour">
														<button className="accordion-button collapsed border-1 border-custom shadow-none rounded-12 fw-bold fs-14" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
															Accordion Item #1
														</button>
													</h2>
													<div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#sectionOne">
														<div className="accordion-body">
															<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
														</div>
													</div>
												</div>

												<div className="accordion-item bg-transparent border-0 mb-4">
													<h2 className="accordion-header" id="headingFive">
														<button className="accordion-button collapsed border-1 border-custom shadow-none rounded-12 fw-bold fs-14" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
															Accordion Item #1
														</button>
													</h2>
													<div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#sectionOne">
														<div className="accordion-body">
															<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
														</div>
													</div>
												</div>

												<div className="accordion-item bg-transparent border-0 mb-4">
													<h2 className="accordion-header" id="headingSix">
														<button className="accordion-button collapsed border-1 border-custom shadow-none rounded-12 fw-bold fs-14" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
															Accordion Item #1
														</button>
													</h2>
													<div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#sectionOne">
														<div className="accordion-body">
															<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
														</div>
													</div>
												</div>

											</div>
										</div>

										<div className="col-md-6">
											<div className="accordion" id="sectionTwo">

												<div className="accordion-item bg-transparent border-0 mb-3">
													<h2 className="accordion-header" id="headingA">
														<button className="accordion-button collapsed border-1 border-custom shadow-none rounded-12 fw-bold fs-14" type="button" data-bs-toggle="collapse" data-bs-target="#collapseA" aria-expanded="false" aria-controls="collapseA">
															Accordion Item #1
														</button>
													</h2>
													<div id="collapseA" className="accordion-collapse collapse" aria-labelledby="headingA" data-bs-parent="#sectionTwo">
														<div className="accordion-body">
															<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
														</div>
													</div>
												</div>

												<div className="accordion-item bg-transparent border-0 mb-4">
													<h2 className="accordion-header" id="headingB">
														<button className="accordion-button collapsed border-1 border-custom shadow-none rounded-12 fw-bold fs-14" type="button" data-bs-toggle="collapse" data-bs-target="#collapseB" aria-expanded="false" aria-controls="collapseB">
															Accordion Item #1
														</button>
													</h2>
													<div id="collapseB" className="accordion-collapse collapse" aria-labelledby="headingB" data-bs-parent="#sectionTwo">
														<div className="accordion-body">
															<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
														</div>
													</div>
												</div>

												<div className="accordion-item bg-transparent border-0 mb-4">
													<h2 className="accordion-header" id="headingC">
														<button className="accordion-button collapsed border-1 border-custom shadow-none rounded-12 fw-bold fs-14" type="button" data-bs-toggle="collapse" data-bs-target="#collapseC" aria-expanded="false" aria-controls="collapseC">
															Accordion Item #1
														</button>
													</h2>
													<div id="collapseC" className="accordion-collapse collapse" aria-labelledby="headingC" data-bs-parent="#sectionTwo">
														<div className="accordion-body">
															<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
														</div>
													</div>
												</div>

												<div className="accordion-item bg-transparent border-0 mb-4">
													<h2 className="accordion-header" id="headingD">
														<button className="accordion-button collapsed border-1 border-custom shadow-none rounded-12 fw-bold fs-14" type="button" data-bs-toggle="collapse" data-bs-target="#collapseD" aria-expanded="false" aria-controls="collapseD">
															Accordion Item #1
														</button>
													</h2>
													<div id="collapseD" className="accordion-collapse collapse" aria-labelledby="headingD" data-bs-parent="#sectionTwo">
														<div className="accordion-body">
															<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
														</div>
													</div>
												</div>

												<div className="accordion-item bg-transparent border-0 mb-4">
													<h2 className="accordion-header" id="headingE">
														<button className="accordion-button collapsed border-1 border-custom shadow-none rounded-12 fw-bold fs-14" type="button" data-bs-toggle="collapse" data-bs-target="#collapseE" aria-expanded="false" aria-controls="collapseE">
															Accordion Item #1
														</button>
													</h2>
													<div id="collapseE" className="accordion-collapse collapse" aria-labelledby="headingE" data-bs-parent="#sectionTwo">
														<div className="accordion-body">
															<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
														</div>
													</div>
												</div>

												<div className="accordion-item bg-transparent border-0 mb-4">
													<h2 className="accordion-header" id="headingF">
														<button className="accordion-button collapsed border-1 border-custom shadow-none rounded-12 fw-bold fs-14" type="button" data-bs-toggle="collapse" data-bs-target="#collapseF" aria-expanded="false" aria-controls="collapseF">
															Accordion Item #1
														</button>
													</h2>
													<div id="collapseF" className="accordion-collapse collapse" aria-labelledby="headingF" data-bs-parent="#sectionTwo">
														<div className="accordion-body">
															<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
														</div>
													</div>
												</div>

											</div>
										</div>
									</div>
								</div>
							</div>
						</div>



					</div>
				</div>
			</div>

		</BaseContainer>
	)
}

export default Faq