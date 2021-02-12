import React , {Component} from "react";
import $ from 'jquery';
import {Link} from "react-router-dom";
class Drinks extends Component{
    addDrink(idDrink){
        this.props.setAddForm();
        this.props.addProductToCart(idDrink);
    }
    goToMenu=()=>{
        $('html,body').animate({
            scrollTop: $("#menu").offset().top-90
        }, 'slow');
    }
    render(){
        const {Drinks}=this.props;
        if(!Drinks){
            return(
                <React.Fragment>
                    Loading
                </React.Fragment>
            )
        }
        return(
            <React.Fragment>
                <div className="back-container">
                    <Link className="btn button" to="/">Back</Link>
                </div>
                <h1>{this.props.title}</h1>
            {
                 Drinks.map(drink => 
                        <div className="menu-body menu-left menu-white" key={drink.id}> 
                            <div className="menu-thumbnail">
                                <img className="img-responsive center-block" src={drink.picture} alt={drink.name}/>
                            </div>  
                            <div className="menu-details"> 
                                <div className="menu-title clearfix">
                                <h5>{drink.name}</h5>
                                    <span className="price">$ {drink.price}</span>
                                </div>
                                <div className="menu-description">
                                    <p>{drink.description.substr(0,80)+'...'}</p>
                                </div>
                                <button type="button" className="btn btn-danger" onClick={()=>{this.addDrink(drink)}}><i className="fa fa-cart-plus fa-3"></i>Add</button>
                                <Link  className="btn btn-success" onClick={()=>this.goToMenu()} to={`/drinks/${drink.id}`}><i className="fa fa-eye fa-3"></i>Read More</Link>
                            </div>
                        </div>
            )}
            </React.Fragment>
        );
    }
}
export default Drinks;