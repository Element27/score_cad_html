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

// const rawStudentData = localStorage.getItem("allStudentData");
// console.log("rawStudentData", rawStudentData);

const allStudentData = fetchAllStudent();

const table_body = document.getElementById("student_table_body");

const populateStudentData = () => {
  if (allStudentData.length > 0) {
    const mappedData = allStudentData
      .map((data) => {
        return `<tr>
            <td>${data.id}</td>
            <td>${data.name}</td>
            <td><input type="text" placeholder="Enter score" /></td>
            <td><input type="text" placeholder="Enter score" /></td>
            <td>NA</td>
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

    addNewStudent({
      name: studentName.value,
      gender: studentGender.value,
      dob: studentDOB.value,
      studentClass: studentClass.value,
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
