const languageSelect = document.getElementById("languageSelect");
const textArea = document.getElementById("textArea");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const repeatBtn = document.getElementById("repeatBtn");
const pitchSlider = document.getElementById("pitchSlider");
const wordBox = document.getElementById("wordBox"); // Add a new element for displaying words

let words = [];
let currentWordIndex = 0;
let isPlaying = false;
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
    voices: ["Spanish Female", "Spanish Male"],
  },
  {
    name: "French",
    voices: ["French Female", "French Male"],
  },
  {
    name: "German",
    voices: ["German Female", "German Male"],
  },
  {
    name: "Russian",
    voices: ["Russian Female", "Russian Male"],
  },
  {
    name: "Korean",
    voices: ["Korean Female", "Korean Male"],
  },
  {
    name: "Chinese",
    voices: ["Chinese Female", "Chinese Male"],
  },
  {
    name: "Arabic",
    voices: ["Arabic Female", "Arabic Male"],
  },
  {
    name: "Indonesian",
    voices: ["Indonesian Female", "Indonesian Male"],
  },
  {
    name: "Portuguese",
    voices: ["Portuguese Female", "Portuguese Male"],
  },
  {
    name: "Spanish Latin American",
    voices: ["Spanish Latin American Female", "Spanish Latin American Male"],
  },
  {
    name: "Swahili",
    voices: ["Swahili Male"],
  },
  {
    name: "Thai",
    voices: ["Thai Female"],
  },
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

// Initial text in the text area
textArea.value =
  "Hi. Hit play to test me! I am your friend! I can read any text for you to help you with your journey studying critical languages!";

// Event listeners for playback controls
playBtn.addEventListener("click", () => {
  const selectedVoice = languageSelect.value;
  const selectedPitch = parseFloat(pitchSlider.value);

  words = textArea.value.split(/\s+/); // Split text into words
  currentWordIndex = 0;
  isPlaying = true;

  function displayNextWord() {
    if (currentWordIndex < words.length) {
      const currentWord = words[currentWordIndex];
      wordBox.textContent = currentWord;

      // Adjust the interval based on the length of the current word and voice speed
      const wordDuration = (currentWord.length / selectedPitch) * 1500; // Adjust the factor as needed
      setTimeout(() => {
        textArea.setSelectionRange(0, 0); // Reset selection after the word is displayed
        currentWordIndex++;
        displayNextWord(); // Continue to the next word
      }, wordDuration);
    } else {
      wordBox.textContent = ""; // Reset the display when playback ends
      isPlaying = false;
    }
  }

  displayNextWord(); // Start displaying words

  responsiveVoice.speak(textArea.value, selectedVoice, {
    pitch: selectedPitch,
    onstart: onPlayStart,
    onend: onPlayEnd,
  });
});

// Add an event listener to detect when the user highlights text
textArea.addEventListener("mouseup", () => {
  const selectedText = getSelectedText();
  if (selectedText) {
    responsiveVoice.speak(selectedText, languageSelect.value, {
      pitch: parseFloat(pitchSlider.value),
    });
  }
});

pauseBtn.addEventListener("click", () => {
  responsiveVoice.pause();
});

repeatBtn.addEventListener("click", () => {
  const selectedVoice = languageSelect.value;
  const selectedPitch = parseFloat(pitchSlider.value);

  words = textArea.value.split(/\s+/); // Split text into words
  currentWordIndex = 0;
  isPlaying = true;

  function displayNextWord() {
    if (currentWordIndex < words.length) {
      const currentWord = words[currentWordIndex];
      wordBox.textContent = currentWord;

      // Adjust the interval based on the length of the current word and voice speed
      const wordDuration = (currentWord.length / selectedPitch) * 1500; // Adjust the factor as needed
      setTimeout(() => {
        textArea.setSelectionRange(0, 0); // Reset selection after the word is displayed
        currentWordIndex++;
        displayNextWord(); // Continue to the next word
      }, wordDuration);
    } else {
      wordBox.textContent = ""; // Reset the display when playback ends
      isPlaying = false;
    }
  }

  displayNextWord(); // Start displaying words

  responsiveVoice.speak(textArea.value, selectedVoice, {
    pitch: selectedPitch,
    onstart: onPlayStart,
    onend: onPlayEnd,
  });
});

function onPlayStart() {
  wordBox.textContent = textArea.value; // Highlight the entire spoken text
}

// Callback function for play end
function onPlayEnd() {
  wordBox.textContent = ""; // Reset the display when playback ends
}

// Helper function to get the currently highlighted text
function getSelectedText() {
  const text = window.getSelection().toString().trim();
  return text.length > 0 ? text : null;
}

// Event listener for pitch slider
pitchSlider.addEventListener("input", () => {
  // Update pitch value display if needed
  // const pitchValue = parseFloat(pitchSlider.value).toFixed(1);
  // console.log("Pitch Value:", pitchValue);
});
