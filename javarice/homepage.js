    lucide.createIcons();

    let progress = 0;

    window.onload = function () {
      window.scrollTo(0, document.body.scrollHeight);

      showSection('home');

      document.getElementById("button-2").disabled = true;
      document.getElementById("button-3").disabled = true;
      document.getElementById("button-4").disabled = true;
      document.getElementById("button-5").disabled = true;

      const button2State = localStorage.getItem('button2Enabled');
      const button3State = localStorage.getItem('button3Enabled');
      const button4State = localStorage.getItem('button4Enabled');
      const button5State = localStorage.getItem('button5Enabled');

      if (button2State === 'true') {
        document.getElementById("button-2").disabled = false; 
      }

      if (button3State === 'true') {
        document.getElementById("button-3").disabled = false; 
      }

      if (button4State === 'true') {
        document.getElementById("button-4").disabled = false;
      }

      if (button5State === 'true') {
        document.getElementById("button-5").disabled = false; 
      }
    };

    function unlockNext(nextId, progressAmount) {
      let nextButton = document.getElementById("button-" + nextId);
      if (nextButton) {
        nextButton.disabled = false; 
      }

      if (progress < progressAmount) {
        progress = progressAmount;
        document.getElementById("progress-fill").style.width = progress + "%";
      }

      if (nextId === '2') {
        localStorage.setItem('button2Enabled', 'true');
      } else if (nextId === '3') {
        localStorage.setItem('button3Enabled', 'true');
      } else if (nextId === '4') {
        localStorage.setItem('button4Enabled', 'true');
      } else if (nextId === '5') {
        localStorage.setItem('button5Enabled', 'true');
      }

      if (progress === 100) {
        document.querySelector(".final").style.backgroundColor = "blue";
      }
    }

    function redirectToPage(lessonUrl) {
      const currentButtonId = event.target.id; 
      const nextButtonId = `button-${parseInt(currentButtonId.split('-')[1]) + 1}`; // Calculate the next button ID

      unlockNext(nextButtonId.split('-')[1], progress + 25); 
      window.location.href = lessonUrl;
    }

    function showSection(sectionId) {
      const navbarLinks = document.querySelectorAll('.navbar a');
      navbarLinks.forEach(link => link.classList.remove('active'));

      const clickedLink = document.querySelector(`.navbar a[onclick*="${sectionId}"]`);
      if (clickedLink) {
        clickedLink.classList.add('active');
      }

      const sections = document.querySelectorAll('.section');
      sections.forEach(section => {
        section.classList.remove('active-section');
      });

      const activeSection = document.getElementById(sectionId);
      if (activeSection) {
        activeSection.classList.add('active-section');
      }
    }

    const navbarLinks = document.querySelectorAll('.navbar a');
    navbarLinks.forEach(link => {
      link.addEventListener('click', () => {
        const sectionId = link.getAttribute('onclick').match(/'([^']+)'/)[1];
        showSection(sectionId);
      });
    });