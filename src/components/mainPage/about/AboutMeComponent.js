import React from 'react';
import profilImg from'../../../img/template-homepage.jpg';
import { Translation } from 'react-i18next';

class AboutMeComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section id="about" className="section section-withe">
                <div className="container clearfix">
                    <div className="row margin-bottom">
                        <div className="col-md-8 margin-bottom  bounceInDown">
                            <Translation>{t => <h2 className={this.props.lang === 'ar'? 'arabicfont heading':'heading'}>{t('about')}</h2>}</Translation>
            <Translation>{t => <p className={this.props.lang === 'ar'? 'arabicfont lead':'lead'}>{t('abouttext')}</p>}</Translation>
                            <div className="row">
                                <div className="col-sm-6  bounceInLeft " data--delay="0.4s">
                                    <h5 className={this.props.lang === 'ar'? 'arabicfont':''}>
                                        <i className="fa fa-arrows"></i>
                                        <Translation>{t => <span>{t('aboutt1')}</span>}</Translation>
                                        </h5>
                                        
                                        <Translation>{t => <p className={this.props.lang === 'ar'? 'arabicfont':''}>{t('abouttxt1')}</p>}</Translation>
                                </div>
                                <div className="col-sm-6  bounceInLeft " data--delay="0.4s">
                                    <h5 className={this.props.lang === 'ar'? 'arabicfont':''}>
                                        <i className="fa fa-image"></i><Translation>{t => <span>{t('aboutt2')}</span>}</Translation></h5>
                                        <Translation>{t => <p className={this.props.lang === 'ar'? 'arabicfont':''}>{t('abouttxt2')}</p>}</Translation>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6  bounceInLeft " data--delay="0.4s">
                                    <h5 className={this.props.lang === 'ar'? 'arabicfont':''}>
                                        <i className="fa fa-life-ring"></i><Translation>{t => <span>{t('aboutt3')}</span>}</Translation></h5>
                                        <Translation>{t => <p className={this.props.lang === 'ar'? 'arabicfont':''}>{t('abouttxt3')}</p>}</Translation>
                                </div>
                                <div className="col-sm-6  bounceInLeft " data--delay="0.4s">
                                    <h5 className={this.props.lang === 'ar'? 'arabicfont':''}>
                                        <i className="fa fa-trophy"></i><Translation>{t => <span>{t('aboutt4')}</span>}</Translation></h5>
                                        <Translation>{t => <p className={this.props.lang === 'ar'? 'arabicfont':''}>{t('abouttxt4')}</p>}</Translation>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 margin-bottom  slideInRight">
                            {/* <p>
                                <img src="img/template-homepage.jpg" alt="" className="img-responsive" style="border: solid;text-shadow: 2px 2px 4px #000000;">
                            </p> */}
                            <div className="card">
                                <img src={profilImg} alt="John" style={{width:'100%'}} />
                                <Translation>{t => <h1 className={this.props.lang === 'ar'? 'arabicfont name':'name'}  >{t('aboutname')}</h1>}</Translation>
                                <Translation>{t => <p className={this.props.lang === 'ar'? 'arabicfont title':'title'} >{t('aboutprofil')}</p>}</Translation>
                                <div style={{margin: '11px 0',fontSize: '29px'}}>
                                    <a href="#contact" ><i className="fa fa-heart-o"></i></a>
                                </div>
                                <p className="buttonp"></p>
                            </div>
                        </div>
                    </div>


                </div>
            </section>
        );
    }
}

export default AboutMeComponent;