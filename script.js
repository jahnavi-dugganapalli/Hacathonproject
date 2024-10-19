const fetchCourses = async () => {
    const response = await fetch('http://localhost:3000/api/courses');
    return response.json();
};

const fetchTeachers = async () => {
    const response = await fetch('http://localhost:3000/api/teachers');
    return response.json();
};

const populateCourses = async () => {
    const courses = await fetchCourses();
    
    const theorySelects = document.querySelectorAll('[id^=theoryCourse]');
    theorySelects.forEach(select => {
        courses.theory.forEach(course => {
            select.innerHTML += `<option value="${course.id}">${course.name}</option>`;
        });
    });

    const labSelects = document.querySelectorAll('[id^=labCourse]');
    labSelects.forEach(select => {
        courses.lab.forEach(course => {
            select.innerHTML += `<option value="${course.id}">${course.name}</option>`;
        });
    });
};

const displayTeachers = async () => {
    const teachers = await fetchTeachers();
    const teacherList = document.getElementById('teacherList');
    
    teachers.forEach(teacher => {
        teacherList.innerHTML += `
            <div class="teacher-profile">
                <h3>${teacher.name}</h3>
                <p>Rating: ${teacher.rating}</p>
                <p>Projects: ${teacher.projects}</p>
                <p>Patents: ${teacher.patents}</p>
                <p>Background: ${teacher.background}</p>
            </div>
        `;
    });
};

const handleFormSubmit = (event) => {
    event.preventDefault();
    alert("Courses submitted successfully!");
};

const handleFeedbackSubmit = async (event) => {
    event.preventDefault();
    const feedbackText = document.getElementById('feedbackText').value;

    await fetch('http://localhost:3000/api/feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ feedback: feedbackText })
    });

    alert("Feedback submitted successfully!");
    document.getElementById('feedbackText').value = '';
};

document.addEventListener('DOMContentLoaded', () => {
    populateCourses();
    displayTeachers();
    document.getElementById('courseForm').addEventListener('submit', handleFormSubmit);
    document.getElementById('feedbackForm').addEventListener('submit', handleFeedbackSubmit);
});




