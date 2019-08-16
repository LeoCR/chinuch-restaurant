import React from 'react';
import $ from 'jquery';
import CartContainer from "../CartContainer";
import OrderContainer from "./OrderContainer";
import {connect} from 'react-redux';
import {addToCart,setOrders} from '../../actions/cartActions';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class CheckoutApp extends React.Component {
    state={
        showModal:'showBasket',
        product:null,
        hasOrders:false,
        totalOrders:0
    }
    setShowUserDetails=()=>{
        $('body').removeClass('signup');
        this.setState({
          showModal:'showUserDetails'
        })
    }
    setShowOrders=()=>{
        this.setState({
          showModal:'showBasket'
        });
        this.calculateOrders();
        $('.modal').css({'display':'block'});
    }
    calculateOrders=()=>{
        var totalQuantity=0;
        try {
          this.props.orders.orders.forEach(function(element) {
              totalQuantity+=element.quantity;
          });
        } 
        catch (error) {
          console.log(error);
        }
        finally{
          if(totalQuantity<10){
            this.setState({
              totalOrders:'0'+totalQuantity
            })
          }
          else{
            this.setState({
              totalOrders:totalQuantity
            })
          }
        }
        if(totalQuantity>=1){
            this.setState({
              hasOrders:true
            });
        }
    }
    addProductToCart=(product)=>{
        setTimeout(() => {
            $("#productName").val(product.name); 
            $("#quantity-cart").val(1);
            $("#pricePerUnit").val(product.price);
            $("#totalPrice").val(product.price); 
            $('.modal').css({'display':'block'});
        }, 300);
        this.setState({
            product:product
        });
        this.calculateOrders();
    }
    addToCart=(quantity)=>{
        const orderObject = Object.assign({quantity: quantity}, this.state.product);
        this.props.addToCart(orderObject);
        this.calculateOrders();
        cookies.set('reef_chinuch_orders', JSON.stringify(this.props.orders.orders));
    }
    setShowLogin=()=>{
        $('body').removeClass('signup');
        console.log('setShowLogin');
        this.setState({
            showModal:'showLogin'
        })
    }
    componentDidMount(){
        var _this=this;
        if(cookies.get('reef_chinuch_orders')){
          setTimeout(() => {
            _this.props.setOrders(cookies.get('reef_chinuch_orders'));
            _this.calculateOrders();
          },500);
        }
        else{
          console.log('We dont have cookies');
        }
    }
    render() {
        return (
        <React.Fragment> 
            <OrderContainer 
            totalOrders={this.state.totalOrders}/>
            <CartContainer 
                setShowLogin={this.setShowLogin}
                setShowUserDetails={this.setShowUserDetails}
                setShowOrders={this.setShowOrders}
                showModal={this.state.showModal} 
                hasOrders={this.state.hasOrders}
                totalOrders={this.state.totalOrders}
                addToCart={this.addToCart} 
                calculateOrders={this.calculateOrders}
            /> 
        </React.Fragment>
        );
    }
}
const mapStateToProps=(state)=>{
  return{
    orders:state.orders
  }
}
export default connect(mapStateToProps,{setOrders,addToCart})(CheckoutApp)