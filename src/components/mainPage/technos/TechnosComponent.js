import React from 'react'
import techno1 from '../../../img/techno-1.png'
import techno2 from '../../../img/techno-2.png'
import techno3 from '../../../img/techno-3.png'
import techno4 from '../../../img/techno-4.png'
import techno5 from '../../../img/techno-5.png'
import techno6 from '../../../img/techno-6.png'
import techno7 from '../../../img/techno-7.png'
import techno8 from '../../../img/techno-8.png'
import TechnoComponent from './TechnoComponent'

class TechnosComponent extends React.Component {

  render() {
    return (
      <section id="techno" className="section section-withe">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="heading">Technologies</h2>
              <p className="text-center">Une collection de technologies permettant de répondre aux besoins de votre système d'information.</p>
              <div className="row"></div>
              <TechnoComponent srcImg={techno1} altImg="Java" titleHref="/java" title="Java Standard Edition" />
              <TechnoComponent srcImg={techno2} altImg="Angular" titleHref="/angular" title="Framework Angular" />
              <TechnoComponent srcImg={techno3} altImg="" titleHref={window.origin+'/react'} title="React Js" />
              <TechnoComponent srcImg={techno4} altImg="" titleHref="android" title="Andoird" />
              <div className="row"></div>
              <TechnoComponent srcImg={techno5} altImg="" titleHref="/spring" title="Spring" />
              <TechnoComponent srcImg={techno6} altImg="" titleHref="/photoshop" title="Photoshop" />
              <TechnoComponent srcImg={techno7} altImg="" titleHref="/uml" title="UML" />
              <TechnoComponent srcImg={techno8} altImg="" titleHref="/linux" title="Linux" />
              <div className="row"></div>
              <TechnoComponent srcImg={techno5} altImg="" titleHref="/spring" title="Spring" />
              <TechnoComponent srcImg={techno6} altImg="" titleHref="/photoshop" title="Photoshop" />
              <TechnoComponent srcImg={techno7} altImg="" titleHref="/uml" title="UML" />
              <TechnoComponent srcImg={techno8} altImg="" titleHref="/linux" title="Linux" />
            </div>
          </div>
        </div>
      </section>
    );
  }

}

export default TechnosComponent;