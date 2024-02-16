const clearNotes = async() => {
  await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};


test("1+2=3, empty array is empty", () => {
    expect(1 + 2).toBe(3);
    expect([].length).toBe(0);
  });

const SERVER_URL = "http://localhost:4000";

test("/postNote - Post a note", async () => {
  clearNotes()
  
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
  clearNotes()
  
  const allNotes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const getNotes = await allNotes.json();

  expect(allNotes.status).toBe(200);
  expect(getNotes.response.length).toBe(0);
});

test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
  clearNotes()
  notes = [['ousmane', 'dembele'], ['maestro', 'kimpembe']]

  for (let [title,content] of notes) {
     postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });
    expect(postNoteRes.status).toBe(200);
  };

  const allNotes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const getNotes = await allNotes.json();
  expect(postNoteRes.status).toBe(200);
  expect(getNotes.response.length).toBe(2);
});

test("/deleteNote - Delete a note", async () => {
  clearNotes()

  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  postNote = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  expect(postNote.status).toBe(200);

  const postNoteBody = await postNote.json()
  const id = postNoteBody.insertedId

  deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    })
  

  expect(deleteNoteRes.status).toBe(200)
  const deleteNote = await deleteNoteRes.json() 
  expect(deleteNote.response).toBe(`Document with ID ${id} deleted.`);
});

test("/patchNote - Patch with content and title", async () => {
  clearNotes()
  let title = "NoteTitleTest";
  let content = "NoteTitleContent";

  postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json()
  const id = postNoteBody.insertedId

  title = "Not a NoteTitleTest";
  content = "Not a NoteTitleContent"

  patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content
    }),
  });
  const patchNoteBody = await patchNoteRes.json()
  expect(patchNoteRes.status).toBe(200)
  expect(patchNoteBody.response).toBe(`Document with ID ${id} patched.`)
});

test("/patchNote - Patch with just title", async () => {
  clearNotes()
  let title = "NoteTitleTest";
  let content = "NoteTitleContent";

  postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json()
  const id = postNoteBody.insertedId

  title = "Not a NoteTitleTest";

  patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title
    }),
  });
  const patchNoteBody = await patchNoteRes.json()
  expect(patchNoteRes.status).toBe(200)
  expect(patchNoteBody.response).toBe(`Document with ID ${id} patched.`)
});

test("/patchNote - Patch with just content", async () => {
  clearNotes()
  let title = "NoteTitleTest";
  let content = "NoteTitleContent";

  postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json()
  const id = postNoteBody.insertedId

  title = "Not a NoteTitleTest";
  content = "Not a NoteTitleContent"

  patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: content
    }),
  });
  const patchNoteBody = await patchNoteRes.json()
  expect(patchNoteRes.status).toBe(200)
  expect(patchNoteBody.response).toBe(`Document with ID ${id} patched.`)
});

test("/deleteAllNotes - Delete one note", async () => {
  clearNotes()
  let title = "NoteTitleTest";
  let content = "NoteTitleContent";

  postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  expect(postNoteRes.status).toBe(200)

  const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const deleteAllNotesBody = await deleteAllNotesRes.json()
  expect(deleteAllNotesRes.status).toBe(200)
  expect(deleteAllNotesBody.response).toBe(`1 note(s) deleted.`)
});

test("/deleteAllNotes - Delete three notes", async () => {
  clearNotes()
  notes = [['ousmane', 'dembele'], ['maestro', 'kimpembe'], ['ngolo', 'kante']]

  for (let [title,content] of notes) {
     postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });
    expect(postNoteRes.status).toBe(200);
  };

  const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const deleteAllNotesBody = await deleteAllNotesRes.json()
  expect(deleteAllNotesRes.status).toBe(200)
  expect(deleteAllNotesBody.response).toBe(`3 note(s) deleted.`)
});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
  clearNotes()
  let title = "NoteTitleTest";
  let content = "NoteTitleContent";

  postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  expect(postNoteRes.status).toBe(200)

  const postNoteBody = await postNoteRes.json()
  const id = postNoteBody.insertedId

  const color = "red"

  updateNoteColorRes = await fetch(`${SERVER_URL}/updateNoteColor/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      color: color
    }),
  });
  const updateNoteColorBody = await updateNoteColorRes.json()
  expect(updateNoteColorRes.status).toBe(200)
  expect(updateNoteColorBody.message).toBe(`Note color updated successfully.`)
});