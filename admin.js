let reports = JSON.parse(localStorage.getItem("reports")) || [];
let selectedReportIndex = null;
const tableBody = document.querySelector("#reportTable tbody");

function loadTable() {
    tableBody.innerHTML = "";
    reports.forEach((r, index) => {
        tableBody.innerHTML += `
            <tr>
                <td>${r.fullname}</td>
                <td>${r.gradesection}</td>
                <td>${r.reason}</td>
                <td>${r.status}</td>
                <td>
                    <button onclick="approveReport(${index})" class="approve-btn">Approve</button>
                </td>
            </tr>
        `;
    });
}
loadTable();

// Show popup when approving
function approveReport(i) {
    selectedReportIndex = i;
    document.getElementById("meetingPopup").style.display = "flex";
}

// Close popup
function closePopup() {
    document.getElementById("meetingPopup").style.display = "none";
}

// Save date & time + send email
document.getElementById("saveMeetingBtn").addEventListener("click", function () {

    let date = document.getElementById("meetingDate").value;
    let time = document.getElementById("meetingTime").value;

    if (!date || !time) {
        alert("Please select a date and time.");
        return;
    }

    let r = reports[selectedReportIndex];
    r.status = "Approved";
    r.meetingDate = date;
    r.meetingTime = time;

    localStorage.setItem("reports", JSON.stringify(reports));
    loadTable();

    // Send Email using EmailJS
    emailjs.send("service_kyh7p4g", "template_k6yza48", {
        student_name: r.fullname,
        email: r.email,
        reason: r.reason,
        details: r.details,
        meeting_date: date,
        meeting_time: time
    });

    alert("Approved and email sent!");
    closePopup();
});

// REMOVE ALL RECORDS
document.getElementById("clearAllBtn").addEventListener("click", function () {
    if (confirm("Remove ALL records?")) {
        localStorage.removeItem("reports");
        reports = [];
        loadTable();
    }
});
