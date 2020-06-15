import React from "react";
import $ from 'jquery';
import {connect} from 'react-redux';
import {updateItemUnits,deleteFromCart} from '../../actions/cartActions';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class CartProducts extends React.Component{
  deleteOrder=(order,e)=>{
      e.preventDefault();
      this.props.deleteFromCart(order.id);
      this.props.calculateOrders();
      var _this=this;
      setTimeout(() => {
        cookies.set('reef_chinuch_orders', JSON.stringify(_this.props.orders.orders), {path: "/"});
      }, 300);
  }
  checkout=(e)=>{
    e.preventDefault();
    this.props.checkout();
  }
  updateQuantity=()=>{ 
  }
  decrementOrder=(order)=>{
    if(order.quantity>1){
        order.quantity=order.quantity-1;
        $('#quantity-added').val(order.quantity);
    }
    this.props.updateItemUnits(order);
    this.props.calculateOrders();
    cookies.set('reef_chinuch_orders', JSON.stringify(this.props.orders.orders), {path: "/"});
  }
  incrementOrder=(order)=>{
    order.quantity=order.quantity+1;
    $('#quantity-added').val(order.quantity);
    this.props.updateItemUnits(order);
    this.props.calculateOrders();
    cookies.set('reef_chinuch_orders', JSON.stringify(this.props.orders.orders), {path: "/"});
  }
  calculateTotal=()=>{
    var orders=this.props.orders.orders,
    totalPrice=0;
    orders.forEach(function(element) {
        totalPrice+=element.price*element.quantity;
    });
    return(
        <React.Fragment>
            <hr></hr>
            <h3>Total Price:</h3>
            <h5>{totalPrice}$</h5>
        </React.Fragment>
    )
  }
  goToMenu=(e)=>{
    e.preventDefault();
    window.location.replace("/#menu");
    $('.modal').css({'display':'none'});
    $('body').toggleClass('modal-opened');
    $('body').removeClass('signup');
  }
    render(){
      var orders=this.props.orders.orders;
      this.props.calculateOrders();
      if(orders.length===0){
            return(
                <div className="modal-body">
                    Your cart is Empty
                    <button className="btn btn-success" onClick={(e)=>this.goToMenu(e)}>Go to Menu</button>
                </div>
            )
      } 
      return(
            <div id="show-orders" className="modal-body">
                <ul style={{padding:'5px 15px',listStyle:'none'}}>
                {orders.map(order => 
                    <li key={order.id} 
                        style={{listStyle:'none',width:'100%',
                        position:'relative',float:'left'}}>
                        <h5 style={{maxWidth:'350px',float:'left',
                        width:'100%'}}>{order.name}</h5>
                        <button style={{width:'50px' ,float:'left'}} 
                            type="button" className="btn btn-danger" 
                            data-dismiss="modal" aria-label="Close" 
                            onClick={(e)=>this.deleteOrder(order,e)}>
                                <span aria-hidden="true">&times;</span>
                        </button>
                        <div style={{width:'225px'}}>
                            <p style={{width:' 75px',float:'left'}}>Quantity:</p>
                            <div style={{width:'80px',height:'30px',float:'left', border:'1px solid black',padding:'0'}}  id="quantity-added">{order.quantity} </div>
                            <button type="button" className="btn btn-primary" onClick={()=>this.decrementOrder(order)} style={{float: 'right'}}>-</button>
                            <button type="button" className="btn btn-success" onClick={()=>this.incrementOrder(order)} style={{float: 'right'}}>+</button>
                        </div>
                    </li>
                )}
                </ul>
                {this.calculateTotal()}
                <button className="btn btn-primary" onClick={(e)=>this.checkout(e)}>Checkout</button>
            </div>
      )
  }
}
const mapStateToProps=(state)=>{
    return{
      orders:state.orders
    }
}
export default connect(mapStateToProps,{updateItemUnits,deleteFromCart})(CartProducts)