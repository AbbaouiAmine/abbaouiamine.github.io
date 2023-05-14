import React from 'react'
import { Translation } from 'react-i18next';
import { withTranslation } from 'react-i18next'
import i18next from '../../../i18n'
import cardback from '../../../img/bcardback.png'
import cardfront from '../../../img/bcardfront.png'

class ContactComponent extends React.Component {

  render() {
    return (
      <section id="contact" className=" section section-withe">
        <div className="container clearfix">
          <div className="row">
            <div className="col-md-12">
              <Translation>{t => <h2 className={this.props.lang === 'ar' ? 'arabicfont heading' : 'heading'}>{t('contact')}</h2>}</Translation>
              <div className="row" id="conactcenter">
                <div className="col-md-6">
                  <form id="contact-form" method="post" action="https://formspree.io/f/abbaouiamine.r@gmail.com"
                    className="contact-form form wow fadeIn">
                    <div className="controls">
                      <div className="row">
                        <div className="col-sm-6  ">
                          <div className="form-group">
                            <label htmlFor="name" className={this.props.lang === 'ar' ? 'arabicfont' : ''}>{i18next.t('name')} *</label>
                            <input type="text" name="name" id="name" placeholder={i18next.t('nameph')}
                              required="required" className={this.props.lang === 'ar' ? 'arabicfont form-control' : 'form-control'} />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label htmlFor="surname" className={this.props.lang === 'ar' ? 'arabicfont' : ''}>{i18next.t('firstname')}*</label>
                            <input type="text" name="surname" id="surname" placeholder={i18next.t('firstnameph')}
                              required="required" className={this.props.lang === 'ar' ? 'arabicfont form-control' : 'form-control'} />
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="email" className={this.props.lang === 'ar' ? 'arabicfont' : ''}>{i18next.t('email')} *</label>
                        <input type="email" name="email" id="email" placeholder={i18next.t('emailph')} required="required"
                          className={this.props.lang === 'ar' ? 'arabicfont form-control' : 'form-control'} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="message" className={this.props.lang === 'ar' ? 'arabicfont' : ''}>{i18next.t('message')} *</label>
                        <textarea rows="4" name="message" id="message" placeholder={i18next.t('messageph')}
                          required="required" className={this.props.lang === 'ar' ? 'arabicfont form-control' : 'form-control'}></textarea>
                      </div>
                      <div className="text-center">
                        <input type="submit" value={i18next.t('send')} className={this.props.lang === 'ar' ? 'arabicfont btn btn-primary btn-block' : 'btn btn-primary btn-block'} />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-md-6 wow fadeIn">
                  <p className={this.props.lang === 'ar' ? 'arabicfont' : ''}>{i18next.t('messagetxt1')}</p>
                  <p className={this.props.lang === 'ar' ? 'arabicfont' : ''}>{i18next.t('messagetxt2')}</p>
                  <p className="social">
                    <a href="https://www.facebook.com/abbaouiamine" title="" className="facebook">
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/amineabbaoui/" title="" className="twitter">
                      <i className="ti-linkedin"></i>
                    </a>


                 </p>
{/*                   <p className="social">
                    <button id="myBtnBc">Business card</button>
                    <div id="myModalBc" class="modalBc" >
                      <div class="modal-content-bc">
                        <div class="modal-header-bc">
                          <span class="close-bc">&times;</span>
                        </div>
                        <div class="modal-body-bc">
                        <div class="flip-box-bc">
                          <div class="flip-box-inner-bc">
                            <div class="flip-box-front-bc">
                              <img class="flip-box-bc-img" src={cardback} alt="business card back" />
                            </div>
                            <div class="flip-box-back-bc">
                              <img class="flip-box-bc-img" src={cardfront} alt="business card front" />
                            </div>
                          </div>
                        </div>
                        </div>
                      </div>
                    </div>


                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withTranslation()(ContactComponent);