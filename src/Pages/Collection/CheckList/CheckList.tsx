import { Container } from "../../../Components/Container/Container";
import CLItemElement from "../Task/CLItem";
import { useContext } from "react";
import { CollectionContext } from "../Collection";

import style from "./checklist.module.css";
import AddItemInput from "./AddItemInput/AddItemInput";

const CheckList: React.FC = () => {
    const collectionContext = useContext(CollectionContext);

    const openPopup = () => {

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
                                    return <CLItemElement key={item._id} task={item} onClick={openPopup} />
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