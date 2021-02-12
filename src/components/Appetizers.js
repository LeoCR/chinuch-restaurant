import React,{Component} from "react";
import $ from 'jquery';
import {Link} from "react-router-dom";
class Appetizers extends Component{
    addEntree(idEntree){
        this.props.setAddForm();
        this.props.addProductToCart(idEntree);
    }
    goToMenu=()=>{
        $('html,body').animate({
            scrollTop: $("#menu").offset().top-90
        }, 'slow');
    }
    render(){
        const {Appetizers}=this.props;
        if(!Appetizers){
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
                 Appetizers.map(appetizer => 
                        <div className="menu-body menu-left menu-white" key={appetizer.id}> 
                            <div className="menu-thumbnail">
                                <img className="img-responsive center-block" src={appetizer.picture} alt={appetizer.name}/>
                            </div>  
                            <div className="menu-details"> 
                                <div className="menu-title clearfix">
                                <h5>{appetizer.name}</h5>
                                    <span className="price">$ {appetizer.price}</span>
                                </div>
                                <div className="menu-description">
                                    <p>{appetizer.description.substr(0,80)+'...'}</p>
                                </div>
                                <button type="button" className="btn btn-add-to-cart" onClick={()=>{this.addEntree(appetizer)}}><i className="fa fa-cart-plus fa-3"></i>Add</button>
                                <Link className="btn btn-success" onClick={()=>this.goToMenu()} to={`/appetizers/${appetizer.id}`}><i className="fa fa-eye fa-3"></i>Read More</Link>
                            </div>
                        </div>
            )
            }
            </React.Fragment>
        );
    }
}
export default Appetizers;