import React from 'react'

class ProjectModalComponent extends React.Component{
    render()
    {
        return(
            <div id="myModal" className="modal">
            <span className="close">&times;</span>
            {/* <img className=  "modal-content" id="img01"> */}
            <iframe id="iframe01" className="modal-content" width="100%" height="564" frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            <div id="caption"></div>
          </div>
        );
    }
}

export default ProjectModalComponent;