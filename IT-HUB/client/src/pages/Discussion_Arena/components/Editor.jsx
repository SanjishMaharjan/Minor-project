import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "./editor.scss";

const TextEditor = ({ comment, setText, editText }) => {
  useEffect(() => {
    if (editText) {
      const blocksFromHtml = htmlToDraft(editText);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, [editText]);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    if (comment) comment.current = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    else setText(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  return (
    <div>
      <Editor
        className="editor"
        editorState={editorState}
        toolbarHidden
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
};

export default TextEditor;
