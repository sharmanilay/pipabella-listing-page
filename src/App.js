import React,{Component} from 'react';
import './App.css';
import Header from  './header';
import Layout from './content/layout';
class App extends Component {
  render(){
    return (
      <div className="App">
         <Header />
         <Layout />
      </div>
    );
  }
}

export default App;
