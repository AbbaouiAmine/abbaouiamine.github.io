import React from 'react'

class TechnoComponent extends React.Component {

    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="col-md-3 col-sm-6" data-wow-delay="0.3s">
                <div className="team-member">
                    <div className="image">
                        <a target="_blank"  href={this.props.titleHref}>
                            <img src={this.props.srcImg} alt={this.props.altImg} className="img-responsive" />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default TechnoComponent;