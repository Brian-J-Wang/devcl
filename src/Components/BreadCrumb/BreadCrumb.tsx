import { Link } from "react-router-dom";

import "./BreadCrumb.css";

const BreadCrumb: React.FC = () => {
	const buildUrl = (index: number, arr: Array<string>): string => {
		console.log(index, arr);
		let string = "";

		if (index == 0) {
			return "/";
		}

		for (let i = 0; i <= index; i++) {
			if (i == 0) {
				continue;
			} else {
				string += arr[i];
			}
		}

		console.log(string);

		return string;
	};

	const getUrlItems = () => {
		const link = window.location.pathname;
		const result: string[] = [];
		link.split("/").forEach((value, index, arr) => {
			if (index == 0) {
				result.push("Home");
			} else {
				result.push(value);
			}

			if (index < arr.length - 1) {
				result.push("/");
			}
		});

		return result;
	};

	return (
		<div className="panel">
			{getUrlItems().map((item, index, arr) => {
				if (item == "/") {
					return <p> / </p>;
				} else {
					return (
						<Link to={buildUrl(index, arr)} className="breadcrumb__link">
							{item}
						</Link>
					);
				}
			})}
		</div>
	);
};

export default BreadCrumb;
