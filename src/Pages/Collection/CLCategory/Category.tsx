import { ReactNode, useContext, useState} from 'react'
import "./Category.css"

import arrow from "../../../assets/Arrow.svg";
import { ItemApiContext } from '../Collection';

interface categoryProps {
    id: string,
    name: string,
    children: ReactNode,
}

const Category : React.FC<categoryProps> = ({ id, name, children}) => {
    const [isCollapsed, SetIsCollapsed] = useState<boolean>(false);
    const itemAPI = useContext(ItemApiContext);

    const handleKeyboardInput = (evt: any) => {
        if (evt.key == "Enter") {
            itemAPI.addItem(id, evt.target.value).then(() => {
                evt.target.value = "";
            });
        }
    }
    
    return (
        <div className="section">
            <div className="section__header">
                <button className="section__collapse-button" onClick={() => { SetIsCollapsed(!isCollapsed) }}>
                    <img src={arrow} alt="" className={`${isCollapsed && 'section__drop-down-arrow_collapsed'} section__drop-down-arrow`}/>
                </button>
                <h2 className="section__name"> { name } </h2>
            </div>
            <div hidden={isCollapsed}>
                <div className='section__items'>
                    { children }
                </div>
                <input type="text" className="section__new-item-input" id={id} placeholder="add something new" 
                        onKeyDown={handleKeyboardInput} onBlur={(evt) => { evt.target.value = "" }} autoComplete='off'/>
            </div>
        </div>
    )
}

export default Category;