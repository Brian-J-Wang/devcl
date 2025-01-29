import { useContext, useState} from 'react'
import { CLCategories, CLItemPost } from '../DBCollection'
import CLItemElement from '../CLItem/CLItem'
import './Category.css'
import { DBContext } from '../CollectionContext/collectionContext'

interface categoryProps {
    clCategory: CLCategories
}

const Category : React.FC<categoryProps> = ({clCategory }) => {
    const [isCollapsed, SetIsCollapsed] = useState<Boolean>(false)
    const database = useContext(DBContext);

    const handleKeyboardInput = (evt: any) => {
        if (evt.key == "Enter") {
            const item: CLItemPost = {
                category: clCategory._id,
                blurb: evt.target.value
            };

            database.shared.postItem(item)
            .then(() => {
                evt.target.value = "";
            })
        }
    }
    
    return (
        <div className="section">
            <div className="section__header">
                <button className="section__collapse-button" onClick={() => { SetIsCollapsed(!isCollapsed) }}>{isCollapsed ? ">" : "V"}</button>
                <h2 className="section__name"> { clCategory.name } </h2>
            </div>
            

            {
            !isCollapsed && <>
                <div className='section__items'>
                    {
                        database.shared.getItemsInCategory(clCategory._id).map((item) => {
                            return <CLItemElement key={item._id} clItem={item} category={clCategory._id} />
                        })
                    }
                </div>
                
                <div className="section__new-item">
                    <input type="text" className="section__new-item-input" id={clCategory._id} placeholder="add something new" onKeyDown={handleKeyboardInput} onBlur={(evt) => { evt.target.value = "" }} autoComplete='off'/>
                </div>
            </>
            }
            
            
        </div>
    )
}

export default Category;