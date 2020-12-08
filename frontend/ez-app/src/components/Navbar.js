import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    PopoverHeader,
    PopoverBody,
    Button,
    UncontrolledPopover,
    Row,
    Col,
    Container,
    Badge
} from 'reactstrap';

import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { BsTrashFill } from 'react-icons/bs';

import {withRouter} from 'react-router-dom';

const style = {
    chartIcon: {
        'marginRight': '15px',
        'fontSize': '20pt',
        'cursor': 'pointer'
    },
    linkStyle: {
        'color': '#080808',
        'fontWeight': 'bold'
    },
    itemsStyle: {
        'fontWeight': 'bold',
        'fontSize': '10pt'
    }
}

let cartItems = [
    {'id': 2, 'name': 'Pizza', 'value': '$ 5,00'},
    {'id': 3, 'name': 'Salad', 'value': '$ 15,00'},
]



  class NavbarCustom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openPopover: false
        }
        this.toggle = this.toggle.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }
    toggle = () => {
        this.setState({
            open: !this.state.open
        })
    };

    removeItem = (item) => {
        cartItems = cartItems.filter((obj) => obj.id !== item.id);
    }

    goToCart = () => {
        this.setState({
            openPopover: false
        })
        this.props.history.push('/cart');
    }

    setPopover = () => {
        this.setState({
            openPopover: !this.state.openPopover
        })
    }
    

    render() {
        const PopoverContent = ({ scheduleUpdate }) => {
            return (
              <>
                <div className="text-center">
                <PopoverHeader>Cart List</PopoverHeader>
                <PopoverBody>
                    {this.props.cartItems.length > 0?
                    <div >
                        <div  style={{'marginBottom': '10px'}}>
                            {this.props.cartItems.map((value, index) => {
                                return  <Container fluid="md">
                                            <Row style={style.itemsStyle} sm="12">
                                                <Col>{index + 1}</Col>
                                                <Col>
                                                    {value.name}
                                                </Col>
                                                <Col>
                                                    <BsTrashFill onClick={() => {this.props.removeItem(value)}} style={{'color': 'red'}} />
                                                </Col>
                                            </Row>
                                        </Container>
                            })}
                        </div>
                        <Button color="success" onClick={() => this.goToCart()}>Finish</Button>
                    </div>
                    : 'Empty!'}
        
                </PopoverBody>
                </div>
              </>
            );
          }
        
        return (
            
            <div>
                <Navbar color="light" light expand="md">
                    <Link to="/" style={style.linkStyle} ><span>Shopping</span></Link>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.open} navbar>
                        <Nav className="mr-auto" navbar>
                            
                        </Nav>
                        <div style={style.chartIcon}>
                            <div style={style.linkStyle} >
                                <Link id="ScheduleUpdateButton"><FaShoppingCart onClick={this.setPopover}/> </Link>
                                <Badge color="danger" className="badge-pill" style={{fontSize: '9pt'}}>{this.props.cartItems.length}</Badge>
                            </div>
                            <UncontrolledPopover trigger="click" placement="bottom" isOpen={this.state.openPopover} target="ScheduleUpdateButton">
                                {({ scheduleUpdate }) => (
                                <PopoverContent scheduleUpdate={scheduleUpdate} />
                                )}
                            </UncontrolledPopover>
                        </div>
                    </Collapse>
                </Navbar>
            </div>
    
    
        )
    }
}

export default withRouter(NavbarCustom);