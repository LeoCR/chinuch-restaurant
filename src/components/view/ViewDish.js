import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchDish,fetchIngredients} from '../../actions/menuActions';
class ViewDish extends React.Component {
    state={
        prevPage:'appetizers'
      }
    componentDidMount(){
        var id=this.props.match.params.id;
        if(id.includes('APPTZR')){
            this.setState({
                prevPage:'appetizers'
            })
        }
        else if(id.includes('DESRT')){
            this.setState({
                prevPage:'desserts'
            })
        }
        else if(id.includes('MNCRS')){
            this.setState({
                prevPage:'main-courses'
            })
        }
        this.props.fetchDish(id);
        this.props.fetchIngredients(id);
    }
    getIngredients(){
        if(!this.props.ingredients){
            return(
                <div>
                    Loading Ingredients
                </div>
            )
        }
        var titleHtml;
        if(this.props.ingredients.length>0){
            titleHtml=<h3>Ingredients</h3>
        }
        return( 
            <ul>
                {titleHtml}
            {
                this.props.ingredients.map(ingredient =>
                    {
                        return(
                            <li>
                                {ingredient.name} 
                                <img src={ingredient.img} alt={ingredient.name} style={{width:'50px'}}/>
                            </li>
                        )
                    }
                )
            }
            </ul>
        )
    }
    render(){
        if(!this.props.dish){
            return (
                <div>
                    Loading
                </div>
            )
        }
        console.log(this.props);
        const {name,picture,price,description,id}=this.props.dish;
        return(
            <div className="container" key={id}>
                <Link to={`/${this.state.prevPage}`} className="btn btn-success">Back</Link>
                <h1>{name}</h1>
                <img src={picture} alt={name} style={{maxWidth:'190px'}}/>
                <p>Description: {description}</p>
                <p>Price: {price}$ </p>
                
                {this.getIngredients()}  
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return {
        dish:state.menu.dish,
        ingredients:state.menu.ingredients
    }
}
export default connect(mapStateToProps,{fetchDish,fetchIngredients})(ViewDish);