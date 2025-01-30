import { CLItem } from "../DBCollection"

import { DBContext } from "../CollectionContext/collectionContext"
import { useContext, useEffect } from "react"
import { popupContext } from "../../Contexts/Popup"
import { InitialConfigType, LexicalComposer } from "@lexical/react/LexicalComposer"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { EditorThemeClasses } from "lexical"

import "./CLItemPopup.css"
import "../../Editor/editor.css"


interface cLItemPopup {
    item: CLItem
}

export const CLItemPopup: React.FC<cLItemPopup> = ({ item }) => {
    const database = useContext(DBContext);
    const popup = useContext(popupContext);

    const theme: EditorThemeClasses = {
        root: "editor"
    } 

    const initialConfig: InitialConfigType = {
        namespace: 'MyEditor',
        theme: theme,
        onError: (err: any) => { console.log(err)}
    };

    function MyCustomAutoFocusPlugin() {
        const [editor] = useLexicalComposerContext();
      

        useEffect(() => {
          // Focus the editor when the effect fires!
          editor.focus();
        }, [editor]);
      
        return null;
    }

    return (
        <>
            <div>
                <h2 className="item-popup__blurb">{item.blurb}</h2>
            </div>

            <h3>Notes</h3>
            <LexicalComposer initialConfig={initialConfig}>
                
                <RichTextPlugin
                    contentEditable={<ContentEditable/>}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin/>
                <MyCustomAutoFocusPlugin/>
            </LexicalComposer>
        </>
    )
}
