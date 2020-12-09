import { CardHeader, Card, Col, Container, Row, CardBody, Badge } from 'reactstrap';

const { Component } = require("react");

class ListShoppings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shoppings: []
        }
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
        fetch('http://localhost:8080/basket')
        .then(response => response.json())
        .then(data => {
            this.setState({
                shoppings: data
            })
        });
    }
    
    render() {
        let result;
        if(this.state.shoppings.length > 0) {
            result = this.state.shoppings.map((value, i) =>{
                let products = value.products.map((item, index) => {
                    return <Row style={{marginBottom: '10px'}}>
                                <Col sm="1"><Badge color="primary">{index + 1}</Badge></Col>
                                <Col sm="2">{item.qty} x </Col>
                                <Col sm="3">{item.name}</Col>
                                <Col sm="4" style={{fontWeight: 'bold'}}>{this.formatValue(item.custo)} </Col>
                                <Col sm="2" style={{fontWeight: 'bold', color: 'green'}}>{this.formatValue(item.discount)} </Col>
                    </Row>
                })
            products = <Card style={{marginBottom: '20px'}}><CardHeader style={{textAlign: 'left', fontWeight: 'bold'}}>{value.id}</CardHeader><CardBody>{products}</CardBody></Card>
                return products;
            })
        } else {
            return (<div style={{marginTop: '15px', fontWeight: 'bold'}}>There is no item on the basket!</div>);
        }
        return(
            <Container className="text-center">
                
            <h3>List of your items!</h3>
            <div style={{marginBottom: '30px', marginTop: '30px'}}>
                <div style={{marginBottom: '20px'}}>
                       {result}
                </div>
            </div>
            </Container>
        );
    }

}

export default ListShoppings;