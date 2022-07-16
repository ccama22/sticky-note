/*
 * descomenta solo los // y completa el codigo que falta
 * utiliza estas variables ya inicializadas
 * analiza el html para entender la estructura
 */
const random_colors = [
  "#c2ff3d",
  "#ff3de8",
  "#3dc2ff",
  "#04e022",
  "#bc83e6",
  "#ebb328",
];
let notes = {};
let idDocument = "";
let clickText = "";
const noteInput = document.getElementById("noteInput");
const template = document.getElementById("template").content;
const listNotes = document.getElementById("list-notes");
/* ***** */

/* crea el fragment */
const fragment = document.createDocumentFragment();
/* ***** */

document.addEventListener("DOMContentLoaded", () => {
  noteInput.select();
  if (localStorage.getItem("notes")) {
    notes = JSON.parse(localStorage.getItem("notes"));
  }
  printNotes();
});

noteInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    /* almancena en text el valor del textarea mediante su id  */
    const text = noteInput.value;
    // document.getElementById("noteInput").placeholder = "Añade una nota...";
    createStickyNote(text);
  }
});

/* agrega el evento click a la lista de notas y conecta con la funcion clickNote */
listNotes.addEventListener("click", (event) => {
  console.log("event ve", event);
  clickNote(event);
});
/* ******** */

const createStickyNote = (text) => {
  console.log("data char", text);
  if (text.trim() === "" || text.charAt(0) === " ") {
    noteInput.value = "";
    return;
  } else if (clickText !== "") {
    // console.log("paisana", event);
    // const note = event.srcElement.parentElement;
    const id = idDocument;
    notes[id] = {
      id: notes[id].id,
      color: notes[id].color,
      text: noteInput.value,
    };
    console.log("paisana final", notes);
    localStorage.setItem("notes", JSON.stringify(notes));
    printNotes();
    noteInput.value = "";
    clickText = "";
    return;
  }

  const index = parseInt(Math.random() * (6 - 0) + 0);
  const color = random_colors[index];
  const newNote = {
    id: Date.now(),
    color,
    text,
  };

  // console.log("hh", noteInput.value.replace("\n", ""));
  // noteInput.value = noteInput.value.split("\n").join("");
  noteInput.value = "";
  notes[newNote.id] = newNote;
  printNotes();
};

const printNotes = () => {
  localStorage.setItem("notes", JSON.stringify(notes));
  /* deja vacio el contenido de la lista de notas  */
  listNotes.innerHTML = "";
  /* ******** */

  Object.values(notes).forEach((note) => {
    const clone = template.cloneNode(true);
    /* apartir de la plantilla 'clone' busca .detail y agrega el texto de la nota */
    clone.querySelector(".note").querySelector(".detail").textContent =
      note.text;
    /* ******** */

    /* apartir de la plantilla 'clone' busca .note agrega el color de la nota y agregale el atributo id de la nota */
    clone.querySelector(".note").style.backgroundColor = note.color;
    /* ******** */

    clone.querySelector(".note").setAttribute("id", note.id);
    /* opten el primer nodo del fragment como nodo de referencia */
    const referenceNode = fragment.firstChild;
    /* ******** */

    /* inserta clone como primer elemento en el fragment utilizando el nodo de referencia obtenido  */
    fragment.insertBefore(clone, referenceNode);
    /* ******** */
  });
  /* inserta el fragment en la lista de notas */
  listNotes.appendChild(fragment);
  /* ******** */
};

const clickNote = (e) => {
  console.log("label esc", e.target.ariaLabel);
  if (e.target.ariaLabel === "delete") {
    const note = e.srcElement.parentElement;
    /* opten el atributo id de note */
    const id = note.getAttribute("id");
    /* ******** */

    /* elimina el elemento note */
    note.remove();
    /* ******** */
    console.log("info cca", notes[id]);
    delete notes[id];
    localStorage.setItem("notes", JSON.stringify(notes));
  } else if (e.target.ariaLabel === "edit") {
    const note = e.srcElement.parentElement;
    const id = note.getAttribute("id");
    documentId(id, notes[id].text);
    noteInput.value = notes[id].text;
  }
  e.stopPropagation();
};
const documentId = (id, textclick) => {
  idDocument = id;
  clickText = textclick;
};
