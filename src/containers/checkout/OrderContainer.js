import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Checkout from '../../components/checkout/Checkout';
import PaypalPaymentSuccess from '../../components/checkout/PaypalPaymentSuccess';
import {connect} from 'react-redux';
import {setOrders,deleteFromCart} from '../../actions/cartActions';
import {deletePaypalItemsFromCart} from '../../actions/paypalActions';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class OrderContainer extends React.Component{
    deleteOrder=(e,order)=>{
        e.preventDefault();
        console.log(order);
        this.props.deleteFromCart(order.id);
        this.props.deletePaypalItemsFromCart(order.id);
        var _this=this;
        setTimeout(() => {
            cookies.set('reef_chinuch_orders', JSON.stringify(_this.props.orders.orders), {path: "/"});
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
                                                        <h3 id="order_name">  {order.name}</h3>
                                                        <h5 id="order_quantity">Quantity:  {order.quantity}</h5>    
                                                        <p id="price_per_unit">Price per unit:<span className="badge badge-warning text-dark">${order.price}</span></p>
                                                        <img src={order.picture} alt={order.name} style={{maxWidth:"80px"}}/>
                                                    </div>
                                                    <div className="order-item-right-side">
                                                        <button className="btn btn-danger" onClick={(e)=>this.deleteOrder(e,order)}>X</button>
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
                <h3 style={{float:'left'}}>${totalPrice.toFixed(2)}</h3>
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
                            <div style={{padding:'20px',width:'100%',position:'relative'}}>
                                <h1>Payment Successfully</h1>
                                <p>Thanks by your purchase</p>
                                <a className="btn btn-danger" href='/user/history' target="_parent">View Invoices</a>
                            </div>
                    </React.Fragment>} 
                    />
                    <Route exact 
                    path="/paypal/payment/success" 
                    render={()=><React.Fragment>
                                <PaypalPaymentSuccess/>                
                                </React.Fragment>} 
                    />
                </Switch>
            </React.Fragment>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
      orders:state.orders,
      user:state.user.user,
      paypalItems:state.paypalItems
    }
}
export default connect(mapStateToProps,{setOrders,deleteFromCart,deletePaypalItemsFromCart})(OrderContainer)
