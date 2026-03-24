/*
get input values
format in a data structure
Save to localstorage
read/retrieve from local storage


Create
Read

 Update
 Delete



 M- model (structure)
 V- view (visual)
 C- controller (connection)
*/

import {
  getSubjects,
  getClasses,
} from "../class_and_subjects/classAndStudentFunctions.js";
import {
  fetchAllStudent,
  addNewStudent,
  deleteStudent,
} from "./studentFunctions.js";

const studentName = document.getElementById("student_name");
const studentGender = document.getElementById("student_gender");
const studentDOB = document.getElementById("student_dob");
const studentClass = document.getElementById("student_class");
const cancelBtn = document.getElementById("cancel_btn");
const saveBtn = document.getElementById("save_btn");
const classSelect = document.getElementById("student_class");
const classDropdown = document.getElementById("student_class");

// const rawStudentData = localStorage.getItem("allStudentData");
// console.log("rawStudentData", rawStudentData);

const allStudentData = fetchAllStudent();
let sel_id;
let selectedSubjectId = null;

if (classDropdown) {
  sel_id = classDropdown.value;
}

const persistStudentData = () => {
  localStorage.setItem("allStudentData", JSON.stringify(allStudentData));
};

const getStudentById = (id) =>
  allStudentData.find((student) => student.id === id);

const updateScore = (studentId, type, value) => {
  if (!selectedSubjectId) {
    alert("Please select a subject to update scores");
    return;
  }
  const student = getStudentById(studentId);
  if (!student) return;

  if (!student.subject || student.subject.length === 0) return;

  const subject = student.subject.find((sub) => sub.sub_id === selectedSubjectId);

  if (!subject) return;

  const parsed = Number(value);
  if (Number.isNaN(parsed)) return;

  if (type === "CA") {
    subject.ca_score = parsed;
  } else if (type === "Exam") {
    subject.exam_score = parsed;
  }

  subject.total_score =
    Number(subject.ca_score || 0) + Number(subject.exam_score || 0);
  persistStudentData();
};
const getAllSubjects = getSubjects();
const getAllClasses = getClasses();
let filteredStudentData = allStudentData;

const table_body = document.getElementById("student_table_body");

const populateStudentData = () => {
  if (filteredStudentData.length > 0) {
    const mappedData = filteredStudentData
      .map((data) => {
        const subject = selectedSubjectId
          ? data.subject.find((sub) => sub.sub_id === selectedSubjectId)
          : data.subject[0];
        const caScore = subject ? subject.ca_score || "" : "";
        const examScore = subject ? subject.exam_score || "" : "";
        const totalScore = subject ? subject.total_score || "NA" : "NA";

        return `<tr>
            <td>${data.id}</td>
            <td>${data.name}</td>
            <td class="td_input_cont" id="td_input_CA_${data.id}">
            <input type="number" min="0" max="100" id="ca_input_${data.id}" data-student-id="${data.id}" data-score-type="CA" placeholder="Enter score" value="${caScore}"   /> <span class="save_score_btn" data-student-id="${data.id}" data-score-type="CA">🗃️</span></td>
            <td class="td_input_cont" id="td_input_Exam_${data.id}"><input type="number" min="0" max="100" id="exam_input_${data.id}" data-student-id="${data.id}" data-score-type="Exam" placeholder="Enter score" value="${examScore}"   /> <span class="save_score_btn" data-student-id="${data.id}" data-score-type="Exam">🗃️</span></td>
            <td>${totalScore}</td>
            <td>
              <div class="button-b">
                <button class="edit_btn" id="${data.id}">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="#000000"
                  >
                    <path
                      d="M96 0v-192h768V0H96Zm168-360h51l279-279-26-27-25-24-279 279v51Zm-72 72v-152.92L594-843q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24.1 15.94L747-792q11 11 16 24t5 27.4q0 13.49-4.95 26.54-4.95 13.05-15.75 23.85L345-288H192Zm503-455-51-49 51 49ZM594-639l-26-27-25-24 51 51Z"
                    />
                  </svg>
                </button>
                <button class="delete_btn" id="${data.id}" data-id="${data.id}">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="#000000"
                  >
                    <path
                      d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z"
                    />
                  </svg>
                </button>
              </div>
            </td>
          </tr>`;
      })
      .join("");
    table_body ? (table_body.innerHTML = mappedData) : null;
  }
};

populateStudentData();

if (table_body) {
  table_body.addEventListener("click", (event) => {
    const saveButton = event.target.closest(".save_score_btn");
    if (!saveButton) return;

    const studentId = saveButton.dataset.studentId;
    const scoreType = saveButton.dataset.scoreType;
    const input = document.getElementById(
      `${scoreType.toLowerCase()}_input_${studentId}`,
    );

    if (!input) return;

    const value = input.value.trim();
    if (value === "") {
      alert("Enter a score before saving");
      return;
    }

    updateScore(studentId, scoreType, value);
    populateStudentData();
    alert(`Saved ${scoreType} score for student ${studentId}`);
  });
}

// console.log("allStudentData", allStudentData);

saveBtn &&
  saveBtn.addEventListener("click", () => {
    if (studentName.value.trim().length == 0) {
      alert("Please enter name");
      return;
    } else if (studentGender.value.trim().length == 0) {
      alert("Please select a gender");
      return;
    } else if (studentDOB.value.trim().length == 0) {
      alert("Please set student Date of Birth");
      return;
    } else if (studentClass.value.trim().length == 0) {
      alert("Please Assign a class to the student");
      return;
    }

    let subjects = [];

    const sel_class = getAllClasses.find((c) => c.id === studentClass.value);

    sel_class.subjects.forEach((sId, i) => {
      const sub = getAllSubjects.find((subDetail) => subDetail.id === sId);
      subjects.push({
        name: sub ? sub.name : "Unknown Subject",
        ca_score: 0,
        exam_score: 0,
        total_score: 0,
        sub_id: sId,
      });
    });

    addNewStudent({
      name: studentName.value,
      gender: studentGender.value,
      dob: studentDOB.value,
      studentClass: studentClass.value,
      subject: subjects,
    });
  });

const deleteBtns = document.querySelectorAll(".delete_btn");

// console.log("deleteBtns", deleteBtns)

deleteBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // console.log(e.currentTarget.id)
    deleteStudent({ id: e.currentTarget.id });
  });
});

const editBtns = document.querySelectorAll(".edit_btn");

editBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    window.location.href = `/editStudent.html?id=${e.currentTarget.id}`;
  });
});

export function loadClasses() {
  const classOPtions = getAllClasses
    .map((c, i) => `<option value=${c.id}> ${c.name}</option>`)
    .join("");

  if (classSelect)
    classSelect.innerHTML =
      "<option value=''>Select Class</option>" + classOPtions;
}

loadClasses();

const subjectContainer = document.querySelector(".subject-tags");
if (classDropdown)
  classDropdown.addEventListener("change", function () {
    sel_id = classDropdown.value;
    console.log(sel_id);

    const selectedClass = getAllClasses.find((c, i) => c.id === sel_id);

    console.log(selectedClass);

    let subjects = [];

    selectedClass.subjects.forEach((s, i) => {
      const sub = getAllSubjects.find((sub) => sub.id === s);
      console.log("sub", sub);
      subjects.push(sub.name);
    });

    console.log(subjects);

    subjectContainer.innerHTML = "";
    // if (selectedClass) {
    subjects.forEach(function (subject) {
      const tag = document.createElement("span");
      tag.classList.add("chip_tag");
      // tag.classList.add("tag");
      tag.textContent = subject;

      subjectContainer.appendChild(tag);
    });
  });

const subjectFilter = document.getElementById("subject_filter");

export function loadSubjectFilter() {
  const subjectOPtions = getAllSubjects
    .map((s, i) => `<option value=${s.id}> ${s.name}</option>`)
    .join("");
  if (subjectFilter)
    subjectFilter.innerHTML =
      "<option value=''>Select Subject</option>" + subjectOPtions;
}

if (subjectFilter) {
  subjectFilter.addEventListener("change", function () {
    const sel_id = subjectFilter.value;
    selectedSubjectId = sel_id;

    if (sel_id === "") {
      filteredStudentData = allStudentData;
      populateStudentData();
      return;
    }
    console.log(sel_id);

    const studentList = allStudentData.filter((s, i) => {
      let std = s.subject.find((sub) => sub.sub_id === sel_id);
      return std;
    });
    console.log(studentList);

    if (studentList.length > 0) {
      filteredStudentData = studentList;
      populateStudentData();
    } else {
      table_body.innerHTML = "<tr><td colspan='6'>No student found</td></tr>";
    }

    // const selectedSubject = getAllSubjects.find((s, i) => s.id === sel_id)
    // console.log(selectedSubject)
  });
}

loadSubjectFilter();
