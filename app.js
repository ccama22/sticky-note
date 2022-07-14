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
    // noteInput.value = "";
  }
});

/* agrega el evento click a la lista de notas y conecta con la funcion clickNote */
listNotes.addEventListener("click", (event) => {
  clickNote(event);
});
/* ******** */

const createStickyNote = (text) => {
  if (text.trim() === "") {
    return;
  }
  const index = parseInt(Math.random() * (6 - 0) + 0);
  const color = random_colors[index];
  const newNote = {
    id: Date.now(),
    color,
    text,
  };
  noteInput.value = "";
  notes[newNote.id] = newNote;
  printNotes();
};

const printNotes = () => {
  localStorage.setItem("notes", JSON.stringify(notes));
  /* deja vacio el contenido de la lista de notas  */
  //
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

    /* opten el primer nodo del fragment como nodo de referencia */
    const referenceNode = fragment.firstChild;
    /* ******** */

    /* inserta clone como primer elemento en el fragment utilizando el nodo de referencia obtenido  */
    fragment.appendChild(clone);
    /* ******** */
  });
  /* inserta el fragment en la lista de notas */
  listNotes.appendChild(fragment);
  /* ******** */
};

const clickNote = (e) => {
  if (e.target.ariaLabel === "delete") {
    const note = e.srcElement.parentElement;
    // console.log("notess", note.querySelector(".detail").textContent);
    /* opten el atributo id de note */
    // const id = note.;
    /* ******** */

    /* elimina el elemento note */
    //
    /* ******** */
    // console.log("paisanas", note.querySelector(".fas").dataset.id);
    delete notes[1657770380430];
    localStorage.setItem("notes", JSON.stringify(notes));
  }
  e.stopPropagation();
};
