import React, { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { EditorView, keymap } from "@codemirror/view";
import { save } from "../save/save";

export function Editor(props: {
  text: string;
  setText: (text: string) => void;
  onSave: () => void;
}) {
  const editorContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = editorContainerRef.current;
    if (!container) return;

    const initState = EditorState.create({
      doc: props.text,
      extensions: [
        keymap.of(defaultKeymap),

        keymap.of([
          indentWithTab,
          {
            key: "Ctrl-s",
            run: (view) => {
              save(view.state.doc.toString()).then(() => {
                props.onSave();
              });
              return true;
            },
            preventDefault: true,
            stopPropagation: true,
          },
        ]),
      ],
    });

    const view = new EditorView({
      state: initState,
      parent: container,
    });
  }, []);

  return <div ref={editorContainerRef}></div>;
}
