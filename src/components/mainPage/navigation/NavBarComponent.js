
import React from 'react';
import logo from '../../../img/logo.png'
import logoArabic from '../../../img/logo_arabic.png'
import { Translation } from 'react-i18next';
import i18next from 'i18next';

class NavBarComponent extends React.Component
{

  constructor(props) {
    super(props)
  }
 
    render()
    {
        return(
            <header className="header section">
            <div className="sticky-wrapper">
              <div role="navigation" className="navbar navbar-default">
                <div className="container">
                  <div className="navbar-header">
                    <button type="button" data-toggle="collapse" data-target=".navbar-collapse" className="navbar-toggle">
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                    </button>
                    <a href="#intro" className="navbar-brand scroll-to">
                      <img src={this.props.lang === 'ar'?logoArabic:logo} alt="logo"/>
                    </a>
                  </div>
                  <div id="navigation" className="collapse navbar-collapse">
                    <ul className={this.props.lang === 'ar'?'nav navbar-nav navbar-right arabicfont reverse_ul':'nav navbar-nav navbar-right'}>
                      <li className={this.props.lang === 'ar'?'active reverse_ul':'active'}> 

                        <Translation>{t => <a href="#intro">{t('home')}</a>}</Translation>
                      </li>
                      <li className={this.props.lang === 'ar'?' reverse_ul':''}>  
                        <Translation>{t => <a href="#about">{t('about')}</a>}</Translation>
                      </li>
                      <li className={this.props.lang === 'ar'?' reverse_ul':''}>
                        <Translation>{t => <a href="#services">{t('services')}</a>}</Translation>
                        
                      </li>
                      <li className={this.props.lang === 'ar'?'reverse_ul':''}>
                        <Translation>{t => <a href="#techno">{t('technos')}</a>}</Translation>
                        
                      </li>
                      <li className={this.props.lang === 'ar'?'reverse_ul':''}> 
                        <Translation>{t => <a href="#portfolio">{t('projects')}</a>}</Translation>
                        
                      </li>
                      <li className={this.props.lang === 'ar'?'reverse_ul':''}> 
                        <Translation>{t => <a href="#googleplay">{t('googleplay')}</a>}</Translation>
                        
                      </li>
                      {/* <li>
                        <a href="#youtube">Youtube</a>
                      </li> */}
                      <li className={this.props.lang === 'ar'?'reverse_ul':''}>
                        <Translation>{t => <a href="#team">{t('certificats')}</a>}</Translation>
                      </li>
                      <li className={this.props.lang === 'ar'?'reverse_ul':''}>  
                        <Translation>{t => <a href="#contact">{t('contact')}</a>}</Translation>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </header>
        );
    }
} 

export default NavBarComponent;