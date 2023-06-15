import React from 'react';
import IntroComponent from "./footer/IntroComponent";
import NavBarComponent from "./navigation/NavBarComponent";
import AboutMeComponent from "./about/AboutMeComponent";
import ServicesComponent from "./services/ServicesComponent";
import ProjectsComponent from "./projects/ProjectsComponent";
import CertificateComponent from "./certifications/CertificateComponent";
import ContactComponent from "./contact/ContactComponent";
import FooterComponent from "./footer/FooterComponent";
import TechnosComponent from "./technos/TechnosComponent";
import ProjectModalComponent from "./modals/ProjectModalComponent";
import ModalCertificateComponent from "./modals/ModalCertificateComponent";
import YoutubeComponent from "./youtube/YoutubeComponent"
import GoogleStoreComponent from './googlestore/GoogleStoreComponent';
import ClientsComponent from './clients/ClientsComponent'

  

class HomeComponent extends React.Component {
    
    constructor() {
        super();
        this.state = {
            lang: 'eng'
        };
        this.handleUpdtelang = this.handleUpdtelang.bind(this);
    }

    handleUpdtelang(lang) {
        this.setState({
            lang: lang
        })
      }
   
    render() {
        require('../../css/style.default.css')
        require('../../css/animate.css')
        require('../../css/themify-icons.css')
        return (     
            <div className="full">
            <IntroComponent lang={this.state.lang} handleUpdtelang={this.handleUpdtelang}/>
            <NavBarComponent lang={this.state.lang}/>
            <AboutMeComponent lang={this.state.lang}/>
            <ServicesComponent lang={this.state.lang}/>
            <TechnosComponent lang={this.state.lang}/>
            <ProjectsComponent lang={this.state.lang}/>
            {/* <YoutubeComponent/> */}
             <GoogleStoreComponent lang={this.state.lang}/>
            <CertificateComponent lang={this.state.lang}/>
            <ClientsComponent lang={this.state.lang}/>
            <ContactComponent lang={this.state.lang}/>
            <FooterComponent lang={this.state.lang}/>
            <ProjectModalComponent lang={this.state.lang}/>
            <ModalCertificateComponent lang={this.state.lang}/>
            <a href="#intro" class="icon faa-float animated scroll-to"  id="topBtn" title="Go to top">
            <i className="fa fa-angle-double-up"></i>
            </a>
            </div>
        );
    }

    componentDidMount() {
        const script = document.createElement("script");
        script.src = "/js/index.js";
        script.async = true;
      
        document.body.appendChild(script);
      }
}

export default HomeComponent;