import React from 'react'
import client0 from '../../../img/client0.png'
import client1 from '../../../img/client1.png'
import client2 from '../../../img/client2.png'
import client3 from '../../../img/client3.png'
import client4 from '../../../img/client4.png'
import client5 from '../../../img/client5.png'
import client6 from '../../../img/client6.png'
import client7 from '../../../img/client7.png'
import ClientComponent from './ClientComponent'
import { Translation } from 'react-i18next';

class ClientsComponent extends React.Component {

  render() {
    return (
      <section id="clients" className="section section-withe">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="row"></div>
              <ClientComponent srcImg={client0} altImg="Java" titleHref="/java" title="Java Standard Edition" />
              <ClientComponent srcImg={client1} altImg="Angular" titleHref="/angular" title="Framework Angular" />
              <ClientComponent srcImg={client2} altImg="" titleHref={window.origin+'/git'} title="React Js" />
              <ClientComponent srcImg={client3} altImg="" titleHref="android" title="Andoird" />
              <div className="row"></div>
              <ClientComponent srcImg={client4} altImg="" titleHref="/spring" title="Spring" />
              <ClientComponent srcImg={client5} altImg="" titleHref="/photoshop" title="Photoshop" />
              <ClientComponent srcImg={client6} altImg="" titleHref="/uml" title="UML" />
              <ClientComponent srcImg={client7} altImg="" titleHref="/linux" title="Linux" />
            </div>
          </div>
        </div>
      </section>
    );
  }

}

export default ClientsComponent;