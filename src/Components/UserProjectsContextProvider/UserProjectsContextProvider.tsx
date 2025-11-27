import { UserContext } from "@context/UserContext";
import userProjectContext from "@context/userProjectContext";
import { PropsWithChildren, useContext } from "react";
import useUserProjectsAPI from "@hooks/useUserTaskDocAPI";

type UserProjectsContextProviderType = PropsWithChildren;

const UserProjectsContextProvider: React.FC<UserProjectsContextProviderType> = ({ children }) => {
	const { token } = useContext(UserContext);
	const api = useUserProjectsAPI("http://localhost:5081", token);

	console.log(api);

	return <userProjectContext.Provider value={api}>{children}</userProjectContext.Provider>;
};

export default UserProjectsContextProvider;
