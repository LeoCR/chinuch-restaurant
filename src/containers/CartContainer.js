import React from "react";
import Basket from "../components/shopping-cart/Basket";
import Login from "../components/user/Login";
import Modal from "../components/Modal";
const CartContainer=(props)=>{
    return(
        <React.Fragment>
            <Basket 
                hasOrders={props.hasOrders} 
                totalOrders={props.totalOrders}
                calculateOrders={props.calculateOrders}
                setShowOrders={props.setShowOrders}/>
            <Login 
                setShowLogin={props.setShowLogin}
                setShowUserDetails={props.setShowUserDetails}
                showModal={props.showModal} 
            />
            <Modal 
                setShowUserCreated={props.setShowUserCreated}
                setShowSignUp={props.setShowSignUp} 
                setShowLogin={props.setShowLogin}
                setShowUserDetails={props.setShowUserDetails}
                addToCart={props.addToCart} 
                calculateOrders={props.calculateOrders}
                showModal={props.showModal}
                setShowUserDetails={props.setShowUserDetails}
            />
        </React.Fragment>
    )
}
export default CartContainer;