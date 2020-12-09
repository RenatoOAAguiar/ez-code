import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import NavbarCustom from './components/Navbar';
import Cart from './components/Cart';
import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListShoppings from './components/List';

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
    this.createToast(`${item['name']} removed from the Cart!`, 'success')
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
    this.createToast(`${item['name']} add on the Cart!`, 'success')

  }

  addPromotion = (items) => {
    this.setState({
      promotions: items
    })
  }

  clearOnSave = () => {
    this.state ={
      cart: [],
      promotions: []
    }
  }

  createToast = (text, type) => {
    if(type === 'success') {
      toast.success(text);
    } else {
      toast.error(text);
    }
  }

  render () {
    return (
      <BrowserRouter>
        <div className="App">
          <ToastContainer />
          <NavbarCustom cartItems={this.state.cart} addItem={this.addItem} removeItem={this.removeItem}/>
          <Switch>
            <Route exact path="/" component={() => <Home addPromotion={this.addPromotion} cartItems={this.state.cart}  addItem={this.addItem}  removeItem={this.removeItem} />}/>
            <Route exact path="/cart" component={() => <Cart clearOnSave={this.clearOnSave} promotions={this.state.promotions} cartItems={this.state.cart}  addItem={this.addItem}  removeItem={this.removeItem} />}/> 
            <Route exact path="/list" component={() => <ListShoppings clearOnSave={this.clearOnSave} promotions={this.state.promotions} cartItems={this.state.cart}  addItem={this.addItem}  removeItem={this.removeItem} />}/> 
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
  
}

export default App;
