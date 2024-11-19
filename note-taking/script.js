//If you find this useful, please star the repo and follow me on github: https://github.com/jovdim/Micro-Projects-Collection

document.addEventListener("DOMContentLoaded", () => {
  const noteContent = document.getElementById("noteContent");
  const noteTag = document.getElementById("noteTag");
  const noteColor = document.getElementById("noteColor");
  const addNoteButton = document.getElementById("addNoteButton");
  const notesContainer = document.getElementById("notesContainer");
  const searchBar = document.getElementById("searchBar");

  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  const createNoteElement = (content, tag, color) => {
    const note = document.createElement("div");
    note.className = "note";
    note.style.backgroundColor = color;

    const noteText = document.createElement("p");
    noteText.textContent = content;

    const noteTagEl = document.createElement("span");
    noteTagEl.className = "note-tag";
    noteTagEl.textContent = tag ? `#${tag}` : "";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = "&times;";
    deleteBtn.addEventListener("click", () => {
      note.remove();
      notes = notes.filter(
        (n) => n.content !== content || n.tag !== tag || n.color !== color
      );
      localStorage.setItem("notes", JSON.stringify(notes));
    });

    note.appendChild(noteText);
    if (tag) note.appendChild(noteTagEl);
    note.appendChild(deleteBtn);

    return note;
  };

  const renderNotes = (filter = "") => {
    notesContainer.innerHTML = "";
    notes
      .filter(
        (note) =>
          note.content.toLowerCase().includes(filter.toLowerCase()) ||
          note.tag.toLowerCase().includes(filter.toLowerCase())
      )
      .forEach((note) => {
        const noteEl = createNoteElement(note.content, note.tag, note.color);
        notesContainer.appendChild(noteEl);
      });
  };

  renderNotes();

  addNoteButton.addEventListener("click", () => {
    const content = noteContent.value.trim();
    const tag = noteTag.value.trim();
    const color = noteColor.value;

    if (content) {
      notes.push({ content, tag, color });
      renderNotes();
      noteContent.value = "";
      noteTag.value = "";
      noteColor.value = "#ffffff";

      localStorage.setItem("notes", JSON.stringify(notes));
    }
  });

  searchBar.addEventListener("input", () => {
    renderNotes(searchBar.value);
  });
});
