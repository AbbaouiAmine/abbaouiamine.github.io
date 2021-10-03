import React from 'react'
import ContentComponent from './ContentComponent.js';
import FooterComponent from './FooterComponent.js';
import HeaderComponent from './HeaderComponent/HeaderComponent.js';
import Menu from './MenuComponent.js'
class ReactIndexComponent extends React.Component {

    render() {
        require("../../css/styleCourse.css");
        return (
            <div>
                <HeaderComponent/>
                <div class="mui-container-fluid content">
                    <div class="mui-container">
                        <Menu/>
                        <ContentComponent title="Title test"/>
                    </div>
                </div>
                <div class="clear"></div>
                <FooterComponent/>
            </div>
        );
    }
}
export default ReactIndexComponent;