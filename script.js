let students = JSON.parse(localStorage.getItem("students")) || [];

window.onload = function () {
    renderTable();
};

// SAVE DATA
function saveData() {
    localStorage.setItem("students", JSON.stringify(students));
}

// RENDER TABLE
function renderTable() {
    let table = document.getElementById("studentTable");

    table.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Roll</th>
            <th>Branch</th>
            <th>CGPA</th>
            <th>Skills</th>
            <th>Action</th>
        </tr>
    `;

    students.forEach((s, index) => {
        let row = table.insertRow();

        row.insertCell(0).innerText = s.name;
        row.insertCell(1).innerText = s.roll;
        row.insertCell(2).innerText = s.branch;
        row.insertCell(3).innerText = s.cgpa;
        row.insertCell(4).innerText = s.skills;
        row.insertCell(5).innerText = s.status;
        row.insertCell(6).innerText = s.company;

        if(status==="Placed" && company==="")
        {
            message.style.color="red";
            message.innerText="Enter Company Name";
            return;
        }

        let action = row.insertCell(7);

        let delBtn = document.createElement("button");
        delBtn.innerText = "Delete";

        delBtn.onclick = function () {
            students.splice(index, 1);
            saveData();
            renderTable();
        };

        let editBtn = document.createElement("button");
        editBtn.innerText = "Edit";

        editBtn.onclick = function () {
            let newName = prompt("Enter new name");
            if (newName) {
                students[index].name = newName;
                saveData();
                renderTable();
            }
        };

        let viewBtn = document.createElement("button");
    viewBtn.innerText = "View";

    viewBtn.onclick = function () {

    alert(
        "Name: " + s.name + "\n" +
        "Roll: " + s.roll + "\n" +
        "Branch: " + s.branch + "\n" +
        "CGPA: " + s.cgpa + "\n" +
        "Skills: " + s.skills + "\n" +
        "Status: " + s.status + "\n" +
        "Company: " + s.company
    );
    };

        action.appendChild(delBtn);
        action.appendChild(editBtn);
        action.appendChild(viewBtn);
    });
    updateDashboard();
};


// ADD STUDENT
document.getElementById("addBtn").addEventListener("click", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let roll = document.getElementById("roll").value;
    let branch = document.getElementById("branch").value;
    let cgpa = document.getElementById("cgpa").value;
    let skills = document.getElementById("skills").value;
    let status=document.getElementById("status").value;
    let company=document.getElementById("company").value;

    let message = document.getElementById("message");

    if (!name || !roll || !branch || !cgpa || !skills) {
        message.style.color = "red";
        message.innerText = "All fields are required";
        return;
    }

    students.push({ name, roll, branch, cgpa, skills,status,company});

    saveData();
    renderTable();

    message.style.color = "green";
    message.innerText = "Student Added Successfully";

    document.getElementById("name").value = "";
    document.getElementById("roll").value = "";
    document.getElementById("branch").value = "";
    document.getElementById("cgpa").value = "";
    document.getElementById("skills").value = "";
    document.getElementById("status").value = "Placed";
    document.getElementById("company").value="";
});

// SEARCH
document.getElementById("searchBtn").addEventListener("click", function () {
    let search = document.getElementById("searchBox").value.toLowerCase();
    let filtered = students.filter(s =>
        s.name.toLowerCase().includes(search)
    );

    displayFiltered(filtered);
});

// FILTER
document.getElementById("filterBtn").addEventListener("click", function () {
    let min = parseFloat(document.getElementById("cgpaFilter").value);

    let filtered = students.filter(s => s.cgpa >= min);

    displayFiltered(filtered);
});

// SHOW FILTERED DATA
function displayFiltered(data) {
    let table = document.getElementById("studentTable");

    table.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Roll</th>
            <th>Branch</th>
            <th>CGPA</th>
            <th>Skills</th>
            <th>Company</th>
            <th>Action</th>
        </tr>
    `;

    data.forEach((s) => {
        let row = table.insertRow();

        row.insertCell(0).innerText = s.name;
        row.insertCell(1).innerText = s.roll;
        row.insertCell(2).innerText = s.branch;
        row.insertCell(3).innerText = s.cgpa;
        row.insertCell(4).innerText = s.skills;
        row.insertCell(5).innerText = s.company;
        row.insertCell(6).innerText = "-";
    });
}

// COUNT
document.getElementById("countBtn").addEventListener("click", function () {
    document.getElementById("studentCount").innerText =
        "Total Students: " + students.length;
});

// SORT
document.getElementById("sortBtn").addEventListener("click", function () {
    students.sort((a, b) => b.cgpa - a.cgpa);
    saveData();
    renderTable();
});

let exportBtn=document.getElementById("exportBtn");
exportBtn.addEventListener(
    "click",
    function()
    {
        let csv="Name,Roll,Branch,CGPA,Skills\n";
        students.forEach(function(student)
    {
        csv+=student.name+","+
        student.roll+","+
        student.branch+","+
        student.cgpa+","+
        student.skills+"\n";
    });

    let blob =
    new Blob(
        [csv],
        { type: "text/csv" }
    );

    let link =
    document.createElement("a");

    link.href =
    URL.createObjectURL(blob);

    link.download =
    "students.csv";

    link.click();
    }
);

function updateDashboard()
{
    document.getElementById("totalStudents")
    .innerText = students.length;

    let placed =
    students.filter(
        s => s.status === "Placed"
    ).length;

    document.getElementById("placedStudents")
    .innerText = placed;

    document.getElementById("notPlacedStudents")
    .innerText =
    students.length - placed;

    let totalCGPA = 0;

    students.forEach(function(student)
    {
        totalCGPA +=
        parseFloat(student.cgpa);
    });

    let average = 0;

    if(students.length > 0)
    {
        average =
        totalCGPA / students.length;
    }

    document.getElementById("averageCGPA")
    .innerText =
    average.toFixed(2);
}

let themeBtn =
document.getElementById("themeBtn");

if(localStorage.getItem("theme")
=== "dark")
{
    document.body.classList.add(
    "dark-mode"
    );
}

themeBtn.addEventListener(
"click",
function()
{
    document.body.classList.toggle(
    "dark-mode"
    );

    if(
    document.body.classList.contains(
    "dark-mode"
    ))
    {
        localStorage.setItem(
        "theme",
        "dark"
        );
    }
    else
    {
        localStorage.setItem(
        "theme",
        "light"
        );
    }
});

document.getElementById(
"resetBtn"
).addEventListener(
"click",
function()
{
    renderTable();

    document.getElementById(
    "searchBox"
    ).value = "";

    document.getElementById(
    "cgpaFilter"
    ).value = "";
});