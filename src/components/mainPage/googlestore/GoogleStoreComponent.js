import React from 'react'
import app1 from '../../../img/linux_icon_store.png'
import app2 from '../../../img/git_icon_store.png'
import app3 from '../../../img/nature_icon_store.png'
import app4 from '../../../img/merise_icon_store.png'
import app5 from '../../../img/sql_icon_store.png'
import app6 from '../../../img/gradle_icon_store.png'
import app7 from '../../../img/dutch_icon_store.png'
import app8 from '../../../img/wasafat_tabkh_icon_store.png'
import app9 from '../../../img/english_dictionary_icon_store.png'
import app10 from '../../../img/laryngectomie_icon_store.png'
import app11 from '../../../img/spring_icon_store.png'
import app12 from '../../../img/gwt_icon_store.png'
import app1Full from '../../../img/linux_image_presentation.png'
import app2Full from '../../../img/git_image_presentation.png'
import app3Full from '../../../img/nature_image_presentation.png'
import app4Full from '../../../img/merise_image_presentation.png'
import app5Full from '../../../img/sql_image_presentation.png'
import app6Full from '../../../img/gradle_image_presentation.png'
import app7Full from '../../../img/dutch_image_presentation.png'
import app8Full from '../../../img/wasafat_tabkh_image_presentation.png'
import app9Full from '../../../img/dictionnaire_image_presentation.png'
import app10Full from '../../../img/laryngectomie_image_presentation.png'
import app11Full from '../../../img/springframework_image_presentation.png'
import app12Full from '../../../img/gwt_image_presentation.png'

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
              <div className="col-md-2 col-sm-6" data--delay="0.3s">
                <div className="team-member app-icon">
                  <div className="image">
                    <span>
                      <img src={app1} path={app1Full} alt="" className="img-responsive myImg-cert" />
                    </span>
                  </div>
                  <h3 className={this.props.lang === 'ar'? 'arabicfont':''}>
                    <a href="https://play.google.com/store/apps/details?id=com.amineabboui.linuxcheatsheet">{i18next.t('app1')}</a>
                  </h3>
                </div>
              </div>
              <div className="col-md-2 col-sm-6   zoomIn" data--delay="0.3s">
                <div className="team-member app-icon">
                  <div className="image">
                    <span>
                      <img src={app2} path={app2Full} alt="" className="img-responsive myImg-cert" />
                    </span>
                  </div>
                  <h3 className={this.props.lang === 'ar'? 'arabicfont':''}>
                    <a href="https://play.google.com/store/apps/details?id=com.amineabboui.gitinpractice">{i18next.t('app2')}</a>
                  </h3>
                </div>
              </div>
              <div className="col-md-2 col-sm-6   zoomIn" data--delay="0.3s">
                <div className="team-member app-icon"> 
                  <div className="image">
                    <span>
                      <img src={app3} path={app3Full} alt="" className="img-responsive myImg-cert" />
                    </span>
                  </div>
                  <h3 className={this.props.lang === 'ar'? 'arabicfont':''}>
                    <a href="https://play.google.com/store/apps/details?id=com.amineabbaoui.naturewallpaper">{i18next.t('app3')}</a>
                  </h3>
                </div>
              </div>
              <div className="col-md-2 col-sm-6" data--delay="0.3s">
                <div className="team-member app-icon">
                  <div className="image">
                    <span>
                      <img src={app4} path={app4Full} alt="" className="img-responsive myImg-cert" />
                    </span>
                  </div>
                  <h3 className={this.props.lang === 'ar'? 'arabicfont':''}>
                    <a href="https://play.google.com/store/apps/details?id=com.amineabboui.guidemerise">{i18next.t('app4')}
                </a>
                  </h3>
                </div>
              </div>
              <div className="col-md-2 col-sm-6" data--delay="0.3s">
                <div className="team-member app-icon">
                  <div className="image">
                    <span>
                      <img src={app5} path={app5Full} alt="" className="img-responsive myImg-cert" />
                    </span>
                  </div>
                  <h3 className={this.props.lang === 'ar'? 'arabicfont':''}>
                    <a href="https://play.google.com/store/apps/details?id=com.amineabboui.sqlpocket">{i18next.t('app5')}
                </a>
                  </h3>
                </div>
              </div>
              <div className="col-md-2 col-sm-6" data--delay="0.3s">
                <div className="team-member app-icon">
                  <div className="image">
                    <span>
                      <img src={app6} path={app6Full} alt="" className="img-responsive myImg-cert" />
                    </span>
                  </div>
                  <h3 className={this.props.lang === 'ar'? 'arabicfont':''}>
                    <a href="https://play.google.com/store/apps/details?id=com.amineabboui.gradlecheatsheet">{i18next.t('app6')}
                </a>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-2 col-sm-6" data--delay="0.3s">
                <div className="team-member app-icon">
                  <div className="image">
                    <span>
                      <img src={app7} path={app7Full} alt="" className="img-responsive myImg-cert" />
                    </span>
                  </div>
                  <h3 className={this.props.lang === 'ar'? 'arabicfont':''}>
                    <a href="https://play.google.com/store/apps/details?id=com.amineabbaoui.dutchalphabets">{i18next.t('app7')}</a>
                  </h3>
                </div>
              </div>
              <div className="col-md-2 col-sm-6   zoomIn" data--delay="0.3s">
                <div className="team-member app-icon">
                  <div className="image">
                    <span>
                      <img src={app8} path={app8Full} alt="" className="img-responsive myImg-cert" />
                    </span>
                  </div>
                  <h3 className={this.props.lang === 'ar'? 'arabicfont':''}>
                    <a href="https://play.google.com/store/apps/details?id=com.amineabbaoui.wasatafat">{i18next.t('app8')}</a>
                  </h3>
                </div>
              </div>
              <div className="col-md-2 col-sm-6   zoomIn" data--delay="0.3s">
                <div className="team-member app-icon"> 
                  <div className="image">
                    <span>
                      <img src={app9} path={app9Full} alt="" className="img-responsive myImg-cert" />
                    </span>
                  </div>
                  <h3 className={this.props.lang === 'ar'? 'arabicfont':''}>
                    <a href="https://play.google.com/store/apps/details?id=com.amineabboui.englisharabicdictionary">{i18next.t('app9')}</a>
                  </h3>
                </div>
              </div>
              <div className="col-md-2 col-sm-6" data--delay="0.3s">
                <div className="team-member app-icon">
                  <div className="image">
                    <span>
                      <img src={app10} path={app10Full} alt="" className="img-responsive myImg-cert" />
                    </span>
                  </div>
                  <h3 className={this.props.lang === 'ar'? 'arabicfont':''}>
                    <a href="https://play.google.com/store/apps/details?id=com.amineabbaoui.laryngectomietotal">{i18next.t('app10')}
                </a>
                  </h3>
                </div>
              </div>
              <div className="col-md-2 col-sm-6" data--delay="0.3s">
                <div className="team-member app-icon">
                  <div className="image">
                    <span>
                      <img src={app11} path={app11Full} alt="" className="img-responsive myImg-cert" />
                    </span>
                  </div>
                  <h3 className={this.props.lang === 'ar'? 'arabicfont':''}>
                    <a href="https://play.google.com/store/apps/details?id=com.amineabboui.springframeworkpocket">{i18next.t('app11')}
                </a>
                  </h3>
                </div>
              </div>
              <div className="col-md-2 col-sm-6" data--delay="0.3s">
                <div className="team-member app-icon">
                  <div className="image">
                    <span>
                      <img src={app12} path={app12Full} alt="" className="img-responsive myImg-cert" />
                    </span>
                  </div>
                  <h3 className={this.props.lang === 'ar'? 'arabicfont':''}>
                    <a href="https://play.google.com/store/apps/details?id=com.amineabboui.googlewebtoolkit">{i18next.t('app12')}
                </a>
                  </h3>
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