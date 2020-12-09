import { CardHeader, Card, Col, Container, Row, CardBody, Badge, Button } from 'reactstrap';
import { BsTrashFill } from 'react-icons/bs';
import {withRouter} from 'react-router-dom';

const { Component } = require("react");

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            custo: 0,
            discount: 0,
            itemsPromotion: []
        }
    }

    countItems = (items) => {
        if(items.length > 0) {
            return items.map(o => o.qty).reduce((a, c) => { return a + c }); 
        }

        return 0;
    }

    formatValue = (value) => {
        let v = '' + value;
        if(v.length === 3) {
            v = v.substring(0,1) + ',' + v.slice(-2)
        } else if(v.length === 2){
            v = '0,' + v;
        } else{
            v = v.substring(0,2) + ',' + v.slice(-2)
        }
        return '£' + v;
    }

    componentDidMount() {
        if(this.props.cartItems.length > 0) {
            this.props.cartItems.forEach((item) => {
                item['custo'] = 0;
                item['discount'] = 0;
                item['total'] = 0;
            })

            //if burger PWWe3w1SDU
            let indexB = this.props.cartItems.findIndex((o) => 'PWWe3w1SDU' === o.id);
            let indexBP = this.props.promotions.findIndex((o) => 'PWWe3w1SDU' === o.id);
            if(indexB !== -1) {
                let burguerData = this.props.cartItems[indexB];
                let promotionBurguerData = this.props.promotions[indexBP]['promotions'][0];
                burguerData['custo'] = burguerData['price'] * burguerData['qty'];
                burguerData['total'] = burguerData['custo']
                if(burguerData['qty'] >= promotionBurguerData['required_qty']){
                    burguerData['discount'] = burguerData['price'] * promotionBurguerData['free_qty'];
                    burguerData['total'] = burguerData['custo'] - burguerData['discount'];
                }
            }

            //if pizza Dwt5F7KAhi
            let indexP = this.props.cartItems.findIndex((o) => 'Dwt5F7KAhi' === o.id);
            let indexPP = this.props.promotions.findIndex((o) => 'Dwt5F7KAhi' === o.id);
            if(indexP !== -1) {
                let pizzaData = this.props.cartItems[indexP];
                let promotionPizzaData = this.props.promotions[indexPP]['promotions'][0];
                pizzaData['custo'] = pizzaData['price'] * pizzaData['qty'];
                pizzaData['total'] = pizzaData['custo'];
                if(pizzaData['qty'] >= promotionPizzaData['required_qty']){
                    pizzaData['discount'] = (pizzaData['price'] * pizzaData['qty'])  - promotionPizzaData['price'];
                    pizzaData['total'] = pizzaData['custo'] - pizzaData['discount'];
                }
            }

            //if salad C8GDyLrHJb
            let indexS = this.props.cartItems.findIndex((o) => 'C8GDyLrHJb' === o.id);
            let indexSP = this.props.promotions.findIndex((o) => 'C8GDyLrHJb' === o.id);
            if(indexS !== -1) {
                let saladData = this.props.cartItems[indexS];
                let promotionSaladData = this.props.promotions[indexSP]['promotions'][0];
                saladData['custo'] = saladData['price'] * saladData['qty'];
                saladData['total'] = saladData['custo'];
                if(saladData['qty'] >= promotionSaladData['required_qty']){
                    saladData['discount'] = Math.trunc(saladData['custo'] - (saladData['custo']  *((100 - promotionSaladData['amount'])/100)));
                    saladData['total'] = saladData['custo'] - saladData['discount'];
                }
            }

            //if boring fries 4MB7UfpTQs
            let indexF = this.props.cartItems.findIndex((o) => '4MB7UfpTQs' === o.id);
            if(indexF !== -1) {
                let friesData = this.props.cartItems[indexF];
                friesData['custo'] = friesData['price'] * friesData['qty'];
                friesData['total'] = friesData['custo'];
            }
            let total = this.formatValue(this.props.cartItems.reduce((acc, curr) => acc + curr.total, 0));
            let custo = this.formatValue(this.props.cartItems.reduce((acc, curr) => acc + curr.custo, 0));
            let discount = this.formatValue(this.props.cartItems.reduce((acc, curr) => acc + curr.discount, 0));

            this.setState({
                total: total,
                custo: custo,
                discount: discount
            });
        }
    }

    save = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.props.cartItems)
        };
        fetch('http://localhost:8080/basket', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.props.clearOnSave();
                this.props.history.push('/list');
                window.location.reload();
            });
    }
    
    render() {
        let result;
        if(this.props.cartItems.length > 0) {
            result = this.props.cartItems.map((value, index) =>{
                return <Row style={{marginBottom: '10px'}}>
                            <Col sm="1"><Badge color="primary">{index + 1}</Badge></Col>
                            <Col sm="2">{value.qty} x </Col>
                            <Col sm="3">{value.name}</Col>
                            <Col sm="4" style={{fontWeight: 'bold'}}>{this.formatValue(value.price * value.qty)} </Col>
                            <Col sm="2" className="text-right"><BsTrashFill onClick= {() => {this.props.removeItem(value)}} style={{cursor: 'pointer'}} color="red" /></Col>
                </Row>
            })
        } else {
            return (<div style={{marginTop: '15px', fontWeight: 'bold'}}>There is no item on the basket!</div>);
        }
        return(
            <Container className="text-center">
                
            <h3>This is your cart items!</h3>
            <div style={{marginBottom: '30px', marginTop: '30px'}}>
                <Row style={{marginBottom: '20px'}}>
                        <Col sm="8">
                            <Card>
                                <CardHeader style={{fontWeight: 'bold'}}>
                                        Basket Contents
                                </CardHeader>
                            </Card>
                        </Col>
                        <Col sm="4">
                            <Card>
                                <CardHeader style={{fontWeight: 'bold'}}>
                                        Expected Totals
                                </CardHeader>
                            </Card>
                        </Col>
                </Row>
                <Row style={{marginBottom: '20px'}}>
                        <Col sm="8">
                            <Card>
                                <CardBody>
                                    {result}
                                </CardBody>
                                </Card>
                        </Col>
                        <Col sm="4">
                            <Card>
                                <CardBody  className="text-left">
                                    <Row>
                                        <Col sm="6">{this.state.discount === 0 ? 'Total :' :'Raw Total:'}</Col>
                                        <Col sm="6">{this.state.custo}</Col>
                                    </Row>
                                    <Row style={{color: 'green', fontWeight: 'bold'}}>
                                        <Col sm="6">Total Promos: </Col>
                                        <Col sm="6">{this.state.discount}</Col>
                                    </Row>
                                    <Row style={{color: 'black', fontWeight: 'bold'}}>
                                        <Col sm="6">Total Payable: </Col>
                                        <Col sm="6">{this.state.total}</Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                </Row>
                <Row style={{marginBottom: '20px'}}>
                    <Col sm="8">
                        <Button size="lg" color="success" lg onClick={() => {this.save()}}>Finish</Button>
                    </Col> 
                </Row>
            </div>
            </Container>
        );
    }

}

export default withRouter(Cart);