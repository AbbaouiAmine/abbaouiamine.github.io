import React from "react";
import ContentComponent from "../courseTemplate/ContentComponent";
import FooterComponent from "../courseTemplate/FooterComponent";
import HeaderComponent from "../courseTemplate/HeaderComponent/HeaderComponent";
import MenuComponent from "../courseTemplate/MenuComponent";
import Data from "./data.json"

class HibernateComponent extends React.Component{

    constructor(props)
    {
        super(props);
        this.state = {
            chapterIndex: 0
         }
        this.handler = this.handler.bind(this)
    }


  handler(index) {
      this.setState({chapterIndex:index});
  }

    render()
    {
        require("../../css/styleCourse.css");
        return (
            <div>
                <HeaderComponent/>
                <div class="mui-container-fluid content">
                    <div class="mui-container">
                        <MenuComponent contents={Data.contents} handler = {this.handler} />
                        <ContentComponent content={Data.contents[this.state.chapterIndex]}/>
                    </div>
                </div>
                <div class="clear"></div>
                <FooterComponent/>
            </div>
        )
    }
}

export default HibernateComponent;