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
      cart: [],
      promotions: []
    }
  }

  componentDidMount() {
      let ids = ['C8GDyLrHJb','Dwt5F7KAhi', 'PWWe3w1SDU'];
      let promotions = [];
      ids.forEach(element => {
          fetch('http://localhost:8080/product/' + element)
          .then(result => result.json())
          .then(result => {
              promotions.push(result);
              this.addPromotion(promotions);
          })  
  })
}

  removeItem = (item) => {
    let index = this.state.cart.findIndex((o) => item.id === o.id);
    if(this.state.cart[index]['qty'] > 1) {
      this.state.cart[index]['qty'] -=1;
      this.setState({
        cart: this.state.cart
      })
    } else {
        this.setState({
          cart: this.state.cart.filter((v) => v.id !== item.id)
        })
    }
  }

  addItem = (item) => {
    let index = this.state.cart.findIndex((o) => item.id === o.id);
    if(index === -1) {
      item['qty'] = 1
      this.setState({cart: this.state.cart.concat(item)});
    } else {
      this.state.cart[index]['qty'] = this.state.cart[index]['qty'] + 1;
      this.setState({cart: this.state.cart});
    }

  }

  addPromotion = (items) => {
    this.setState({
      promotions: items
    })
  }

  render () {
    return (
      <BrowserRouter>
        <div className="App">
          <NavbarCustom cartItems={this.state.cart} addItem={this.addItem} removeItem={this.removeItem}/>
          <Switch>
            <Route exact path="/" component={() => <Home addPromotion={this.addPromotion} cartItems={this.state.cart}  addItem={this.addItem}  removeItem={this.removeItem} />}/>
            <Route exact path="/cart" component={() => <Cart promotions={this.state.promotions} cartItems={this.state.cart}  addItem={this.addItem}  removeItem={this.removeItem} />}/> 
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
  
}

export default App;
