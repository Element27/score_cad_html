export function getSubjects() {
    return JSON.parse(localStorage.getItem("subjects")) || [];
}

export function saveSubjects(subjects) {
    localStorage.setItem("subjects", JSON.stringify(subjects));
}

export function getClasses() {
    return JSON.parse(localStorage.getItem("allClassData")) || [];
}

export function saveClasses(classes) {
    localStorage.setItem("allClassData", JSON.stringify(classes));
}