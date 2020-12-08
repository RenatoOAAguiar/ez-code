import { Container, Row } from "reactstrap";

const { Component } = require("react");

class Cart extends Component {
    constructor(props) {
        super(props);
        this.setState({
            total: 0,
            custo: 0,
            discount: 0,
            itemsPromotion: []
        })
    }

    countItems = (items) => {
        if(items.length > 0) {
            return items.map(o => o.qty).reduce((a, c) => { return a + c }); 
        }

        return 0;
    }
    
    render() {
        let result;
        if(this.props.cartItems.length > 0) {
            // Get ids
            result = this.props.cartItems.map((value, index) =>{
                return <Row key={index}>{value.name}</Row>
            })
        } else {
            result = (<div>Empty</div>);
        }
        return(
            <Container>
                {result}
            </Container>
        );
    }

}

export default Cart;