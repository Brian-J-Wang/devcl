import './checkList.css'
import '../../assets/DevCL.css'
import {checkListCollection, CLItemTO} from '../../CheckList/interfaces';
import Section from '../../CheckList/Section/section';
import formatMessage from '../../utils/formatMessage';
import { PatchType } from '../Collection/Collection';

const CheckList : React.FC<{
    handleValueChanged: (changedValues : CLItemTO) => void,
    handleNewItemAdded: (item: CLItemTO) => void,
    handleVersionUpdate: (version : PatchType) => void,
    handleNameChanged: (name: string) => void,
    checkList: checkListCollection | undefined;
}> = ({ handleValueChanged, handleNewItemAdded, handleNameChanged, handleVersionUpdate, checkList}) => {

    const onCopyButtonClick = () => {
        if (checkList) {
            const message = formatMessage(checkList);
            navigator.clipboard.writeText(message);
        }
    }

    const handleNewNameSubmit = (evt : any) => {
        if (evt.key == "Enter") {
            handleNameChanged(evt.target.value);
        }
    }

    const resetNameChange = (evt: any) => {
        evt.target.value = checkList?.checklistName;
    }

    return(
        <div className='check-list__container' id='check-list'>
            {
                (checkList) ? (
                    <div>
                        <div className='devcl__container check-list__tool-bar'>
                                <button onClick={onCopyButtonClick}> Copy </button>
                                <button onClick={() => handleVersionUpdate(PatchType.major)}> Major Version </button>
                                <button onClick={() => handleVersionUpdate(PatchType.minor)}> Minor Version </button>
                                <button onClick={() => handleVersionUpdate(PatchType.patch)}> Patch </button>
                            </div>
                        <div className='devcl__container check-list'>
                            <div className='check-list__header'>
                                <input className='check-list__name' type="text" defaultValue={checkList.checklistName} onKeyDown={handleNewNameSubmit} onBlur={resetNameChange}/>
                            </div>
                            

                            {
                                checkList.checkList.map((section) => {
                                    return (
                                        <Section section={section} handleValueChanged={handleValueChanged} key={section._id} addNewItem={handleNewItemAdded}/>
                                    )
                                })
                            }
                        </div>
                    </div>
                    
                ) : (
                    <div className='devcl__container check-list__empty'>
                        <h2 className='check-list__empty-header'> We couldn't find this Checklist </h2>
                        <p className='check-list__empty'> Would you like to create a new project?</p>
                        <button className='check-list__empty'>Create New Checklist</button>
                    </div>
                )
            }
            
            <div className='check-list__padding'>

            </div>
        </div>
        
    
    )
}

export default CheckList