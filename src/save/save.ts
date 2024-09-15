function fail(msg: string): never {
  window.alert(msg);
  throw new Error(msg);
}

export async function save(source: string) {
  return new Promise<void>((resolve, reject) => {
    let editPageForm = OZONE.utils.formToArray("edit-page-form");

    if (!editPageForm) {
      fail("Expected the page form to be open.");
    }

    editPageForm = {
      ...editPageForm,
      source,
      action: "WikiPageAction",
      event: "savePage",
      mode: WIKIDOT.modules.PageEditModule.vars.editMode,
      wiki_page: WIKIREQUEST.info.requestPageName,
      lock_id: WIKIDOT.page.vars.editlock.id,
      page_id: WIKIREQUEST.info.pageId,
      lock_secret: WIKIDOT.page.vars.editlock.secret,
      revision_id: WIKIDOT.page.vars.editlock.revisionId,
    };

    OZONE.ajax.requestModule("Empty", editPageForm, () => {
      resolve();
    });
  });
}

//@ts-ignore
window.wikidotSaveTest = save;
