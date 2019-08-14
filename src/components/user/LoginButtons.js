import React from "react";
function LoginButtons(){
        return(
            <React.Fragment>
                <div className="container-login">
                    <button className="btn btn-primary" id="btn-facebook" onClick={()=>window.location.replace("/auth/facebook/callback")} 
                        style={{border:'none',background:'#0031db'}}>
                        <svg style={{float:'left'}} version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 512 512" >
                            <g id="_x23_020201ff">
                                <path fill="#ffffff" d="M223.22,71.227c16.066-15.298,38.918-20.465,60.475-21.109c22.799-0.205,45.589-0.081,68.388-0.072   c0.09,24.051,0.098,48.111-0.009,72.161c-14.734-0.026-29.478,0.036-44.212-0.026c-9.343-0.582-18.937,6.5-20.635,15.762   c-0.224,16.093-0.081,32.195-0.072,48.289c21.61,0.089,43.22-0.027,64.829,0.054c-1.582,23.281-4.47,46.456-7.858,69.541   c-19.088,0.179-38.187-0.018-57.274,0.099c-0.17,68.665,0.089,137.33-0.134,205.995c-28.352,0.116-56.721-0.054-85.072,0.08   c-0.537-68.674,0.044-137.383-0.295-206.066c-13.832-0.144-27.672,0.099-41.503-0.116c0.053-23.085,0.018-46.169,0.026-69.246   c13.822-0.169,27.654,0.036,41.477-0.098c0.42-22.442-0.421-44.91,0.438-67.333C203.175,101.384,209.943,83.493,223.22,71.227z"/>
                            </g>
                        </svg>
                        <p style={{textAlign: 'center',color: '#fff'}}>Login with Facebook</p>
                    </button>
                    <button style={{border:'1px solid gray'}} className="btn" id="btn-google" onClick={()=>window.location.replace("/auth/google/callback")}>
                        <svg style={{float:'left'}} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="40px" height="40px">
                            <defs>
                                <path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
                            </defs>
                            <clipPath id="b">
                                <use xlinkHref="#a" overflow="visible"/>
                            </clipPath>
                            <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"/>
                            <path clipPath="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/>
                            <path clipPath="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/>
                            <path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/>
                        </svg>
                        <p style={{textAlign: 'center',color: '#000'}}>Login with Google</p>
                    </button>
                </div>
            </React.Fragment>
        );
}
export default LoginButtons;