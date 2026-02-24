const subjectInput = document.getElementById('subject_input');
const addSubjectBtn = document.getElementById('add_subject_btn');
const subjectChipsContainer = document.getElementById('subject_chips');

addSubjectBtn.addEventListener("click", function(){
    const subjectName = subjectInput.value;
    console.log(subjectName);
    if(subjectName.trim().length === 0){
        alert("Please enter a subject name");
        return;
    }
let subjects = JSON.parse(localStorage.getItem("subjects")) || [];

subjects.push(subjectName);
localStorage.setItem("subjects", JSON.stringify(subjects));

subjectInput.value = "";
renderSubjects();
});


function renderSubjects() {
    let subjects = JSON.parse(localStorage.getItem("subjects")) || [];
    subjectChipsContainer.innerHTML = "";
    subjects.forEach(function (subject) {
        const chip = document.createElement("span");
        chip.classList.add("chip");
        chip.textContent = subject;
        chip.addEventListener("click", function(){
    chip.classList.toggle("selected");
});
        subjectChipsContainer.appendChild(chip);
    });
}





const classInput = document.getElementById("class_input");
const addClassBtn = document.getElementById("add_class_btn");


addClassBtn.addEventListener("click", function(){
    const className = classInput.value.trim();
   selectedSubjects = Array.from(
    document.querySelectorAll(".chip.selected")
).map(chip => chip.textContent);

let classes = JSON.parse(localStorage.getItem("classes")) || [];

classes.push({
    name: className,
    subjects: selectedSubjects
});
localStorage.setItem("classes", JSON.stringify(classes));
classInput.value = "";
alert("Class added successfully");
});



