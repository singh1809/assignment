const textInput = document.getElementById('textInput');
const fontSelect = document.getElementById('fontSelect');
const fontSizeRange = document.getElementById('fontSizeRange');
const colorPicker = document.getElementById('colorPicker');
const output = document.getElementById('output');
const undoButton = document.getElementById('undoButton');


let history = [];
let currentIndex = -1;

function updateOutput() {
    const selectedFont = fontSelect.value;
           const selectedFontSize = fontSizeRange.value + 'px';
    const selectedColor = colorPicker.value;

    output.style.fontFamily = selectedFont;
        output.style.fontSize = selectedFontSize;
    output.style.color = selectedColor;
    output.innerText = textInput.value || 'Your styled text will appear here.';
    saveState();
      updateButtons();
}

function saveState() {
    const state = {
              text: textInput.value,
        font: fontSelect.value,
        fontSize: fontSizeRange.value,
        color: colorPicker.value
    };
    if (currentIndex === -1 || JSON.stringify(state) !== JSON.stringify(history[currentIndex])) {
        history = history.slice(0, currentIndex + 1);
               history.push(state);
        currentIndex++;
    }
}

function restoreState(index) {
    const state = history[index];
    textInput.value = state.text;
              fontSelect.value = state.font;
    fontSizeRange.value = state.fontSize;
     colorPicker.value = state.color;
    updateOutputWithoutSave();
}

function updateOutputWithoutSave() {
    const selectedFont = fontSelect.value;
    const selectedFontSize = fontSizeRange.value + 'px';

        const selectedColor = colorPicker.value;

    output.style.fontFamily = selectedFont;
    output.style.fontSize = selectedFontSize;
  output.style.color = selectedColor;

    output.innerText = textInput.value || 'Your styled text will appear here.';
}

function undo() {
    if (currentIndex > 0) {
 currentIndex--;
        restoreState(currentIndex);
    }
}

function redo() {
    if (currentIndex < history.length - 1) {
     currentIndex++;
        restoreState(currentIndex);
    }
}

function updateButtons() {
    undoButton.disabled = currentIndex <= 0;
   
}

textInput.addEventListener('input', updateOutput);
 fontSelect.addEventListener('change', updateOutput);
fontSizeRange.addEventListener('input', updateOutput);
  colorPicker.addEventListener('input', updateOutput);
undoButton.addEventListener('click', undo);



updateOutput();