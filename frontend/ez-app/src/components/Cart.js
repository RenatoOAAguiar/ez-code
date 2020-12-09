import { CardHeader, Card, Col, Container, Row, CardBody, Badge, Button } from 'reactstrap';
import { BsTrashFill } from 'react-icons/bs';

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
        } else{
            v = v.substring(0,2) + ',' + v.slice(-2)
        }
        return '£' + v;
    }
    
    render() {
        let result;
        if(this.props.cartItems.length > 0) {
            // Get ids
            result = this.props.cartItems.map((value, index) =>{
                return <Row style={{marginBottom: '10px'}}>
                            <Col sm="1"><Badge color="primary">{index + 1}</Badge></Col>
                            <Col sm="2">{value.qty} x </Col>
                            <Col sm="3">{value.name}</Col>
                            <Col sm="4" style={{fontWeight: 'bold'}}>{this.formatValue(value.price)} </Col>
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
                                        <Col sm="6">{this.state.discount == 0 ? 'Total :' :'Raw Total:'}</Col>
                                        <Col sm="6">{this.state.total}</Col>
                                    </Row>
                                    <Row>
                                        <Col sm="6">Total Promos: </Col>
                                        <Col sm="6">{this.state.discount}</Col>
                                    </Row>
                                    <Row>
                                        <Col sm="6">Total Payable: </Col>
                                        <Col sm="6">{this.state.custo}</Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                </Row>
                <Row style={{marginBottom: '20px'}}>
                    <Col sm="8">
                        <Button size="lg" color="success" lg onClick={() => {}}>Finish</Button>
                    </Col> 
                </Row>
            </div>
            </Container>
        );
    }

}

export default Cart;