import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchDrink} from '../../actions/menuActions';
class ViewDrink extends React.Component {
    componentDidMount(){
        this.props.fetchDrink(this.props.match.params.id);
    }
    render(){
        if(!this.props.drink){
            return (
                <div>
                    Loading
                </div>
            )
        }
        const {name,picture,price,description,id}=this.props.drink;
        return(
            <div className="container" key={id}>
                <Link to="/" className="btn btn-success">Back</Link>
                <h1>{name}</h1>
                <img src={picture} alt={name} style={{maxWidth:'190px'}}/>
                <p>Description: {description}</p>
                <p>Price: {price}$ </p>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return {
        drink:state.menu.drink
    }
}
export default connect(mapStateToProps,{fetchDrink})(ViewDrink);