import React,{useState} from 'react';
import './App.css';
import { Tab, Row, Col, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Footer from './component/footer/footer';
import Image4 from "./assets/images/Image4.webp";
import Image2 from "./assets/images/Image2.png";
import Image3 from "./assets/images/Image3.png";
import Image1 from "./assets/images/Image1.webp";
import Image5 from "./assets/images/Image5.png";
import Image6 from "./assets/images/Image6.jpg";
import Image7 from "./assets/images/Image7.jpeg";

function App() {
 
  return (
    <>
      <main>
      
      <section class="slick-slideshow">   
                <div class="slick-custom">
                    <img src={Image5} class="img-fluid" alt=""/>

                    <div class="slick-bottom">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-6 col-10">
                                    <h1 class="slick-title">Way2Track</h1>

                                    <p class="lead text-black mt-lg-3 mb-lg-5" style={{fontWeight:"500", fontSize:"20px"}}> Welcome to Way2Track, the ultimate destination for mastering task and project management with unparalleled ease and efficiency. In today's fast-paced business world, staying ahead requires not just hard work, but smart work. That's where we come in. With our state-of-the-art platform, we empower teams and individuals across the UK and beyond to streamline their workflows, enhance productivity, and achieve their project goals with precision.</p>

                                    <a href="about.html" class="btn custom-btn">Learn more about us</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            <section class="about section-padding">
                <div class="container">
                    <div class="row">

    <Tab.Container defaultActiveKey="home" id='aboutus'>
      <Row>
      <Col sm={3}>
  <Nav variant="pills" className="flex-column">
    <Nav.Item>
     <li> <Nav.Link eventKey="home" className='introdo'>Introduction</Nav.Link></li>
    </Nav.Item>
    <Nav.Item>
    <li> <Nav.Link eventKey="youtube" className='howWe'>How we work?</Nav.Link></li>
    </Nav.Item>
    <Nav.Item>
    <li> <Nav.Link eventKey="skill" className='caap'>Capabilities</Nav.Link></li>
    </Nav.Item>
  </Nav>
</Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="home">
              {/* Content for Introduction */}
              <div className="d-flex flex-column h-100">
                <h4 className="mb-3">Good <span>Tracking</span> <br/>Ideas for <span>your</span> Project</h4>
                <p>Way2Track templates comes with sign in / sign up pages, product listing / product detail, about, FAQs, and contact page.</p>
                <p>At Way2Track, we understand that every project is unique. That's why our suite of tools is designed to be fully customizable, ensuring that you have the flexibility and functionality needed to tackle the complexities of any project, big or small. From intuitive task allocation to real-time collaboration, comprehensive progress tracking, and insightful reporting, our platform is your all-in-one solution for managing projects with confidence and clarity.</p>
                <div className="mt-auto">
                  <a href="about.html" className="custom-link mb-2">
                    Learn more about us
                    <i className="bi-arrow-right ms-2"></i>
                  </a>
                </div>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="youtube">
              {/* Content for How we work? */}
              <div className="d-flex flex-column h-100">
                <h4 className="mb-3">In Way2Track</h4>
                <p> One year in business, We’ve had the chance to work on a variety of projects, with companies</p>
                <p>Custom work</p>
                <div className="mt-auto">
                  <a href="contact.html" className="custom-link mb-2">
                    Work with us
                    <i className="bi-arrow-right ms-2"></i>
                  </a>
                </div>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="skill">
              {/* Content for Capabilities */}
              <div className="d-flex flex-column h-100">
                <h4 className="mb-3">What can help you?</h4>
                <p>"Streamline Your Writing Projects with Way2Track – Where Creativity Meets Efficiency"</p>
                {/* Assuming you want to include the progress bars as part of the capabilities */}
                <div className="skill-thumb mt-3">
                  <strong>Mobile</strong>
                  <div className="progress">
                    <div className="progress-bar progress-bar-primary" role="progressbar" style={{width: "90%"}}></div>
                  </div>

                  <strong>Desktop and Laptop</strong>
                  <div className="progress">
                    <div className="progress-bar progress-bar-primary" role="progressbar" style={{width: "70%"}}></div>
                  </div>

                  <strong>Online Platform</strong>
                  <div className="progress">
                    <div className="progress-bar progress-bar-primary" role="progressbar" style={{width: "80%"}}></div>
                  </div>
                </div>
                <div className="mt-auto">
                  <a href="products.html" className="custom-link mb-2">
                    Explore products
                    <i className="bi-arrow-right ms-2"></i>
                  </a>
                </div>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
                    </div>
                </div>
            </section>

            <section class="front-product">
                <div class="container-fluid p-0">
                    <div class="row align-items-center">

                        <div class="col-lg-6 col-12">
                            <img src={Image1} class="img-fluid" alt=""/>
                        </div>

                        <div class="col-lg-6 col-12">
                            <div class="px-5 py-5 py-lg-0">
                                
                                <h2 class="mb-4"><span></span> </h2>
                                <img src={Image6} class="img-fluid" alt=""/>
                                <p class="lead mb-4">How to Use</p>

                                <a href="products.html" class="custom-link">
                                    Explore templates
                                    <i class="bi-arrow-right ms-2"></i>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section class="featured-product section-padding">
                <div class="container">
                    <div class="row">
                        
                        <div class="col-12 text-center">
                            <h2 class="mb-5">Featured Products</h2>
                        </div>
                        <div class="col-lg-4 col-12 mb-3" >
                            <div class="product-thumb" >
                                <a href="product-detail.html">
                                <img src={Image7} class="img-fluid product-image" alt=""/>
                                </a>

                                <div class="product-top d-flex">
                                    <span class="product-alert"></span>

                                    <a href="#" class="bi-heart-fill product-icon ms-auto"></a>
                                </div>

                                <div class="product-info d-flex">
                                    <div>
                                        <h5 class="product-title mb-0">
                                            <a href="product-detail.html" class="product-title-link" style={{color: "white"}}>Templates</a>
                                        </h5>
                                    </div>

                                </div>
                            </div>
                        </div>
                       

                        <div class="col-lg-4 col-12 mb-3">
                            <div class="product-thumb" >
                                <a href="product-detail.html">
                                <img src={Image2} class="img-fluid product-image" alt=""/>
                                </a>

                                <div class="product-top d-flex">
                                    <a href="#" class="bi-heart-fill product-icon ms-auto"></a>
                                </div>

                                <div class="product-info d-flex">
                                    <div>
                                        <h5 class="product-title mb-0">
                                            <a href="product-detail.html" class="product-title-link" style={{color: "white"}}>Customize</a>
                                        </h5>
                                    </div>

                                    <small class="product-price text-muted ms-auto mt-auto mb-5"></small>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-12">
                            <div class="product-thumb" >
                                <a href="product-detail.html">
                                    <img src={Image3} class="img-fluid product-image" alt=""/>
                                </a>

                                <div class="product-top d-flex">
                                    <a href="#" class="bi-heart-fill product-icon ms-auto"></a>
                                </div>

                                <div class="product-info d-flex">
                                    <div>
                                        <h5 class="product-title mb-0">
                                            <a href="/sticky" class="product-title-link" style={{color: "white"}}>Sticky Notes</a>
                                        </h5>

                                    </div>

                                </div>
                            </div>
                        </div>

                        <div class="col-12 text-center">
                            <a href="products.html" class="view-all">View All Products</a>
                        </div>

                    </div>
                </div>
            </section>

        </main>

    </>
  );
}

export default App;
