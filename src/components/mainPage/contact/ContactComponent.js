import React from 'react'
class ContactComponent extends React.Component
{
render(){
    return(
        <section id="contact" className=" section section-gray">
    <div className="container clearfix">
      <div className="row">
        <div className="col-md-12">
          <h2 className="heading">Contact</h2>
          <div className="row" id="conactcenter">
            <div className="col-md-6">
              <form id="contact-form" method="post" action="https://formspree.io/f/abbaouiamine.r@gmail.com"
                className="contact-form form wow fadeIn">
                <div className="controls">
                  <div className="row">
                    <div className="col-sm-6  ">
                      <div className="form-group">
                        <label htmlFor="name">Nom *</label>
                        <input type="text" name="name" id="name" placeholder="Entrez votre nom de famille"
                          required="required" className="form-control"/>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="surname">Prénom *</label>
                        <input type="text" name="surname" id="surname" placeholder="Entrez votre prénom"
                          required="required" className="form-control"/>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input type="email" name="email" id="email" placeholder="Entrer votre Email" required="required"
                      className="form-control"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message pour moi *</label>
                    <textarea rows="4" name="message" id="message" placeholder="Entrez votre message"
                      required="required" className="form-control"></textarea>
                  </div>
                  <div className="text-center">
                    <input type="submit" value="Envoyer le message" className="btn btn-primary btn-block"/>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-md-6 wow fadeIn">
              <p>Pour me contacter, rien de plus simple! Remplissez tout simplement le formulaire et je vous contacterai
                le
                plus rapidement possible. </p>
              <p>Vous pouvez aussi me contacter sur le réseau de votre choix: facebook ou LinkedIn .</p>
              <p className="social">
                <a href="https://www.facebook.com/abbaouiamine" title="" className="facebook">
                  <i className="fa fa-facebook"></i>
                </a>
                <a href="https://www.linkedin.com/in/amineabbaoui/" title="" className="twitter">
                  <i className="ti-linkedin"></i>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
    );
}
}

export default ContactComponent;