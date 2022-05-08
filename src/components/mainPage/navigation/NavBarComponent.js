
import React from 'react';
import logo from '../../../img/logo.png'

class NavBarComponent extends React.Component
{
 
    render()
    {
        return(
            <header className="header section">
            <div className="sticky-wrapper">
              <div role="navigation" className="navbar navbar-default">
                <div className="container">
                  <div className="navbar-header">
                    <button type="button" data-toggle="collapse" data-target=".navbar-collapse" className="navbar-toggle">
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                    </button>
                    <a href="#intro" className="navbar-brand scroll-to">
                      <img src={logo} alt="logo"/>
                    </a>
                  </div>
                  <div id="navigation" className="collapse navbar-collapse">
                    <ul className="nav navbar-nav navbar-right">
                      <li className="active">
                        <a href="#intro">Accueil</a>
                      </li>
                      <li>
                        <a href="#about">À propos </a>
                      </li>
                      <li>
                        <a href="#services">Services</a>
                      </li>
                      <li>
                        <a href="#techno">Technologies</a>
                      </li>
                      <li>
                        <a href="#portfolio">Projets</a>
                      </li>
                      {/* <li>
                        <a href="#youtube">Youtube</a>
                      </li> */}
                      <li>
                        <a href="#team">Certificats</a>
                      </li>
                      <li>
                        <a href="#contact">Contact</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </header>
        );
    }
} 

export default NavBarComponent;