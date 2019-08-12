import React from "react";
import $ from 'jquery';
import api from '../../apis/api';
class SignUpForm extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            email:'',
            firstName:'',
            lastName:'',
            password:'',
            username:'',
            errorEmail: 'Invalid Email.',
            errorFirstName:'Invalid First Name.',
            errorLastName:'Invalid Last Name.',
            errorPassword:'Invalid Password.',
            errorUsername:'Invalid Username'
        }
    }
     onSubmitSignUpForm=(e)=>{
        var _this=this;
        e.preventDefault();
        if(this.state.errorEmail===''
            && this.state.errorFirstName===''
            && this.state.errorLastName===''
            && this.state.errorPassword===''
            && this.state.errorUsername===''){
                //Send Form
            console.log('Valid User Data'); 
            var user={
                username:this.state.username,
                email:this.state.email,
                firstname: this.state.firstName,
                lastname:this.state.lastName,
                password: this.state.password
            }
                let axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        "Access-Control-Allow-Origin": "*",
                    }
                }; 
                api.post('/api/signup', user, axiosConfig)
                .then(response => {
                    console.log('User created');
                    if(response.status===200){
                        _this.props.setUserData();
                        setTimeout(()=>{
                            _this.props.setShowUserCreated();
                        },900);
                    }
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
        }
        else{
            $('.error-msg').css('display','block');
        }
    }
    onChangeEmail=(e)=>{
        e.preventDefault();
        var currentValue=e.target.value;
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(currentValue)){
            this.setState({
                errorEmail:''
            });
            $('.error-email').css('display','none'); 
        } 
        else{
            this.setState({
                errorEmail:'Please enter a valid Email'
            });
            setTimeout(() => {
                $('.error-email').css('display','block');
            }, 900);
        }
        this.setState({
            email:currentValue
        });
    }
    onChangeFirstName=(e)=>{
        e.preventDefault();
        var currentValue=e.target.value;
        if(/\d/.test(currentValue)){
            this.setState({
                errorFirstName:'Please not enter numbers just letters'
            });
            setTimeout(() => {
                $('.error-first-name').css('display','block');
            }, 900);
        }
        else if(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(currentValue)){
            this.setState({
                errorFirstName:'Please not enter special characters just letters'
            });
            setTimeout(() => {
                $('.error-first-name').css('display','block');
            }, 900);
        }
        else{
            this.setState({
                errorFirstName:''
            });
            $('.error-first-name').css('display','none');
        }
        this.setState({
            firstName:currentValue
        });
    }
    onChangeLastName=(e)=>{
        e.preventDefault();
        var currentValue=e.target.value;
        if(/\d/.test(currentValue)){
            this.setState({
                errorLastName:'Please not enter numbers just letters'
            });
            setTimeout(() => {
                $('.error-last-name').css('display','block');
            }, 900);
        }
        else if(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(currentValue)){
            this.setState({
                errorLastName:'Please not enter special characters just letters'
            });
            setTimeout(() => {
                $('.error-last-name').css('display','block');
            }, 900);
        }
        else{
            this.setState({
                errorLastName:''
            }); 
            $('.error-last-name').css('display','none');
            
        }
        this.setState({
            lastName:currentValue
        });
    }
    onChangePassword=(e)=>{
        e.preventDefault();
        var currentValue=e.target.value;
        if(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(currentValue)){
            this.setState({
                errorPassword:''
            });
            $('.error-password').css('display','none');
        }
        else{
            this.setState({
                errorPassword:'Minimun 1 number,1 lowercase ,1 uppercase and 6 characters'
            });
            $('.error-password').css('display','block');
        }
        this.setState({
            password:currentValue
        });
    }
    onChangeUsername=(e)=>{
        var currentValue=e.target.value;
        if(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(currentValue)){
            this.setState({
                errorUsername:'Please not enter special characters just letters'
            });
            setTimeout(() => {
                $('.error-username').css('display','block');
            }, 900);
        }
        else{
            this.setState({
                errorUsername:''
            }); 
            $('.error-username').css('display','none');
            
        }
        this.setState({
            username:currentValue
        });
    }
    render(){
        return(
            <React.Fragment>
                <div className="col-xs-12 col-lg-12">
                    <form id="signup" onSubmit={(e)=>this.onSubmitSignUpForm(e)}>
                        <div className="form-group">
                            <label for="username">Username</label>
                            <input name="username" type="text" className="form-control"
                                onChange={(e)=>this.onChangeUsername(e)}/>
                        </div>
                        <p className="error-msg error-username" style={{display:'none'}}>
                            {this.state.errorUsername}
                        </p>
                        <div className="form-group">
                            <label for="email">Email Address</label>
                            <input name="email" type="email" className="form-control" 
                                onChange={(e)=>this.onChangeEmail(e)}
                            />
                        </div>
                        <p className="error-msg error-email" style={{display:'none'}}>
                            {this.state.errorEmail}
                        </p>
                        <div className="form-group">
                            <label for="firstname">First Name</label>
                            <input name="firstname" type="text" className="form-control"
                                onChange={(e)=>this.onChangeFirstName(e)}/>
                        </div>
                        <p className="error-msg error-first-name" style={{display:'none'}}>
                            {this.state.errorFirstName}
                        </p>
                        <div className="form-group">
                            <label for="lastname">Last Name</label>
                            <input name="lastname" type="text" className="form-control"
                                onChange={(e)=>this.onChangeLastName(e)}/>
                        </div>
                        <p className="error-msg error-last-name" style={{display:'none'}}>
                            {this.state.errorLastName}
                        </p>
                        <div className="form-group">
                            <label for="password">Password</label>
                            <input name="password" type="password" className="form-control"
                                onChange={(e)=>this.onChangePassword(e)}/>
                        </div>
                        <p className="error-msg error-password" style={{display:'none'}}>
                            {this.state.errorPassword}
                        </p>
                        <input type="submit" className="btn btn-success" value="Register" />
                    </form>
                </div>
            </React.Fragment>
        )
    }
}
export default SignUpForm;