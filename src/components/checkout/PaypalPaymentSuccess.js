import React from 'react';
import api from '../../apis/api';
import {connect} from 'react-redux';
import getParameterByName from '../../utils/getParameterByName';
import Cookies from 'universal-cookie';
import {getOrders,deleteOrders} from '../../actions/cartActions';
const cookies = new Cookies();
class PaypalPaymentSuccess extends React.Component{
    
    constructor (props) {
        super(props);
        this.state = {
            userData:'',
            userId:0,
            nextHeaderInvoice:0,
            nextIdInvoiceDetail:0,
            nextIdHeader:0,
            nextOrderCode:''
        }
    }
    componentDidMount=async()=>{
        var tempNextHeaderInvoice=this.state.nextHeaderInvoice;
        var _this=this;
        var tempSubtotal=0; 
        try {
            var paypalId=cookies.get('paypal_id'); 
            var paypalPayerId =getParameterByName('PayerID');
            var paypalToken=getParameterByName('token'); 
            for (let index = 0; index < this.props.orders.orders.length; index++) {
                tempSubtotal+=this.props.orders.orders[index].quantity*this.props.orders.orders[index].price;
            }
            this.setState({
                subtotal:parseFloat(tempSubtotal).toFixed(2)
            });
            var date=new Date();
            var todayIs='';
            var total=0;
            var currentMonth;
            var _this=this;
            if(date.getMonth()<10){
                if(date.getMonth()<9){
                    currentMonth='0'+parseInt(date.getMonth()+1);
                }
                else{
                    currentMonth=parseInt(date.getMonth()+1);
                }
            }
            else{
                currentMonth=parseInt(date.getMonth()+1);
            }
            var todayIs=date.getFullYear()+'-'+currentMonth+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
            
            await api.get('/api/user/info')
            .then((res)=>{
                _this.setState({
                    userData:res.data
                });
            })
           
            await api.get('/api/invoice-detail/get-last')
            .then((res)=>{
                _this.setState({
                    nextHeaderInvoice:parseInt(res.data[0].header_invoice)+1
                })
            }) 
            await api.get('/api/header-invoice/get-last-header-id')
            .then((res)=>{
                _this.setState({
                    nextIdHeader:parseInt(res.data[0].id_header)+1
                })
            })
            await api.get('/api/invoice-detail/get-last-id-invoice-detail')
            .then((res)=>{
                _this.setState({
                    nextIdInvoiceDetail:parseInt(res.data[0].id_invoice_detail)+1
                })
            })
            setTimeout(async() => {
                    await api.get('/api/find/email/'+_this.state.userData.email).then((res)=>{
                        _this.setState({
                            userId:res.data.id
                        });
                    })
            }, 700);
            await api.get('/api/count-max-order-code')
            .then((res)=>{
                var tempNexOrder=parseInt(res.data[0].maxOrderCode)+1;
                _this.setState({
                    nextOrderCode:'INVC'+tempNexOrder
                })
            })
            if(paypalId!==''){
                setTimeout(async() => {
                    if(this.props.orders){
                        var i=0;
                        var tempNextIdInvoiceDetail=this.state.nextIdInvoiceDetail;
                        var tempNextIdHeader=this.state.nextIdHeader;
                        do{
                            if(this.props.orders.orders[i]!==undefined){
                                var total=this.props.orders.orders[i].quantity*parseFloat(this.props.orders.orders[i].price)
                                var headerInvoice={
                                    id_header:tempNextIdHeader,
                                    total:total,
                                    product_id:this.props.orders.orders[i].id,
                                    product_name:this.props.orders.orders[i].name,
                                    product_quantity:this.props.orders.orders[i].quantity
                                };
                                var invoiceDetail={
                                    id_invoice_detail:tempNextIdInvoiceDetail,
                                    client_restaurant:this.state.userId,
                                    header_invoice:tempNextHeaderInvoice,
                                    order_code:this.state.nextOrderCode,
                                    date_of_billing:todayIs,
                                    paypal_id:paypalId,
                                    paypal_payer_id:paypalPayerId,
                                    paypal_token:paypalToken 
                                }
                                if(this.state.userId>0 && paypalToken!==''&& paypalPayerId!==''&&paypalId!==''){
                                    await api.post('/api/add/header-invoice',{headerInvoice})
                                    .then(res=>{
                                        console.log('headerInvoice created ');
                                        console.log(res);
                                    })
                                    .catch(err=>{
                                        console.log('An error occurs on post(/api/add/header-invoice)');
                                        console.error(err);
                                    })
                                    await api.post('/api/add/invoice',{invoiceDetail})
                                    .then(res=>{
                                        console.log('Invoice created ');
                                        console.log(res);
                                    })
                                    .catch(err=>{
                                        console.log('An error occurs on post(/api/add/invoice)');
                                        console.error(err);
                                    })
                                    console.log(invoiceDetail);
                                    
                                    tempNextIdHeader++;
                                    tempNextIdInvoiceDetail++;
                                    tempNextHeaderInvoice++;
                                }
                            }
                            i++;
                        }
                        while(i<=this.props.orders.orders.length)
                        setTimeout(() => {
                            cookies.set("reef_chinuch_orders",'[]', {path: "/"})
                            _this.props.deleteOrders();
                            _this.props.getOrders();
                        }, 3900);
                    }
                }, 3000);
            }
        } catch (error) {
            console.log('An error occurs in PaypalPaymentSuccess.componentDidMount()');
            console.log(error); 
        }
    }
    render(){
        return(
            <React.Fragment>
                <div style={{padding:'20px',width:'100%',position:'relative'}}>
                    <h1>Payment Successfully</h1>
                    <p>Thanks by your purchase</p>
                    <a className="btn btn-danger" href='/user/history' target="_parent">View Invoices</a>
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        headerInvoices:state.headerInvoices,
        invoiceDetails:state.invoiceDetails,
        orders:state.orders,
        paypalItems:state.paypalItems
    }
}
export default connect(mapStateToProps,{getOrders,deleteOrders})(PaypalPaymentSuccess);