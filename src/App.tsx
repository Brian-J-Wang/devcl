import "./App.css";
import "./assets/DevCL.css";

import { Routes, Route, Outlet } from "react-router-dom";
import Collection from "./Pages/Collection/Collection";
import Home from "./Pages/Home/Home";
import UserProjects from "./Pages/UserCollections/UserProjects";
import UserContextProvider from "./Contexts/UserContext";
import ModalContextProvider from "./Contexts/Modal/ModalContext";
import ProtectedRoute from "./Components/Protected/ProtectedRoute";
import NotFound from "./Pages/NotFound/NotFound";
import UserProjectsContextProvider from "@components/UserProjectsContextProvider/UserProjectsContextProvider";

function App() {
	return (
		<UserContextProvider>
			<ModalContextProvider>
				<div className="app" id="app">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route
							element={
								<ProtectedRoute>
									<UserProjectsContextProvider>
										<Outlet />
									</UserProjectsContextProvider>
								</ProtectedRoute>
							}>
							<Route path="collections" element={<UserProjects />} />
							<Route path="collections/:id/*" element={<Collection />} />
						</Route>
						<Route path="*" element={<NotFound />} />
					</Routes>
				</div>
			</ModalContextProvider>
		</UserContextProvider>
	);
}

export default App;
