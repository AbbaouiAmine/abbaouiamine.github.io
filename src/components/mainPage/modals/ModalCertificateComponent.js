import React from 'react'

class ModalCertificateComponent extends React.Component {
    render() {
        return (
            <div id="myModal-cert" className="modal-cert">
                <span className="close-cert">&times;</span>
                <img className="modal-content-cert" id="img01-cert" alt=""/>
                <div id="caption-cert"></div>
            </div>
        );
    }
}

export default ModalCertificateComponent;