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
              <ClientComponent srcImg={client0} altImg="" titleHref="#" title="" />
              <ClientComponent srcImg={client1} altImg="" titleHref="#" title="" />
              <ClientComponent srcImg={client2} altImg="" titleHref="#" title="" />
              <ClientComponent srcImg={client3} altImg="" titleHref="#" title="" />
              <div className="row"></div>
              <ClientComponent srcImg={client4} altImg="" titleHref="#" title="" />
              <ClientComponent srcImg={client5} altImg="" titleHref="#" title="" />
              <ClientComponent srcImg={client6} altImg="" titleHref="#" title="" />
              <ClientComponent srcImg={client7} altImg="" titleHref="#" title="" />
            </div>
          </div>
        </div>
      </section>
    );
  }

}

export default ClientsComponent;