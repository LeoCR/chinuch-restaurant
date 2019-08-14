import React from 'react';
import $ from 'jquery';
import CartContainer from "../CartContainer";
import UserContainer from "./UserContainer";
import {connect} from 'react-redux';
import {addToCart,setOrders} from '../../actions/cartActions';
import {fetchMainCourses,fetchAppetizers,fetchDesserts,fetchDrinks} from '../../actions/menuActions';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class UserApp extends React.Component {
    state={
        showModal:'showAddForm',
        product:null,
        hasOrders:false,
        totalOrders:0
    }
      setAddForm=()=>{
        $('body').removeClass('signup');
        $('body').toggleClass('modal-opened');
        this.setState({
          showModal:'showAddForm'
        })
      }
      setShowLogin=()=>{
        $('body').removeClass('signup');
        console.log('setShowLogin');
        this.setState({
          showModal:'showLogin'
        })
      }
      setShowSignUp=()=>{
        $('body').addClass('signup');
        console.log('setShowSignUpForm');
        this.setState({
          showModal:'showSignUpForm'
        })
      }
      setShowUserDetails=()=>{
        $('body').removeClass('signup');
        console.log('setShowUserDetails');
        this.setState({
          showModal:'showUserDetails'
        })
      }
      setShowOrders=()=>{
        $('body').removeClass('signup');
        this.setState({
          showModal:'showBasket'
        });
        this.calculateOrders();
        $('.modal').css({'display':'block'});
      }
      setShowUserCreated=()=>{
        $('body').removeClass('signup');
        this.setState({
          showModal:'showUserCreated'
        });
      }
      calculateOrders=()=>{
        var totalQuantity=0;
        try {
          this.props.orders.orders.forEach(function(element) {
              totalQuantity+=element.quantity;
          });
        } 
        catch (error) {
          console.log('An error occurs in App.calculateOrders');
          console.error(error);
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
        var productObject=Object.assign({currency:'USD'},product);
        setTimeout(() => {
          $("#productName").val(product.name); 
          $("#quantity-cart").val(1);
          $("#pricePerUnit").val(product.price);
          $("#totalPrice").val(product.price); 
          $('.modal').css({'display':'block'});
        }, 300);
        this.setState({
          product:productObject
        });
        this.calculateOrders();
      }
      addToCart=(quantity)=>{
        var orderObject = Object.assign({quantity: quantity}, this.state.product);
        this.props.addToCart(orderObject);
        cookies.set('reef_chinuch_orders', JSON.stringify(this.props.orders.orders));
        this.calculateOrders();
      }
    componentDidMount(){
        this.props.fetchAppetizers();
        this.props.fetchMainCourses();
        this.props.fetchDesserts();
        this.props.fetchDrinks();
        this.calculateOrders();
        if(cookies.get('reef_chinuch_orders')){
          console.log('cookies.get(reef_chinuch_orders)');
          this.props.setOrders(cookies.get('reef_chinuch_orders'))
        }
        else{
          console.log('We dont have cookies');
        }
    }
  render() {
    return (
      <React.Fragment> 
        <div id="user-container">
          <UserContainer/>
          <CartContainer 
            setShowUserCreated={this.setShowUserCreated}
            setShowOrders={this.setShowOrders}
            setShowLogin={this.setShowLogin}
            setShowUserDetails={this.setShowUserDetails}
            setShowSignUp={this.setShowSignUp} 
            showModal={this.state.showModal} 
            hasOrders={this.state.hasOrders}
            totalOrders={this.state.totalOrders}
            addToCart={this.addToCart} 
            calculateOrders={this.calculateOrders}/>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps=(state)=>{
    return{
      mainCourses:state.menu.mainCourses,
      desserts:state.menu.desserts,
      appetizers:state.menu.appetizers,
      drinks:state.menu.drinks,
      orders:state.orders
    }
}

export default connect(mapStateToProps,{fetchMainCourses,fetchAppetizers,fetchDesserts,fetchDrinks,addToCart,setOrders})(UserApp)