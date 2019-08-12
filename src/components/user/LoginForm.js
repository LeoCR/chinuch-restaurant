import React from "react";
import $ from "jquery";
import api from '../../apis/api';
import {setUser} from "../../actions/userActions";
import {connect} from 'react-redux';
class LoginForm extends React.Component{
    state={
        email:'',
        password:'',
        emailError:'Enter a valid email',
        passwordError:'Enter a valid Password'
    }
    getSignUpForm=(e)=>{
        console.log('getSignUpForm');
        e.preventDefault();
        this.props.setShowSignUp();
    }
    onSubmitLoginForm=(e)=>{
        e.preventDefault();
        if(this.state.emailError===''&& this.state.passwordError===''){
            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                }
            }; 
            var user={
                email:this.state.email,
                password: this.state.password
            }
            var _this=this;
            api.post('/api/login', user, axiosConfig)
            .then(res => { 
                if(res.data){
                    this.props.setUser(res.data);
                    setTimeout(() => {
                        _this.props.setShowUserDetails();
                    }, 500);
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
        else{
            console.log('Invalid Login Form');
        }
    }
    onChangePassword=(e)=>{
        e.preventDefault();
        var currentValue=e.target.value;
        if(currentValue!==null){
            this.setState({
                passwordError:''
            });
        }
        else{
            this.setState({
                passwordError:'Please enter a valid password text.'
            });
            $('.error-password').css('display','block');
        }
        /* if(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(currentValue)){
            this.setState({
                passwordError:''
            });
            $('.error-password').css('display','none');
        }
        else{
            this.setState({
                passwordError:'Minimun 1 number,1 lowercase ,1 uppercase and 6 characters'
            });
            $('.error-password').css('display','block');
        } */
        this.setState({
            password:currentValue
        });
    }
    onChangeEmail=(e)=>{
        e.preventDefault();
        var currentValue=e.target.value;
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(currentValue)){
            this.setState({
                emailError:''
            });
            $('.error-email').css('display','none'); 
        } 
        else{
            this.setState({
                emailError:'Please enter a valid Email'
            });
            setTimeout(() => {
                $('.error-email').css('display','block');
            }, 900);
        }
        this.setState({
            email:currentValue
        });
    }
    render(){
        return(
            <React.Fragment>
                <p style={{margin: '25px 0',textAlign: 'center',color:'black'}}>
                        Please login to buy food.
                </p>
                <div className="col-xs-12 col-lg-12">
                    <form id="signin" name="signin" method="post" onSubmit={(e)=>this.onSubmitLoginForm(e)} 
                        style={{width:'100%',padding:'0 8%'}}>
                        <div className="form-group">
                            <label for="email">Email Address</label>
                            <input name="email" type="text" className="form-control" onChange={(e)=>this.onChangeEmail(e)}/>
                            <p className="error-msg error-email" style={{display:'none'}}>
                                {this.state.emailError}
                            </p>    
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input name="password" type="password" className="form-control" onChange={(e)=>this.onChangePassword(e)}/>
                            <p className="error-msg error-password" style={{display:'none'}}>
                                {this.state.passwordError}
                            </p>
                        </div>
                        <p>Need an account?</p>
                        <span onClick={(e)=>this.getSignUpForm(e)} style={{color: '#e93e21'}}>Click here</span>
                        <input type="submit" value="Sign In" className="btn btn-danger"/>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
      user:state.user
    }
}
export default connect(mapStateToProps,{setUser})(LoginForm);