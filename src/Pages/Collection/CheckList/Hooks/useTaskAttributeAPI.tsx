import TaskAttributeAPI from "@/API/taskAttributeAPI";
import Attribute from "@/types/attributes";
import { useEffect, useRef, useState } from "react";

const useTaskAttributeAPI = (endpoint: string, docuId: string, token: string) => {
	const api = useRef(new TaskAttributeAPI(endpoint, docuId, token));
	const [attributes, _setAttributes] = useState<Attribute[]>([]);
	const [isLoading, _setIsloading] = useState<boolean>(true);

	useEffect(() => {
		api.current
			.getAttribute()
			.then((res) => {
				_setAttributes(res);
				_setIsloading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return {
		attributes,
		isLoading
	};
};

export default useTaskAttributeAPI;
