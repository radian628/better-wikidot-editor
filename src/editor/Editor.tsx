import React, { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { defaultKeymap } from "@codemirror/commands";
import { EditorView, keymap } from "@codemirror/view";

export function Editor(props: {
  text: string;
  setText: (text: string) => void;
}) {
  const editorContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = editorContainerRef.current;
    if (!container) return;

    const initState = EditorState.create({
      doc: props.text,
      extensions: [keymap.of(defaultKeymap)],
    });

    const view = new EditorView({
      state: initState,
      parent: container,
    });
  }, []);

  return <div ref={editorContainerRef}></div>;
}
