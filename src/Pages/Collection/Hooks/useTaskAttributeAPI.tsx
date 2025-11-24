import TaskAttributeAPI from "@api/taskAttributeAPI";
import { Attribute } from "@app-types/attributes";
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

	const getAttributeById: (id: string) => Attribute = (id: string) => {
		const result = attributes.find((attribute) => attribute.id == id);

		if (result) {
			return result;
		} else {
			throw new Error("requesting attribute that does not exist");
		}
	};

	return {
		attributes,
		isLoading,
		getAttributeById
	};
};

export default useTaskAttributeAPI;
