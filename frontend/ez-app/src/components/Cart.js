const { Component } = require("react");

class Cart extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        
        console.log("HOME ITEMS", this.props.items)
        console.log("HOME CART", this.props.cart)

        return(
            <div>Cart</div>
        );
    }

}

export default Cart;