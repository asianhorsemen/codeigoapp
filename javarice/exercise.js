
    lucide.createIcons();

    const exercises = {
      'Exercise 1': {
        description: 'Write a program that prints "Hello, World!" to the screen.',
      },
      'Exercise 2': {
        description: 'Create a program that adds two numbers and displays the result.',
      },
      'Exercise 3': {
        description: 'Write a program that asks for a name and prints a greeting message using that name.',
      },
      'Exercise 4': {
        description: 'Create a program that checks if a number is even or odd and prints the result.',
      },
      'Exercise 5': {
        description: 'Write a program that repeats a message multiple times using a loop.',
      },
      'Exercise 6': {
        description: 'Create a program that stores a list of three favorite colors and prints each one.',
      },
      'Exercise 7': {
        description: 'Write a simple program that takes two numbers from the user and prints their sum.',
      },
      'Exercise 8': {
        description: 'Create a program that checks if a number is positive, negative, or zero.',
      },
      'Exercise 9': {
        description: 'Write a program that asks for the user’s age and prints a message based on whether they are under 18 or over 18.',
      },
      'Exercise 10': {
        description: 'Create a program that handles an error when trying to divide by zero and prints a friendly error message.',
      }
    };

    let editor;

    require.config({ paths: { vs: 'https://unpkg.com/monaco-editor@0.33.0/min/vs' }});
    require(['vs/editor/editor.main'], function () {
      editor = monaco.editor.create(document.getElementById('editor'), {
        value: `# Enter your Python code here\nprint("Hello, World!")`,
        language: 'python',
        theme: 'vs-dark',
        fontSize: 14,
        fontFamily: 'Consolas, "Courier New", monospace',
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        readOnly: false,
        automaticLayout: true,
      });

      document.getElementById('run').addEventListener('click', async () => {
        const code = editor.getValue();
        try {
          let pyodide = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/"
          });

          await pyodide.runPythonAsync(`
            import sys
            from io import StringIO
            sys.stdout = StringIO()
          `);

          await pyodide.runPythonAsync(code);

          let output = await pyodide.runPythonAsync("sys.stdout.getvalue()");
          document.getElementById('output').textContent = output;
        } catch (error) {
          document.getElementById('output').textContent = error;
        }
      });
    });

    function showContent(exerciseTitle) {
      setTimeout(function() {
        document.getElementById('contentContainer').classList.add('show');
        document.querySelector('.button-container').style.transform = 'translateX(-100%)';
        document.querySelector('.button-container').style.opacity = '0';

        document.getElementById('exerciseTitle').innerText = exerciseTitle;
        document.getElementById('exerciseDescription').innerText = exercises[exerciseTitle].description;

        if (editor) {
          editor.setValue(`# Enter your Python code here\n# ${exercises[exerciseTitle].description}`);
        }
      }, 250);
    }

    function hideContent() {
      document.getElementById('contentContainer').classList.remove('show');
      document.querySelector('.button-container').style.transform = 'translateX(0)';
      document.querySelector('.button-container').style.opacity = '1';

      setTimeout(function() {
        document.querySelector('.content-container').style.display = 'none';
      }, 500);
    }

    function finishExercise() {
      const exerciseTitle = document.getElementById('exerciseTitle').innerText;

      const exerciseButton = document.getElementById('exercise' + exerciseTitle.split(' ')[1]);
      exerciseButton.innerHTML = 'Completed';
      exerciseButton.classList.add('completed');

      const finishButton = document.getElementById('finishButton');
      finishButton.innerText = 'Completed';
      finishButton.classList.remove('finish-button');
      finishButton.classList.add('check-button');
      finishButton.disabled = true;

      setTimeout(function() {
        hideContent();
      }, 500);
    }