import React from 'react';
import $ from 'jquery';
import { createUniversalPortal, removeUniversalPortals } from "react-portal-universal";
class Basket extends React.Component {
    getOrders=()=>{
        if(!this.props.hasOrders){
            return(
                <React.Fragment>
                    <div id="empty-basket-car">
                    </div>
                </React.Fragment>
            )
        }
        return (
            <React.Fragment>
                <g id="quantity-container">
                    <g transform="matrix(0.67766,0,0,0.759,-139.309,-25.3393)">
                        <ellipse cx="855.275" cy="124.857" rx="115.93" ry="101.844" 
                        style={{fill:'rgb(166,26,2)',
                        stroke:'rgb(166,26,2)',
                        strokeWidth:'0.86px',strokeLinecap:'round',
                        strokeMiterlimit:1.5}}/>
                    </g>
                    <g transform="matrix(6.72557,0,0,7.39687,-4530.4,-1023.58)">
                                <text x="732.501px" y="151.716px" 
                                style={{fontFamily:"'ArialMT', 'Arial', sans-serif",fontSize:'12px',
                                fill:'rgb(235,235,235)'}} 
                                id="text-quantity">{this.props.totalOrders}</text>
                    </g>
                </g>
            </React.Fragment>
        )
    }
    showProdutcs=()=>{
        this.props.setShowOrders();   
        this.props.calculateOrders();
        $('body').toggleClass('modal-opened');
    }
    render() {
        return createUniversalPortal(
            <svg onClick={()=>{this.showProdutcs()}} width="100%" height="100%" 
            viewBox="0 0 959 840" version="1.1"
             xmlns="http://www.w3.org/2000/svg" 
             xmlnsXlink="http://www.w3.org/1999/xlink" 
             xmlSpace="preserve" 
             style={{fillRule:'evenodd',clipRule:'evenodd',
             strokeLinejoin:'round',strokeMiterlimit:1.41421,cursor:'pointer',
             width:'85px'}}>
                <g id="shopping-cart=table-board" transform="matrix(1.70469,0,0,1.54998,30.9675,29.137)">
                    <rect x="-18.166" y="-18.798" width="562.296" height="541.398" style={{fill:'none'}}/>
                    <g transform="matrix(0.586617,0,0,0.64517,-18.1661,-18.7983)">
                        <path d="M854.408,87.419L35.72,86.107L119.876,750.029L768.611,750.029L854.408,87.419Z"/>
                    </g>
                    <g id="shopping-cart" transform="matrix(0.586617,0,0,0.64517,75.7024,88.461)">
                        <path d="M153,408C124.95,408 102,430.95 102,459C102,487.05 124.95,510 153,510C181.05,510 204,487.05 204,459C204,430.95 181.05,408 153,408ZM0,0L0,51L51,51L142.8,244.8L107.1,306C104.55,313.65 102,323.85 102,331.5C102,359.55 124.95,382.5 153,382.5L459,382.5L459,331.5L163.2,331.5C160.65,331.5 158.1,328.95 158.1,326.4L158.1,323.849L181.05,280.499L369.75,280.499C390.15,280.499 405.45,270.299 413.1,254.999L507.394,92.17C511.466,82.993 519.869,72.57 511.43,61.475C503.69,51.298 499.8,51 484.5,51L107.1,51L84.15,0L0,0ZM408,408C379.95,408 357,430.95 357,459C357,487.05 379.95,510 408,510C436.05,510 459,487.05 459,459C459,430.95 436.05,408 408,408Z" 
                        style={{fill:'#ffa347',fillRule:'nonzero',stroke:'#ffa347',
                        strokeWidth:'1px'}}/>
                    </g>
                        {this.getOrders()}
                </g>
            </svg>,
            "#basket-shopping-cart"
        );
    }
}
removeUniversalPortals();
export default Basket