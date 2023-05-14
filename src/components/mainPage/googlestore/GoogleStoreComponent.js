import React from 'react'
import app1 from '../../../img/linux_icon_store.png'
import app2 from '../../../img/git_icon_store.png'
import app3 from '../../../img/nature_icon_store.png'
import app4 from '../../../img/merise_icon_store.png'
import app1Full from '../../../img/linux_image_presentation.png'
import app2Full from '../../../img/git_image_presentation.png'
import app3Full from '../../../img/nature_image_presentation.png'
import app4Full from '../../../img/merise_image_presentation.png'

import { Translation } from 'react-i18next';
import i18next from '../../../i18n'
import { withTranslation } from 'react-i18next'

class googleplayComponent extends React.Component {

  render() {
    return (
      <section id="googleplay" className="section section-withe">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Translation>{t => <h2 className={this.props.lang === 'ar'? 'arabicfont heading':'heading'}>{t('googleplay')}</h2>}</Translation>
              <div className="row"></div>
              <div className="col-md-3 col-sm-6" data--delay="0.3s">
                <div className="team-member">
                  <div className="image">
                    <span>
                      <img src={app1} path={app1Full} alt="" className="img-responsive myImg-cert" />
                    </span>
                  </div>
                  <h3 className={this.props.lang === 'ar'? 'arabicfont':''}>
                    <a href="https://play.google.com/store/apps/details?id=com.amineabboui.linuxcheatsheet">{i18next.t('app1')}</a>
                  </h3>
                  <div className="ligne">
                  </div>
                  <div className="text">
                    <p className={this.props.lang === 'ar'? 'arabicfont':''}>{i18next.t('apptxt1')}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6   zoomIn" data--delay="0.3s">
                <div className="team-member">
                  <div className="image">
                    <span>
                      <img src={app2} path={app2Full} alt="" className="img-responsive myImg-cert" />
                    </span>
                  </div>
                  <h3 className={this.props.lang === 'ar'? 'arabicfont':''}>
                    <a href="https://play.google.com/store/apps/details?id=com.amineabboui.gitinpractice">{i18next.t('app2')}</a>
                  </h3>
                  <div className="ligne">
                  </div>
                  <div className="text">
                    <p className={this.props.lang === 'ar'? 'arabicfont':''}>{i18next.t('apptxt2')}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6   zoomIn" data--delay="0.3s">
                <div className="team-member"> 
                  <div className="image">
                    <span>
                      <img src={app3} path={app3Full} alt="" className="img-responsive myImg-cert" />
                    </span>
                  </div>
                  <h3 className={this.props.lang === 'ar'? 'arabicfont':''}>
                    <a href="https://play.google.com/store/apps/details?id=com.amineabbaoui.naturewallpaper">{i18next.t('app3')}</a>
                  </h3>
                  <div className="ligne">
                  </div>
                  <div className="text">
                    <p className={this.props.lang === 'ar'? 'arabicfont':''}>{i18next.t('apptxt3')}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6" data--delay="0.3s">
                <div className="team-member">
                  <div className="image">
                    <span>
                      <img src={app4} path={app4Full} alt="" className="img-responsive myImg-cert" />
                    </span>
                  </div>
                  <h3 className={this.props.lang === 'ar'? 'arabicfont':''}>
                    <a href="https://play.google.com/store/apps/details?id=com.amineabboui.guidemerise">{i18next.t('app4')}
                </a>
                  </h3>
                  <div className="ligne">
                  </div>
                  <div className="text">
                    <p className={this.props.lang === 'ar'? 'arabicfont':''}>{i18next.t('apptxt4')} </p>
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

export default withTranslation()(googleplayComponent);