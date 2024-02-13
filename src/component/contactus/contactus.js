import "../../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import image1 from "../../assets/images/Image1.webp";

function contactUsForm () {
    return(

        <main>
<section class="contact section-padding">
    <div class="container">
        <div class="row">
            
            <div class="col-lg-6 col-12">
                <h2 class="mb-4">Let's <span>begin</span></h2>

                <form class="contact-form me-lg-5 pe-lg-3" role="form">

                    <div class="form-floating">
                        <input type="text" name="name" id="name" class="form-control" placeholder="Full name" required/>

                        <label for="name">Full name</label>
                    </div>

                    <div class="form-floating my-4">
                        <input type="email" name="email" id="email" pattern="[^ @]*@[^ @]*" class="form-control" placeholder="Email address" required/>

                        <label for="email">Email address</label>
                    </div>
                    
                    <div class="form-floating my-4">
                        <input type="subject" name="subject" id="subject"class="form-control" placeholder="Subject" required/>

                        <label for="subject">Subject</label>
                    </div>

                    <div class="form-floating mb-4">
                        <textarea id="message" name="message" class="form-control" placeholder="Leave a comment here" required style={{height: "160px"}}></textarea>

                        <label for="message">Tell us about the project</label>
                    </div>

                    <div class="col-lg-5 col-6">
                        <button type="submit" class="form-control" style={{color:"White"}} >Send</button>
                    </div>
                </form>
            </div>

            <div class="col-lg-6 col-12 mt-5 ms-auto">
                <div class="row">
                    <div class="col-6 border-end contact-info">
                        <h6 class="mb-3">New Business</h6>

                        <a href="mailto:w1855183@my.westminster.ac.uk" class="custom-link">
                        w1855183@my.westminster.ac.uk
                            <i class="bi-arrow-right ms-2"></i>
                        </a>
                    </div>

                    <div class="col-6 contact-info">
                        <h6 class="mb-3"></h6>

                        <a href="mailto:w1855183@my.westminster.ac.uk" class="custom-link">
                            w1855183@my.westminster.ac.uk
                            <i class="bi-arrow-right ms-2"></i>
                        </a>
                    </div>

                    <div class="col-6 border-top border-end contact-info">
                        <h6 class="mb-3"></h6>

                        <p class="text-muted"></p>
                    </div>

                   
                </div>
            </div>

        </div>
    </div>
</section>
</main>

    )
};
export default contactUsForm;