import React from "react";
import ParagraphComponent from "./ParagraphComponent";

class ContentComponent extends React.Component {

    titleStyle = {
        "color": "#797979",
        "fontSize": "28px",
        "fontWeight": "Bold",
        "textAlign": "center",
        "lineHeight": "24px",
        "padding": "35px 0px 20px 0px !important",
        "margin": "0px"
    };

    contentStyle = {
        "minHeight": "1000px",
        "marginTop": "10px",
        "boxSizing": "border-box",
        "marginRight": "auto",
        "marginLeft": "auto",
        "paddingLeft": "15px",
        "paddingRight": "15px",
        "background": "#fff",
        "marginBottom": "15px",
        "borderRadius": "8px"
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div style={this.contentStyle} class="mui-col-md-6">
                <h1 style={this.titleStyle}>{this.props.content.chapter}</h1>
                <hr />
                <div class="clearer"></div>
                {
                    this.props.content.parahraphs.map(ligne => (
                        <ParagraphComponent title={ligne.title} content={ligne.text} />
                    ))
                }
            </div>
        );
    }
}

export default ContentComponent;