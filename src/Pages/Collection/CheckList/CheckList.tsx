import { Container } from "../../../Components/Container/Container";
import Category from "../CLCategory/Category";

import "./CheckList.css"
import { CLItem } from "../../../Pages/Collection/interfaces";
import CLItemElement from "../CLItem/CLItem";
import CheckListOutline from "./CheckListOutline/CheckListOutline";
import { useContext } from "react";
import { CollectionContext } from "../Collection";

const CheckList: React.FC<{}> = () => {
    const collectionContext = useContext(CollectionContext);

    const handleKeyboardInput = (evt: any) => {
        if (evt.key == "Enter") {   }
    }

    const handleInputBlur = (evt: any) => {
        updateCheckListName(evt.target.value);
    }

    const updateCheckListName = (newName: string) => { 
        console.log(newName);
    }

    return (
        <>
            <CheckListOutline/>
            <div className="check-list__content">
                <Container className="check-list__items">
                    <div className='check-list__header'>
                        <input id="check-list__name" className='check-list__name' type="text" defaultValue={collectionContext.name} onKeyDown={handleKeyboardInput} onBlur={handleInputBlur}/>
                    </div>
                    {
                        collectionContext.categories.map((category) => {
                            return (
                                <Category key={category._id} name={category.name} id={category._id}> 
                                    {
                                        collectionContext.items.filter((item) => {
                                            return item.category == category._id
                                        }).map((item) => {
                                            return <CLItemElement clItem={item as CLItem} key={item._id}></CLItemElement>
                                        })
                                    }
                                </Category>
                            )
                        })
                    }

                    <div className='check-list__footer'>Version {collectionContext.version}</div>
                </Container>
            </div>
        </>
    );
}

export default CheckList;