import React from 'react'
import ServiceComponent from './ServiceComponent';

class ServicesComponent extends React.Component {
    render() {
        return (
            <section id="services" className="section section-gray ">
                <div className="container clearfix">
                    <div className="row services">
                        <div className="col-md-12">
                            <h2 className="heading">Services</h2>
                            <div className="row">
                                <ServiceComponent title="La création et la conception des sites web" description="La création de site web inclura toutes les fonctions de base et avancées que vous souhaitez." icon="ti-desktop"/>
                                <ServiceComponent title="Développement d'applications de bureau" description="Afin d'utiliser de la façon la plus efficace possible les ressources à disposition." icon="ti-printer"/>
                                <ServiceComponent title="Création et conception des applications mobiles." description="Vous permettre de mettre toutes les fonctionnalités des smartphones au service de votre business." icon="ti-search"/>
                            </div>
                            <div className="row">
                            <ServiceComponent title="Création des cartes de visite." description="Démarquez-vous en créant vos propres cartes de visite avec une conception personnalisée." icon="ti-comments"/>
                            <ServiceComponent title="Création des logos professionnels" description="Grande sélection de logos. Chaque logo est personnalisé pour votre organisation ou votre société." icon="ti-email"/>
                            <ServiceComponent title="Création des affiches publicitaires" description="Création graphique d'affiche pour votre communication, adapté à votre message et votre charte
                                        graphique." icon="ti-layout-sidebar-left"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default ServicesComponent;