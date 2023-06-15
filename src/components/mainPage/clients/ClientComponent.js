import React from 'react'
import { Link } from 'react-router-dom';

class ClientComponent extends React.Component {

    render() {
        return (
            <Link to={this.props.titleHref} className="a-logo-clients">
           <div className="col-md-3 col-sm-6" >
                <div>
                    <div className="image">
                            <img src={this.props.srcImg} alt={this.props.altImg} className="img-responsive" />
                    
                    </div>
                </div>
            </div>
            </Link>
        
        );
    }
}

export default ClientComponent;