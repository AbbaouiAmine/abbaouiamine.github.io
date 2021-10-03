import React from 'react'

class FooterComponent extends React.Component{

    render()
    {
        return(
            <footer id="last">
    <div className="container" id="footercopy">
      <div className="row copyright">
        <div className="col-md-4">
          <p className="roboto"><i className="fa fa-phone-square"></i> Tel : +212630897665</p>
          <p className="roboto"><i className="fa fa-envelope-o"></i> Email : abbaouiamine@outlook.com</p>
        </div>
        <div className="col-md-5">
          <p className="roboto"><a className="link_roboto" href="https://github.com/AbbaouiAmine">
              <i className="fa fa-github"></i>

              Git : github.com/AbbaouiAmine
            </a>
          </p>
          <p className="roboto"><a className="link_roboto" href="https://pragma-code.blogspot.com/"><i className="fa fa-list-alt"></i> Blog :
            pragma-code.blogspot.com</a></p>
        </div>
        <div className="col-md-3">
          <p className="credit roboto"><i className="fa fa-briefcase"></i> Développeur informatique</p>
          <p className="roboto"><i className="fa fa-copyright"></i> 2020 ABBAOUI Amine</p>
        </div>
      </div>
    </div>
  </footer>
        );
    }
}

export default FooterComponent;