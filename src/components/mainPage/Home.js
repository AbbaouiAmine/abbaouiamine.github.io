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

  

class HomeComponent extends React.Component {

    render() {
        require('../../css/style.default.css')
        require('../../css/themify-icons.css')
        return (
            
            <div className="full">
            <IntroComponent/>
            <NavBarComponent/>
            <AboutMeComponent/>
            <ServicesComponent/>
            <TechnosComponent/>
            <ProjectsComponent/>
            <CertificateComponent/>
            <ContactComponent/>
            <FooterComponent/>
            <ProjectModalComponent/>
            <ModalCertificateComponent/>
            </div>
        );
    }
}

export default HomeComponent;