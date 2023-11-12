import React from 'react'
import person1 from '../../../img/person-1.png'
import person2 from '../../../img/person-2.png'
import person3 from '../../../img/person-3.png'
import person4 from '../../../img/person-4.png'
import person1Full from '../../../img/person-1-full.png'
import person2Full from '../../../img/person-2-full.png'
import person3Full from '../../../img/person-3-full.png'
import person4Full from '../../../img/person-4-full.png'

import { Translation } from 'react-i18next';
import i18next from '../../../i18n'
import { withTranslation } from 'react-i18next'

class CertificateComponent extends React.Component {

  render() {
    return (
      <section id="team" className="section section-gray">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Translation>{t => <h2 className={this.props.lang === 'ar'? 'arabicfont heading':'heading'}>{t('certificats')}</h2>}</Translation>
              <div className="row"></div>
              <div className="col-md-3 col-sm-6" data--delay="0.3s">
                <div className="team-member">
                  <div className="image">
                    <span>
                      <img src={person1} path={person1Full} alt="" className="img-responsive myImg-cert" />
                    </span>
                  </div>
                  <h3 className={this.props.lang === 'ar'? 'arabicfont':''}>
                    <a href="https://drive.google.com/file/d/10nyWaI989rxGP-pSKvwXIyph3aJgTuzG/view">{i18next.t('certificatt1')}</a>
                  </h3>

                  <p className="role">Microsoft Technology Associate</p>
                  <div className="ligne">
                  </div>
                  <div className="text">
                    <p className={this.props.lang === 'ar'? 'arabicfont':''}>{i18next.t('certificattxt1')}</p>
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
                  <h3 className={this.props.lang === 'ar'? 'arabicfont':''}>
                    <a href="https://drive.google.com/file/d/1SDeNkYimf_2frA5pG2Jpcc0uhANeLvdm/view">{i18next.t('certificatt2')}</a>
                  </h3>
                  <p className="role">Oracle university</p>
                  <div className="ligne">
                  </div>
                  <div className="text">
                    <p className={this.props.lang === 'ar'? 'arabicfont':''}>{i18next.t('certificattxt2')}</p>
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
                  <h3 className={this.props.lang === 'ar'? 'arabicfont':''}>
                    <a href="https://drive.google.com/file/d/1jrmQL0NvGcrlWe20Hl3z6qChXrFSp7Rc/view">{i18next.t('certificatt3')}</a>
                  </h3>
                  <p className="role">udemy</p>
                  <div className="ligne">
                  </div>
                  <div className="text">
                    <p className={this.props.lang === 'ar'? 'arabicfont':''}>{i18next.t('certificattxt3')}</p>
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
                  <h3 className={this.props.lang === 'ar'? 'arabicfont':''}>
                    <a href="https://drive.google.com/file/d/1byWukZHf3--FkBdujgLQnIZx3gTEqmEO/view">{i18next.t('certificatt4')}
                </a>
                  </h3>
                  <p className="role">Centralelille</p>
                  <div className="ligne">
                  </div>
                  <div className="text">
                    <p className={this.props.lang === 'ar'? 'arabicfont':''}>{i18next.t('certificatt4')} </p>
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

export default withTranslation()(CertificateComponent);