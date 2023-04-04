import { Navigate } from "react-router-dom"

export const PrivateRoute=({children})=>{

    let data = (localStorage.getItem("token"))
 
    if(!data){
       return <Navigate to="/login" />
    }
    return(
        <>
        {children}
        </>
    )
}