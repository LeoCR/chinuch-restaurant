import React,{Component} from "react";
import $ from 'jquery';
import history from '../history';
import {Link} from "react-router-dom";
class MainCourses extends Component{
    addStrongDish(idStrongDish){
        this.props.setAddForm();
        this.props.addProductToCart(idStrongDish);
    }
    goToMenu=(e,id)=>{
        e.preventDefault();
        history.push('/saucers/'+id);
        $('html,body').animate({
            scrollTop: $("#menu").offset().top-90
        }, 'slow');
    }
    render(){
        const {MainCourses}=this.props;
        if(!MainCourses){
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
                 MainCourses.map(mainCourse => 
                        <div className="menu-body menu-left menu-white" key={mainCourse.id}> 
                            <div className="menu-thumbnail">
                                <img className="img-responsive center-block" src={mainCourse.picture} alt={mainCourse.name}/>
                            </div>  
                            <div className="menu-details"> 
                                <div className="menu-title clearfix">
                                <h5>{mainCourse.name}</h5>
                                    <span className="price">$ {mainCourse.price}</span>
                                </div>
                                <div className="menu-description">
                                    <p>{mainCourse.description.substr(0,80)+'...'}</p>
                                </div>
                                <button type="button" className="btn btn-danger" onClick={()=>{this.addStrongDish(mainCourse)}}><i className="fa fa-cart-plus fa-3"></i>Add </button>
                                <Link className="btn btn-success" to={`/main-courses/${mainCourse.id}`}><i className="fa fa-eye fa-3"></i>Read More</Link>
                            </div>
                        </div>
            )}
            </React.Fragment>
        );
    }
}

export default MainCourses;