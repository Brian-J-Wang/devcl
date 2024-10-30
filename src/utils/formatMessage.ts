import { checkListCollection } from "../CheckList/interfaces";

function formatMessage(data : checkListCollection) {
    let message = '';

    message += `version - ${data.version} \r\r`

    data.checkList.forEach((section) => {
        section.items.forEach((item) => {
            console.log(section);

            if (item.checked) {
                message += `${section.format}: ${item.title}\r`
            }
        })
    });

    return message;
}

export default formatMessage;