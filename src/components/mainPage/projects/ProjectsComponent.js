import React from 'react'
import portfolio1 from '../../../img/portfolio-1.png'
import portfolio2 from '../../../img/portfolio-2.png'
import portfolio3 from '../../../img/portfolio-3.png'
import portfolio4 from '../../../img/portfolio-4.png'
import portfolio5 from '../../../img/portfolio-5.png'
import portfolio6 from '../../../img/portfolio-6.png'
import portfolio7 from '../../../img/portfolio-7.png'
import portfolio8 from '../../../img/portfolio-8.png'
import emsilogo from '../../../img/emsilogo.png'
import cartevisite from '../../../img/cartevisite.png'

class ProjectsComponent extends React.Component {

    render() {
        return (
            <section id="portfolio" className="section section-gray no-padding-bottom ">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="heading">Projets</h2>
                            <p className="text-center">Trois domaines d'activité : Les applications web, les applications desktop et les
            applications mobile.</p>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row no-space">
                        <div className="col-sm-4 col-md-3 wow  fadeIn proj_cont" data-wow-delay="1s">
                            <div className="box container_projects myImg"
                                src="https://www.youtube.com/embed/MMcLG38PGpg?list=PLJe5vGB_oTiqAXMyq7hCkR40ZzLknioeV">
                                <img src={portfolio1} alt="A" className="img-responsive image_projects" />
                                <div className="overlay_projects">
                                    <span className="icon_projects" title="AutoConsultation">
                                        <i className="fa fa-eye"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4 col-md-3 wow fadeIn" data-wow-delay="0.5s">
                            <div className="box container_projects myImg"
                                src="https://www.youtube.com/embed/1GwCBL1BT-c?list=PLJe5vGB_oTiqAXMyq7hCkR40ZzLknioeV">
                                <span>
                                    <img src={portfolio7} alt="" className="img-responsive image_projects" />
                                    <div className="overlay_projects">
                                        <span className="icon_projects" title="MarocDocs">
                                            <i className="fa fa-eye"></i>
                                        </span>
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-4 col-md-3 wow  fadeIn" data-wow-delay="2s">
                            <div className="box container_projects myImg"
                                src="https://www.youtube.com/embed/TTJSpGh9HS0?list=PLJe5vGB_oTiqAXMyq7hCkR40ZzLknioeV">
                                <span>
                                    <img src={portfolio3} alt="" className="img-responsive image_projects" />
                                    <div className="overlay_projects">
                                        <span className="icon_projects" title="DoctoGest">
                                            <i className="fa fa-eye"></i>
                                        </span>
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-4 col-md-3 fadeIn" data-wow-delay="1.5s">
                            <div className="box container_projects myImg"
                                src="https://www.youtube.com/embed/T4OP0vfMBvs">
                                <span>
                                    <img src={portfolio5} alt="" className="img-responsive image_projects" />
                                    <div className="overlay_projects">
                                        <span className="icon_projects" title="Merise le guide complet">
                                            <i className="fa fa-eye"></i>
                                        </span>
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-4 col-md-3 wow fadeIn proj_cont" data-wow-delay="2.5s">
                            <div className="box container_projects myImg"
                                src={emsilogo}>
                                <span>
                                    <img src={portfolio4} alt="" className="img-responsive image_projects" />
                                    <div className="overlay_projects">
                                        <span className="icon_projects" title="EMSIPreneur">
                                            <i className="fa fa-eye"></i>
                                        </span>
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-4 col-md-3 wow fadeIn" data-wow-delay="1.4s">
                            <div className="box container_projects myImg"
                                src={cartevisite}>
                                <span>
                                    <img src={portfolio6} alt="" className="img-responsive image_projects" />
                                    <div className="overlay_projects">
                                        <span className="icon_projects" title="Koutoubia Viaggi">
                                            <i className="fa fa-eye"></i>
                                        </span>
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-4 col-md-3 wow fadeIn" data-wow-delay="0.8s">
                            <div className="box container_projects myImg"
                                src="https://www.youtube.com/embed/AoWIRsiXsjg?list=PLJe5vGB_oTiqAXMyq7hCkR40ZzLknioeV">
                                <span>
                                    <img src={portfolio2} alt="" className="img-responsive image_projects" />
                                    <div className="overlay_projects">
                                        <span className="icon_projects" title="MarocDocs">
                                            <i className="fa fa-eye"></i>
                                        </span>
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-4 col-md-3 wow fadeIn" data-wow-delay="2.9s">
                            <div className="box container_projects myImg"
                                src="https://www.youtube.com/embed/fXSdZC25LOU?list=PLJe5vGB_oTiqAXMyq7hCkR40ZzLknioeV">
                                <span>
                                    <img src={portfolio8} alt="" className="img-responsive image_projects" />
                                    <div className="overlay_projects">
                                        <span className="icon_projects" title="Afcam.ma">
                                            <i className="fa fa-eye"></i>
                                        </span>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
export default ProjectsComponent;