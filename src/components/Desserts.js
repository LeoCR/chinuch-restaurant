import React , {Component} from "react";
import $ from 'jquery';
import {Link} from "react-router-dom";
class Desserts extends Component{  
    addDessert=(dessert)=>{
        this.props.setAddForm();
        this.props.addProductToCart(dessert);
    }
    goToMenu=()=>{
        $('html,body').animate({
            scrollTop: $("#menu").offset().top-90
        }, 'slow');
    }
    render(){
        const {Desserts}=this.props;
        if(!Desserts){
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
                 Desserts.map(dessert => 
                        <div className="menu-body menu-left menu-white" key={dessert.id}> 
                            <div className="menu-thumbnail">
                                <img className="img-responsive center-block" src={dessert.picture} alt={dessert.name}/>
                            </div>  
                            <div className="menu-details"> 
                                <div className="menu-title clearfix">
                                <h5>{dessert.name}</h5>
                                    <span className="price">$ {dessert.price}</span>
                                </div>
                                <div className="menu-description">
                                    <p>{dessert.description.substr(0,80)+'...'}</p>
                                </div>
                                <button type="button" className="btn btn-add-to-cart" onClick={()=>{this.addDessert(dessert)}}><i className="fa fa-cart-plus fa-3"></i>Add</button>
                                <Link onClick={()=>this.goToMenu()} to={`/desserts/${dessert.id}`} className="btn btn-success"><i className="fa fa-eye fa-3"></i>Read More</Link>
                            </div>
                        </div>
            )}
            </React.Fragment>
        );
    }
}
export default Desserts;