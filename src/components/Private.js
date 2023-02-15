import { Navigate } from "react-router-dom";

const Private = ({children}) => {
    const isAuthenticate = true;
    return isAuthenticate ? children : <Navigate to="/" />;
}
export default Private; 