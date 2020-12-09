import {Component} from 'react';
import { CardHeader, Card, Col, Container, Row, CardBody } from 'reactstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    componentWillMount() {
        fetch('http://localhost:8080/product')
        .then(result => result.json())
        .then(result => {
            this.setState({
                items: result,
            })
        })
    }

    getPromotions = () => {
        let ids = this.props.cartItems.map(o => o.id);
        let promotions = [];
        ids.forEach(element => {
            fetch('http://localhost:8080/product/' + element)
            .then(result => result.json())
            .then(result => {
                promotions.push(result);
                this.props.addPromotion(promotions);
            })  
        });
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
        let loadList = () => {
            console.log(this.state.items)
            let list = this.state.items.map((value, index) => {
                return <Row key={index} style={{marginBottom: '20px'}}>
                        <Col sm="12">
                            <Card>
                                <CardHeader style={{fontWeight: 'bold'}}>
                                        {value.name}
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col sm="6" style={{fontWeight: 'bold'}}>{this.formatValue(value.price)} </Col>
                                        <Col sm="6" className="text-right"><AiOutlinePlusCircle onClick= {() => {this.props.addItem(value)}} style={{cursor: 'pointer'}} color="red" /></Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>;
            });
            let result = (
                <Container className="text-center">
                
                <h3>Choose your items!</h3>
                <div style={{marginBottom: '30px', marginTop: '30px'}}>
                    {list}
                </div>
                </Container>);
            return result;
        }
        
        if(this.state.items) {
            return loadList();
        }

        return(
            <div>Home</div>
        );
    }

}

export default Home;