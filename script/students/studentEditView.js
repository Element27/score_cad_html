import { getClasses, getSubjects } from "../class_and_subjects/classAndStudentFunctions.js";
import { editStudent, fetchAllStudent } from "./studentFunctions.js";
import { loadClasses } from "./studentView.js";

const allStudents = fetchAllStudent();
const getAllSubjects = getSubjects();
const getAllClasses = getClasses();

loadClasses()

const queryString = window.location.search;
console.log("queryString", queryString);
const urlParams = new URLSearchParams(queryString);
const studentId = urlParams.get("id");

// Get elements
const studentName = document.getElementById("student_name");
const studentGender = document.getElementById("student_gender");
const studentDOB = document.getElementById("student_dob");
const studentClass = document.getElementById("student_class");
const cancelBtn = document.getElementById("cancel_btn");
const editBtn = document.getElementById("edit_btn");
const subjectContainer = document.querySelector(".subject-tags");

const studentToEdit = allStudents.find((std) => std.id === studentId);
let currentSubjects = [];

// Function to render subject tags in UI
function renderSubjectTags() {
  if (!subjectContainer) return;
  subjectContainer.innerHTML = "";
  currentSubjects.forEach((sub) => {
    const tag = document.createElement("span");
    tag.classList.add("chip_tag");
    tag.textContent = sub.name;
    subjectContainer.appendChild(tag);
  });
}

// Function to update subjects when class changes
function updateSubjectsByClass(classId) {
  const selectedClass = getAllClasses.find((c) => c.id === classId);
  if (!selectedClass) {
    currentSubjects = [];
  } else {
    // Map class subject IDs to full subject objects with default scores
    currentSubjects = selectedClass.subjects.map((subId) => {
      const subjectDetail = getAllSubjects.find((s) => s.id === subId);
      return {
        sub_id: subId,
        name: subjectDetail ? subjectDetail.name : "Unknown Subject",
        ca_score: 0,
        exam_score: 0,
        total_score: 0,
      };
    });
  }
  renderSubjectTags();
}

// Initialize form
if (studentToEdit) {
  studentName.value = studentToEdit.name;
  studentGender.value = studentToEdit.gender;
  studentDOB.value = studentToEdit.dob;
  studentClass.value = studentToEdit.class;

  // Use existing subjects if available, otherwise pull from class
  if (studentToEdit.subject && studentToEdit.subject.length > 0) {
    currentSubjects = [...studentToEdit.subject];
    renderSubjectTags();
  } else {
    updateSubjectsByClass(studentToEdit.class);
  }
}

// Listener for class change
studentClass.addEventListener("change", function () {
  updateSubjectsByClass(this.value);
});

// Save logic
if (editBtn) {
  editBtn.addEventListener("click", () => {
    if (!studentToEdit) return;

    editStudent({
      id: studentToEdit.id,
      name: studentName.value,
      gender: studentGender.value,
      dob: studentDOB.value,
      studentClass: studentClass.value,
      subject: currentSubjects,
    });
  });
}

// Cancel logic
if (cancelBtn) {
  cancelBtn.onclick = () => {
    window.location.href = "/admindash.html";
  };
}

