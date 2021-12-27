import React from "react";
import { Link } from 'react-router-dom';

export function DocuUp(){
    return(
         <div class="mainn" style={{width: '100%' , display: 'flex', background:'#ffffff'}}>
        <div class="side-image"></div>
        <div class="right">
          <div class="rightCap">
            <img src="img/Logotype.png" alt=""/>

            <h2 class="mb-1">What's your business about </h2>
            <span class=" mb-3">Tell us about the business you run</span>

             
            <form>
                <div class="inner1 mt-2">
                    <i class="fal fa-wallet"></i>
                    <input
                      type="firstName"
                      placeholder="Business Name"
                      class="form-control1"
                      id="exampleFormControlInput1"
                    />
                  </div>
                  <div class="inner1">
                      <i class="fal fa-wallet"></i>
                    <input
                      type="lastName"
                      placeholder="RC Name"
                      class="form-control1"
                      id="exampleFormControlInput1"
                    />
                  </div>
                  <hr/>
                 <div class="col-12">
                  <h3>Company Documents</h3>
                  <span>Submit douments like CAC Documents,<br/> Documents of Association, etc.</span>
                  <div class="row bottom">
                        <div class="col-12 mt-2">
                          <div class="grow-button ">
                            <button class=" grow6"><Link class="top-p2" to="./index.html"><span class="top-pp1">Document 123478.jpg<i class="fal fa-times"></i></span></Link></button>
                          </div>
                        </div>
                  </div>
                    <div class="row bottom">
                        <div class="col-12">
                          <div class="grow-button ">
                            <button class=" grow6 "><Link class="top-p2" to="./index.html"><span class="top-p1"><i class="fal fa-upload"></i>Upload Company Document</span></Link></button>
                          </div>
                        </div>
                  </div>

            
              <div class="row bottom">
                <div class="col-12">
                  <div class="grow-button text-end">
                    <button class=" grow"><Link class="top-p2" to="/">Submit</Link></button>
                  </div>
                </div>

               
              </div>
              </div>
            </form>
 
          </div>
          </div>
        </div>
      
    )
}