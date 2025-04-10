import { Container } from "../../../Components/Container/Container";
import { CLItem } from "../../../Pages/Collection/interfaces";
import CLItemElement, { CLItemTag } from "../CLItem/CLItem";
import { useContext } from "react";
import { CollectionContext } from "../Collection";
import ItemEditorContext from "../ItemEditor/itemEditorContext";

import style from "./checklist.module.css";

const CheckList: React.FC<{}> = () => {
    const itemEditorContext = useContext(ItemEditorContext);
    const collectionContext = useContext(CollectionContext);

    const openEditor = (item: CLItem) => () => {
        itemEditorContext.setActiveItem(item);
    }

    return (
        <>
            <Container className={style.checklist}>
                <div className={style.checklist}>
                    {
                        collectionContext.items.map((item) => {
                            const tag = collectionContext.categories.find((category) => category._id == item.category);

                            return <CLItemElement 
                                key={item._id} 
                                clItem={item as CLItem} 
                                onClick={openEditor(item)} 
                                tags={ tag && (
                                    <CLItemTag>
                                        {tag?.format}
                                    </CLItemTag>
                                )}
                            />
                        })
                    }
                </div>
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