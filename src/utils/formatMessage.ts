import { CLCollection } from "../Components/Collection/DBCollection";

function formatMessage(data : CLCollection) {
    let message = '';

    message += `version - ${data.version} \r\r`

    data.categories.forEach((category) => {
        category.items.forEach((item) => {
            if (item.checked) {
                message += `${category.format}: ${item.blurb}\r`
            }
        })
    });

    return message;
}

export default formatMessage;