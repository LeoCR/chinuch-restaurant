import React from "react";
import {connect} from 'react-redux';
import CheckoutForm from "./CheckoutForm";
import CheckPayment from './CheckPayment';
import IconPaypal from './IconPaypal';
import IconMasterCard from './IconMasterCard';
import IconVisa from './IconVisa';
import CheckoutPaypalForm from './CheckoutPaypalForm';
class Checkout extends React.Component{
    //https://medium.com/@romanchvalbo/how-i-set-up-react-and-node-with-json-web-token-for-authentication-259ec1a90352
    render(){
        const {orders}=this.props.orders;
        if(orders.length===0){
            return(
                <React.Fragment>
                </React.Fragment>
            )
        }
        else{
            return(
                <div id="payment-method">
                    <ul className="list-group">
                        <li className="list-group-item checkout-item-card selected">
                            <CheckPayment method='card'/>
                            <IconVisa/>
                            <IconMasterCard/>
                            <div className="form-payment method-to-pay">
                                <CheckoutForm/>  
                            </div>
                        </li>
                        {/* 
                        <li className="list-group-item checkout-item-paypal">
                            <CheckPayment method='paypal'/>
                            <IconPaypal/>
                            <CheckoutPaypalForm/>
                        </li> 
                        */}
                    </ul>
                </div>
            )
        }
    }
}
const mapStateToProps=(state)=>{
    return{
      orders:state.orders
    }
}
export default connect(mapStateToProps)(Checkout);
