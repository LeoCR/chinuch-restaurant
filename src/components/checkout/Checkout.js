import React from "react";
import {connect} from 'react-redux';
import CheckoutForm from "./CheckoutForm";
import CheckPayment from './CheckPayment';
import IconPaypal from './IconPaypal';
import IconMasterCard from './IconMasterCard';
import IconVisa from './IconVisa';
import CheckoutPaypalForm from './CheckoutPaypalForm';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import {addPaypalItemsToCart,clearPaypalItems} from '../../actions/paypalActions';
class Checkout extends React.Component{
    componentDidMount(){
        this.props.clearPaypalItems();
        const {orders}=this.props.orders; 
        console.log(cookies.get('reef_chinuch_orders'));
        
        for (let m = 0; m < orders.length; m++) {
            var tempItem={};
            tempItem.name=orders[m].name;
            tempItem.description=orders[m].description.substring(0, 12);
            tempItem.sku=orders[m].id;
            tempItem.unit_amount={};
            tempItem.unit_amount.currency_code="USD";
            tempItem.unit_amount.value=parseFloat(orders[m].price-2).toFixed(2);
            tempItem.tax={};
            tempItem.tax.currency_code="USD";
            tempItem.tax.value="2.00"; 
            tempItem.quantity=orders[m].quantity;
            this.props.addPaypalItemsToCart(tempItem);
        }
    }
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
                         
                        <li className="list-group-item checkout-item-paypal">
                            <CheckPayment method='paypal'/>
                            <IconPaypal/>
                            <CheckoutPaypalForm/>
                        </li> 
                    </ul>
                </div>
            )
        }
    }
}
const mapStateToProps=(state)=>{
    return{
      orders:state.orders,
      paypalItems:state.paypalItems
    }
}
export default connect(mapStateToProps,{addPaypalItemsToCart,clearPaypalItems})(Checkout);
