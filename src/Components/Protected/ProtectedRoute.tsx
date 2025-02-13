import { useContext } from "react"
import { UserContext } from "../../Contexts/UserContext"
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute: React.FC<{}> = () => {
    const navigate = useNavigate();
    const userContext = useContext(UserContext);

    if (!userContext.token || !userContext.isLoggedIn) {
        navigate("");
        return <Navigate to="/" replace />;
    } else {
        return (
            <Outlet/>
        )
    }
}

export default ProtectedRoute