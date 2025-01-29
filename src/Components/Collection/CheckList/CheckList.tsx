import { useContext, useEffect } from "react";
import formatMessage from "../../../utils/formatMessage";
import { PatchType } from "../Collection/Collection";
import { TextButton } from "../../../assets/shared/button/Button";
import { Container } from "../../../assets/shared/container/Container";
import Category from "../CLCategory/Category";
import CLPatchElement from "../CLPatch/CLPatch";
import { DBContext } from "../CollectionContext/collectionContext";

import "./CheckList.css"

const CheckList: React.FC = () => {
    const database = useContext(DBContext);

    const jumpToCheckList = () => {
        const element = document.getElementById("check-list");
        //@ts-ignore
        if (element) {
            element.scrollIntoView({behavior: "smooth", block:"start"});
        }
    }

    const copyToClipboard = () => {
        if (database.collection) {
            const message = formatMessage(database.collection);
            navigator.clipboard.writeText(message);
        }
    }

    const pushNewVersion = ( patchType: PatchType) => {
        database.shared.postPatch(patchType);
    }

    const handleKeyboardInput = (evt: any) => {
        if (evt.key == "Enter") {   }
    }

    const handleInputBlur = (evt: any) => {
        updateCheckListName(evt.target.value);
    }

    const updateCheckListName = (newName: string) => { 
        console.log(newName);
     }

    useEffect(() => {
        document.getElementById("check-list")?.scrollIntoView({behavior: "instant", block:"end"});
    }, []);

    return (
        <div className="container-cl">
            <div className="check-list" id="checkList">
                {
                    database.collection.patches.map((patch, index) => {
                        const isLatest = database.collection.patches.length - 1 == index;

                        return (<CLPatchElement key={patch._id} patch={patch} isLatest={isLatest}></CLPatchElement>)
                    })
                }
                <hr className="check-list__divider"/>
                <div className='check-list__container' id='check-list' tabIndex={0}>
                    <div>
                        <Container className='check-list__tool-bar_h'>
                            <button onClick={copyToClipboard}> Copy </button>
                            <button onClick={() => pushNewVersion(PatchType.major)}> Major Version </button>
                            <button onClick={() => pushNewVersion(PatchType.minor)}> Minor Version </button>
                            <button onClick={() => pushNewVersion(PatchType.patch)}> Patch </button>
                        </Container>
                        <Container className="check-list__items">
                            <div className='check-list__header'>
                                <input id="check-list__name" className='check-list__name' type="text" defaultValue={database.collection.name} onKeyDown={handleKeyboardInput} onBlur={handleInputBlur}/>
                            </div>
                            {
                                database.collection.categories.map((category) => {
                                    return (
                                        <Category key={category._id} clCategory={category}/>
                                    )
                                })
                            }

                            <div className='check-list__footer'>Version {database.collection.version}</div>
                        </Container>
                    </div>
                </div>
            </div>
            <div className="check-list__tool-bar_v">
                <TextButton size="m" onClick={jumpToCheckList}>↓</TextButton>
            </div>
        </div>
    );
}

export default CheckList;