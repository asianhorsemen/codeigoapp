lucide.createIcons();

function goBack() {
  alert("Returning to the previous page...");
}

function openModal() {
  document.getElementById('new-file-modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('new-file-modal').style.display = 'none';
}

function createNewFile() {
  const newFileName = document.getElementById('new-file-name').value.trim();
  if (newFileName) {
    document.getElementById('file-name').textContent = newFileName;
    document.getElementById('code-editor').value = ""; 
    document.getElementById('output').textContent = "Output will be displayed here."; // Clear the output
    initializeEditor();
    closeModal(); 
  } else {
    alert("Please enter a valid file name.");
  }
}

function updateLineNumbers() {
  const codeEditor = document.getElementById('code-editor');
  const lineNumbers = document.getElementById('line-numbers');
  const lines = codeEditor.value.split('\n').length;

  lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => `<div class="line-number">${i + 1}</div>`).join('');
}

function showCompiler() {
  document.getElementById('editor-container').style.display = 'flex';
  document.getElementById('output-container').style.display = 'none';

  // Set the Compiler button as active
  document.getElementById('compiler-button').classList.add('active');
  document.getElementById('output-button').classList.remove('active');
}

function showOutput() {
  const output = document.getElementById('output').textContent;
  if (output.trim() !== "") {
    document.getElementById('editor-container').style.display = 'none';
    document.getElementById('output-container').style.display = 'block';

    document.getElementById('output-button').classList.add('active');
    document.getElementById('compiler-button').classList.remove('active');
  } else {
    alert("No output to display. Run the code first!");
  }
}

function initializeEditor() {
  const codeEditor = document.getElementById('code-editor');
  const initialLines = Array(20).fill('').join('\n'); // Create 20 empty lines
  codeEditor.value = initialLines;
  updateLineNumbers(); 
}

const codeEditor = document.getElementById('code-editor');
codeEditor.addEventListener('input', updateLineNumbers);

async function runCode() {
  const code = document.getElementById('code-editor').value;
  const output = document.getElementById('output');

  output.textContent = "Running Python code...";

  try {
    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: "python",
        version: "3.10.0",
        files: [
          {
            content: code,
          },
        ],
      }),
    });

    const result = await response.json();

    if (result.run.output) {
      output.textContent = result.run.output;
    } else if (result.run.stderr) {
      output.textContent = result.run.stderr;
    } else {
      output.textContent = "No output received.";
    }
  } catch (error) {
    output.textContent = `Error: ${error.message}`;
  }

  showOutput();
}

initializeEditor();