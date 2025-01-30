import { CLItem } from "../DBCollection"
import { TextButton } from "../../../assets/shared/button/Button"

import "./CLItemPopup.css"
import { DBContext } from "../CollectionContext/collectionContext"
import { useContext } from "react"
import { popupContext } from "../../Contexts/Popup"

interface cLItemPopup {
    item: CLItem
}

export const CLItemPopup: React.FC<cLItemPopup> = ({ item }) => {
    const database = useContext(DBContext);
    const popup = useContext(popupContext);

    const deleteItem = () => {
        database.shared.deleteItem(item)
        .then(() => {
            popup.closePopup();
        })
    }

    return (
        <>
            <div>
                <h2 className="item-popup__blurb">{item.blurb}</h2>
            </div>
            <div>

            </div>
        </>
    )
}
