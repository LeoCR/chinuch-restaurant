import React from "react";
import { Route, Link,Switch } from "react-router-dom";
import UserProfile from '../../components/user/UserProfile';
import UserHistory from '../../components/user/UserHistory';
import UserInvoice from "../../components/user/UserInvoice";
import {connect} from "react-redux";
import { withRouter } from "react-router";
import $ from 'jquery';
class UserContainer extends React.Component{
    tabClicked=(e)=>{
        $('.nav_tab').each(function(){
            $(this).removeClass('active');
        })
        $(e.currentTarget).addClass('active');
    }
    render(){
        return(
            <React.Fragment>
                    <ul className="nav nav-tabs">
                        <li className="tab-link">
                            <Link to="/user/profile" className="nav_tab active" onClick={(e)=>this.tabClicked(e)}>Profile</Link>
                        </li>
                        <li className="tab-link">
                            <Link to="/user/history" className="nav_tab" onClick={(e)=>this.tabClicked(e)}>History</Link>
                        </li>   
                    </ul>
                    <div className="tabs-content">
                        <Switch>
                            <Route
                                exact
                                path='/user/'
                                render={() => <React.Fragment>
                                    <UserProfile/>
                                </React.Fragment>}
                            />
                            <Route
                                exact
                                path='/user/profile'
                                render={() => <React.Fragment>
                                    <UserProfile/>
                                </React.Fragment>}
                            />
                            <Route
                                exact
                                path='/user/history'
                                render={() =><React.Fragment>
                                    <UserHistory/> 
                                </React.Fragment>}
                            />
                            <Route
                                exact
                                path='/user/history/invoice/:order_code'
                                component={UserInvoice}
                            />
                        </Switch>
                    </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
      user:state.user.user
    }
}
export default withRouter(connect(mapStateToProps)(UserContainer));