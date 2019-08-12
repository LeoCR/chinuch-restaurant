import React from "react";
import {connect} from 'react-redux';
import $ from 'jquery';
import api from '../apis/api';
import UserDetails from './user/UserDetails';
import LoginButtons from './user/LoginButtons';
import LoginForm from './user/LoginForm';
import SignUpForm from './user/SignUpForm';
import CartProducts from './shopping-cart/CartProducts';
import CartAddForm from './shopping-cart/CartAddForm';
import {setUser} from "../actions/userActions";
class Modal extends React.Component{
    state = {
        userLogged: null
    };
    componentDidMount(){
        this.setUserData();
    }
    setUserData=()=>{
        var _this=this;
        try {
            api.get('/api/user/info').then(function (res) {
                if(res.data){
                    _this.props.setUser(res.data);
                }
            });
            /**
             * Validate if User cookies is defined or not
             */
        } catch (error) {
            console.log('An error occurs in Modal.setUserData() '+error);
        }
    }
    closeModal=(e)=>{
        $('.modal').css({'display':'none'});
        $('body').toggleClass('modal-opened');
        $('body').removeClass('signup');
    }
    checkout=async()=>{
        var isAuthenticathed=false;
        var _this=this;
        await api.get('/api/validate/authentication')
        .then(function (response) {
            isAuthenticathed=response.data.isAuthenticated;
            if(isAuthenticathed){
                window.location.replace("/checkout");
            }
            else{
                _this.props.setShowLogin();
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    render(){
        var ModalContent;
        var titleModal;
        if(this.props.showModal==='showAddForm'){
            titleModal='Shopping Cart';
            ModalContent=<CartAddForm checkout={this.checkout} calculateOrders={this.props.calculateOrders} addToCart={this.props.addToCart}/>;
        }
        else if(this.props.showModal==='showLogin'){
            ModalContent=<React.Fragment>
                <LoginForm setShowUserDetails={this.props.setShowUserDetails} setShowSignUp={this.props.setShowSignUp} setShowUserDetails={this.props.setShowUserDetails}/>
                <LoginButtons/>
            </React.Fragment>;
            titleModal='Login';
        }
        else if(this.props.showModal==='showSignUpForm'){
            ModalContent=<React.Fragment>
                <SignUpForm  userLogged={this.state.userLogged} setUserData={this.setUserData} setShowUserCreated={this.props.setShowUserCreated}/>
            </React.Fragment>;
            titleModal='Sign Up';
        }
        else if(this.props.showModal==='showUserDetails'){
            ModalContent=<UserDetails userLogged={this.state.userLogged}/>;
            titleModal='User Details';
        }
        else if(this.props.showModal==='showUserCreated'){
            titleModal='User Created';
            ModalContent=<React.Fragment>
                <p style={{padding:'30px 10px',textAlign:'center'}}>Your user was created successfully</p>
            </React.Fragment>
        }
        else{
            titleModal='Shopping Cart';
            ModalContent=<CartProducts calculateOrders={this.props.calculateOrders} checkout={this.checkout}/>;
        }
        return(
            <div className="modal" id="modal-shopping-cart">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{titleModal}</h5>
                            <button type="button" className="close" 
                                data-dismiss="modal" aria-label="Close" 
                                onClick={(e)=>this.closeModal(e)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {ModalContent}
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
      user:state.user
    }
}
export default connect(mapStateToProps,{setUser})(Modal)