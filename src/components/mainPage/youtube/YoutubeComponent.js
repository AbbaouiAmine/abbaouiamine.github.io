import React from 'react'
import playlist1 from '../../../img/compilation.png'
import person2 from '../../../img/person-2.png'
import person3 from '../../../img/person-3.png'
import person4 from '../../../img/person-4.png'
import person1Full from '../../../img/person-1-full.png'
import person2Full from '../../../img/person-2-full.png'
import person3Full from '../../../img/person-3-full.png'
import person4Full from '../../../img/person-4-full.png'

class CertificateComponent extends React.Component {

  render() {
    return (
      <section id="youtube" className="section section-withe">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="heading">Playlists</h2>
              <div className="row"></div>
              <div className="col-md-3 col-sm-6" data--delay="0.3s">
                <div className="team-member">
                  <div className="image">
                    <span>
                      <img src={playlist1} alt="" className="img-responsive" />
                    </span>
                  </div>
                  <h3>
                    <a href="https://drive.google.com/file/d/10nyWaI989rxGP-pSKvwXIyph3aJgTuzG/view">Compilation</a>
                  </h3>
                  <div className="text">
                    <p>Ce certificat prouve que son propriétaire a rempli avec succès les exigences.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6   zoomIn" data--delay="0.3s">
                <div className="team-member">
                  <div className="image">
                    <span>
                      <img src={person2} path={person2Full} alt="" className="img-responsive myImg-cert" />
                    </span>
                  </div>
                  <h3>
                    <a href="https://drive.google.com/file/d/1SDeNkYimf_2frA5pG2Jpcc0uhANeLvdm/view">MERISE - Le guide complet</a>
                  </h3>
                  <div className="text">
                    <p>Cela certifie que le propriétaire de ce document a suivi les cours nécessaires avec une connaissance fondamentale du développement web.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6   zoomIn" data--delay="0.3s">
                <div className="team-member">
                  <div className="image">
                    <span>
                      <img src={person3} path={person3Full} alt="" className="img-responsive myImg-cert" />
                    </span>
                  </div>
                  <h3>
                    <a href="https://drive.google.com/file/d/1jrmQL0NvGcrlWe20Hl3z6qChXrFSp7Rc/view">Administration SQL Server</a>
                  </h3>
                  <div className="text">
                    <p>Learn Complete UI/UX design by Photoshop from Scratch and Design Uber app from Scratch.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6" data--delay="0.3s">
                <div className="team-member">
                  <div className="image">
                    <span>
                      <img src={person4} path={person4Full} alt="" className="img-responsive myImg-cert" />
                    </span>
                  </div>
                  <h3>
                    <a href="https://drive.google.com/file/d/1byWukZHf3--FkBdujgLQnIZx3gTEqmEO/view">UML : Unified Modeling Language 
                </a>
                  </h3>
                  <div className="text">
                    <p>Le titulaire de cette attestation est capable de concevoir et piloter un projet, d’animer une réunion ... </p>
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

export default CertificateComponent;