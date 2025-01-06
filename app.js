document.addEventListener('DOMContentLoaded', function () {
    var skillSection = document.getElementById('skill-section');
    var toggleSkills = document.getElementById('toggle-skills');
    var generateResumeBtn = document.getElementById('generate-resume');
    var resumeForm = document.getElementById('resume-form');
    var resumeContainer = document.getElementById('resume-container');
    var generateUrlBtn = document.getElementById('generate-url');
    var resumeUrlDiv = document.getElementById('resume-url');
    if (skillSection && toggleSkills) {
        toggleSkills.addEventListener('click', function () {
            if (skillSection.style.display === 'none') {
                skillSection.style.display = 'block';
                toggleSkills.innerText = 'Hide Skills';
            }
            else {
                skillSection.style.display = 'none';
                toggleSkills.innerText = 'Show Skills';
            }
        });
    }
    else {
        console.error('Elements not found');
    }
    // Show the form when the Generate Resume button is clicked
    generateResumeBtn === null || generateResumeBtn === void 0 ? void 0 : generateResumeBtn.addEventListener('click', function () {
        if (resumeForm) {
            resumeForm.style.display = 'block';
            generateResumeBtn.innerText = 'Edit Resume';
        }
        else {
            console.error('Form element not found.');
        }
    });
    resumeForm === null || resumeForm === void 0 ? void 0 : resumeForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var submitButton = resumeForm.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.textContent = 'Save Changes'; // Change Submit to Save Changes
        }
        // Get form values
        var name = document.getElementById('form-name').value;
        var role = document.getElementById('form-role').value;
        var email = document.getElementById('form-email').value;
        var phone = document.getElementById('form-phone').value;
        var address = document.getElementById('form-address').value;
        var educationInput = document.getElementById('form-education').value;
        var education = educationInput
            .split(',')
            .map(function (edu) { return edu.trim(); })
            .filter(function (edu) { return edu !== ""; });
        var about = document.getElementById('form-about').value;
        var skillsInput = document.getElementById('form-skills').value;
        var skills = skillsInput ? skillsInput.split(',').map(function (skill) { return skill.trim(); }) : [];
        var experience = document.getElementById('form-experience').value;
        var imageInput = document.getElementById('form-image');
        var profilePic = document.querySelector('.profile-pic img');
        if (imageInput.files && imageInput.files[0]) {
            var reader = new FileReader();
            reader.onload = function (event) {
                var _a;
                profilePic.src = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result; // Update the image src
            };
            reader.readAsDataURL(imageInput.files[0]); // Convert file to base64 string
        }
        // Check if any required field is empty
        if (!name || !role || !email || !phone || !address || !education || !skills.length || !experience) {
            alert("Please fill in all required fields.");
            return;
        }
        // Update resume
        document.getElementById('user-name').textContent = name;
        document.getElementById('user-role').textContent = role;
        document.getElementById('contact-details').innerHTML = "\n          <li><i class=\"fas fa-envelope\"></i> ".concat(email, "</li>\n          <li><i class=\"fas fa-phone\"></i> ").concat(phone, "</li>\n          <li><i class=\"fas fa-map-marker-alt\"></i> ").concat(address, "</li>\n      ");
        var educationSection = document.getElementById('user-education');
        educationSection.innerHTML = education.length > 0
            ? education.map(function (edu) { return "<p>".concat(edu, "</p>"); }).join('')
            : '<p>No education details provided.</p>';
        document.getElementById('user-about').textContent = about;
        var skillSection = document.getElementById('skill-section');
        skillSection.innerHTML = skills.map(function (skill) { return "<li>".concat(skill.trim(), "</li>"); }).join('');
        document.getElementById('user-experience').textContent = experience;
        // Hide form
        resumeForm.style.display = 'none';
        resumeContainer.style.display = 'block';
    });
    // Generate URL logic
    generateUrlBtn === null || generateUrlBtn === void 0 ? void 0 : generateUrlBtn.addEventListener('click', function () {
        var username = document.getElementById('form-name').value.trim();
        if (username) {
            var resumeLink = "index.html?name=".concat(encodeURIComponent(username));
            alert("Your Resume Link: ".concat(resumeLink));
            window.location.href = resumeLink;
        }
        else {
            alert("Please enter your name to generate the link.");
        }
        // Call the function to generate the link
        generateLinkForResume(username);
    });
    // Function to generate the resume link
    function generateLinkForResume(username) {
        var _a;
        var resumeUrlDiv = document.getElementById('resume-url');
        if (!resumeUrlDiv) {
            alert('Please fill in the resume form first.');
        }
        var uniqueUrl = "".concat(window.location.origin, "/resume/").concat(encodeURIComponent(username));
        resumeUrlDiv.innerHTML = "\n          <p>Your Resume Link: <a href=\"".concat(uniqueUrl, "\" target=\"_blank\">").concat(uniqueUrl, "</a></p>\n          <button id=\"copy-link\">Copy Link</button>");
        var pathSegments = window.location.pathname.split('/').filter(Boolean);
        var userNameFromPath = pathSegments[pathSegments.length - 1];
        if (userNameFromPath) {
            // Populate Resume with Username
            var userNameElement = document.getElementById('user-name');
            userNameElement.textContent = decodeURIComponent(userNameFromPath);
            resumeUrlDiv.style.display = 'block';
        }
        (_a = document.getElementById('copy-link')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
            navigator.clipboard.writeText(uniqueUrl);
            alert('Link copied to clipboard!');
        });
    }
});
