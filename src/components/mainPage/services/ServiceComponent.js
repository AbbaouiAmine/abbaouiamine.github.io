import React from 'react'
class ServiceComponent extends React.Component {
  
    render() {
        return (
            <div className="col-sm-4 wow zoomIn" data-wow-delay="0.0">
                                    <div className="box box-services">
                                        <div className="icon">
                                            <i className={this.props.icon}></i>
                                        </div>
                                        <h4 className="heading">{this.props.title}</h4>
                                        <p>{this.props.description}</p>
                                    </div>
                                </div>
        );
    }
}

export default ServiceComponent;