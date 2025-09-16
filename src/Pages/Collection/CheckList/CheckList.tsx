import { Container } from "../../../Components/Container/Container";
import CLItemElement from "../Task/task";
import { useContext } from "react";
import { CollectionContext, ItemApiContext } from "../Collection";

import style from "./checklist.module.css";
import AddItemInput from "./AddItemInput/AddItemInput";
import { Task } from "../../../utils/collectionAPI";

const CheckList: React.FC = () => {
    const collectionContext = useContext(CollectionContext);
    const itemAPI = useContext(ItemApiContext);

    const openPopup = () => {

    }

    const onCheckboxClick = (task: Task) => () => {
        itemAPI.updateItem({
            _id: task._id,
            status: task.status == "complete" ? "incomplete" : "complete"
        });
    }

    const onDeleteClick = (task: Task) => () => {
        itemAPI.deleteItem({ _id: task._id })
    }

    return (
        <Container className={style.checklist}>
            <div className={collectionContext.items.length == 0 ? style.noContent : style.content}>
                {
                    collectionContext.items.length == 0
                    ? (
                        <h1 className={style.noContentBlurb}>
                            You don't have any active tasks.
                        </h1>
                    ) : (
                        <>
                            <div>
                                
                            </div>
                            {
                                collectionContext.items.map((item) => {
                                    return <CLItemElement key={item._id} task={item} onClick={openPopup} 
                                    onCheckboxClick={onCheckboxClick(item)} onDeleteClick={onDeleteClick(item)}/>
                                })
                            }
                        </>
                    )
                }
            </div>
            <AddItemInput/>
        </Container>
    );
}

export default CheckList