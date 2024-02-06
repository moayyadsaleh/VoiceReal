// script.js
const languageSelect = document.getElementById("languageSelect");
const textArea = document.getElementById("textArea");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const repeatBtn = document.getElementById("repeatBtn");
const pitchSlider = document.getElementById("pitchSlider");
const wordBox = document.getElementById("wordBox"); // Add a new element for displaying words

// Predefined list of languages and voices
const languages = [
  {
    name: "English",
    voices: [
      "UK English Male",
      "UK English Female",
      "US English Male",
      "US English Female",
    ],
  },
  {
    name: "Spanish",
    voices: [
      "Spanish Spain Male",
      "Spanish Spain Female",
      "Spanish Latin American Male",
      "Spanish Latin American Female",
    ],
  },
  // Add more languages as needed
];

// Populate language options
languages.forEach((language) => {
  const optionGroup = document.createElement("optgroup");
  optionGroup.label = language.name;

  language.voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice;
    option.textContent = voice;
    optionGroup.appendChild(option);
  });

  languageSelect.appendChild(optionGroup);
});

// Set default language
languageSelect.value = languages[0].voices[0];

// Event listeners for playback controls
playBtn.addEventListener("click", () => {
  const selectedVoice = languageSelect.value;
  const selectedPitch = parseFloat(pitchSlider.value);

  const words = textArea.value.split(/\s+/); // Split text into words
  let index = 0; // Index to keep track of the current word

  function displayNextWord() {
    if (index < words.length) {
      const currentWord = words[index];
      wordBox.textContent = currentWord;
      highlightText(currentWord);

      // Adjust the interval based on the length of the current word and voice speed
      const wordDuration = (currentWord.length / selectedPitch) * 1500; // Adjust the factor as needed
      setTimeout(() => {
        textArea.setSelectionRange(0, 0); // Reset selection after the word is displayed
        index++;
        displayNextWord(); // Continue to the next word
      }, wordDuration);
    } else {
      wordBox.textContent = ""; // Reset the display when playback ends
    }
  }

  displayNextWord(); // Start displaying words

  responsiveVoice.speak(textArea.value, selectedVoice, {
    pitch: selectedPitch,
    onstart: onPlayStart,
    onend: onPlayEnd,
  });
});

pauseBtn.addEventListener("click", () => {
  responsiveVoice.pause();
});

repeatBtn.addEventListener("click", () => {
  const selectedVoice = languageSelect.value;
  const selectedPitch = parseFloat(pitchSlider.value);

  const words = textArea.value.split(/\s+/); // Split text into words
  let index = 0; // Index to keep track of the current word

  function displayNextWord() {
    if (index < words.length) {
      const currentWord = words[index];
      wordBox.textContent = currentWord;
      highlightText(currentWord);

      // Adjust the interval based on the length of the current word and voice speed
      const wordDuration = (currentWord.length / selectedPitch) * 1500; // Adjust the factor as needed
      setTimeout(() => {
        textArea.setSelectionRange(0, 0); // Reset selection after the word is displayed
        index++;
        displayNextWord(); // Continue to the next word
      }, wordDuration);
    } else {
      wordBox.textContent = ""; // Reset the display when playback ends
    }
  }

  displayNextWord(); // Start displaying words

  responsiveVoice.speak(textArea.value, selectedVoice, {
    pitch: selectedPitch,
    onstart: onPlayStart,
    onend: onPlayEnd,
  });
});

// Callback function for play start
function onPlayStart() {
  wordBox.classList.add("highlight");
}

// Callback function for play end
function onPlayEnd() {
  wordBox.classList.remove("highlight");
}

// Event listener for pitch slider
pitchSlider.addEventListener("input", () => {
  // Update pitch value display if needed
  // const pitchValue = parseFloat(pitchSlider.value).toFixed(1);
  // console.log("Pitch Value:", pitchValue);
});

// Function to highlight the specified text in the text area
function highlightText(currentWord) {
  const startIndex = textArea.value.indexOf(currentWord);
  const endIndex = startIndex + currentWord.length;
  textArea.setSelectionRange(startIndex, endIndex);
}
