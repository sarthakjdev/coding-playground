import Editor from "@monaco-editor/react";
import Monaco  from "@monaco-editor/react";


export default function CodeEditor({ language }: { language: string }): JSX.Element {
    return (
        <Editor height={'70vh'} defaultLanguage={language} defaultValue={"// write your code here"} theme={"vs-dark"} />
    )
}