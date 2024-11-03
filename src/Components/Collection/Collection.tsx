import './Collection.css';
import '../CheckList/checkList.css';
import { useEffect, useState } from "react";
import { checkListCollection, dummyCheckList, patchNotes, CLItemTO, DBUpdateObject } from '../../CheckList/interfaces';
import PatchNotes from "../../pastVersions/patchNotes";
import { addNewTaskDB, getUserCollection, patchMetadata, updateTaskDB, updateVersion } from "../../utils/databaseAccess";
import { TextButton } from "../../assets/shared/button/button";
import { Container } from "../../assets/shared/container/Container";
import formatMessage from "../../utils/formatMessage";
import Section from "../../CheckList/Section/section";

interface ICollection {
    url: string
}

export enum PatchType {
    major,
    minor,
    patch
}

const Collection : React.FC<ICollection> = ({ url: collectionId }) => {

    const [ collection, setCollection ] = useState<checkListCollection>(dummyCheckList);

    useEffect(() => {
        getUserCollection(collectionId)
        .then((collection) => {
            setCollection(collection);
        });
    }, []);

    const onValueChanged = ( item : CLItemTO ) => {
        updateTaskDB(collectionId, item)
        .then((res) => {
            const copy = { ... collection };
            const updatedItem = copy.checkList.find(section => section._id == item.section)?.items.find(item => item._id == res._id);

            if (updatedItem != null) {
                updatedItem.checked = res.checked;
            } 

            setCollection(copy);
        })
    }

    //work is going to have to be done here
    const addNewItem = (item: CLItemTO) => {
        addNewTaskDB(collection._id, item)
        .then((res) => {
            const copy = { ... collection };
            const section = copy.checkList.find(section => section._id == item.section);

            if (!section) {
                console.error('section was not found!');

                return;
            }

            section.items.push(res);
            setCollection(copy);
        })
    }  

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
        updateVersion(collection._id, patchType).then((patchNotes : patchNotes) => {
            const copy = { ... collection };
            copy.patchNotes.push(patchNotes);

            copy.checkList.forEach((section) => {
                section.items = section.items.filter((item) => !item.checked)
            });

            setCollection(copy);  
        });        
    }

    const handleKeyboardInput = (evt : any) => {
        if (evt.key == "Enter") {
            updateCheckListName(evt.target.value ?? '')
            .then(() => {
                evt.target.blur();
            })
        }
    }

    const handleInputBlur = (evt : any) => {
        updateCheckListName(evt.target.value);
    }

    const updateCheckListName = (newName: string) => {
        if (newName == collection.checklistName) {
            return Promise.resolve();
        }

        const update : DBUpdateObject= {
            name: newName,
        }

        return patchMetadata(collection._id, update)
        .then(res => {
            const copy = { ...collection };

            copy.checklistName = res.name;

            setCollection(copy);
        })
    }

    const resetNameChange = (evt: any) => {
        evt.target.value = collection.checklistName;
    }

    useEffect(() => {
        document.getElementById("check-list")?.scrollIntoView({behavior: "instant", block:"end"});
    }, [])

    return (
        <div className="collection">
            <div className="collection__check-list" id="checkList">
                {
                    (collection) ?
                    collection.patchNotes.map((patch, index) => {
                        const isLatest = index == collection.patchNotes.length - 1;
                        return (
                            <PatchNotes key={patch._id} patch={patch} isLatest={isLatest}></PatchNotes>
                        )
                    }) :
                    <></>
                }
                <hr className="collection__divider"/>
                <div className='check-list__container' id='check-list' tabIndex={0}>
                    <div>
                        <Container className='check-list__tool-bar'>
                            <button onClick={copyToClipboard}> Copy </button>
                            <button onClick={() => pushNewVersion(PatchType.major)}> Major Version </button>
                            <button onClick={() => pushNewVersion(PatchType.minor)}> Minor Version </button>
                            <button onClick={() => pushNewVersion(PatchType.patch)}> Patch </button>
                        </Container>
                        <Container className='check-list'>
                            <div className='check-list__header'>
                                <span id="check-list__dummy-span" className='check-list__dummy-span'></span>
                                <input id="check-list__name" className='check-list__name' type="text" defaultValue={collection.checklistName} onKeyDown={handleKeyboardInput} onBlur={handleInputBlur}/>
                            </div>
                            

                            {
                                collection.checkList.map((section) => {
                                    return (
                                        <Section section={section} handleValueChanged={onValueChanged} key={section._id} addNewItem={addNewItem}/>
                                    )
                                })
                            }

                            <div className='check-list__footer'>Version {collection.version} </div>
                        </Container>                        
                    </div>
                    <div className='check-list__padding'/>
                </div>
                
            </div>
            <div className="collection__tool-bar">
                <TextButton size="m" onClick={jumpToCheckList}>↓</TextButton>
            </div>
        </div>
        
    );
}

export default Collection;