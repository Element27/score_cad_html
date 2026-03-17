const subjectInput = document.getElementById("subject_input");
const addSubjectBtn = document.getElementById("add_subject_btn");
const subjectTableBody = document.getElementById("subject_table_body");
const editSubjectBtn = document.getElementById("edit_subject_btn");

function getSubjects() {
  return JSON.parse(localStorage.getItem("subjects")) || [];
}

const allChips = document.querySelectorAll(".chip");

function saveSubjects(subjects) {
  localStorage.setItem("subjects", JSON.stringify(subjects));
}

function rendersubjects() {
  const subjects = getSubjects();
  // console.log(subjects);

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

    renderSubjectChips();
  });

  attachDeleteEvents();
  attachEditEvents();
}

addSubjectBtn.addEventListener("click", function () {
  const name = subjectInput.value.trim();

  if (name.length === 0) {
    alert("please enter subject name");
    return;
  }

  const subjects = getSubjects();

  const newSubject = {
    id: crypto.randomUUID(),
    name: name,
  };

  subjects.push(newSubject);
  saveSubjects(subjects);

  subjectInput.value = "";

  rendersubjects();
});

let subjectToEdit = null;
editSubjectBtn.addEventListener("click", function () {
  const name = subjectInput.value.trim();
  console.log(subjectToEdit);
  if (name.length === 0) {
    alert("please enter subject name");
    return;
  }
  subjectToEdit.name = name;
  const subjects = getSubjects();
  let updatedSubjects = subjects.filter((s) => s.id !== subjectToEdit.id);
  console.log(updatedSubjects);
  updatedSubjects = [...updatedSubjects, subjectToEdit];
  console.log(updatedSubjects);
  localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
  subjectInput.value = "";
  editSubjectBtn.classList.toggle("toggelvisibility");
  addSubjectBtn.classList.toggle("toggelvisibility");
  rendersubjects();
});

function attachDeleteEvents() {
  const deleteButtons = document.querySelectorAll(".delete_btn");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const id = this.dataset.id;

      let subjects = getSubjects();

      subjects = subjects.filter((subject) => subject.id !== id);

      saveSubjects(subjects);
      rendersubjects();
    });
  });
}

function attachEditEvents() {
  const editButtons = document.querySelectorAll(".edit_btn");

  editButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const id = this.dataset.id;
      let subjects = getSubjects();
      subjectToEdit = subjects.find((subject) => subject.id === id);
      // const newName = prompt("Enter new subject name", subjectToEdit.name);
      subjectInput.value = subjectToEdit.name;
      editSubjectBtn.classList.toggle("toggelvisibility");
      addSubjectBtn.classList.toggle("toggelvisibility");
    });
  });
}

// chips

const classInput = document.getElementById("class_input");
const addClassBtn = document.getElementById("add_class_btn");

function renderSubjectChips() {
  const subjects = getSubjects();
  const subjectChipsContainer = document.getElementById("subject_chips");
  subjectChipsContainer.innerHTML = "";

  if (subjects.length > 0) {
    const chipsItem = subjects
      .map((sub) => {
        return `<span class="chip" data-id=${sub.id} onclick="toggleChip(this)">${sub.name}</span>`;
      })
      .join("");

    subjectChipsContainer.innerHTML = chipsItem;
  }
}

rendersubjects();
renderSubjectChips();
// attachChipEvents();
const newClassData = {
  id: crypto.randomUUID(),
  name: "",
  subjects: [],
};

function toggleChip(chip) {
  const chip_id = chip.dataset.id;
  console.log("click", chip_id);

  const idExist = newClassData.subjects.includes(chip_id);

  console.log(idExist);

  if (idExist) {
    newClassData.subjects = newClassData.subjects.filter(
      (id) => id !== chip_id,
    );
    chip.classList.toggle("chip_active");
  } else {
    newClassData.subjects.push(chip_id);
    chip.classList.toggle("chip_active");
  }
}

// this should be in a function

// newClassData.id =

// newClassData.name = _name

function getClasses() {
  const classRawData = localStorage.getItem("allClassData");

  const allClassData = classRawData ? JSON.parse(classRawData) : [];
  return allClassData;
  // return  JSON.parse(localStorage.getItem("allCLassData")) || [];
}

console.log(getClasses());

function saveClasses(classes) {
  localStorage.setItem("allClassData", JSON.stringify(classes));
}

const tableBody = document.getElementById("student_table_body");

function renderClasses() {
  const classes = getClasses();
  const subjects = getSubjects();
  tableBody.innerHTML = "";

  classes.forEach((cls) => {
    const subjectNames = cls.subjects
      .map((id) => {
        const subject = subjects.find((s) => s.id === id);
        return subject ? subject.name : "";
      })
      .join(",");

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
    tableBody.innerHTML += row;
  });
}

// function attachChipEvents() {
//   allChips.forEach((chip) => {
//     console.log(chip);

//     chip.addEventListener("click", function () {
//       console.log("clicked");
//       const chip_id = this.dataset.id;
//       console.log("click", chip_id);

//       const idExist = newClassData.subjects.includes(chip_id);

//       console.log(idExist);

//       if (idExist) {
//         newClassData.subjects = newClassData.subjects.filter(
//           (id) => id !== chip_id,
//         );
//         chip.classList.toggle("chip_active");
//       } else {
//         newClassData.subjects.push(chip_id);
//         chip.classList.toggle("chip_active");
//       }
//     });
//   });
// }

const getAllClassData = getClasses();

addClassBtn.addEventListener("click", () => {
  const _name = classInput.value.trim();

  if (_name.length < 1) {
    alert("enter a valid name");
    return;
  }

  if (newClassData.subjects.length < 1) {
    alert("Kindly select subjects");
    return;
  }

  const allClassData = {
    id: crypto.randomUUID(),
    name: _name,
    subjects: newClassData.subjects,
  };

  getAllClassData.push(allClassData);

  saveClasses(getAllClassData);

  renderClasses();

  classInput.value = "";

  newClassData.subjects = [];
});

renderClasses();
renderSubjectChips();
