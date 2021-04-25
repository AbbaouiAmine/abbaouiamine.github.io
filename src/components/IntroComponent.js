import React from 'react';


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
      </div>
      <div className="content">
        <div className="container clearfix">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 col-sm-12 wow zoomIn">
              <p className="roboto">{this.state.titre}</p>
              <h1 className="signature">{this.state.nom}
                    <br />
                <span>{this.state.prenom}</span>
              </h1>
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
