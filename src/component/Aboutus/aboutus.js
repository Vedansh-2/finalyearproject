import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import image1 from "../../assets/images/Image8.png";
import image2 from "../../assets/images/Image6.jpg";
import image3 from "../../assets/images/Image3.png";
import image4 from "../../assets/images/Image5.png";

function Aboutus() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row gx-4 align-items-center justify-content-between">
          <div className="col-md-5 order-2 order-md-1">
            <div className="mt-5 mt-md-0">
              <span className="text-muted">Our Story</span>
              <h2 className="display-5 fw-bold">About Us</h2>
              <p className="lead">
              Welcome to Way2Track, your new partner in efficient project management! Founded by Vedansh, a visionary with a passion for streamlining complex processes, Way2Track is dedicated to transforming the way teams collaborate and deliver projects.
              </p>
              <p className="lead">
              At Way2Track, we believe in the power of simplicity. Our tools are designed to provide clear, concise, and effective management solutions that cater to the needs of various industries. Whether you're a startup, a small business, or a large corporation, our platform is engineered to adapt and scale to your unique challenges.
              </p>
            </div>
          </div>
          <div className="col-md-6 offset-md-1 order-1 order-md-2">
            <div className="row gx-2 gx-lg-3">
              <div className="col-6">
                <div className="mb-2">
                  <img className="img-fluid rounded-3" src={image1} alt="" />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-2">
                  <img className="img-fluid rounded-3" src={image2} alt="" />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-2">
                  <img className="img-fluid rounded-3" src= {image3} alt="" />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-2">
                  <img className="img-fluid rounded-3" src= {image4} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Aboutus;
