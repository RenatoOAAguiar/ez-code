import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import NavbarCustom from './components/Navbar';
import Cart from './components/Cart';
import { Component } from 'react';

class App extends Component{


  constructor(props) {
    super(props);
    this.state = {
      cart: []
    }
  }

  removeItem = (item) => {
    this.setState({
      cart: this.state.cart.filter((v) => v.id !== item.id)
    })
  }

  addItem = (item) => {
    this.setState({cart: this.state.cart.concat(item)});
  }

  render () {
    return (
      <BrowserRouter>
        <div className="App">
          <NavbarCustom cartItems={this.state.cart} addItem={this.addItem} removeItem={this.removeItem}/>
          <Switch>
            <Route exact path="/" component={() => <Home addItem={this.addItem}  removeItem={this.removeItem} />}/>
            <Route exact path="/cart" component={() => <Cart addItem={this.addItem}  removeItem={this.removeItem} />}/> 
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
  
}

export default App;
