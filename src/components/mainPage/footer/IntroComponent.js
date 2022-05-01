import React from 'react';
import videoBack from '../../../img/video.mp4'
import logoFire from '../../../img/logoFire.png'
import logoTitle from '../../../img/logoTitle.png'


class IntroComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      titre: "BIENVENUE SUR MA MAISON NUMÉRIQUE",
      nom :"ABBAOUI",
      prenom:"Amine",
      profil:"Ingénieur logiciel"
    };
  }
  render() {
    return(
    <div id="intro" className="section intro image-background  active">
      <div className="overlay">
      <video id="myVideo" autoPlay loop muted>
       <source src={videoBack} type="video/mp4"/>
    </video>
      </div>
      <div className="content">
        <div className="container clearfix">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 col-sm-12 wow zoomIn">
              <p className="roboto">{this.state.titre}</p>
              <img src={logoFire} id="logoFire" />
              <br/>
              <img src={logoTitle} id="logoTitle" />
              
              <p className="roboto">{this.state.profil}</p>
            </div>
          </div>
        </div>
      </div>
      <a href="#about" className="icon faa-float animated scroll-to">
        <i className="fa fa-angle-double-down"></i>
      </a>
    </div>);
  }
}

export default IntroComponent;
