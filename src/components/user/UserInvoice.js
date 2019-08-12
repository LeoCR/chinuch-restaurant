import React from "react";
import {connect} from "react-redux";
import api from "../../apis/api";
class UserInvoice extends React.Component{
    state={
        orderProducts:[]
    }
    componentDidMount=async()=>{
        const {order_code}=this.props.match.params;
        await api.get('/api/invoice/show/products/'+order_code+'/'+this.props.user.username+'/'+this.props.user.id)
        .then((res)=>{
            this.setState({
                orderProducts:res.data
            })
        })
    }
    renderProductsOrder=()=>{
        var totalPrice=0;
        if(this.state.orderProducts.length>0){
            this.state.orderProducts.forEach(product => {
                totalPrice+=parseFloat(product.total)
            });
            return( 
                <div className="table-responsive">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity per Product</th>
                                <th>Pricer per Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.orderProducts.map((order)=>
                                        <tr>
                                            <td>{order.product_name}</td>
                                            <td>{order.product_quantity}</td>
                                            <td>{order.total}</td>
                                        </tr>
                                )
                            }
                            <tr className='total-row'>
                                <td colSpan="2">
                                    <p style={{color:'#fff'}}>Total :</p>
                                </td>
                                <td>
                                    <p style={{color:'#fff'}}>{totalPrice}</p>
                                </td>
                            </tr>
                        </tbody>        
                    </table>
                </div>
            )
        }
    }
    render(){
        return(
            <React.Fragment>
                <h1>Invoice</h1>
                {this.renderProductsOrder()}
            </React.Fragment>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
      user:state.user.user
    }
}
export default connect(mapStateToProps)(UserInvoice);