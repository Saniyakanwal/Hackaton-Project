declare const html2pdf: any;

document.addEventListener('DOMContentLoaded', () => {
  const skillSection = document.getElementById('skill-section');
  const toggleSkills = document.getElementById('toggle-skills');
  const generateResumeBtn = document.getElementById('generate-resume');
  const resumeForm = document.getElementById('resume-form') as HTMLFormElement;
  const resumeContainer = document.getElementById('resume-container') as HTMLElement;
  const generatePdfBtn = document.getElementById('generate-pdf');


  if (skillSection && toggleSkills) {
      toggleSkills.addEventListener('click', () => {
          if (skillSection.style.display === 'none') {
              skillSection.style.display = 'block';
              toggleSkills.innerText = 'Hide Skills';
          } else {
              skillSection.style.display = 'none';
              toggleSkills.innerText = 'Show Skills';
          }
      });
  } else {
      console.error('Elements not found');
  }

  // Show the form when the Generate Resume button is clicked
  generateResumeBtn?.addEventListener('click', () => {
      if (resumeForm) {
          resumeForm.style.display = 'block';
          generateResumeBtn.innerText = 'Edit Resume';
      } else {
          console.error('Form element not found.');
      }
  });

  resumeForm?.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitButton = resumeForm.querySelector('button[type="submit"]');
      if (submitButton) {
          submitButton.textContent = 'Save Changes'; // Change Submit to Save Changes
      }

      // Get form values
      const name = (document.getElementById('form-name') as HTMLInputElement).value;
      const role = (document.getElementById('form-role') as HTMLInputElement).value;
      const email = (document.getElementById('form-email') as HTMLInputElement).value;
      const phone = (document.getElementById('form-phone') as HTMLInputElement).value;
      const address = (document.getElementById('form-address') as HTMLInputElement).value;
      const educationInput = (document.getElementById('form-education') as HTMLInputElement).value;
      const education = educationInput
          .split(',')
          .map(edu => edu.trim())
          .filter(edu => edu !== "");
      const about = (document.getElementById('form-about') as HTMLTextAreaElement).value;
      const skillsInput = (document.getElementById('form-skills') as HTMLInputElement).value;
      const skills = skillsInput ? skillsInput.split(',').map(skill => skill.trim()) : [];
      const experience = (document.getElementById('form-experience') as HTMLTextAreaElement).value;

      const imageInput = document.getElementById('form-image') as HTMLInputElement;
      const profilePic = document.querySelector('.profile-pic img') as HTMLImageElement;

      if (imageInput.files && imageInput.files[0]) {
          const reader = new FileReader();
          reader.onload = function (event) {
              profilePic.src = event.target?.result as string; // Update the image src
          };
          reader.readAsDataURL(imageInput.files[0]); // Convert file to base64 string
      }
      // Check if any required field is empty
      if (!name || !role || !email || !phone || !address || !education || !skills.length || !experience) {
          alert("Please fill in all required fields.");
          return;
      }

      // Update resume
      (document.getElementById('user-name') as HTMLElement).textContent = name;
      (document.getElementById('user-role') as HTMLElement).textContent = role;
      (document.getElementById('contact-details') as HTMLElement).innerHTML = `
          <li><i class="fas fa-envelope"></i> ${email}</li>
          <li><i class="fas fa-phone"></i> ${phone}</li>
          <li><i class="fas fa-map-marker-alt"></i> ${address}</li>
      `;
      const educationSection = document.getElementById('user-education') as HTMLElement;
      educationSection.innerHTML = education.length > 0
          ? education.map(edu => `<p>${edu}</p>`).join('')
          : '<p>No education details provided.</p>';
      (document.getElementById('user-about') as HTMLElement).textContent = about;

      const skillSection = document.getElementById('skill-section') as HTMLElement;
      skillSection.innerHTML = skills.map(skill => `<li>${skill.trim()}</li>`).join('');

      (document.getElementById('user-experience') as HTMLElement).textContent = experience;

      // Hide form
      resumeForm.style.display = 'none';
      resumeContainer.style.display = 'block';

});

    // Generate PDF of the resume
    generatePdfBtn?.addEventListener('click', () => {
        const resumeContent = document.querySelector('.container') as HTMLElement;
        const buttons = document.querySelectorAll('.main-content button');
        buttons.forEach((button) => {
            (button as HTMLButtonElement).setAttribute('hidden', 'true'); // Hides the button during PDF generation
        });
        const opt = {
            margin: [10, 10, 10, 10], // Top, Right, Bottom, Left margins (in mm)
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 }, // Improves resolution
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };
        html2pdf().set(opt).from(resumeContent).save('resume.pdf');
        buttons.forEach((button) => {
            (button as HTMLButtonElement).style.display = 'none'; // Makes buttons hidden permanently
        });
    });
  });
