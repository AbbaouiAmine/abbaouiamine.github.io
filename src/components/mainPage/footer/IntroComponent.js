import React from 'react';
import videoBack from '../../../img/video.mp4'
import logoFire from '../../../img/logoFire.png'
import logoTitle from '../../../img/logoTitle.png'
import logoTitleArabic from '../../../img/logoTitleArabic.png'
import imagebackground from '../../../img/background.png'
import { Translation } from 'react-i18next';
import i18next from 'i18next';

const LANGUAGES = [
  { code: 'en', label: 'English', flagClass: 'en' },
  { code: 'fr', label: 'Français', flagClass: 'fr' },
  { code: 'ar', label: 'العربية', flagClass: 'ar', arabic: true },
];

const NAV_LINKS = [
  { href: '#intro', key: 'home' },
  { href: '#about', key: 'about' },
  { href: '#services', key: 'services' },
  { href: '#techno', key: 'technos' },
  { href: '#googleplay', key: 'googleplay' },
  { href: '#team', key: 'certificats' },
  { href: '#contact', key: 'contact' },
];

function normalizeLang(lang) {
  if (lang === 'fr' || lang === 'ar') return lang;
  return 'en';
}

class IntroComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLang: normalizeLang(props.lang),
      activeSection: 'intro',
      introUiReady: false,
    };
    this.handleLang = this.handleLang.bind(this);
    this.handleNavClick = this.handleNavClick.bind(this);
    this.updateActiveSection = this.updateActiveSection.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.onIntroLoaderDone = this.onIntroLoaderDone.bind(this);
    this.scrollTick = null;
  }

  componentDidMount() {
    const loader = document.getElementById('backLoader');
    const loaderHidden =
      !loader ||
      loader.style.display === 'none' ||
      window.getComputedStyle(loader).display === 'none';

    if (loaderHidden) {
      this.setState({ introUiReady: true });
    } else {
      window.addEventListener('introLoaderDone', this.onIntroLoaderDone);
    }

    this.updateActiveSection();
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onScroll, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('introLoaderDone', this.onIntroLoaderDone);
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onScroll);
    if (this.scrollTick) {
      cancelAnimationFrame(this.scrollTick);
    }
  }

  onIntroLoaderDone() {
    this.setState({ introUiReady: true });
  }

  onScroll() {
    if (this.scrollTick) return;
    this.scrollTick = requestAnimationFrame(() => {
      this.scrollTick = null;
      this.updateActiveSection();
    });
  }

  updateActiveSection() {
    const scrollPos = window.pageYOffset + 120;
    let active = 'intro';

    NAV_LINKS.forEach(({ href }) => {
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollPos) {
        active = id;
      }
    });

    if (this.state.activeSection !== active) {
      this.setState({ activeSection: active });
    }
  }

  handleNavClick(e, href) {
    e.preventDefault();
    const targetId = href.replace('#', '');
    this.setState({ activeSection: targetId });
    const target = document.getElementById(targetId);
    if (!target) return;

    const offset = 50;
    const top =
      target.getBoundingClientRect().top + window.pageYOffset - offset;

    if (window.jQuery && window.jQuery.fn.scrollTo) {
      window.jQuery('body').scrollTo(window.jQuery('#' + targetId), 800, {
        offset: -offset,
      });
    } else {
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  handleLang(lang) {
    const code = normalizeLang(lang);

    if (code === 'ar') {
      document.dir = 'rtl';
    } else {
      document.dir = 'ltr';
    }

    this.setState({ currentLang: code });

    i18next.changeLanguage(code, (err) => {
      if (err) console.log('something went wrong loading', err);
    });

    this.props.handleUpdtelang(code);
  }

  render() {
    return(
    <div
      id="intro"
      className={
        'section intro image-background active' +
        (this.state.introUiReady ? ' intro-ui-ready' : '')
      }
    >
      <div className="overlay">
      <div class="bg" id="bg1"></div>
      <div class="bg bg2" id="bg2"></div>
      <div class="bg bg3" id="bg3"></div>
       <div id="backLoader">
        <img id="backLoaderImg" class="animate-flicker" src={logoFire} alt="" />
      </div>
      <video id="introVideo" autoPlay loop muted>
       <source src={videoBack} type="video/mp4"/>
      </video>
      <img className="background-img" src={imagebackground} alt="" />
      </div>
      <div
        className="intro-top-bar dirltr"
        dir="ltr"
        aria-hidden={!this.state.introUiReady}
      >
        <nav
          className={
            'intro-nav-bar' +
            (this.state.currentLang === 'ar' ? ' arabicfont' : '')
          }
          aria-label="Main"
        >
          <div className="intro-nav-track">
            {NAV_LINKS.map(({ href, key }) => {
              const sectionId = href.replace('#', '');
              const isActive = this.state.activeSection === sectionId;
              return (
                <Translation key={key}>
                  {t => (
                    <a
                      href={href}
                      className={
                        'intro-nav-link scroll-to' +
                        (isActive ? ' intro-nav-link-active' : '')
                      }
                      onClick={e => this.handleNavClick(e, href)}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {t(key)}
                    </a>
                  )}
                </Translation>
              );
            })}
          </div>
        </nav>
        <div className="lang-switcher-wrap">
          <div className="lang-switcher dirltr" aria-label="Language">
            <div className="lang-switcher-track" role="group">
              {LANGUAGES.map(({ code, label, flagClass, arabic }) => (
                <button
                  key={code}
                  type="button"
                  className={
                    'lang-option' +
                    (this.state.currentLang === code ? ' lang-option-active' : '') +
                    (arabic ? ' arabicfont' : '')
                  }
                  onClick={() => this.handleLang(code)}
                  aria-pressed={this.state.currentLang === code}
                  aria-label={label}
                >
                  <span className={'lang-flag ' + flagClass} aria-hidden="true" />
                  <span className="lang-code">{code.toUpperCase()}</span>
                  <span className="lang-label">{label}</span>
                </button>
              ))}
            </div>
          </div>
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

              <img src={logoFire} id="logoFire" class="wow fadeInDown" alt="" />
              <br/>
              <img src={this.state.currentLang === 'ar' ? logoTitleArabic : logoTitle} id="logoTitle" class="wow fadeInDown" alt="" />

                {/* <Translation>{t =>  <p  class="typewrite roboto" data-period="2000" data-type={t('typing1')}>
                  <span class="wrap"></span>
                </p>}</Translation> */}

              <Translation>
                {t => (
                  <div
                    className={
                      'intro-profil-wrap ' +
                      (document.dir === 'ltr' || !document.dir
                        ? 'roboto'
                        : 'arabicfont')
                    }
                  >
                    <span className="intro-profil-line" aria-hidden="true" />
                    <p className="intro-profil typewriter">{t('profil')}</p>
                    <span className="intro-profil-line" aria-hidden="true" />
                  </div>
                )}
              </Translation>
              <Translation>
                {t => (
                  <p
                    className={
                      document.dir === 'ltr' || !document.dir
                        ? 'intro-tagline'
                        : 'intro-tagline arabicfont'
                    }
                  >
                    {t('introTagline')}
                  </p>
                )}
              </Translation>
              <div className="intro-cta-wrap">
                <Translation>
                  {t => (
                    <a
                      href="#googleplay"
                      className="intro-cta-btn scroll-to"
                      onClick={e => this.handleNavClick(e, '#googleplay')}
                    >
                      <span>{t('introCta')}</span>
                      <span className="intro-cta-arrow" aria-hidden="true">
                        →
                      </span>
                    </a>
                  )}
                </Translation>
              </div>
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
