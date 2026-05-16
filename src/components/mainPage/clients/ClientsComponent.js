import React from 'react';
import client0 from '../../../img/client0.png';
import client1 from '../../../img/client1.png';
import client2 from '../../../img/client2.png';
import client3 from '../../../img/client3.png';
import client4 from '../../../img/client4.png';
import client5 from '../../../img/client5.png';
import client6 from '../../../img/client6.png';
import client7 from '../../../img/client7.png';
import ClientComponent from './ClientComponent';

const CLIENTS = [
  { src: client0, alt: 'Client logo' },
  { src: client1, alt: 'Client logo' },
  { src: client2, alt: 'Client logo' },
  { src: client3, alt: 'Client logo' },
  { src: client4, alt: 'Client logo' },
  { src: client5, alt: 'Client logo' },
  { src: client6, alt: 'Client logo' },
  { src: client7, alt: 'Client logo' },
];

class ClientsComponent extends React.Component {
  render() {
    const marqueeClients = [...CLIENTS, ...CLIENTS];

    return (
      <section id="clients" className="section section-withe">
        <div className="container-fluid clients-marquee-wrap">
          <div className="clients-marquee" aria-label="Clients">
            <div className="clients-marquee-track">
              {marqueeClients.map((client, index) => (
                <ClientComponent
                  key={index}
                  srcImg={client.src}
                  altImg={client.alt}
                  titleHref="#"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ClientsComponent;
