import { Container } from "../../../Components/Container/Container";
import CLItemElement, { CLItemTag } from "../Task/CLItem";
import { useContext } from "react";
import { CollectionContext } from "../Collection";
import ItemEditorContext from "../ItemEditor/itemEditorContext";

import style from "./checklist.module.css";
import AddItemInput from "./AddItemInput/AddItemInput";

const CheckList: React.FC<{}> = () => {
    const itemEditorContext = useContext(ItemEditorContext);
    const collectionContext = useContext(CollectionContext);

    return (
        <>
            <Container className={style.checklist}>
                <div className={collectionContext.items.length == 0 ? style.noContent : style.content}>
                    {
                        collectionContext.items.length == 0
                        ? (
                            <>
                                <h1 className={style.noContentBlurb}>
                                    You don't have any active tasks.
                                </h1>
                            </>
                        )
                        : collectionContext.items.map((item) => {
                            console.log(item);

                            return <CLItemElement 
                                key={item._id} 
                                task={item} 
                                onClick={() => {}} 
                            />
                        })
                    }
                </div>
                <AddItemInput/>
            </Container>
        </>
    );
}

interface CheckListKeyComponentProps {
    name: string,
    desc: string
}

const CheckListKeyComponent: React.FC<CheckListKeyComponentProps> = (props) => {
    return (
        <div>
            {props.name}
        </div>
    )
}

export default CheckList