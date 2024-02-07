const languageSelect = document.getElementById("languageSelect");
const textArea = document.getElementById("textArea");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const pitchSlider = document.getElementById("pitchSlider");
const wordBox = document.getElementById("wordBox");

let isPlaying = false;
let selectedRate = 1; // Default rate

// Predefined list of languages and voices
const languages = [
  {
    name: "English",
    voices: ["UK English Male", "UK English Female", "US English Female"],
  },
  {
    name: "Spanish",
    voices: ["Spanish Male"],
  },
  {
    name: "French",
    voices: ["French Female", "French Male"],
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

// Load selected language and voice from localStorage if available
const savedLanguage = localStorage.getItem("savedLanguage");
if (savedLanguage) {
  languageSelect.value = savedLanguage;
}

// Event listener for language selection
languageSelect.addEventListener("change", () => {
  localStorage.setItem("savedLanguage", languageSelect.value);
});

// Load text from localStorage if available
const savedText = localStorage.getItem("savedText");
if (savedText) {
  textArea.value = savedText;
}

// Event listener for the playback control
playBtn.addEventListener("click", () => {
  try {
    const selectedVoice = languageSelect.value;
    const selectedPitch = parseFloat(pitchSlider.value);

    if (!selectedVoice) {
      throw new Error("Please select a voice for speech synthesis.");
    }

    if (!isVoiceAvailable(selectedVoice, languages)) {
      throw new Error(
        "The selected voice is not available for the chosen language."
      );
    }

    isPlaying = true;
    wordBox.textContent = textArea.value;

    responsiveVoice.speak(textArea.value, selectedVoice, {
      pitch: selectedPitch,
      rate: selectedRate,
      onstart: onPlayStart,
      onend: onPlayEnd,
    });
  } catch (error) {
    alert("Error occurred during speech synthesis:\n" + error.message);
    // Optionally, you can provide more user-friendly error messages or take appropriate actions.
  }
});

// Event listener to detect when the user highlights text
textArea.addEventListener("mouseup", () => {
  const selectedText = getSelectedText();
  if (selectedText) {
    responsiveVoice.speak(selectedText, languageSelect.value, {
      pitch: parseFloat(pitchSlider.value),
    });
  }
});

// Event listener for the pause button
pauseBtn.addEventListener("click", () => {
  responsiveVoice.pause();
});

// Callback function for the start of playback
function onPlayStart() {
  // No need to do anything here for this modification
}

// Callback function for the end of playback
function onPlayEnd() {
  // No need to do anything here for this modification
}

// Helper function to get the currently highlighted text
function getSelectedText() {
  const text = window.getSelection().toString().trim();
  return text.length > 0 ? text : null;
}

// Helper function to check if a voice is available for the selected language
function isVoiceAvailable(selectedVoice, languages) {
  const selectedLanguage =
    languageSelect.options[languageSelect.selectedIndex].parentNode.label;
  const language = languages.find((lang) => lang.name === selectedLanguage);

  return language && language.voices.includes(selectedVoice);
}

// Event listener for the pitch slider
pitchSlider.addEventListener("input", () => {
  // Update pitch value display if needed
});

// Event listener for the rate slider
rateSlider.addEventListener("input", () => {
  selectedRate = parseFloat(rateSlider.value);
  // Update rate value display if needed
});

// Event listener for changes in the text area
textArea.addEventListener("input", () => {
  // Save the text to localStorage
  localStorage.setItem("savedText", textArea.value);
});
