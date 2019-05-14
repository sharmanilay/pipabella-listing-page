import React,{Component} from 'react';
import logo from './media/download.svg';
import {AppBar, Toolbar, IconButton,Grid, Paper} from '@material-ui/core';
import { AccountCircle, Mail, Notifications, More } from '@material-ui/icons';



class Header extends Component {
  render(){
    return (
        <AppBar className="header mb10" position="sticky" color="default">
          <Toolbar>
            <Grid container justify="center">
              <Grid item xs={3}>
                <a className='nav-link' href="https://www.pipabella.com/spin-the-wheel-2019">Spin the wheel</a>
              </Grid> 
              <Grid item xs={6}>
                <a className="" href="https://www.pipabella.com/"><img src={logo} className="App-logo" alt="logo" /></a>
              </Grid> 
              <Grid item xs={3}>
                <Paper>
                    <div className='float-right'>
                      <IconButton color="inherit">
                          <Mail />
                      </IconButton>
                      <IconButton color="inherit">
                          <Notifications />
                      </IconButton>
                      <IconButton  color="inherit">
                        <AccountCircle />
                      </IconButton>
                      <IconButton color="inherit">
                        <More />
                      </IconButton>
                    </div>
                </Paper>
              </Grid> 
            </Grid>
          </Toolbar>
        </AppBar>
    );
  }
}

export default Header;