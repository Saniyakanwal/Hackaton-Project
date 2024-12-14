document.addEventListener('DOMContentLoaded', () => {
    const skillSection = document.getElementById('skill-section');
    const toggleSkills = document.getElementById('toggle-skills');
  
    if (skillSection && toggleSkills) {
      toggleSkills.addEventListener('click', () => {
        
        if (skillSection.style.display === 'none'){
            skillSection.style.display = 'block';
         toggleSkills.innerText = 'Hide Skills'
        } else{
            skillSection.style.display = 'none';
            toggleSkills.innerText = 'Show Skills';
        }
      });
    } else {
      console.error('Elements not found');
    }
  });
  