import React from 'react';
import person1 from '../../../img/person-1.png';
import person2 from '../../../img/person-2.png';
import person3 from '../../../img/person-3.png';
import person4 from '../../../img/person-4.png';
import person1Full from '../../../img/person-1-full.png';
import person2Full from '../../../img/person-2-full.png';
import person3Full from '../../../img/person-3-full.png';
import person4Full from '../../../img/person-4-full.png';
import copilotCertThumb from '../../../img/copilot-cert-thumb.png';
import copilotCertFull from '../../../img/copilot-cert-full.png';

import { Translation } from 'react-i18next';
import i18next from '../../../i18n';
import { withTranslation } from 'react-i18next';

const CERTIFICATES = [
  {
    id: 'cert1',
    thumb: person1,
    full: person1Full,
    titleKey: 'certificatt1',
    textKey: 'certificattxt1',
    role: 'Microsoft Technology Associate',
    href: 'https://drive.google.com/file/d/10nyWaI989rxGP-pSKvwXIyph3aJgTuzG/view',
  },
  {
    id: 'cert2',
    thumb: person2,
    full: person2Full,
    titleKey: 'certificatt2',
    textKey: 'certificattxt2',
    role: 'Oracle university',
    href: 'https://drive.google.com/file/d/1SDeNkYimf_2frA5pG2Jpcc0uhANeLvdm/view',
  },
  {
    id: 'cert3',
    thumb: person3,
    full: person3Full,
    titleKey: 'certificatt3',
    textKey: 'certificattxt3',
    role: 'udemy',
    href: 'https://drive.google.com/file/d/1jrmQL0NvGcrlWe20Hl3z6qChXrFSp7Rc/view',
  },
  {
    id: 'cert4',
    thumb: person4,
    full: person4Full,
    titleKey: 'certificatt4',
    textKey: 'certificattxt4',
    role: 'Centralelille',
    href: 'https://drive.google.com/file/d/1byWukZHf3--FkBdujgLQnIZx3gTEqmEO/view',
  },
  {
    id: 'cert5',
    thumb: copilotCertThumb,
    full: copilotCertFull,
    titleKey: 'certificatt5',
    textKey: 'certificattxt5',
    role: 'Microsoft',
    href: null,
    alt: 'GitHub Copilot certificate',
  },
];

class CertificateComponent extends React.Component {
  constructor(props) {
    super(props);
    this.sliderRef = React.createRef();
  }

  componentDidMount() {
    this.centerCertsRow();
    window.addEventListener('resize', this.centerCertsRow);
    window.addEventListener('load', this.centerCertsRow, { once: true });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.centerCertsRow);
    window.removeEventListener('load', this.centerCertsRow);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lang !== this.props.lang) {
      this.centerCertsRow();
    }
  }

  centerCertsRow = () => {
    const slider = this.sliderRef.current;
    if (!slider) return;

    const apply = () => {
      const overflow = slider.scrollWidth - slider.clientWidth;
      slider.scrollLeft = overflow > 0 ? overflow / 2 : 0;
    };

    requestAnimationFrame(apply);
    setTimeout(apply, 450);
  };

  scrollCerts = direction => {
    const slider = this.sliderRef.current;
    if (!slider) return;

    const slide = slider.querySelector('.certs-slide');
    const gap = 24;
    const step = slide ? slide.offsetWidth + gap : 320;

    slider.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  render() {
    const isAr = this.props.lang === 'ar';
    const textClass = isAr ? 'arabicfont' : '';

    return (
      <section id="team" className="section section-gray certs-section">
        <div className="container">
          <Translation>
            {t => (
              <h2 className={isAr ? 'arabicfont heading' : 'heading'}>{t('certificats')}</h2>
            )}
          </Translation>
        </div>

        <div className="certs-slider-wrap">
          <button
            type="button"
            className="certs-nav-btn certs-nav-btn--prev"
            onClick={() => this.scrollCerts(-1)}
            aria-label="Previous certificates"
          >
            <span className="certs-nav-btn__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>

          <div
            className="certs-slider"
            ref={this.sliderRef}
            role="region"
            aria-label="Certificates"
          >
            <div className="certs-track">
              {CERTIFICATES.map(cert => (
                <article key={cert.id} className="certs-slide wow fadeIn">
                  <div className="team-member">
                    <div className="image">
                      <span>
                        <img
                          src={cert.thumb}
                          path={cert.full}
                          alt={cert.alt || ''}
                          className="img-responsive myImg-cert"
                        />
                      </span>
                    </div>
                    <h3 className={textClass}>
                      {cert.href ? (
                        <a href={cert.href} target="_blank" rel="noopener noreferrer">
                          {i18next.t(cert.titleKey)}
                        </a>
                      ) : (
                        i18next.t(cert.titleKey)
                      )}
                    </h3>
                    <p className="role">{cert.role}</p>
                    <div className="ligne" />
                    <div className="text">
                      <p className={textClass}>{i18next.t(cert.textKey)}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="certs-nav-btn certs-nav-btn--next"
            onClick={() => this.scrollCerts(1)}
            aria-label="Next certificates"
          >
            <span className="certs-nav-btn__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </div>
      </section>
    );
  }
}

export default withTranslation()(CertificateComponent);
