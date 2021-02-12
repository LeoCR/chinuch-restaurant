import React from 'react';
import {connect} from 'react-redux';
import api from '../../apis/api';
import Cookies from 'universal-cookie';
import {setInvoiceDetails,clearInvoiceDetails} from '../../actions/invoiceDetailActions';
import {setHeaderInvoices,clearHeaderInvoice} from '../../actions/headerInvoiceActions';
const cookies = new Cookies();
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
            items:[],
            isValid:false
        }
    }
    componentDidMount=async ()=>{
        this.props.clearInvoiceDetails();
        this.props.clearHeaderInvoice();
        var _this=this;
        await api.get('/api/user/info')
        .then((res)=>{
            _this.setState({
                userData:res.data
            });
        });
        await api.get('/api/invoice-detail/get-last')
        .then((res)=>{
            _this.setState({
                nextHeaderInvoice:parseInt(res.data[0].header_invoice)+1
            })
        }); 
        await api.get('/api/header-invoice/get-last-header-id')
        .then((res)=>{
            _this.setState({
                nextIdHeader:parseInt(res.data[0].id_header)+1
            })
        });
        await api.get('/api/invoice-detail/get-last-id-invoice-detail')
        .then((res)=>{
            _this.setState({
                nextIdInvoiceDetail:parseInt(res.data[0].id_invoice_detail)+1
            })
        });
        setTimeout(async() => {
                await api.get('/api/find/email/'+_this.state.userData.email).then((res)=>{
                    _this.setState({
                        userId:res.data.id
                    });
                });
        }, 700);
        await api.get('/api/count-max-order-code')
        .then((res)=>{
            var tempNexOrder=parseInt(res.data[0].maxOrderCode)+1;
            _this.setState({
                nextOrderCode:'INVC'+tempNexOrder
            })
        });
        var tempSubtotal=0;
         
        for (let index = 0; index < this.props.orders.orders.length; index++) {
            tempSubtotal+=this.props.orders.orders[index].quantity*this.props.orders.orders[index].price;
        }
        this.setState({
            subtotal:tempSubtotal
        });
    }
    onChangeTerms=()=>{
        this.setState({
            isValid:!this.state.isValid
        });
    }
    clickedSubmitBtn=(e)=>{
        if(this.state.isValid){
            e.currentTarget.classList.toggle('running');
        }
    }
    submitPaypalForm=async(e)=>{
        e.preventDefault();
        return new Promise((resolve, reject) => {
            var tempNextHeaderInvoice=this.state.nextHeaderInvoice;
            var _this=this;
            var tempSubtotal=0;
            var itemTotal=0;
            var taxTotal=0;
            for (let index = 0; index < this.props.orders.orders.length; index++) {
                tempSubtotal+=parseFloat(this.props.orders.orders[index].quantity*this.props.orders.orders[index].price).toFixed(2);
                taxTotal+=parseFloat(this.props.orders.orders[index].quantity*2);
                itemTotal+=parseFloat((this.props.orders.orders[index].quantity*this.props.orders.orders[index].price)-(this.props.orders.orders[index].quantity*2))
            }
            this.setState({
                subtotal:tempSubtotal
            });
            
            if(this.state.isValid){ 
                var date=new Date();
                var todayIs='';
                var currentMonth;
                var headerInvoices=[];
                var invoiceDetails=[];
                if(date.getMonth()<10){
                    currentMonth='0'+date.getMonth();
                }
                else{
                    currentMonth=date.getMonth();
                }
                todayIs=date.getFullYear()+'-'+currentMonth+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
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
                                subtotal:this.props.orders.orders[i].price,
                                product_id:this.props.orders.orders[i].id,
                                product_name:this.props.orders.orders[i].name,
                                product_quantity:this.props.orders.orders[i].quantity
                            };
                            var invoiceDetail={
                                id_invoice_detail:tempNextIdInvoiceDetail,
                                client_restaurant:this.state.userId,
                                header_invoice:tempNextHeaderInvoice,
                                order_code:this.state.nextOrderCode,
                                date_of_billing:todayIs
                            }
                            if(this.state.userId>0){
                                tempNextIdHeader++;
                                tempNextIdInvoiceDetail++;
                                tempNextHeaderInvoice++;
                                console.log(headerInvoice);
                                headerInvoices.push(headerInvoice);
                                invoiceDetails.push(invoiceDetail);
                            }
                        }
                        i++;
                    }
                    while(i<=this.props.orders.orders.length);
                    this.props.setInvoiceDetails(invoiceDetails);
                    this.props.setHeaderInvoices(headerInvoices);
                    var tempJSON={
                        items: _this.props.paypalItems.paypalItems,
                        subtotal: parseFloat(_this.state.subtotal).toFixed(2),
                        item_total:itemTotal.toFixed(2),
                        tax_total:taxTotal
                    };
                    console.log(tempJSON) 
                        api.post('/api/pay-with-paypal',tempJSON)
                        .then((res)=>{
                            console.log('Paypal Success response'); 
                                setTimeout(() => {
                                    resolve('resolved');
                                }, 2300);
                                cookies.set('paypal_id',res.data.id);
                                window.location.href =res.data.data.href;
                                console.log(res); 
                        }) 
                        .catch(function (error) {
                            console.log('An error occurs on post submitPaypalForm()');
                            console.log(error);
                            reject(error)
                        }); 
                    
                }
            }
            else{
                resolve('resolved');
            }
        });  
    }
    render(){
        return(
            <div className="form-payment method-to-pay" style={{width:'100%',position:'relative',float:'left'}}>
                <form onSubmit={(e)=>this.submitPaypalForm(e)}>                    
                    <p>To complete the transaction, we will send you to PayPal's secure servers.</p>
                    <button className="btn btn-danger ld-ext-right" type="submit" onClick={(e)=>this.clickedSubmitBtn(e)}>
                        Proceed
                        <div className="ld ld-ring ld-spin"></div>
                    </button>
                    <span style={{fontSize:'8px'}}>By completing the purchase, you agree to these <a href="#">Terms of Use</a></span>
                    <label className="switch">
                        <input type="checkbox" value={this.state.isValid} onChange={this.onChangeTerms} />
                        <div className="slider-checkbox"></div>
                    </label>
                </form>
            </div>
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
export default connect(mapStateToProps,{setInvoiceDetails,setHeaderInvoices,clearInvoiceDetails,clearHeaderInvoice})(CheckoutPaypalForm);
