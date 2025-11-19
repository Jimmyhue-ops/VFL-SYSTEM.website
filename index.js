document.getElementById("complaintForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get values
    const complaint = {
        fullname: document.getElementById("fullname").value,
        gradesection: document.getElementById("gradesection").value,
        adviser: document.getElementById("adviser").value,
        age: document.getElementById("age").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        reason: document.getElementById("reason").value,
        details: document.getElementById("details").value,
        status: "Pending"
    };

    // Store in localStorage
    let reports = JSON.parse(localStorage.getItem("reports")) || [];
    reports.push(complaint);
    localStorage.setItem("reports", JSON.stringify(reports));

    alert("Your complaint was submitted successfully!");

    document.getElementById("complaintForm").reset();
});