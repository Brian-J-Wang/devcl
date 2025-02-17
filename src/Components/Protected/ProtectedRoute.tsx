import { useContext } from "react"
import { UserContext } from "../../Contexts/UserContext"
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC<{}> = () => {
    const userContext = useContext(UserContext);

    if (userContext.isLoading) {
        return (
            <Outlet/>
        )
    } else if (!userContext.token || !userContext.isLoggedIn) {
        return <Navigate to="/" replace />;
    } else {
        return (
            <Outlet/>
        )
    }
}

export default ProtectedRoute