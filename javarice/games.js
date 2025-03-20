    lucide.createIcons();

    const challenges = [
      {
        description: "This function should greet the user by printing 'Hello, World!', but some parts are missing.",
        code: `def greet(name):\n    print("Hello, <input class='blank-input' id='blank1' oninput='updateBlank(1, this.value)'>!")\n\ngreet(<input class='blank-input' id='blank2' oninput='updateBlank(2, this.value)'>)`,
        answers: { 1: "World", 2: "name" },
        choices: ["World", "User", "Friend"],
        correctChoice: "World"
      },
      {
        description: "This loop should print 'Hello' 5 times, but the range value and message are missing.",
        code: `for i in range(<input class='blank-input' id='blank1' oninput='updateBlank(1, this.value)'>):\n    print(<input class='blank-input' id='blank2' oninput='updateBlank(2, this.value)'>)`,
        answers: { 1: "5", 2: "'Hello'" },
        choices: ["5", "10", "15"],
        correctChoice: "5"
      },
      {
        description: "This function should return the square of a number, but an operator is missing.",
        code: `def square(num):\n    return num <input class='blank-input' id='blank1' oninput='updateBlank(1, this.value)'> num\n\nprint(square(<input class='blank-input' id='blank2' oninput='updateBlank(2, this.value)'>))`,
        answers: { 1: "*", 2: "4" },
        choices: ["*", "/", "+"],
        correctChoice: "*"
      },
      {
        description: "This function should check if a number is even, but a keyword is missing.",
        code: `def is_even(n):\n    <input class='blank-input' id='blank1' oninput='updateBlank(1, this.value)'> n % 2 == 0:\n        return True\n    return False\n\nprint(is_even(<input class='blank-input' id='blank2' oninput='updateBlank(2, this.value)'>))`,
        answers: { 1: "if", 2: "6" },
        choices: ["if", "when", "while"],
        correctChoice: "if"
      },
      {
        description: "This function should return the length of a list, but a function name is missing.",
        code: `def list_length(lst):\n    return <input class='blank-input' id='blank1' oninput='updateBlank(1, this.value)'>(lst)\n\nprint(list_length([1, 2, 3, 4, <input class='blank-input' id='blank2' oninput='updateBlank(2, this.value)'>]))`,
        answers: { 1: "len", 2: "5" },
        choices: ["len", "length", "size"],
        correctChoice: "len"
      },
      // Additional medium-level questions
      {
        description: "This function should calculate the factorial of a number, but the recursive case is missing.",
        code: `def factorial(n):\n    if n == 0:\n        return 1\n    return n * <input class='blank-input' id='blank1' oninput='updateBlank(1, this.value)'>(n - 1)\n\nprint(factorial(<input class='blank-input' id='blank2' oninput='updateBlank(2, this.value)'>))`,
        answers: { 1: "factorial", 2: "5" },
        choices: ["factorial", "calculate", "compute"],
        correctChoice: "factorial"
      },
      {
        description: "This function should reverse a string, but the slicing syntax is missing.",
        code: `def reverse_string(s):\n    return s[<input class='blank-input' id='blank1' oninput='updateBlank(1, this.value)'>]\n\nprint(reverse_string(<input class='blank-input' id='blank2' oninput='updateBlank(2, this.value)'>))`,
        answers: { 1: "::-1", 2: "'hello'" },
        choices: ["::-1", ":1", ":-1"],
        correctChoice: "::-1"
      },
      {
        description: "This function should find the maximum number in a list, but the function name is missing.",
        code: `def find_max(lst):\n    return <input class='blank-input' id='blank1' oninput='updateBlank(1, this.value)'>(lst)\n\nprint(find_max([1, 2, 3, 4, <input class='blank-input' id='blank2' oninput='updateBlank(2, this.value)'>]))`,
        answers: { 1: "max", 2: "5" },
        choices: ["max", "maximum", "find_max"],
        correctChoice: "max"
      }
    ];

    let currentChallenge = 0;
    let blanks = { 1: null, 2: null };
    let currentBlank = 1;

    function loadChallenge() {
      const challenge = challenges[currentChallenge];

      document.getElementById("description").textContent = challenge.description;
      document.getElementById("codeDisplay").innerHTML = challenge.code;

      blanks = { 1: null, 2: null };
      currentBlank = 1;

      const blankInputs = document.querySelectorAll(".blank-input");
      blankInputs.forEach(input => {
        input.value = "";
        input.classList.remove("correct", "incorrect", "shake");
      });

      updateProgressIndicator();

      loadAnswerButtons(challenge.answers);

      adjustInputWidths(challenge.answers);

      loadMultipleChoiceButtons(challenge.choices);

      document.getElementById("result").textContent = "";
      document.getElementById("result").classList.add("hidden");
    }

    function loadAnswerButtons(answers) {
      const answerButtonsContainer = document.getElementById("answerButtons");
      answerButtonsContainer.innerHTML = "";

      for (const [key, value] of Object.entries(answers)) {
        const button = document.createElement("button");
        button.textContent = value;
        button.classList.add("answer-button");
        button.onclick = () => fillBlank(value);
        answerButtonsContainer.appendChild(button);
      }
    }

    function loadMultipleChoiceButtons(choices) {
      const multipleChoiceContainer = document.getElementById("multipleChoiceContainer");
      multipleChoiceContainer.innerHTML = ""; // Clear previous choices

      choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.classList.add("multiple-choice-button");
        button.onclick = () => {
          fillBlank(choice);
          button.style.display = 'none'; 
        };
        multipleChoiceContainer.appendChild(button);
      });
    }

    function fillBlank(value) {
      const blankInput = document.getElementById(`blank${currentBlank}`);
      if (blankInput) {
        blankInput.value = value;
        updateBlank(currentBlank, value);
        adjustInputWidth(blankInput, value);

        currentBlank++;
        if (currentBlank > 2) currentBlank = 1; 
      }
    }

    function adjustInputWidths(answers) {
      for (const [key, value] of Object.entries(answers)) {
        const blankInput = document.getElementById(`blank${key}`);
        adjustInputWidth(blankInput, value);
      }
    }

    function adjustInputWidth(inputElement, value) {
      const tempSpan = document.createElement("span");
      tempSpan.style.visibility = "hidden";
      tempSpan.style.whiteSpace = "pre";
      tempSpan.style.fontFamily = "'Courier New', monospace";
      tempSpan.style.fontSize = "15px";
      tempSpan.textContent = value;
      document.body.appendChild(tempSpan);

      const width = tempSpan.offsetWidth + 10;
      inputElement.style.width = `${width}px`;

      document.body.removeChild(tempSpan);
    }

    function updateProgressIndicator() {
      const progressIndicator = document.getElementById("progressIndicator");
      progressIndicator.innerHTML = "";

      challenges.forEach((_, index) => {
        const circle = document.createElement("div");
        circle.classList.add("progress-circle");
        if (index === currentChallenge) {
          circle.classList.add("active");
        }
        progressIndicator.appendChild(circle);
      });
    }

    function updateBlank(blankNumber, value) {
      blanks[blankNumber] = value;
    }

    function resetGame() {
      blanks = { 1: null, 2: null };
      currentBlank = 1;
      document.getElementById("blank1").value = "";
      document.getElementById("blank2").value = "";

      const buttons = document.querySelectorAll('.multiple-choice-button');
      buttons.forEach(button => {
        button.style.display = 'inline-block';
      });
      
      adjustInputWidths(challenges[currentChallenge].answers);
    }

    function runCode() {
      const challenge = challenges[currentChallenge];
      const blank1 = document.getElementById("blank1");
      const blank2 = document.getElementById("blank2");

      if (blanks[1] === challenge.answers[1] && blanks[2] === challenge.answers[2]) {
        blank1.classList.remove("incorrect", "shake");
        blank2.classList.remove("incorrect", "shake");
        blank1.classList.add("correct");
        blank2.classList.add("correct");

        const correctSound = document.getElementById("correctSound");
        correctSound.play();

        setTimeout(() => {
          currentChallenge = (currentChallenge + 1) % challenges.length;
          
          document.getElementById("result").textContent = "";
          document.getElementById("result").classList.add("hidden");
          
          // Load the next challenge
          loadChallenge();
        }, 1000);
      } else {
        blank1.classList.remove("correct");
        blank2.classList.remove("correct");
        blank1.classList.add("incorrect", "shake");
        blank2.classList.add("incorrect", "shake");

        const incorrectSound = document.getElementById("incorrectSound");
        incorrectSound.play();

        document.getElementById("result").textContent = "Incorrect! Try again.";
        document.getElementById("result").classList.remove("hidden");
      }
    }

    window.onload = function() {
      loadChallenge();
    };

    document.addEventListener("click", () => {
      const backgroundMusic = document.getElementById("backgroundMusic");
      backgroundMusic.muted = false;
      backgroundMusic.play();
    });