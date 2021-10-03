import React from "react";

class FooterComponent extends React.Component {

    footerStyle = {
        height: 135,
        backgroundColor: '#fff',
        color: '#fff',
        width: '100%',
        paddingTop:'30px'
    };

    footerAStyle = {
        color: '#7d7d7d',
        textDecoration: 'none'
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer style={this.footerStyle}>
                <div class="mui--text-center">
                    <ul class="mui-list--inline mui--text-body2 mui--text-light">
                        <li><a style={this.footerAStyle} href="https://www.tutorialspoint.com/about/index.htm"><i class="fal fa-globe"></i> About us</a></li>
                        <li><a style={this.footerAStyle} href="https://www.tutorialspoint.com/about/return_refund_policy.htm"> <i class="fal fa-asterisk"></i> Refund Policy</a></li>
                        <li><a style={this.footerAStyle} href="https://www.tutorialspoint.com/about/about_terms_of_use.htm"><i class="fal fa-asterisk"></i> Terms of use</a></li>
                        <li><a style={this.footerAStyle} href="https://www.tutorialspoint.com/about/about_privacy.htm"> <i class="fal fa-shield-check"></i> Privacy Policy</a></li>
                        <li><a style={this.footerAStyle} href="https://www.tutorialspoint.com/about/faq.htm"><i class="fal fa-question-circle"></i> FAQ's</a></li>
                        <li><a style={this.footerAStyle} href="https://www.tutorialspoint.com/about/contact_us.htm"><i class="fal fa-map-marker-alt"></i> Contact</a></li>
                    </ul>
                    <div class="mui--text-caption mui--text-light bottom-copyright-text">&copy; Copyright 2021. All Rights Reserved.</div>
                </div>

            </footer>

        );
    }
}

export default FooterComponent;