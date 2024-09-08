document.getElementById("generate-resume").addEventListener("click", function() {
    // Get input values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const skills = document.getElementById("skills").value.split(",");
    const education = document.getElementById("education").value;
    const experience = document.getElementById("experience").value;

    // Set values in the resume output
    document.getElementById("output-name").innerText = name;
    document.getElementById("output-email").innerText = email;
    document.getElementById("output-phone").innerText = phone;
    
    // Handle skills
    const skillsList = document.getElementById("output-skills");
    skillsList.innerHTML = ""; // Clear existing list items
    skills.forEach(function(skill) {
        const listItem = document.createElement("li");
        listItem.innerText = skill.trim();
        skillsList.appendChild(listItem);
    });

    document.getElementById("output-education").innerText = education;
    document.getElementById("output-experience").innerText = experience;

    // Show the resume output
    document.getElementById("resume-output").classList.remove("hidden");
    document.getElementById("edit-resume").classList.remove("hidden");
    document.getElementById("save-resume").classList.add("hidden");
    document.getElementById("share-resume").classList.remove("hidden");
    document.getElementById("download-resume").classList.remove("hidden");
});
document.getElementById("edit-resume").addEventListener("click", function () {
    // Convert text to input fields for editing

    const name = document.getElementById("output-name").innerText;
    document.getElementById("output-name").innerHTML = `<input type="text" id="edit-name" value="${name}">`;

    const email = document.getElementById("output-email").innerText;
    document.getElementById("output-email").innerHTML = `<input type="email" id="edit-email" value="${email}">`;

    const phone = document.getElementById("output-phone").innerText;
    document.getElementById("output-phone").innerHTML = `<input type="tel" id="edit-phone" value="${phone}">`;

    const skillsList = document.getElementById("output-skills");
    const skillsArray = Array.from(skillsList.children).map(item => item.innerText);
    document.getElementById("output-skills").innerHTML = `<textarea id="edit-skills">${skillsArray.join(", ")}</textarea>`;

    const education = document.getElementById("output-education").innerText;
    document.getElementById("output-education").innerHTML = `<textarea id="edit-education">${education}</textarea>`;

    const experience = document.getElementById("output-experience").innerText;
    document.getElementById("output-experience").innerHTML = `<textarea id="edit-experience">${experience}</textarea>`;

    // Show Save button and hide Edit button
    document.getElementById("edit-resume").classList.add("hidden");
    document.getElementById("save-resume").classList.remove("hidden");
});

document.getElementById("save-resume").addEventListener("click", function () {
    // Save the edited values and convert back to static text
    const name = document.getElementById("edit-name").value;
    document.getElementById("output-name").innerText = name;

    const email = document.getElementById("edit-email").value;
    document.getElementById("output-email").innerText = email;

    const phone = document.getElementById("edit-phone").value;
    document.getElementById("output-phone").innerText = phone;

    const skills = document.getElementById("edit-skills").value.split(",");
    const skillsList = document.getElementById("output-skills");
    skillsList.innerHTML = ""; // Clear list
    skills.forEach(function (skill) {
        const listItem = document.createElement("li");
        listItem.innerText = skill.trim();
        skillsList.appendChild(listItem);
    });

    const education = document.getElementById("edit-education").value;
    document.getElementById("output-education").innerText = education;

    const experience = document.getElementById("edit-experience").value;
    document.getElementById("output-experience").innerText = experience;

    // Show Edit button and hide Save button
    document.getElementById("edit-resume").classList.remove("hidden");
    document.getElementById("save-resume").classList.add("hidden");
});






