import React from 'react'
import Layout from '../../Layout'
import "./About.css"

import image from "../../assets/images/background/5.jpg"
const AboutUs = () => {
    return (
        <Layout>
            <div >
                <section class="page-title" style={{ backgroundImage: `url(${image})` }} >
                    <div class="auto-container">
                        <h1 class="d-none d-lg-block d-xl-block d-md-block">About Us</h1>
                        <ul class="bread-crumb clearfix">
                            <li><a href="index">Home</a></li>
                            <li>About Us</li>
                        </ul>
                    </div>
                </section>
                <section className="about-section">
                    <div className="auto-container">
                        <div className="row">
                            <div>
                                <span className="icon icon-circle-blue wow fadeIn"></span>

                                <span className="icon icon-circle-1 wow zoomIn"></span>
                            </div>
                            <div className="content-column col-lg-12 col-md-12 col-sm-12">
                                <div className="inner-column">
                                    <div className="sec-title">
                                        <span className="title">ABOUT US</span>
                                        <h2>Welcome to Ameotech </h2>
                                        <div className="text"><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    )
}

export default AboutUs