import React from 'react';
import { Translation } from 'react-i18next';
import { withTranslation } from 'react-i18next';
import i18next from '../../../i18n';

class ContactComponent extends React.Component {
  render() {
    const isAr = this.props.lang === 'ar';
    const textClass = isAr ? 'arabicfont' : '';

    return (
      <section id="contact" className="section section-gray contact-section">
        <div className="container">
          <header className="contact-header">
            <Translation>
              {t => (
                <h2 className={isAr ? 'arabicfont heading contact-heading' : 'heading contact-heading'}>
                  {t('contact')}
                </h2>
              )}
            </Translation>
          </header>

          <div className="contact-layout" id="conactcenter">
            <div className="contact-card contact-form-card wow fadeIn">
              <form
                id="contact-form"
                method="post"
                action="https://formspree.io/f/abbaouiamine.r@gmail.com"
                className="contact-form contact-form-modern"
              >
                <div className="contact-form-grid">
                  <div className="contact-field">
                    <label htmlFor="name" className={textClass}>
                      {i18next.t('name')} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder={i18next.t('nameph')}
                      required
                      className={textClass + ' form-control contact-input'}
                    />
                  </div>
                  <div className="contact-field">
                    <label htmlFor="surname" className={textClass}>
                      {i18next.t('firstname')} *
                    </label>
                    <input
                      type="text"
                      name="surname"
                      id="surname"
                      placeholder={i18next.t('firstnameph')}
                      required
                      className={textClass + ' form-control contact-input'}
                    />
                  </div>
                  <div className="contact-field contact-field-full">
                    <label htmlFor="email" className={textClass}>
                      {i18next.t('email')} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder={i18next.t('emailph')}
                      required
                      className={textClass + ' form-control contact-input'}
                    />
                  </div>
                  <div className="contact-field contact-field-full">
                    <label htmlFor="message" className={textClass}>
                      {i18next.t('message')} *
                    </label>
                    <textarea
                      rows="7"
                      name="message"
                      id="message"
                      placeholder={i18next.t('messageph')}
                      required
                      className={textClass + ' form-control contact-input contact-textarea'}
                    />
                  </div>
                </div>
                <div className="contact-submit-wrap">
                  <input
                    type="submit"
                    value={i18next.t('send')}
                    className={textClass + ' contact-submit-btn'}
                  />
                </div>
              </form>
            </div>

            <aside className="contact-card contact-info-card wow fadeIn">
              <div className="contact-info-body">
                <Translation>
                  {t => <p className={'contact-info-text ' + textClass}>{t('messagetxt1')}</p>}
                </Translation>
                <Translation>
                  {t => <p className={'contact-info-text ' + textClass}>{t('messagetxt2')}</p>}
                </Translation>
              </div>
              <div className="contact-social" role="list">
                <a
                  href="https://www.facebook.com/abbaouiamine"
                  title="Facebook"
                  className="contact-social-link contact-social-link--facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <i className="fa fa-facebook" />
                </a>
                <a
                  href="https://www.linkedin.com/in/amineabbaoui/"
                  title="LinkedIn"
                  className="contact-social-link contact-social-link--linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <i className="ti-linkedin" />
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    );
  }
}

export default withTranslation()(ContactComponent);
