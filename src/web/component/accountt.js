import React from 'react';
import { BaseContainer } from '../../web/layouts/Containers';
import { Link } from 'react-router-dom';

export function FourthPage() {
  const user = JSON.parse(window && window.localStorage && window.localStorage.getItem("user"));

  return (
    <BaseContainer>
      <div className="top">

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="header">
                <div className="nav">
                  <div className="user text-end">
                    <div className="mobilenav">
                      <img src="img/bars-solid.svg" id="hamburger" alt="" className="bar" />
                      <Link to="/" className="ogo">
                        <img src="img/Logotype.png" alt="" className="" />
                      </Link>
                    </div>

                    <img src="img/image2.png" alt="" className="noti" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container ">
          <div className="row ">
            <div className="mainTop">
              <div className="ticket">
                <h1>My Account</h1>

              </div>

            </div>
            <div
              className="col-md-12 ro"
              style={{ width: '92%', margin: 'auto', padding: '2em' }}
            >
              <div className="container roland">
                <div className="row">
                  <div className="" >
                    <div className="tab-pane mt-3 ms-2 " id="pills-verification" role="tabpanel"
                      aria-labelledby="pills-verification-tab">
                      <div className=" bg-white border-bottom  p-4">
                        <ul className="nav nav-pills nav-fill mb-5" id="pills-tab" role="tablist">
                          <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-personal-tab" data-bs-toggle="pill"
                              data-bs-target="#pills-personal" type="button" role="tab"
                              aria-controls="pills-personal" aria-selected="true">PERSONAL INFORMATION</button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-businessinfo-tab" data-bs-toggle="pill"
                              data-bs-target="#pills-businessinfo" type="button" role="tab"
                              aria-controls="pills-businessinfo" aria-selected="false">BUSINESS INFORMATION</button>
                          </li>

                        </ul>



                        <div className="tab-content" id="pills-tabContent" style={{ height: '800px' }}>
                          <div className="tab-pane mt-3 ms-2 fade show active" id="pills-businessinfo" role="tabpanel"
                            aria-labelledby="pills-businessinfo-tab">

                            <div className="row  mb-5">
                              <div className="col-md-8">
                                <p><img src="img/account.png" style={{ paddingRight: '10px' }} alt="" />Good job. Your business information as been verified.</p>

                              </div>
                              <div className="col-md-4">
                                <button className="grow6 "><Link to="/uploadbusinessinformation"><span className="top-p3">Update business information</span></Link></button>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-12">
                                <div className="row">
                                  <div className="col-md-6">
                                    <p className="how">BUSINESS NAME</p>
                                    <span className="how-span">Johnson's Agency</span>
                                  </div>
                                  <div className="col-md-6">
                                    <p className="how">RC NUMBER</p>
                                    <span className="how-span">2039694076</span>
                                  </div>
                                </div>
                              </div>

                            </div>


                            <h5 className="how-boss mb-5 mt-5">Company Documents</h5>


                            <div className="row">
                              <div className="col-12">

                                <div className="row">
                                  <div className="col-md-6">
                                    <p className="how">DOCUMENT1</p>
                                    <span className="how-span">CAC-Document.pdf <i className="far fa-eye"></i></span>
                                  </div>
                                  <div className="col-md-6">
                                    <p className="how">DOCUMENT2</p>
                                    <span className="how-span">CAC-Document.pdf <i className="far fa-eye"></i></span>
                                  </div>
                                </div>
                              </div>

                            </div>





                          </div>
















                          <div className="tab-pane mt-3 ms-2 fade " id="pills-personal" role="tabpanel"
                            aria-labelledby="pills-personal-tab">

                            <div className="col-3 mt-1 mb-1">
                              <img src="img/Group 3123.png" alt="" />
                            </div>




                            <div className="row mt-4">
                              <div className="col-12">
                                <div className="row">
                                  <div className="col-md-5">
                                    <label for="inputCardNumber" className="form-label ">FIRST NAME</label>
                                    <div className="inner1">

                                      <i className="far fa-user"></i>
                                      <input
                                        type="firstName"
                                        placeholder="First Name"
                                        className="form-control1"
                                        id="exampleFormControlInput1"
                                        defaultValue={user.firstName}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-5">
                                    <label for="inputCardNumber" className="form-label ">LAST NAME</label>
                                    <div className="inner1">

                                      <i className="far fa-user"></i>
                                      <input
                                        type="lastName"
                                        placeholder="Last Name"
                                        className="form-control1"
                                        id="exampleFormControlInput1"
                                        defaultValue={user.lastName}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row mt-4">
                                  <div className="col-md-5">
                                    <label for="inputCardNumber" className="form-label ">EMAIL ADDRESS</label>
                                    <div className="inner1">

                                      <i className="fal fa-envelope"></i>
                                      <input
                                        type="firstName"
                                        placeholder="Email Address"
                                        className="form-control1"
                                        id="exampleFormControlInput1"
                                        defaultValue={user.email}
                                      />
                                    </div>
                                  </div>



                                  <div className="row bottom">
                                    <div className="col-12">
                                      <div className="grow-button ">
                                        <button className="grow"><Link className="top-p2" to="/">Update</Link></button>
                                      </div>
                                    </div>


                                  </div>
                                </div>


                              </div>

                            </div>

                            <h5 className="mb-3 mt-3">Security</h5>

                            <div className="row mt-4">
                              <div className="col-12">
                                <div className="row">
                                  <div className="col-md-6">
                                    <label for="inputCardNumber" className="form-label ">OLD PASSWORD</label>
                                    <div className="inner1">

                                      <i className="fal fa-lock-alt"></i>
                                      <input
                                        type="firstName"
                                        placeholder="Enter Old Password"
                                        className="form-control1"
                                        id="exampleFormControlInput1"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <label for="inputCardNumber" className="form-label ">NEW PASSWORD</label>
                                    <div className="inner1">

                                      <i className="fal fa-lock-alt"></i>
                                      <input
                                        type="lastName"
                                        placeholder="Enter New Password"
                                        className="form-control1"
                                        id="exampleFormControlInput1"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row mt-4">
                                  <div className="col-md-6">
                                    <label for="inputCardNumber" className="form-label ">CONFIRM PASSWORD</label>
                                    <div className="inner1">

                                      <i className="fal fa-lock-alt"></i>
                                      <input
                                        type="firstName"
                                        placeholder="Confirm New Password"
                                        className="form-control1"
                                        id="exampleFormControlInput1"
                                      />
                                    </div>
                                  </div>



                                  <div className="row bottom">
                                    <div className="col-12">
                                      <div className="grow-button ">
                                        <button className="grow"><Link className="top-p2" to="#">Update</Link></button>
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






              </div>
            </div>









          </div>
        </div>
      </div>

    </BaseContainer>
  )
}