import React, { useEffect, useRef, useState } from "react";
import "./multisave.less";

function fileSizePreview(size: number) {
  if (size > 1_000_000_000) {
    return (size / 1_000_000_000).toFixed(2) + " GB";
  }

  if (size > 1_000_000) {
    return (size / 1_000_000).toFixed(2) + " MB";
  }

  if (size > 1_000) {
    return (size / 1_000).toFixed(2) + " KB";
  }

  return size + " bytes";
}

function FilePreview(props: { file: File }) {
  const [url, setURL] = useState<string>();

  useEffect(() => {
    if (!url) setURL(URL.createObjectURL(props.file));

    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [props.file]);

  if (props.file.type.startsWith("image")) {
    if (url) return <img className="multisave-image-preview" src={url}></img>;
    return <div>Loading...</div>;
  }
  return <div>N/A</div>;
}

function SingleFileTableRow(props: { file: File; delete: () => void }) {
  return (
    <tr>
      <td>{props.file.name}</td>
      <td title={props.file.size + " bytes"}>
        {fileSizePreview(props.file.size)}
      </td>
      <td>{<FilePreview file={props.file}></FilePreview>}</td>
      <td>
        <button onClick={props.delete}>🗙</button>
      </td>
    </tr>
  );
}

export function MultisaveDialog(props: { exit: () => void }) {
  const [stagedFiles, setStagedFiles] = useState<{ file: File; key: number }[]>(
    []
  );
  const currentFileKey = useRef(0);
  return (
    <div className="multisave-dialog">
      <div className="multisave-header">
        <button style={{ float: "right" }} onClick={props.exit}>
          Exit
        </button>
        <input
          type="file"
          multiple
          onChange={(e) => {
            const files = e.target.files;
            if (!files) return;

            const stagedFilesCopy = [...stagedFiles];
            for (const file of files) {
              stagedFilesCopy.push({
                file,
                key: currentFileKey.current++,
              });
            }
            setStagedFiles(stagedFilesCopy);
            e.target.files = null;
          }}
        ></input>
      </div>
      <div className="multisave-dialog-scroll">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Size</th>
              <th>Preview</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {stagedFiles.map((f, i) => (
              <SingleFileTableRow
                key={f.key}
                file={f.file}
                delete={() => {
                  setStagedFiles(stagedFiles.filter((f2, j) => i !== j));
                }}
              ></SingleFileTableRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
