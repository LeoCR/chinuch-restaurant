import React from 'react';
import {connect} from 'react-redux';
import {deleteFromCart} from '../../actions/cartActions';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class Order extends React.Component {
    deleteOrder=(id)=>{
        this.props.deleteFromCart(id);
        var _this=this;
        setTimeout(() => {
            cookies.set('reef_chinuch_orders', JSON.stringify(_this.props.orders.orders));
        }, 300);
    }
    render(){
        if(!this.props.info){
            return(
                <div>
                    No Orders
                </div>
            )
        }
        return(
            <div className="order-item" key={this.props.info.id}>
                <div className="order-item-left-side">
                    <h3>  {this.props.info.name}</h3>
                    <h5>Quantity:  {this.props.info.quantity}</h5>    
                    <p>Price per unit:<span className="badge badge-warning text-dark">${this.props.info.price}</span></p>
                    <img src={this.props.info.picture} alt={this.props.info.name} style={{maxWidth:"80px"}}/>
                </div>
                <div className="order-item-right-side">
                    <button className="btn btn-danger" onClick={()=>this.deleteOrder(this.props.info.id)}>X</button>
                </div>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
      orders:state.orders
    }
}
export default connect(mapStateToProps,{deleteFromCart})(Order)