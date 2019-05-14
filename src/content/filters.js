import React,{Component} from 'react';
import {Grid,FormControl,FormGroup, FormControlLabel,Checkbox, FormLabel} from '@material-ui/core';

class Filters extends Component {
    constructor(props){
        super(props);
        this.state = {
            productType: [],
            productSubtype: [],
            price: [],
            productOccasion: [],
        }
    }
    getListString = (array) => {
        const types = array.reduce((item,value,index) => {
            return item+','+value;
       })
       console.log(types)
       return types;
    }
    createQueryParam = () => {
        const {price,productSubtype,productType,productOccasion} = this.state;
        const {appendQueryParam} = this.props;
        let queryParam='';
        if(productType.length>0){
            queryParam+='product_type:';
            queryParam+=this.getListString(productType);
        }
        if(productSubtype.length>0){
            queryParam+='product_subtype:';
            queryParam+=this.getListString(productSubtype);
        }
        if(productOccasion.length>0){
            queryParam+='product_occasion:';
            queryParam+=this.getListString(productOccasion);
        }
        if(price.length>0){
            queryParam+='price:';
            queryParam+=this.getListString(price);
        }
        appendQueryParam(queryParam); 
    }
    handleChange = filter => (e) => {
        const {productType,productSubtype,price,productOccasion} = this.state;
        switch(filter) {
            case 'product_type:': 
                if(e.target.checked){
                    productType.push(e.target.value);
                    this.setState({
                        productType
                    },() =>  this.createQueryParam())
                }else{
                    this.setState({
                        productType: productType.filter(item => item!== e.target.value)
                    },() =>  this.createQueryParam())
                }
                break;
            case 'product_subtype:':
                if(e.target.checked){
                    productSubtype.push(e.target.value);
                        this.setState({
                            productSubtype
                        },() =>  this.createQueryParam())
                }else{
                    this.setState({
                        productSubtype: productSubtype.filter(item => item!== e.target.value)
                    },() =>  this.createQueryParam())
                }
                break;
            case 'product_occasion:':
                if(e.target.checked){
                    productOccasion.push(e.target.value);
                    this.setState({
                        productOccasion
                    },() =>  this.createQueryParam())
                }else{
                    this.setState({
                        productOccasion: productOccasion.filter(item => item!== e.target.value)
                    },() =>  this.createQueryParam())
                }
                break;
            case 'price:':
                if(e.target.checked){
                    price.push(e.target.value);
                    this.setState({
                        productType
                    },() =>  this.createQueryParam())
                }else{
                    this.setState({
                        price: price.filter(item => item!== e.target.value)
                    },() =>  this.createQueryParam())
                }
                break;
            default:
        }
    }
    getProductTypeFilters = () => {
        const {filters} = this.props;
        const {product_type} = filters;
        const productCheckBoxes = product_type.map(item => {
            return <FormControlLabel
                        key={item.name}
                        control={
                        <Checkbox id={item.name} checked={item.enabled} onChange={this.handleChange('product_type:')} value={item.name} />
                        }
                        label={item.name}
                    />
        })
        return productCheckBoxes;
    }
    getProductSubtypeFilters = () => {
        const {filters} = this.props;
        const {product_subtype} = filters;
        const productCheckBoxes = product_subtype.map(item => {
            return <FormControlLabel
                        key={item.name}
                        control={
                        <Checkbox checked={item.enabled} onChange={this.handleChange('product_subtype:')} value={item.name} />
                        }
                        label={item.name}
                    />
        })
        return productCheckBoxes;
    }
    getProductOccasionFilters = () => {
        const {filters} = this.props;
        const {product_occasion} = filters;
        const productCheckBoxes = product_occasion.map(item => {
            return <FormControlLabel
                        key={item.name}
                        control={
                        <Checkbox checked={item.enabled} onChange={this.handleChange('product_occasion:')} value={item.name} />
                        }
                        label={item.name}
                    />
        })
        return productCheckBoxes;
    }
    getPriceFilters = () => {
        const {filters} = this.props;
        const {price} = filters;
        const productCheckBoxes = price.map(item => {
            return <FormControlLabel
                        key={item.name}
                        control={
                        <Checkbox checked={item.enabled} onChange={this.handleChange('price:')} value={item.name} />
                        }
                        label={item.name}
                    />
        })
        return productCheckBoxes;
    }
    render(){
        const {price,product_subtype,product_type,product_occasion} = this.props.filters;
        return (
            <Grid  item xs={12}>
                <FormControl className='sort-form'>
                        {product_type 
                        ?   <FormGroup>
                                <FormLabel component="legend">Product Type</FormLabel>
                                {this.getProductTypeFilters()}
                            </FormGroup>  
                        : null}
                        {product_subtype 
                        ?  <FormGroup>
                                <FormLabel component="legend">Product SubType</FormLabel>
                                {this.getProductSubtypeFilters()}
                            </FormGroup>  
                        : null}
                        {product_occasion 
                        ?  <FormGroup>
                                <FormLabel component="legend">Product Ocassion</FormLabel>
                                {this.getProductOccasionFilters()}
                            </FormGroup>  
                        : null}
                        {price
                        ?  <FormGroup>
                                <FormLabel component="legend">Price</FormLabel>
                                {this.getPriceFilters()}
                            </FormGroup>  
                        : null
                        }
                </FormControl>
            </Grid>
        );
    }
}

export default Filters;