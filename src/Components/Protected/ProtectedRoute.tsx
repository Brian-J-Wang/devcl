import { PropsWithChildren, useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
	const userContext = useContext(UserContext);

	if (userContext.isLoading) {
		return <></>;
	} else if (!userContext.token || !userContext.isLoggedIn) {
		return <Navigate to="/" replace />;
	} else {
		if (!children) {
			return <Outlet />;
		} else {
			return children;
		}
	}
};

export default ProtectedRoute;
