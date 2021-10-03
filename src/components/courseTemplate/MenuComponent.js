import React from 'react'

class menuComponent extends React.Component {

    //==================Styles
    //===============================================
    menuStyle = {
        backgroundColor: '#fff',
        marginRight: '10px',
        borderRadius: '8px',
        padding: '30px 0px 30px 0px'
    }

    liStyle = {
        padding: '15px 6px 15px 30px'
    }

    liActiveStyle = {
        padding: '15px 6px 15px 30px',
        backgroundColor: '#f2ba14'
        
    }

    //==================functions
    //===============================================
    constructor(props) {
        super(props);
        this.props = props;
        this.state={activeIndex:0};
    }

    menuItemClick = (index) => {
        this.props.handler(index);
        this.setState({activeIndex:index});
     }

    //==================Render
    //===============================================
    render() {
        return (

            <div style={this.menuStyle} class="mui-col-md-3">

                <ul class="toc chapters">
                    {this.props.contents.map(ligne => (
                        <li  onClick={() => this.menuItemClick(ligne.index)} style={this.liStyle} style={this.state.activeIndex==ligne.index?this.liActiveStyle:this.liStyle} >{ligne.chapter}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default menuComponent;





