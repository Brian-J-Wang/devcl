import { isValidElement, PropsWithChildren, ReactNode } from "react";
import ContainerHeader from "./ContainerHeader";
import ContainerBody from "./ContainerBody";
import React from "react";
import ContainerFooter from "./ContainerFooter";

import styles from "./Container.module.css";

type ContainerProps = React.FC<PropsWithChildren & React.HTMLAttributes<HTMLDivElement>> & {
	Header: React.FC<PropsWithChildren>;
	Body: React.FC<PropsWithChildren>;
	Footer: React.FC<PropsWithChildren>;
};

const Container: ContainerProps = (props) => {
	let header: ReactNode = null;
	let body: ReactNode = null;
	let footer: ReactNode = null;

	React.Children.forEach(props.children, (child) => {
		if (!isValidElement(child)) return;

		if (child.type == Container.Header) {
			if (header == null) {
				header = child;
			} else {
				console.error("multiple header components found on container");
			}
		}
		if (child.type == Container.Body) {
			if (body == null) {
				body = child;
			} else {
				console.error("multiple body components found on container");
			}
		}
		if (child.type == Container.Footer) {
			if (footer == null) {
				footer = child;
			} else {
				console.error("multiple footer components found on container");
			}
		}
	});

	return (
		<div {...props} className={`${props.className ?? ""} ${styles.container}`}>
			{header}
			{body}
			{footer}
			{!header && !body && !footer && props.children}
		</div>
	);
};

Container.Header = ContainerHeader;
Container.Body = ContainerBody;
Container.Footer = ContainerFooter;

export { Container };
