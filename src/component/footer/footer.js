import React from "react";

function footer() {
    return(
        <>
        
<footer class="site-footer">
<div class="container">
    <div class="row">

        <div class="col-lg-3 col-10 me-auto mb-4">
        <h4 class="text-white mb-3">Way2Track</h4>
            <p class="copyright-text text-muted mt-lg-5 mb-4 mb-lg-0">Copyright © 2024 <strong>Way2Track</strong></p>
            <br/>
        </div>

        <div class="col-lg-5 col-8">
            <h5 class="text-white mb-3">Sitemap</h5>

            <ul class="footer-menu d-flex flex-wrap">
                <li class="footer-menu-item"  style={{color:"white", textDecoration:"none"}}><a href="about.html" class="footer-menu-link">Story</a></li>

                <li class="footer-menu-item"  style={{color:"white", textDecoration:"none"}}><a href="/aboutus" class="footer-menu-link">Privacy policy</a></li>

                <li class="footer-menu-item"  style={{color:"white", textDecoration:"none"}}><a href="/aboutus" class="footer-menu-link">FAQs</a></li>

                <li class="footer-menu-item" style={{color:"white", textDecoration:"none"}}><a href="/contactus" class="footer-menu-link">Contact</a></li>
            </ul>
        </div>

        <div class="col-lg-3 col-4">
            <h5 class="text-white mb-3">Social</h5>

            <ul class="social-icon">

                <li><a href="#" class="social-icon-link bi-youtube"></a></li>

                <li><a href="#" class="social-icon-link bi-whatsapp"></a></li>

                <li><a href="#" class="social-icon-link bi-instagram"></a></li>

            </ul>
        </div>

    </div>
</div>
</footer>
        </>
    )
    
}
export default footer;