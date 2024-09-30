import React, { useEffect, useRef, useState } from "react";
import "./multisave.less";

function fileSizePreview(size: number) {
  if (size > 2 ** 30) {
    return (size / 2 ** 30).toFixed(2) + " GB";
  }

  if (size > 2 ** 20) {
    return (size / 2 ** 20).toFixed(2) + " MB";
  }

  if (size > 2 ** 10) {
    return (size / 2 ** 10).toFixed(2) + " kB";
  }

  return size + " bytes";
}

function FilePreview(props: { file: Blob }) {
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

function SingleFileTableRow(props: {
  file: FileInfo;
  delete: () => void;
  rename: (name: string) => void;
  uploaded: boolean;
}) {
  return (
    <tr
      className={
        props.uploaded ? "multisave-uploaded-file" : "multisave-local-file"
      }
    >
      <td>
        <input
          type="text"
          value={props.file.name}
          onInput={(e) => {
            props.rename(e.currentTarget.value);
          }}
        ></input>
      </td>
      <td title={props.file.size + " bytes"}>
        {fileSizePreview(props.file.size)}
      </td>
      <td>
        {props.file.file ? (
          <FilePreview file={props.file.file}></FilePreview>
        ) : (
          <>Loading...</>
        )}
      </td>
      <td>{props.uploaded ? "✔" : ""}</td>
      <td>
        <button onClick={props.delete}>🗙</button>
      </td>
    </tr>
  );
}

type FileInfo = {
  name: string;
  size: number;
  file?: Blob;
  key: number;
  uploadedFileId?: string;
  nameChange?: {
    oldName: string;
  };
};

export function MultisaveDialog(props: { exit: () => void }) {
  const [stagedFiles, setStagedFiles] = useState<FileInfo[]>([]);

  const [hasFetchedUploads, setHasFetchedUploads] = useState(false);

  useEffect(() => {
    if (hasFetchedUploads) return;
    OZONE.ajax.requestModule(
      "files/PageFilesModule",
      { page_id: WIKIREQUEST.info.pageId },
      (response) => {
        const filesListHTML = response.body;
        const filesListTreeRoot = document.createElement("html");
        filesListTreeRoot.innerHTML = filesListHTML;

        const filesListTable = filesListTreeRoot.querySelector("tbody");

        if (!filesListTable) {
          setHasFetchedUploads(true);
          return;
        }

        const uploadedFiles: FileInfo[] = [];

        console.log(filesListTable);

        for (const singleFileInfo of filesListTable.querySelectorAll("tr")) {
          const name = singleFileInfo.children[0].querySelector("a")!.innerText;
          const sizeStr = (
            singleFileInfo.children[2] as HTMLElement
          ).innerText.trim();
          console.log("sizeStr", sizeStr);
          const size =
            parseFloat(sizeStr) *
            (sizeStr.endsWith("GB")
              ? 2 ** 30
              : sizeStr.endsWith("MB")
              ? 2 ** 20
              : sizeStr.endsWith("kB")
              ? 2 ** 10
              : 1);

          uploadedFiles.push({
            name,
            size,
            key: currentFileKey.current++,
            uploadedFileId: singleFileInfo.id.match(/[0-9]+$/)![0],
          });
        }

        setHasFetchedUploads(true);
        setStagedFiles([...stagedFiles, ...uploadedFiles]);
      }
    );
  }, [hasFetchedUploads]);

  const currentFileKey = useRef(0);
  return (
    <div className="multisave-dialog">
      <div className="multisave-header">
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
                name: file.name,
                size: file.size,
                key: currentFileKey.current++,
              });
            }
            setStagedFiles(stagedFilesCopy);
            e.target.files = null;
          }}
        ></input>
        <button>Save All</button>
        <button onClick={props.exit}>Exit</button>
      </div>
      <div className="multisave-dialog-scroll">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Size</th>
              <th>Preview</th>
              <th>Saved?</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {stagedFiles.map((f, i) => (
              <SingleFileTableRow
                key={f.key}
                file={f}
                uploaded={f.uploadedFileId !== undefined && !f.nameChange}
                rename={(name) => {
                  const newFile = { ...f };
                  if (!newFile.nameChange) {
                    newFile.nameChange = { oldName: f.name };
                  }
                  setStagedFiles(
                    stagedFiles.map((f2, j) => (i === j ? newFile : f2))
                  );
                }}
                delete={() => {
                  // if it's uploaded...
                  if (f.uploadedFileId) {
                    // delete the file from remote
                    OZONE.ajax.requestModule(
                      "Empty",
                      {
                        file_id: f.uploadedFileId,
                        action: "FileAction",
                        event: "deleteFile",
                      },

                      () => {
                        // once deleted, recheck to make sure it's actually gone
                        setStagedFiles(
                          stagedFiles.filter((f) => !f.uploadedFileId)
                        );
                        setHasFetchedUploads(false);
                      }
                    );
                  }

                  // remove the file from the list
                  // so that there's instant feedback
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
