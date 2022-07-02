import React from 'react'
import ServiceComponent from './ServiceComponent';
import { Translation } from 'react-i18next';
import i18next from '../../../i18n'
import { withTranslation } from 'react-i18next'

class ServicesComponent extends React.Component {
    
   
    render() {
        return (
            <section id="services" className="section section-gray ">
                <div className="container clearfix">
                    <div className="row services">
                        <div className="col-md-12">
                            <Translation>{t => <h2 className={this.props.lang === 'ar'? 'arabicfont heading':'heading'}>{t('services')}</h2>}</Translation>
                            <div className="row">
                                <ServiceComponent lang={this.props.lang} title={i18next.t('servicet1')} description={i18next.t('servicetxt1')} icon="ti-desktop"/>
                                <ServiceComponent lang={this.props.lang}  title={i18next.t('servicet2')}  description={i18next.t('servicetxt2')}  icon="ti-printer"/>
                                <ServiceComponent lang={this.props.lang}  title={i18next.t('servicet3')}  description={i18next.t('servicetxt3')} icon="ti-search"/>
                            </div>
                            <div className="row">
                            <ServiceComponent lang={this.props.lang}  title={i18next.t('servicet4')}  description={i18next.t('servicetxt4')} icon="ti-comments"/>
                            <ServiceComponent lang={this.props.lang}  title={i18next.t('servicet5')}  description={i18next.t('servicetxt5')} icon="ti-email"/>
                            <ServiceComponent lang={this.props.lang}  title={i18next.t('servicet6')}  description={i18next.t('servicetxt6')}  icon="ti-layout-sidebar-left"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default withTranslation()(ServicesComponent);