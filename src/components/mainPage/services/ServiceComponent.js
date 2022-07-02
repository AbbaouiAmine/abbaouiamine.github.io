import React from 'react'
class ServiceComponent extends React.Component {
  
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="col-sm-4  zoomIn" data--delay="0.0">
                                    <div className="box box-services">
                                        <div className="icon">
                                            <i className={this.props.icon}></i>
                                        </div>
                                        <h4 className={this.props.lang === 'ar'? 'arabicfont heading':'heading'}>{this.props.title}</h4>
                                        <p className={this.props.lang === 'ar'? 'arabicfont':''}>{this.props.description}</p>
                                    </div>
                                </div>
        );
    }
}

export default ServiceComponent;