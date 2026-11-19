
let enrolledCourses = [];
let assignmentSubmitted = false;
let quizSubmitted = false;
let notificationCount = 0;


// Update Dashboard
function updateDashboard() {

    document.getElementById("courseCount").textContent =
        enrolledCourses.length;

    document.getElementById("assignmentCount").textContent =
        assignmentSubmitted ? 1 : 0;

    document.getElementById("quizCount").textContent =
        quizSubmitted ? 1 : 0;

    document.getElementById("notificationCount").textContent =
        notificationCount;

    // Calculate Progress
    let progress = 0;

    if (enrolledCourses.length > 0) progress += 25;
    if (assignmentSubmitted) progress += 25;
    if (quizSubmitted) progress += 50;

    document.getElementById("progressBar").style.width =
        progress + "%";

    document.getElementById("progressText").textContent =
        progress + "% completed";
}


// Add Notification
function addNotification(message) {

    let notificationList =
        document.getElementById("notificationList");

    if (notificationCount === 0) {
        notificationList.innerHTML = "";
    }

    let li = document.createElement("li");
    li.textContent = message;

    notificationList.prepend(li);

    notificationCount++;

    updateDashboard();
}


// Enroll in Courses
document.querySelectorAll(".enroll-btn").forEach(function(button) {

    button.addEventListener("click", function() {

        let courseName = button.dataset.course;

        if (!enrolledCourses.includes(courseName)) {

            enrolledCourses.push(courseName);

            button.textContent = "Enrolled";
            button.disabled = true;

            let courseList =
                document.getElementById("enrolledCourses");

            if (enrolledCourses.length === 1) {
                courseList.innerHTML = "";
            }

            let li = document.createElement("li");
            li.textContent = courseName;

            courseList.appendChild(li);

            addNotification(
                "Successfully enrolled in " + courseName
            );

        }

    });

});


// Submit Assignment
document.getElementById("assignmentForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        if (assignmentSubmitted) {
            document.getElementById("assignmentMessage").textContent =
                "Your assignment has already been submitted.";

            return;
        }

        let assignmentText =
            document.getElementById("assignmentText").value.trim();

        if (assignmentText === "") {
            return;
        }

        assignmentSubmitted = true;

        document.getElementById("assignmentMessage").textContent =
            "Assignment submitted successfully!";

        addNotification("Assignment submitted successfully.");

        this.reset();

    });


// Attempt Quiz
document.getElementById("quizForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        let answer = document.querySelector(
            'input[name="answer"]:checked'
        );

        let quizResult =
            document.getElementById("quizResult");

        if (!answer) {
            quizResult.textContent =
                "Please select an answer!";

            return;
        }

        if (quizSubmitted) {
            quizResult.textContent =
                "You have already submitted this quiz.";

            return;
        }

        quizSubmitted = true;

        let grade;

        if (answer.value === "a") {

            grade = 100;

            quizResult.textContent =
                "Correct answer! Your score is 100/100.";

        } else {

            grade = 0;

            quizResult.textContent =
                "Incorrect answer. Your score is 0/100.";

        }

        // Update Grades
        document.getElementById("gradesTable").innerHTML = `
            <tr>
                <td>HTML Quiz</td>
                <td>${grade}/100</td>
            </tr>
        `;

        // Disable Quiz After Submission
        document.querySelectorAll(
            'input[name="answer"]'
        ).forEach(function(input) {
            input.disabled = true;
        });

        document.querySelector(
            '#quizForm button[type="submit"]'
        ).disabled = true;

        addNotification("Quiz completed successfully.");

    });


// Logout
document.getElementById("logoutBtn")
    .addEventListener("click", function() {

        window.location.href = "login.html";

    });


// Initial Dashboard Update
updateDashboard();
