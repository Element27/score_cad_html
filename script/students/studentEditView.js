import { editStudent, fetchAllStudent } from "./studentFunctions.js";

const allStudents = fetchAllStudent();

const queryString = window.location.search;
console.log("queryString", queryString);
const urlParams = new URLSearchParams(queryString);
const studentId = urlParams.get("id");

const studentName = document.getElementById("student_name");
const studentGender = document.getElementById("student_gender");
const studentDOB = document.getElementById("student_dob");
const studentClass = document.getElementById("student_class");
const cancelBtn = document.getElementById("cancel_btn");
const saveBtn = document.getElementById("save_btn");

const studentToEdit = allStudents.find((std) => std.id === studentId);

console.log("studentToEdit", studentToEdit);

if (studentToEdit) {
  studentName.value = studentToEdit.name;
  studentGender.value = studentToEdit.gender;
  studentDOB.value = studentToEdit.dob;
  studentClass.value = studentToEdit.class;



  saveBtn.addEventListener("click", () => {
    console.log("studentId", studentId)
    console.log("studentToEdit.id", studentToEdit.id)

    editStudent(
      {name:studentName.value,
      gender:studentGender.value,
      dob:studentDOB.value,
      studentClass:studentClass.value, 
      id:studentToEdit.id}
    );
  });
}
