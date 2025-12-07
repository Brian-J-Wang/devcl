import { PropsWithChildren, ReactNode, useState } from 'react';
import './Container.css';
import { ContainerContext } from './ContainerContext';
import ContainerHeader from './ContainerHeader';
import ContainerBody from './ContainerBody';

type ContainerProps = React.FC<PropsWithChildren & React.HTMLAttributes<HTMLDivElement>> & {
    Header: React.FC<PropsWithChildren>;
    Body: React.FC<PropsWithChildren>;
};

const Container: ContainerProps = (props) => {
    const [header, setHeader] = useState<ReactNode>(null);
    const [body, setBody] = useState<ReactNode>(null);

    return (
        <ContainerContext.Provider value={{ setHeader, setBody }}>
            <div {...props} className={`${props.className ?? ''} container`}>
                {header != null && <div>{header}</div>}
                {body != null && <div>{body}</div>}
                {props.children}
            </div>
        </ContainerContext.Provider>
    );
};

Container.Header = ContainerHeader;
Container.Body = ContainerBody;

export { Container };
