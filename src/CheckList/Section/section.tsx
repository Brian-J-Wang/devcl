import { checkListSection, CLItemTO } from '../interfaces'
import './section.css'

interface sectionProps {
    section: checkListSection,
    handleValueChanged: (data: CLItemTO) => void
    addNewItem: (newItem: CLItemTO) => void
}

const Section : React.FC<sectionProps> = ({ section, handleValueChanged, addNewItem}) => {

    const handleKeyboardInput = (evt: any) => {
        if (evt.key == "Enter") {
            addNewItem({
                section: section._id,
                title: evt.target.value,
                checked: false
            })

            evt.target.value = "";
        }
    }

    return (
        <div className="section">
            <div className="section__header">
                <h2 className="section__name"> { section.name } </h2>
            </div>
            
            {section.items.map((item) => {
                return (
                    <div className="section__item" key={item.title}>
                        <input type="checkbox" id={item._id} checked={item.checked} onChange={(evt) => {
                            handleValueChanged({
                                section: section._id,
                                id: item._id,
                                checked: evt.target.checked,
                                title: ''
                            })
                        }} className="item__checkbox"/>
                        <label htmlFor={item._id} className="item__label"> {
                                (item.checked) ? (
                                    <s>
                                        {item.title}
                                    </s>
                                ) : (
                                    <>
                                        {item.title}
                                    </>
                                )
                            }
                        </label>
                    </div>
                )
            })}
            
            <div className="section__new-item">
                <input type="text" className="section__new-item-input" id={section._id} placeholder="click to add something new" onKeyDown={handleKeyboardInput} onBlur={(evt) => { evt.target.value = "" }}/>
            </div>
        </div>
    )
}

export default Section;