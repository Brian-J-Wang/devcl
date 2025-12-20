import TaskAttributeAPI from "./attribute.api";
import { useEffect, useRef, useState } from "react";
import { AttributeFactory } from "./attribute.factory";
import { Attribute } from "./attribute.class";

const useTaskAttributeAPI = (endpoint: string, docuId: string, token: string) => {
	const api = useRef(new TaskAttributeAPI(endpoint, docuId, token));
	const [attributes, _setAttributes] = useState<Attribute[]>([]);
	const [isLoading, _setIsloading] = useState<boolean>(true);

	useEffect(() => {
		api.current
			.getAttribute()
			.then((res) => {
				_setAttributes(res.map((res) => AttributeFactory(res)));
				_setIsloading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const getAttribute: (id: string) => Attribute = (id: string) => {
		const result = attributes.find((attribute) => attribute.id == id);

		if (result) {
			return result;
		} else {
			throw new Error("requesting attribute that does not exist");
		}
	};

	return {
		attributes,
		getAttribute,
		isLoading
	};
};

export default useTaskAttributeAPI;
