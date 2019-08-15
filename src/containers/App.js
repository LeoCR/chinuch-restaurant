import React from 'react';
import {connect} from 'react-redux';
import {fetchMainCourses,fetchAppetizers,fetchDesserts,fetchDrinks} from '../actions/menuActions';
import { Route ,Switch,Link} from "react-router-dom";
import Desserts from '../components/Desserts';
import Appetizers from '../components/Appetizers';
import MainCourses from '../components/MainCourses';
import Drinks from '../components/Drinks';
import ViewDish from '../components/view/ViewDish';
import ViewDrink from "../components/view/ViewDrink";
import CartContainer from "./CartContainer";
import {addToCart,setOrders} from '../actions/cartActions';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class App extends React.Component {
  state={
    showModal:'showAddForm',
    product:null,
    hasOrders:false,
    totalOrders:0
  }
  setAddForm=()=>{
    $('body').removeClass('signup');
    $('body').toggleClass('modal-opened');
    this.setState({
      showModal:'showAddForm'
    })
  }
  setShowLogin=()=>{
    $('body').removeClass('signup');
    console.log('setShowLogin');
    this.setState({
      showModal:'showLogin'
    })
  }
  setShowSignUp=()=>{
    $('body').addClass('signup');
    console.log('setShowSignUpForm');
    this.setState({
      showModal:'showSignUpForm'
    })
  }
  setShowUserDetails=()=>{
    $('body').removeClass('signup');
    console.log('setShowUserDetails');
    this.setState({
      showModal:'showUserDetails'
    })
  }
  setShowOrders=()=>{
    $('body').removeClass('signup');
    this.setState({
      showModal:'showBasket'
    });
    this.calculateOrders();
    $('.modal').css({'display':'block'});
  }
  setShowUserCreated=()=>{
    $('body').removeClass('signup');
    this.setState({
      showModal:'showUserCreated'
    });
  }
  calculateOrders=()=>{
    var totalQuantity=0;
    try {
      this.props.orders.orders.forEach(function(element) {
          totalQuantity+=element.quantity;
      });
    } 
    catch (error) {
      console.log('An error occurs in App.calculateOrders');
      console.error(error);
    }
    finally{
      if(totalQuantity<10){
        this.setState({
          totalOrders:'0'+totalQuantity
        })
      }
      else{
        this.setState({
          totalOrders:totalQuantity
        })
      }
    }
    if(totalQuantity>=1){
        this.setState({
          hasOrders:true
        });
    }
  }
  addProductToCart=(product)=>{
    var productObject=Object.assign({currency:'USD'},product);
    setTimeout(() => {
      $("#productName").val(product.name); 
      $("#quantity-cart").val(1);
      $("#pricePerUnit").val(product.price);
      $("#totalPrice").val(product.price); 
      $('.modal').css({'display':'block'});
    }, 300);
    this.setState({
      product:productObject
    });
    this.calculateOrders();
  }
  addToCart=(quantity)=>{ 
    var orderObject = Object.assign({quantity: quantity}, this.state.product);
    this.props.addToCart(orderObject);
    cookies.set('reef_chinuch_orders', JSON.stringify(this.props.orders.orders)); 
    this.calculateOrders();
  }
  componentDidMount(){
    this.props.fetchAppetizers();
    this.props.fetchMainCourses();
    this.props.fetchDesserts();
    this.props.fetchDrinks();
    
    var _this=this;
    if(cookies.get('reef_chinuch_orders')){
      setTimeout(() => {
        console.log('cookies.get(reef_chinuch_orders)');
        console.log(cookies.get('reef_chinuch_orders'));
        _this.props.setOrders(cookies.get('reef_chinuch_orders'))
        _this.calculateOrders();
      },500);
    }
    else{
      console.log('We dont have cookies');
    }
  }
  render() {
    return (
      <React.Fragment>
        <div id="container-menu">
          <Switch>
            <Route path='/' exact render={()=>
                <React.Fragment>
                    <h1>Menu</h1>
                    <div className="row">
                      <div className="col-xs-5 col-md-4" > 
                        <Link to="/appetizers" className="anchor_menu">
                              <h4>Appetizers</h4>
                              <figure>
                                  <img src="images/icon_entrees.png" className="icon_service" alt="Appetizers"/>
                              </figure>
                        </Link>
                      </div>
                      <div className="col-xs-5 col-md-4">
                        <Link to="/main-courses" className="anchor_menu">
                              <h4>Main Courses</h4>
                              <figure>
                                <img src="images/icon_lunch.jpg" className="icon_service" alt="Strong Dishes"/>
                              </figure>
                        </Link>
                      </div>
                      <div className="col-xs-5 col-md-4">
                        <Link to="/desserts" className="anchor_menu">
                              <h4>Desserts</h4>
                              <figure>
                                  <img src="images/icon_dessert.png" className="icon_service" alt="Desserts"/>
                              </figure>
                        </Link>
                      </div>
                      <div className="col-xs-5 col-md-4 last-col">
                          <Link to="/drinks" className="anchor_menu">
                              <h4>Drinks</h4>
                              <figure>
                                  <img src="images/icon_drinks.jpg" className="icon_service" alt="Drinks"/>
                              </figure>
                        </Link>  
                      </div>
                    </div> 
                </React.Fragment>
            }/>
            <Route path="/desserts" exact render={()=><React.Fragment>
                <Desserts Desserts={this.props.desserts} title="Desserts" 
                  addProductToCart={this.addProductToCart} 
                  setAddForm={this.setAddForm}/>
            </React.Fragment>}/>
            <Route path="/appetizers" exact render={()=><React.Fragment>
                <Appetizers Appetizers={this.props.appetizers} title="Appetizers" 
                  addProductToCart={this.addProductToCart} 
                  setAddForm={this.setAddForm}/>
            </React.Fragment>}/>
            <Route path="/main-courses" exact render={()=><React.Fragment>
                <MainCourses MainCourses={this.props.mainCourses} title="Main Courses" 
                  addProductToCart={this.addProductToCart} 
                  setAddForm={this.setAddForm}/>
            </React.Fragment>}/>
            <Route path="/drinks" exact render={()=><React.Fragment>
                <Drinks Drinks={this.props.drinks} title="Drinks" 
                  addProductToCart={this.addProductToCart} 
                  setAddForm={this.setAddForm}/>
            </React.Fragment>}/>
            <Route path='/appetizers/:id' exact component={ViewDish}/>
            <Route path='/desserts/:id' exact component={ViewDish}/>
            <Route path='/main-courses/:id' exact component={ViewDish}/>
            <Route path='/drinks/:id' exact component={ViewDrink}/>
          </Switch>
        </div>
        <CartContainer 
            setShowUserCreated={this.setShowUserCreated}
            setShowOrders={this.setShowOrders}
            setShowLogin={this.setShowLogin}
            setShowUserDetails={this.setShowUserDetails}
            setShowSignUp={this.setShowSignUp} 
            showModal={this.state.showModal} 
            hasOrders={this.state.hasOrders}
            totalOrders={this.state.totalOrders}
            addToCart={this.addToCart} 
            calculateOrders={this.calculateOrders}/>
      </React.Fragment>
    );
  }
}
const mapStateToProps=(state)=>{
  return{
    mainCourses:state.menu.mainCourses,
    desserts:state.menu.desserts,
    appetizers:state.menu.appetizers,
    drinks:state.menu.drinks,
    orders:state.orders
  }
}
export default connect(mapStateToProps,{fetchMainCourses,fetchAppetizers,fetchDesserts,fetchDrinks,addToCart,setOrders})(App)
