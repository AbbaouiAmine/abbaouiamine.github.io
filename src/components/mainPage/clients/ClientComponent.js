import React from 'react';

class ClientComponent extends React.Component {
  render() {
    const { srcImg, altImg, titleHref } = this.props;
    const href = titleHref || '#';

    return (
      <a href={href} className="clients-marquee-item a-logo-clients">
        <img src={srcImg} alt={altImg || 'Client logo'} className="clients-marquee-logo" />
      </a>
    );
  }
}

export default ClientComponent;
