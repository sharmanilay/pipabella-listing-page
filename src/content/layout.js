import React,{Component} from 'react';
import {Grid, Paper,Select,MenuItem, FormControl} from '@material-ui/core';
import ItemBlock from './item-block';
import Filters from './filters';

class Layout extends Component {
    constructor(props){
        super(props);
        this.state = {
            rawData: {},
            baseUrl: 'https://optimus.pipabella.com/v1/search/67?page=1',
            endUrl: '&rows=60',
            isLoading: true,
            sortValue: 'New Arrivals',
            queryPrefix: '&f=',
            queryParams: '',
        }
    }

    componentDidMount(){
        this.fetchData();
    }

    fetchData = () => {
        const {baseUrl,endUrl,queryParams,sortValue} = this.state;
        const sorting = `&sort_type=${sortValue}`;
        const  queryUrl = `${baseUrl}${sorting}${queryParams}${endUrl}`;
        fetch(queryUrl)
        .then(response => response.json())
        .then(rawData => this.setState({ rawData,isLoading: false }));
    }

    showData = () => {
      const {rawData} = this.state;
      const { data } = rawData.results;
      const itemsToShow = data.map((item) => {
        return <ItemBlock 
                  key={item.entity_id}
                  img1={item.image1}
                  img2={item.image2}
                  name={item.name}
                  price={item.final_price}
                />
      })
      return itemsToShow;
    }

    handleSortChange = (e) => {
      this.setState({
        sortValue: e.target.value,
      },() => {
        this.fetchData()
      });
    }

    appendQueryParam = (queryParam) => {
      const {queryPrefix} = this.state;
      const newQuery = `${queryPrefix}${queryParam}`;
      console.log(newQuery);
      this.setState({
        queryParams: newQuery,
      },() => {
        this.fetchData()
      })
    }


    getSortOptions = () => {
      const {rawData, sortValue} = this.state;
      const {finalSort} = rawData;
      const sortOptions = finalSort.map((item) => {
        return <MenuItem value={item.name} key={item.name}> {item.name}</MenuItem>
      })
      return (
        <form>
          <span className="float-left sort-text">Sort By:</span>
          <FormControl className='sort-form'>
            <Select onChange={this.handleSortChange} value={sortValue}>
              {sortOptions}
            </Select>
          </FormControl>
        </form>
      )
    }
    
    getFilters = () => {
      const {rawData} = this.state;
      const filters = rawData.facets[0];
      return <Filters filters={filters} appendQueryParam={this.appendQueryParam} />
    }

    render(){
      const {isLoading} = this.state;
      return (
        <Grid container justify="center">
          <Grid container className='mb10 item-header' item xs={10} spacing={8}>
            <Grid item xs={2}>
              <Paper>Filters</Paper>
            </Grid> 
            <Grid item xs={7}>
              <Paper>What's New</Paper>
            </Grid> 
            <Grid item xs={3}>
              <Paper>
                {!isLoading ?this.getSortOptions() :null}
              </Paper>
            </Grid> 
          </Grid>
          <Grid container item xs={10} spacing={8}>
            <Grid item xs={2}>
              {!isLoading ? this.getFilters(): null}
            </Grid>
            <Grid item xs={10} >
              <Grid container spacing={8}>
                {!isLoading ? this.showData(): null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    }
}

export default Layout;
