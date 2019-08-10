import React from 'react';
import {connect} from 'react-redux';
import {fetchMainCourses,fetchAppetizers,fetchDesserts,fetchDrinks} from '../actions/menuActions';
import { Route ,Switch,Link} from "react-router-dom";
import Desserts from '../components/Desserts';
class App extends React.Component {
  state={
    showModal:'showAddForm',
    product:null,
    hasOrders:false,
    totalOrders:0
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
  componentDidMount(){
    this.props.fetchAppetizers();
    this.props.fetchMainCourses();
    this.props.fetchDesserts();
    this.props.fetchDrinks();
  }
  render() {
    return (
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
                <Desserts Desserts={this.props.desserts} title="Desserts"/>
            </React.Fragment>}/>
          </Switch>
      </div>
    );
  }
}
const mapStateToProps=(state)=>{
  return{
    mainCourses:state.menu.mainCourses,
    desserts:state.menu.desserts,
    appetizers:state.menu.appetizers,
    drinks:state.menu.drinks
  }
}
export default connect(mapStateToProps,{fetchMainCourses,fetchAppetizers,fetchDesserts,fetchDrinks})(App)
