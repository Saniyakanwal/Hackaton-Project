document.addEventListener('DOMContentLoaded', function () {
    var skillSection = document.getElementById('skill-section');
    var toggleSkills = document.getElementById('toggle-skills');
    if (skillSection && toggleSkills) {
        toggleSkills.addEventListener('click', function () {
            // Toggle the display of the skill section
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
});
