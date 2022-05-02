import React from 'react'
import { Link } from 'react-router-dom';

class TechnoComponent extends React.Component {

    render() {
        return (
            <Link to={this.props.titleHref}>
           <div className="col-md-3 col-sm-6 wow zoomIn" data-wow-delay="0.3s">
                <div className="team-member">
                    <div className="image">
                            <img src={this.props.srcImg} alt={this.props.altImg} className="img-responsive" />
                        
                    </div>
                </div>
            </div>
            </Link>
        
        );
    }
}

export default TechnoComponent;