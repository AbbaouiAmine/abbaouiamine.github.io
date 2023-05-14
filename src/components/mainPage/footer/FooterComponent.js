import React from 'react'
import { Translation } from 'react-i18next';
import i18next from '../../../i18n'
import { withTranslation } from 'react-i18next'

class FooterComponent extends React.Component{

    render()
    {
        return(
            <footer id="last">
    <div className="container" id="footercopy">
      <div className="row copyright">
        <div className="col-md-4">
          <p><i className="fa fa-phone-square"></i> <span className={this.props.lang === 'ar'? 'arabicfont':'roboto'}>{i18next.t('tel')}</span> : +32470710834</p>
          <p className="roboto"><i className="fa fa-envelope-o"></i> <span className={this.props.lang === 'ar'? 'arabicfont':'roboto'}>{i18next.t('email')}</span> : contact@amineabbaoui.com</p>
        </div>
        <div className="col-md-5">
          <p className="roboto"><a className="link_roboto" href="https://github.com/AbbaouiAmine">
              <i className="fa fa-github"></i>
               Git : github.com/AbbaouiAmine
            </a>
          </p>
          <p className="roboto"><a className="link_roboto" href="https://pragma-code.blogspot.com/"><i className="fa fa-list-alt"></i> <span className={this.props.lang === 'ar'? 'arabicfont':'roboto'}>{i18next.t('blog')} :</span>
            pragma-code.blogspot.com</a></p>
        </div>
        <div className="col-md-3">
          <p className="credit roboto"><i className="fa fa-briefcase"></i> <span className={this.props.lang === 'ar'? 'arabicfont':'roboto'}>{i18next.t('profil')}</span></p>
          <p className="roboto"><i className="fa fa-copyright"></i> <span className={this.props.lang === 'ar'? 'arabicfont':'roboto'}>{i18next.t('copyright')}</span></p>
        </div>
      </div>
    </div>
  </footer>
        );
    }
}

export default withTranslation()(FooterComponent);