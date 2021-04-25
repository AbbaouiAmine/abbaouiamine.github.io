import React from 'react'

class ServieComponent extends React.Component {
    render() {
        return (
            <section id="services" className="section section-gray ">
                <div className="container clearfix">
                    <div className="row services">
                        <div className="col-md-12">
                            <h2 className="heading">Services</h2>
                            <div className="row">
                                <div className="col-sm-4 wow zoomIn" data-wow-delay="0.0">
                                    <div className="box box-services">
                                        <div className="icon">
                                            <i className="ti-desktop"></i>
                                        </div>
                                        <h4 className="heading">La création et la conception des sites web</h4>
                                        <p>La création de site web inclura toutes les fonctions de base et avancées que vous souhaitez.</p>
                                    </div>
                                </div>
                                <div className="col-sm-4  wow zoomIn" data-wow-delay="0.2s">
                                    <div className="box box-services">
                                        <div className="icon">
                                            <i className="ti-printer"></i>
                                        </div>
                                        <h4 className="heading">Développement d'applications de bureau</h4>
                                        <p>Afin d'utiliser de la façon la plus efficace possible les ressources à disposition.</p>
                                    </div>
                                </div>
                                <div className="col-sm-4  wow zoomIn" data-wow-delay="0.4s">
                                    <div className="box box-services">
                                        <div className="icon">
                                            <i className="ti-search"></i>
                                        </div>
                                        <h4 className="heading">Création et conception des applications mobiles.</h4>
                                        <p>Vous permettre de mettre toutes les fonctionnalités des smartphones au service de votre business.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4  wow zoomIn" data-wow-delay="0.6s">
                                    <div className="box box-services">
                                        <div className="icon">
                                            <i className="ti-comments"></i>
                                        </div>
                                        <h4 className="heading">Création des cartes de visite.</h4>
                                        <p>Démarquez-vous en créant vos propres cartes de visite avec une conception personnalisée.</p>
                                    </div>
                                </div>
                                <div className="col-sm-4  wow zoomIn" data-wow-delay="0.8s">
                                    <div className="box box-services">
                                        <div className="icon">
                                            <i className="ti-email"></i>
                                        </div>
                                        <h4 className="heading">Création des logos professionnels</h4>
                                        <p>Grande sélection de logos. Chaque logo est personnalisé pour votre organisation ou votre société.</p>
                                    </div>
                                </div>
                                <div className="col-sm-4  wow zoomIn" data-wow-delay="1s">
                                    <div className="box box-services">
                                        <div className="icon">
                                            <i className="ti-layout-sidebar-left"></i>
                                        </div>
                                        <h4 className="heading">Création des affiches publicitaires</h4>
                                        <p>Création graphique d'affiche pour votre communication, adapté à votre message et votre charte
                                        graphique.
                </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default ServieComponent;