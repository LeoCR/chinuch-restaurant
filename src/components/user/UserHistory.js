import React from "react";
import {connect} from "react-redux";
import api from "../../apis/api";
import {Link} from "react-router-dom";
class UserHistory extends React.Component{
    state={
        invoices:[]
    }
    setInvoices=async()=>{
        await api.get('/api/get-invoices/'+this.props.user.id)
        .then((res)=>{
            if(res.data.length>0){
                this.setState({
                    invoices:res.data
                })        
            }
        });
    }
    componentDidMount=()=>{
        this.setInvoices();
    }
    getInvoices=()=>{
        if(this.state.invoices.length>0){
            return(
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Invoice #Number</th>
                                <th>Date</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.invoices.map((inv)=>
                                    <tr>
                                        <td>{inv.order_code}</td>
                                        <td>{inv.date_of_billing.replace('.000Z','')}</td>
                                        <td><Link className="btn btn-view-more" to={`/user/history/invoice/${inv.order_code}`}>View</Link></td>
                                    </tr>
                            )}
                        </tbody>
                    </table>
                </div>
          )  
        }
        else{
            this.setInvoices();
        }
    }
    render(){
        return(
            <React.Fragment>
                <h1>User History</h1>
                {this.getInvoices()}
            </React.Fragment>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
      user:state.user.user
    }
}
export default connect(mapStateToProps)(UserHistory);