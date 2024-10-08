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

export async function resetLock() {
  return new Promise<void>((resolve, reject) => {
    const params: any = {};
    const page_id = WIKIREQUEST.info.pageId;
    params.mode = "page";
    params.wiki_page = WIKIREQUEST.info.requestPageName;
    if (page_id != null) {
      params.page_id = page_id;
    }

    OZONE.ajax.requestModule("edit/PageEditModule", params, (c: any) => {
      // refer to WIKIDOT.page.callbacks.editClick if this breaks
      // old code here (DO NOT DELETE; USE AS FALLBACK):
      // WIKIDOT.page.callbacks.editClick(...args);

      if (c.locked == true) {
        WIKIDOT.page.vars.locked = true;
      } else {
        WIKIDOT.page.vars.locked = false;
        WIKIDOT.page.vars.editlock = new Object() as any;
        WIKIDOT.page.vars.editlock.id = c.lock_id;
        WIKIDOT.page.vars.editlock.secret = c.lock_secret;
        WIKIDOT.page.vars.editlock.revisionId = c.page_revision_id;
        WIKIDOT.page.vars.editlock.timeLeft = c.timeLeft;
      }

      if (c.draft) {
        WIKIDOT.page.vars.draft = c.draft;
        WIKIDOT.page.vars.draftText = c.draftText;
        WIKIDOT.page.vars.draftTitle = c.draftTitle;
        WIKIDOT.page.vars.draftDateLastSaved = c.draftDateLastSaved;
      }

      resolve();
    });
  });
}
