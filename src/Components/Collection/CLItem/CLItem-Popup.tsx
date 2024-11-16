import { CLItem } from "../DBCollection"
import { TextButton } from "../../../assets/shared/button/Button"

import "./CLItemPopup.css"
import { DBContext } from "../CollectionContext/collectionContext"
import { useContext } from "react"
import PopupContext from "../../Popup/PopupContext"

interface cLItemPopup {
    item: CLItem
}

export const CLItemPopup: React.FC<cLItemPopup> = ({ item }) => {
    const database = useContext(DBContext);
    const popup = useContext(PopupContext);

    const deleteItem = () => {
        database.shared.deleteItem(item)
        .then(() => {
            popup.openPopup(null);
        })
    }

    return (
        <>
            <div>
                <h2 className="item-popup__blurb">{item.blurb}</h2>
            </div>
            <div>

            </div>
            <div className="item-popup__footer">
                <TextButton size="s" style="negative" radiusStyle="s" onClick={deleteItem}>
                    Delete
                </TextButton>
            </div>
        </>
    )
}
