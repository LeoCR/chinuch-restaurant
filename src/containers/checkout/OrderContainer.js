import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Checkout from '../../components/checkout/Checkout';
import {connect} from 'react-redux';
import {setOrders,deleteFromCart} from '../../actions/cartActions';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class OrderContainer extends React.Component{
    deleteOrder=(order,e)=>{
        e.preventDefault();
        this.props.deleteFromCart(order.id);
        var _this=this;
        setTimeout(() => {
            cookies.set('reef_chinuch_orders', JSON.stringify(_this.props.orders.orders));
        }, 300);
    }
    componentDidMount(){
        var _this=this;
        if(cookies.get('reef_chinuch_orders')){
            setTimeout(() => {
              _this.props.setOrders(cookies.get('reef_chinuch_orders'))
            },300);
        }
    }
    renderOrders=()=>{
        const {orders}=this.props.orders;
        if(orders.length===0){
            return(
                <div>
                    No products into basket
                </div>
            )
        }
        else{
            return(
                <React.Fragment>
                    <div className="list-orders">
                        {this.props.totalOrders} in the Basket
                        <ul className="list-group">
                            {
                                orders.map(order=>
                                    {
                                        return(
                                            <li className="orders list-group-item" key={order.id} >
                                                <div className="order-item" key={order.id}>
                                                    <div className="order-item-left-side">
                                                        <h3>  {order.name}</h3>
                                                        <h5>Quantity:  {order.quantity}</h5>    
                                                        <p>Price per unit:<span className="badge badge-warning text-dark">${order.price}</span></p>
                                                        <img src={order.picture} alt={order.name} style={{maxWidth:"80px"}}/>
                                                    </div>
                                                    <div className="order-item-right-side">
                                                        <button className="btn btn-danger" onClick={(e)=>this.deleteOrder(order,e)}>X</button>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    } 
                                )
                            }
                        </ul>
                    </div>
                </React.Fragment>
            )
        }
    }
    calculateTotal=()=>{
        var orders=this.props.orders.orders,
        totalPrice=0;
        orders.forEach(function(element) {
            totalPrice+=element.price*element.quantity;
        });
        if(totalPrice===0){
            return(
                <React.Fragment>
                </React.Fragment>
            )
        }
        return(
            <React.Fragment>
                <h1 style={{float:'left'}}>Total:</h1> 
                <h3 style={{float:'left'}}>${totalPrice}</h3>
            </React.Fragment>
        )
    }
    renderCheckout=()=>{
        var orders=this.props.orders.orders;
        if(orders.length===0){
            return(
                <React.Fragment>
                </React.Fragment>
            )
        }
        return(
            <div className="checkout-details">
                <Link className="btn btn-danger" to="/checkout/payment">Pay</Link>
            </div>
        )
    }
    render(){
        return(
            <React.Fragment>
                <Switch>
                    <Route
                        exact
                        path='/checkout'
                        render={() => <React.Fragment>
                            {this.renderOrders()}
                            {this.calculateTotal()}
                            {this.renderCheckout()}
                        </React.Fragment>}
                    />
                    <Route
                        exact
                        path='/checkout/payment'
                        render={() =><React.Fragment>
                            {this.renderOrders()}
                            {this.calculateTotal()}
                             <Checkout/>
                        </React.Fragment>}
                    />
                    <Route exact 
                    path="/payment-successfully" 
                    render={()=><React.Fragment>
                            <h1>Payment Successfully</h1>
                            <p>Thanks by your purchase</p>
                    </React.Fragment>} 
                    />
                </Switch>
            </React.Fragment>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
      orders:state.orders
    }
}
export default connect(mapStateToProps,{setOrders,deleteFromCart})(OrderContainer)