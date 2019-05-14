import React,{Component} from 'react';
import {Grid,Paper} from '@material-ui/core';

class ItemBlock extends Component {
    constructor(props){
        super(props);
        this.state = {
            onHover: false,
        }
    }
    onImgHover = () => {
        this.setState({
            onHover: true,
        })
    }
    onImgHoverOff = () => {
        this.setState({
            onHover: false,
        })
    }
    render(){
        const {onHover} = this.state;
        const {img1,img2,price,name} = this.props;
        const srcImg = onHover ? img2 : img1;
        return (
            <Grid  item xs={4}>
                <Paper className='item-block'>
                    <div className='item-container'>
                        <img 
                            className='item-img'
                            onMouseEnter={this.onImgHover}
                            onMouseLeave={this.onImgHoverOff}
                            src={srcImg} 
                            alt={name} 
                        />
                        <div className="pb20">
                            <span className='item-price mb10'>₹{price}</span> 
                            <span><a  className='item-link' href={`#${name}`}>{name}</a></span>
                        </div>
                    </div>
                </Paper>
            </Grid>
        );
    }
}

export default ItemBlock;