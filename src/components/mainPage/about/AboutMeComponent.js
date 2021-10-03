import React from 'react';
import profilImg from'../../../img/template-homepage.jpg';
;
class AboutMeComponent extends React.Component {

    render() {
        return (
            <section id="about" className="section">
                <div className="container clearfix">
                    <div className="row margin-bottom">
                        <div className="col-md-8 margin-bottom wow bounceInDown">
                            <h2 className="heading">À propos</h2>
                            <p className="lead">Je suis spécialisé dans la conception des logiciels de gestion. J'ai développé mon activité
                            depuis 2015 autour
                            des différentes prestations de services informatiques dédiées aux entreprises. Je suis à votre écoute pour
                            vous
                            conseiller et vous orienter au mieux vers des solutions logicielles adaptées à votre profession et à vos
                            besoins.
            Nous pouvons nous rencontrer pour discuter de vos projets.</p>
                            <div className="row">
                                <div className="col-sm-6 wow bounceInLeft " data-wow-delay="0.4s">
                                    <h5>
                                        <i className="fa fa-arrows"></i>Une analyse et conception sur mesure.</h5>
                                    <p>Un travail d’étude mené en amont de nos projets afin de comprendre et analyser les habitudes et les
                                    besoins
                                    des
                utilisateurs.</p>
                                </div>
                                <div className="col-sm-6 wow bounceInRight " data-wow-delay="0.4s">
                                    <h5>
                                        <i className="fa fa-image"></i>Une methode de travail professionelle.</h5>
                                    <p>Je dispose des compétences professionnelles adaptées à la gestion des projets informatiques.</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6 wow bounceInLeft " data-wow-delay="0.4s">
                                    <h5>
                                        <i className="fa fa-life-ring"></i>Des technologies adaptées à l'entreprise.</h5>
                                    <p>Mes connaissances sur les techniques de développement me conduisent à proposer des solutions au service
                                    informatique
                de l'entreprise.</p>
                                </div>
                                <div className="col-sm-6 wow bounceInLeft " data-wow-delay="0.4s">
                                    <h5>
                                        <i className="fa fa-trophy"></i>Un design modern et adaptatif.</h5>
                                    <p>La conception des interfaces soignées et intuitives sur un outil logiciel ou web pour un résultat d’une
                                    grande
                simplicité d’utilisation (UI/UX).</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 margin-bottom wow slideInRight">
                            {/* <p>
                                <img src="img/template-homepage.jpg" alt="" className="img-responsive" style="border: solid;text-shadow: 2px 2px 4px #000000;">
                            </p> */}
                            <div className="card">
                                <img src={profilImg} alt="John" style={{width:'100%'}} />
                                <h1 className="name">Amine ABBAOUI</h1>
                                <p className="title">Développeur & Graphic Designer</p>
                                <div style={{margin: '11px 0',fontSize: '29px'}}>
                                    <a href="#contact" ><i className="fa fa-heart-o"></i></a>
                                </div>
                                <p className="buttonp"></p>
                            </div>
                        </div>
                    </div>


                </div>
            </section>
        );
    }
}

export default AboutMeComponent;