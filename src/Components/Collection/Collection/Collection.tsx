import { useContext, useEffect, useRef, useState } from "react";
import Category from '../CLCategory/Category';
import { TextButton } from "../../../assets/shared/button/Button";
import { Container } from "../../../assets/shared/container/Container";
import formatMessage from "../../../utils/formatMessage";
import CollectionContext from '../collectionContext';
import DBCollection, { CLCollection, CLPatch, emptyCollection } from '../DBCollection';
import CLPatchElement from '../CLPatch/CLPatch';

import './Collection.css';
import DatabaseContext, {DBContext} from "../CollectionContext/collectionContext";

interface ICollection {
    collectionId: string
}

export enum PatchType {
    major,
    minor,
    patch
}

const Collection : React.FC<ICollection> = ({ collectionId }) => {
    const databaseContext = useContext(DBContext);
    const dbCollection = useRef(new DBCollection(collectionId));
    const [ collection, setCollection ] = useState<CLCollection>(emptyCollection);

    useEffect(() => {
        dbCollection.current.init(setCollection);
    }, []);

    const jumpToCheckList = () => {
        const element = document.getElementById("check-list");
        //@ts-ignore
        if (element) {
            element.scrollIntoView({behavior: "smooth", block:"start"});
        }
    }

    const copyToClipboard = () => {
        if (collection) {
            const message = formatMessage(collection);
            navigator.clipboard.writeText(message);
        }
    }

    const pushNewVersion = ( patchType: PatchType) => {   
        dbCollection.current.updateVersion(patchType)
        .then((patch: CLPatch) => {
            const copy = { ...collection };

            copy.patches.push(patch);

            setCollection(copy);
        })
    }

    const handleKeyboardInput = (evt : any) => {
        if (evt.key == "Enter") {   }
    }

    const handleInputBlur = (evt : any) => {
        updateCheckListName(evt.target.value);
    }

    const updateCheckListName = (newName: string) => {  }

    useEffect(() => {
        document.getElementById("check-list")?.scrollIntoView({behavior: "instant", block:"end"});
    }, []);

    return (
        <CollectionContext.Provider value={dbCollection.current}>
        <div className="collection">
            <div className="collection__check-list" id="checkList">
                {
                    databaseContext.collection?.patches.map((patch, index) => {
                        const isLatest = collection.patches.length - 1 == index;

                        return (<CLPatchElement key={patch._id} patch={patch} isLatest={isLatest}></CLPatchElement>)
                    })
                }
                <hr className="collection__divider"/>
                <div className='collection__container' id='check-list' tabIndex={0}>
                    <div>
                        <Container className='collection__tool-bar_h'>
                            <button onClick={copyToClipboard}> Copy </button>
                            <button onClick={() => pushNewVersion(PatchType.major)}> Major Version </button>
                            <button onClick={() => pushNewVersion(PatchType.minor)}> Minor Version </button>
                            <button onClick={() => pushNewVersion(PatchType.patch)}> Patch </button>
                        </Container>
                        <Container className="collection__items">
                            <div className='collection__header'>
                                <input id="check-list__name" className='collection__name' type="text" defaultValue={collection.name} onKeyDown={handleKeyboardInput} onBlur={handleInputBlur}/>
                            </div>
                            {
                                databaseContext.collection?.categories.map((category) => {
                                    return (
                                        <Category key={category._id} clCategory={category}/>
                                    )
                                })
                            }

                            <div className='collection__footer'>Version {collection.version}</div>
                        </Container>
                    </div>
                </div>
            </div>
            <div className="collection__tool-bar_v">
                <TextButton size="m" onClick={jumpToCheckList}>↓</TextButton>
            </div>
        </div>
        </CollectionContext.Provider>
    );
}

export default Collection;