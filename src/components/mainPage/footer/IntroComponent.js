import React from 'react';
import videoBack from '../../../img/video.mp4'
import logoFire from '../../../img/logoFire.png'
import logoTitle from '../../../img/logoTitle.png'
import logoTitleArabic from '../../../img/logoTitleArabic.png'
import imagebackground from '../../../img/background.png'
import english from '../../../img/english.png'
import frensh from '../../../img/france.png'
import arabic from '../../../img/arabic.png'
import { Translation } from 'react-i18next';
import i18next from 'i18next';



class IntroComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      titre: "BIENVENUE SUR MA MAISON NUMÉRIQUE",
      nom :"ABBAOUI",
      prenom:"Amine",
      profil:"Ingénieur logiciel",
      selectlang:'',
      selectlangicon:'select-lang-en',
      lang:'English'
    };

    this.hadleSelectLang = this.hadleSelectLang.bind(this);
    this.handleLang = this.handleLang.bind(this);

    
  }

  handleClickfr(e) {
              i18next.changeLanguage('fr', (err, t) => {
               if (err) return console.log('something went wrong loading', err);
                        t('key'); // -> same as i18next.t
                        });
  }

  handleClickeng(e) {
    i18next.changeLanguage('en', (err, t) => {
     if (err) return console.log('something went wrong loading', err);
              t('key'); // -> same as i18next.t
              });
}

handleLang(lang)
{
  this.setState({
    selectlang:''
  });


  if(lang=='en')
  {
    document.dir = 'ltr';
    this.setState({
      lang:'English',
      selectlangicon:'select-lang-en'
    });

    i18next.changeLanguage('en', (err, t) => {
      if (err) return console.log('something went wrong loading', err);
               t('key'); // -> same as i18next.t
               });

               this.props.handleUpdtelang('en');
  }
  else if(lang=='fr')
  {
    document.dir = 'ltr';
    this.setState({
      lang:'Français',
      selectlangicon:'select-lang-fr'
    });

    i18next.changeLanguage('fr', (err, t) => {
      if (err) return console.log('something went wrong loading', err);
               t('key'); // -> same as i18next.t
               });
               this.props.handleUpdtelang('fr');     
  }
  else if('ar')
  {
    document.dir = 'rtl';
    this.setState({
      lang:'العربية',
      selectlangicon:'select-lang-ar'
    });

    i18next.changeLanguage('ar', (err, t) => {
      if (err) return console.log('something went wrong loading', err);
               t('key'); // -> same as i18next.t
               });
               this.props.handleUpdtelang('ar');
  }
}

hadleSelectLang(e)
{
  if(this.state.selectlang!='menu-show')
  {
    this.setState({
      selectlang:'menu-show'
    });
  }
  else{
    this.setState({
      selectlang:''
    });
  }
  
}
  
  render() {
    return(
    <div id="intro" className="section intro image-background  active">
      <div className="overlay">
      <div class="bg" id="bg1"></div>
      <div class="bg bg2" id="bg2"></div>
      <div class="bg bg3" id="bg3"></div>
       <div id="backLoader">
        <img id="backLoaderImg" class="animate-flicker" src={logoFire}></img>
      </div> 
      <video id="introVideo" autoPlay loop muted>
       <source src={videoBack} type="video/mp4"/>
      </video>
      <img className="background-img" src={imagebackground}/>
      </div>
      <div>
      <div class="lang-menu dirltr">
                <div onClick={this.hadleSelectLang} className={this.state.selectlangicon+" "+'selected-lang button-4'}>
                    <span class='selectword'  className={document.dir === 'ltr' || !document.dir?'':'arabicfont'}>{this.state.lang}</span>
                </div>
                <ul className={this.state.selectlang}>
                    <li onClick={() => this.handleLang('en')}>
                        <a class="en">English</a>
                    </li>
                    <li onClick={() => this.handleLang('fr')}>
                        <a  class="fr">Français</a>
                    </li>
                    <li onClick={() => this.handleLang('ar')}>
                        <a  className="arabicfont ar">العربية</a>
                    </li>
                </ul>
                
    </div>
      </div>
      <div className="content">
        <div className="container clearfix">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 col-sm-12 wow zoomIn">
            <div className="language-select">
        
    </div>
    
             
              <Translation>
      {
        t => <p className={document.dir === 'ltr' || !document.dir?'roboto':'arabicfont'}>{t('title')} </p>
      }
    </Translation>
    
              <img src={logoFire} id="logoFire" class="wow fadeInDown"/>
              <br/>
              <img src={this.props.lang === 'ar'?logoTitleArabic:logoTitle} id="logoTitle" class="wow fadeInDown"/>
              
             
             
           
                {/* <Translation>{t =>  <p  class="typewrite roboto" data-period="2000" data-type={t('typing1')}>
                  <span class="wrap"></span>
                </p>}</Translation> */}
              
              <Translation>{t => <p className={document.dir === 'ltr' || !document.dir?'roboto typewriter':'arabicfont typewriter'}>{t('profil')} </p>}</Translation>
              <p className="roboto">  
     

             </p>
            </div>
          </div>
        </div>
      </div>
      <a href="#about" className="icon faa-float animated scroll-to">
        <i className="fa fa-angle-double-down"></i>
      </a>
    </div>);
  }
}



export default IntroComponent;
