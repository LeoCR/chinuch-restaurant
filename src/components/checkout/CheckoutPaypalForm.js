import React from 'react';
import {connect} from 'react-redux';
import api from '../../apis/api';
class CheckoutPaypalForm extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            userData:'',
            userId:0,
            nextHeaderInvoice:0,
            nextIdInvoiceDetail:0,
            nextIdHeader:0,
            nextOrderCode:'',
            subtotal:0,
            items:[]
        }
    }
    componentDidMount=async ()=>{
        var _this=this;
        await api.get('/user/info')
        .then((res)=>{
            _this.setState({
                userData:res.data.user
            });
        })
        await api.get('/api/invoice-detail/get-last')
        .then((res)=>{
            _this.setState({
                nextHeaderInvoice:parseInt(res.data[0].headerInvoice)+1
            })
        }) 
        await api.get('/api/header-invoice/get-last-header-id')
        .then((res)=>{
            _this.setState({
                nextIdHeader:parseInt(res.data[0].idHeader)+1
            })
        })
        await api.get('/api/invoice-detail/get-last-id-invoice-detail')
        .then((res)=>{
            _this.setState({
                nextIdInvoiceDetail:parseInt(res.data[0].idInvoiceDetail)+1
            })
        })
        setTimeout(async() => { 
            if(_this.state.userData._json!==undefined){ 
                await api.get('/api/find/email/'+_this.state.userData._json.email).then((res)=>{
                    _this.setState({
                        userId:res.data.id
                    }); 
                })
            }
            else if(_this.state.userData.email!==undefined){
                await api.get('/api/find/email/'+_this.state.userData.email).then((res)=>{
                    _this.setState({
                        userId:res.data.id
                    });
                })
            }
        }, 700);
        await api.get('/api/count-max-order-code')
        .then((res)=>{
            var tempNexOrder=parseInt(res.data[0].maxOrderCode)+1;
            _this.setState({
                nextOrderCode:'INVC'+tempNexOrder
            })
        })
        var subtotal=0;
        this.props.orders.orders.forEach(function(order) {
            subtotal+=order.quantity*order.price;
        });
        this.setState({
            subtotal:subtotal
        })
        var items=[];
        var tempItem={};
        this.props.orders.orders.forEach(function(order) {
            tempItem.name=order.name.toString();
            tempItem.sku=order.id;
            tempItem.price=order.price;
            tempItem.currency=order.currency.toString();
            tempItem.quantity=order.quantity;
            
            items.push(tempItem);
        });
        this.setState({
            items
        })
    }
    submitPaypalForm=(e)=>{
        e.preventDefault();
        var shipping="1";
        var tax="0.15";
        var total=(this.state.subtotal+parseFloat(tax)+parseFloat(shipping)).toFixed(2);
        api.post('/api/pay-with-paypal', {
            total:total.toString(),
            items: this.state.items,
            subtotal: this.state.subtotal.toString(),
            shipping:shipping,
            tax:tax
        })
        .then(function (response) {
            window.location.replace(response.data);
            console.log(response);
        })
        .catch(function (error) {
            console.log('An error occurs on post submitPaypalForm()');
            console.log(error);
        });
    }
    render(){
        return(
            <div className="form-payment method-to-pay" style={{width:'100%',position:'relative',float:'left'}}>
                <form onSubmit={(e)=>this.submitPaypalForm(e)}>                    
                    <p>To complete the transaction, we will send you to PayPal's secure servers.</p>
                    <button className="btn btn-danger" type="submit">Proceed</button>
                    <span style={{fontSize:'8px'}}>By completing the purchase, you agree to these <a href="#">Terms of Use</a></span>
                </form>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
      orders:state.orders
    }
}
export default connect(mapStateToProps)(CheckoutPaypalForm);
