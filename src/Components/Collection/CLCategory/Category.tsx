import { useContext} from 'react'
import { CLCategories, CLItemPost } from '../DBCollection'
import CLItemElement from '../CLItem/CLItem'
import './Category.css'
import { DBContext } from '../CollectionContext/collectionContext'

interface categoryProps {
    clCategory: CLCategories
}

const Category : React.FC<categoryProps> = ({clCategory }) => {
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
                <h2 className="section__name"> { clCategory.name } </h2>
            </div>
            
            <div className='section__items'>
                {clCategory.items.map((item) => {
                    item.section = clCategory._id;
                    return (
                        <CLItemElement key={item._id} clItem={item} category={clCategory._id}></CLItemElement>
                    )
                })}
            </div>
            
            <div className="section__new-item">
                <input type="text" className="section__new-item-input" id={clCategory._id} placeholder="add something new" onKeyDown={handleKeyboardInput} onBlur={(evt) => { evt.target.value = "" }} autoComplete='off'/>
            </div>
        </div>
    )
}

export default Category;