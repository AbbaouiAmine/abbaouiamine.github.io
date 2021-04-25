import styleDefault from "../css/style.default.css";
import themify from "../css/themify-icons.css"
import IntroComponent from "./IntroComponent";
import NavBarComponent from "./NavBarComponent";
import AboutMeComponent from "./AboutMeComponent";
import ServiceComponent from "./ServiceComponent";
import PortfolioComponent from "./PortfolioComponent";
import CertificateComponent from "./CertificateComponent";
import ContactComponent from "./ContactComponent";
import FooterComponent from "./FooterComponent";
import TechnosComponent from "./TechnosComponent";
import ProjectModalComponent from "./modals/ProjectModalComponent";
import ModalCertificateComponent from "./modals/ModalCertificateComponent";
import React from 'react'

class AppComponent extends React.Component {
  

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "/js/index.js";
    document.body.appendChild(script);
  }
  
  render(){
  return (
    <div className="full">
    <IntroComponent/>
    <NavBarComponent/>
    <AboutMeComponent/>
    <ServiceComponent/>
    <TechnosComponent/>
    <PortfolioComponent/>
    <CertificateComponent/>
    <ContactComponent/>
    <FooterComponent/>
    <ProjectModalComponent/>
    <ModalCertificateComponent/>
    </div>
  );
}

 
}

export default AppComponent;
