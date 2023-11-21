import React from "react";
import About from "../components/About";
import Banner from "../components/Banner";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import News from "../components/News";
import Layout from "../Layout";
import ChatBot from '../components/ChatBot'



const Feed = () => {
  return (
    <div>
      <Layout >
        <Banner />
        {/* <About /> */}
        {/* <Features /> */}
        {/* <Skew /> */}
        {/* <News /> */}
        <ChatBot/>
      </Layout>
    </div>
  );
};

export default Feed;
