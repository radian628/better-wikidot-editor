import { CompletionContext } from "@codemirror/autocomplete";
import { EditorView } from "codemirror";

export const wikitextElementAutocomplete = EditorView.inputHandler.of(
  (view, from, to, text, insertTransaction) => {
    if (text != "]") return false;
    return true;
  }
);
