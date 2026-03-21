/**
 * DATA MANAGEMENT (LocalStorage)
 */
import { getSubjects, saveSubjects, getClasses, saveClasses } from "./classAndStudentFunctions";

/**
 * SUBJECT MANAGEMENT
 */
const subjectInput = document.getElementById("subject_input");
const addSubjectBtn = document.getElementById("add_subject_btn");
const editSubjectBtn = document.getElementById("edit_subject_btn");
const subjectTableBody = document.getElementById("subject_table_body");

let subjectToEdit = null;

function renderSubjects() {
  const subjects = getSubjects();
  subjectTableBody.innerHTML = "";

  subjects.forEach((subject) => {
    const row = `
    <tr>
      <td>${subject.id}</td>
      <td>${subject.name}</td>
      <td>
        <button class="edit_btn" data-id="${subject.id}">Edit</button>
        <button class="delete_btn" data-id="${subject.id}">Delete</button>
      </td>
    </tr>
    `;
    subjectTableBody.innerHTML += row;
  });

  // Attach events after rendering
  attachSubjectEvents();
}

function attachSubjectEvents() {
  // Delete buttons
  document.querySelectorAll("#subject_table_body .delete_btn").forEach((btn) => {
    btn.onclick = function () {
      const id = this.dataset.id;
      const subjects = getSubjects().filter((s) => s.id !== id);
      saveSubjects(subjects);
      renderSubjects();
      renderSubjectChips(); // Update available chips
      if (subjectToEdit && subjectToEdit.id === id) resetSubjectForm();
    };
  });

  // Edit buttons
  document.querySelectorAll("#subject_table_body .edit_btn").forEach((btn) => {
    btn.onclick = function () {
      const id = this.dataset.id;
      const subjects = getSubjects();
      subjectToEdit = subjects.find((s) => s.id === id);

      if (subjectToEdit) {
        subjectInput.value = subjectToEdit.name;
        addSubjectBtn.classList.add("toggelvisibility");
        editSubjectBtn.classList.remove("toggelvisibility");
      }
    };
  });
}

function resetSubjectForm() {
  subjectToEdit = null;
  subjectInput.value = "";
  addSubjectBtn.classList.remove("toggelvisibility");
  editSubjectBtn.classList.add("toggelvisibility");
}

addSubjectBtn.onclick = function () {
  const name = subjectInput.value.trim();
  if (!name) return alert("Please enter subject name");

  const subjects = getSubjects();
  subjects.push({ id: crypto.randomUUID(), name });

  saveSubjects(subjects);
  renderSubjects();
  renderSubjectChips();
  resetSubjectForm();
};

editSubjectBtn.onclick = function () {
  const name = subjectInput.value.trim();
  if (!name) return alert("Please enter subject name");

  const subjects = getSubjects().map((s) =>
    s.id === subjectToEdit.id ? { ...s, name } : s
  );

  saveSubjects(subjects);
  renderSubjects();
  renderSubjectChips();
  resetSubjectForm();
};

/**
 * CLASS MANAGEMENT
 */
const classInput = document.getElementById("class_input");
const addClassBtn = document.getElementById("add_class_btn");
const editClassBtn = document.getElementById("edit_class_btn");
const classTableBody = document.getElementById("student_table_body");

let classToEdit = null;
const newClassData = { subjects: [] };

function renderSubjectChips() {
  const subjects = getSubjects();
  const container = document.getElementById("subject_chips");
  container.innerHTML = "";

  subjects.forEach((sub) => {
    const isActive = newClassData.subjects.includes(sub.id) ? "chip_active" : "";
    const chip = document.createElement("span");
    chip.className = `chip ${isActive}`;
    chip.dataset.id = sub.id;
    chip.innerText = sub.name;
    chip.onclick = () => toggleChip(sub.id, chip);
    container.appendChild(chip);
  });
}

function toggleChip(id, element) {
  const index = newClassData.subjects.indexOf(id);
  if (index > -1) {
    newClassData.subjects.splice(index, 1);
    element.classList.remove("chip_active");
  } else {
    newClassData.subjects.push(id);
    element.classList.add("chip_active");
  }
}

function renderClasses() {
  const classes = getClasses();
  const subjects = getSubjects();
  classTableBody.innerHTML = "";

  classes.forEach((cls) => {
    const subjectNames = cls.subjects
      .map((id) => subjects.find((s) => s.id === id)?.name || "Deleted Subject")
      .join(", ");

    const row = `
    <tr>
      <td>${cls.id}</td>
      <td>${cls.name}</td>
      <td>${subjectNames}</td>
      <td>
        <button class="edit_btn" data-id="${cls.id}">Edit</button>
        <button class="delete_btn" data-id="${cls.id}">Delete</button>
      </td>
    </tr>
    `;
    classTableBody.innerHTML += row;
  });

  attachClassEvents();
}

function attachClassEvents() {
  // Delete
  document.querySelectorAll("#student_table_body .delete_btn").forEach((btn) => {
    btn.onclick = function () {
      const id = this.dataset.id;
      const classes = getClasses().filter((c) => c.id !== id);
      saveClasses(classes);
      renderClasses();
      if (classToEdit && classToEdit.id === id) resetClassForm();
    };
  });

  // Edit
  document.querySelectorAll("#student_table_body .edit_btn").forEach((btn) => {
    btn.onclick = function () {
      const id = this.dataset.id;
      const classes = getClasses();
      classToEdit = classes.find((c) => c.id === id);

      if (classToEdit) {
        classInput.value = classToEdit.name;
        newClassData.subjects = [...classToEdit.subjects];
        renderSubjectChips();
        addClassBtn.classList.add("toggelvisibility");
        editClassBtn.classList.remove("toggelvisibility");
      }
    };
  });
}

function resetClassForm() {
  classToEdit = null;
  classInput.value = "";
  newClassData.subjects = [];
  renderSubjectChips();
  addClassBtn.classList.remove("toggelvisibility");
  editClassBtn.classList.add("toggelvisibility");
}

addClassBtn.onclick = function () {
  const name = classInput.value.trim();
  if (!name) return alert("Please enter a valid class name");
  if (newClassData.subjects.length < 1) return alert("Kindly select at least one subject");

  const classes = getClasses();
  classes.push({
    id: crypto.randomUUID(),
    name,
    subjects: [...newClassData.subjects],
  });

  saveClasses(classes);
  renderClasses();
  resetClassForm();
};

editClassBtn.onclick = function () {
  const name = classInput.value.trim();
  if (!name) return alert("Please enter a valid class name");
  if (newClassData.subjects.length < 1) return alert("Kindly select at least one subject");

  const classes = getClasses().map((cls) =>
    cls.id === classToEdit.id ? { ...cls, name, subjects: [...newClassData.subjects] } : cls
  );

  saveClasses(classes);
  renderClasses();
  resetClassForm();
};

/**
 * INITIALIZATION
 */
renderSubjects();
renderClasses();
renderSubjectChips();


