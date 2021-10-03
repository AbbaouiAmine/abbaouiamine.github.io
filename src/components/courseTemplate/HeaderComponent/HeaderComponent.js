import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../img/ico.png";
import contents from "./headerContent.json";

class HeaderComponent extends React.Component {


    headerStyle = {
        backgroundColor: '#fff !important',
        color: '#241f1f',
        top: 0,
        right: 0,
        left: 0,
        margin: '0px',
        padding: '0px',
        zIndex: '111',
        transition: 'left 0.2s',
        boxShadow: '1px 1px 2px #c5c5c5',
        mozBoxShadow: '1px 1px 2px #c5c5c5',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        fontWeight: '700',
        fontSize: '15px',
        wordSpacing: '-0.3em'
    }

    topMenuStyle = {
        "float": "left",
        "padding": "22px 15px",
        "fontSize": "15px"
    }

    logoMenuStyle = {
        "float": "left",
        "padding": "17px 15px",
        "fontSize": "15px"
    }

    topMenuActiveStyle = {
        "float": "left",
        "padding": "22px 15px",
        "fontSize": "15px",
        "backgroundColor": "#f2ba14"

    }

    logoStyle = {
        width: '26px',
        height: '25px',
        marginBottom: '5px'
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header id="header" style={this.headerStyle}>
                <div class="mui-appbar mui-container-fulid">
                    <div class="mui-container">
                        <Link to="/">
                            <div style={this.logoMenuStyle} class="home">
                                <img style={this.logoStyle} src={logo} />
                            </div>
                        </Link>
                        {contents.map(ligne => (
                            <Link to={ligne.href}>
                                <div style={window.location.href.indexOf(ligne.href) > -1?this.topMenuActiveStyle:this.topMenuStyle} class="home">
                                    <span>{ligne.name}</span>
                                </div>
                            </Link>
                        ))}

                    </div>
                </div>
                <div id="banner">


                </div>
            </header>
        );
    }
}

export default HeaderComponent;