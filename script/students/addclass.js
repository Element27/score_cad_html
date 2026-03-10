const subjectInput = document.getElementById("subject_input");
const addSubjectBtn = document.getElementById("add_subject_btn");
const subjectTableBody = document.getElementById("subject_table_body");
const editSubjectBtn = document.getElementById("edit_subject_btn");

function getSubjects() {
  return JSON.parse(localStorage.getItem("subjects")) || [];
}

function saveSubjects(subjects) {
  localStorage.setItem("subjects", JSON.stringify(subjects));
}

function rendersubjects(){
  
  const subjects = getSubjects();
  console.log(subjects)

  subjectTableBody.innerHTML = "";

  subjects.forEach(subject => {
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
  })

  attachDeleteEvents();
  attachEditEvents();
}

addSubjectBtn.addEventListener("click", function(){
  const name = subjectInput.value.trim();


  if(name.length === 0){
    alert ("please enter subject name");
    return;
  }



  const subjects = getSubjects ();
  
  const newSubject = {
    id: crypto.randomUUID(),
    name: name
  };

  subjects.push(newSubject);
  saveSubjects(subjects);

  subjectInput.value = "";

  rendersubjects();
});

let subjectToEdit = null;
editSubjectBtn.addEventListener("click", function (){
  const name = subjectInput.value.trim();
console.log(subjectToEdit)
  if(name.length === 0){
    alert ("please enter subject name");
    return;
  }
subjectToEdit.name = name;
  const subjects = getSubjects ();
  let updatedSubjects = subjects.filter(s => s.id !== subjectToEdit.id)
  console.log(updatedSubjects)
  updatedSubjects = [...updatedSubjects, subjectToEdit]
  console.log(updatedSubjects)
   localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
   rendersubjects();
});

function attachDeleteEvents(){
  const deleteButtons = document.querySelectorAll(".delete_btn");

  deleteButtons.forEach(button => {
    button.addEventListener("click", function (){
      const id = this.dataset.id;

      let subjects = getSubjects();

      subjects = subjects.filter(subject => subject.id !== id);

      saveSubjects(subjects);
      rendersubjects();
    });
  });
}



function attachEditEvents(){
  const editButtons = document.querySelectorAll(".edit_btn");

  editButtons.forEach(button => {
    button.addEventListener("click", function (){
      const id = this.dataset.id;
      let subjects = getSubjects();
      subjectToEdit = subjects.find(subject => subject.id === id);
      // const newName = prompt("Enter new subject name", subjectToEdit.name);
      subjectInput.value = subjectToEdit.name;
      editSubjectBtn.classList.toggle("toggelvisibility");
      addSubjectBtn.classList.toggle("toggelvisibility");
      
      
    });
  });
}


rendersubjects();