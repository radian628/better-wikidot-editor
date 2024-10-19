import React, { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { EditorView, keymap } from "@codemirror/view";
import { resetLock, save } from "../save/save";
import { wikitextElementAutocomplete } from "./autocomplete";
import { search } from "@codemirror/search";

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
        wikitextElementAutocomplete,
        EditorView.lineWrapping,
        keymap.of(defaultKeymap),
        search(),

        keymap.of([
          indentWithTab,
          {
            key: "Ctrl-s",
            run: (view) => {
              save(view.state.doc.toString()).then(async () => {
                props.onSave();
                await resetLock();
                setTimeout(() => {
                  const html = document.querySelector("html");
                  if (html) html.scrollTop = 0;
                  view.focus();
                }, 100);
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

  return (
    <div
      style={{ color: "black", height: "100%", overflow: "auto" }}
      ref={editorContainerRef}
    ></div>
  );
}
