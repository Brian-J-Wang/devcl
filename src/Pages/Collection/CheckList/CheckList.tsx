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
        <div className="check-list">
            <div className='check-list__header'>
                <input className='check-list__name' type="text" defaultValue={collectionContext.name} onKeyDown={handleKeyboardInput} onBlur={handleInputBlur}/>
            </div>
            <div className="check-list__content">
                <CheckListOutline/>
                <Container className="check-list__items">
                    
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
        </div>
    );
}

export default CheckList;