let allStudentData = [];

const fetchAllStudent = () => {
  const rawStudentData = localStorage.getItem("allStudentData");
  // console.log("rawStudentData", rawStudentData);

  allStudentData = JSON.parse(rawStudentData) || [];

  return allStudentData;
};

const addNewStudent = ({ name, gender, dob, studentClass }) => {
  const student_id = crypto.randomUUID();

  // console.log("studentName", name);
  // console.log("studentGender", gender);
  // console.log("studentDOB", dob);
  // console.log("studentClass", studentClass);
  // console.log("student_id", student_id);

  //json (javascript object notation)
  const studentData = {
    id: student_id,
    name: name,
    gender: gender,
    dob: dob,
    class: studentClass,
    subject: [],
  };

  allStudentData.push(studentData);
  localStorage.setItem("allStudentData", JSON.stringify(allStudentData));

  alert("student added");
  // window.location.href = "/admindash.html";
};

// delete student

// find the student id
// remove the student from the array
// return the remaining list of student

const deleteStudent = ({ id }) => {
  console.log("allStudentData", allStudentData);
  // console.log("student id", id)

  const remainingStudent = allStudentData.filter(
    (student) => student.id !== id,
  );
  console.log("remainingStudent", remainingStudent);

  localStorage.setItem("allStudentData", JSON.stringify(remainingStudent));
  window.location.reload();
};

const editStudent = ({ name, gender, dob, studentClass, id }) => {
  //json (javascript object notation)
  const studentData = {
    id:id,
    name: name,
    gender: gender,
    dob: dob,
    class: studentClass,
    subject: [],
  };

  // const stdEdit = allStudentData.find((std) => std.id === id);

  // stdEdit.name = name;
  // stdEdit.gender = gender;
  // stdEdit.dob = dob;
  // stdEdit.class = studentClass;
  
  console.log("id",id)
  const stdEdit = allStudentData.filter((std) => std.id !== id);

  // allStudentData.push(stdEdit);
  
  
  stdEdit.push(studentData);
  console.log("stdEdit",stdEdit)

  localStorage.setItem("allStudentData", JSON.stringify(stdEdit));

  alert("student updated");
  window.location.href = "/admindash.html";
};

export { fetchAllStudent, addNewStudent, deleteStudent, editStudent };

/*
[{
  "id":""
  "name":"",
  "gender":"",
  dob:"",
  "class": ""
  "subject":[
  {
  "name":"",
  "ca_score":30,
  "exam_score":70,
  "total_score":100
  },
  {
  "name":"",
  "ca_score":30,
  "exam_score":70,
  "total_score":100
  },
  {
  "name":"",
  "ca_score":30,
  "exam_score":70,
  "total_score":100
  },  ]
  }  ]
  */
