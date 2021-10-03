import React from "react";

class ParagraphComponent extends React.Component {
    paragraphStyle = {
        padding: "10px 10px 10px 0px",
        fontSize: "20px",
        color: 'rgb(121, 121, 121)',
        fontWeight: "bold"
      };
   
    constructor(props)
   {
       super(props);
   }
    render() {
        return (
            <div>
                <h2 style={this.paragraphStyle}>{this.props.title}</h2>
                <p>{this.props.content}</p>
            </div>
        );
    }
}

export default ParagraphComponent;