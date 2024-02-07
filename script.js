const languageSelect = document.getElementById("languageSelect");
const textArea = document.getElementById("textArea");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const pitchSlider = document.getElementById("pitchSlider");
const wordBox = document.getElementById("wordBox");

let isPlaying = false;
let selectedRate = 1;

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

const savedLanguage = localStorage.getItem("savedLanguage");
if (savedLanguage) {
  languageSelect.value = savedLanguage;
}

languageSelect.addEventListener("change", () => {
  localStorage.setItem("savedLanguage", languageSelect.value);
});

const savedText = localStorage.getItem("savedText");
if (savedText) {
  textArea.value = savedText;
}

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
  }
});

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

function onPlayStart() {
  // No need to do anything here for this modification
}

function onPlayEnd() {}

function getSelectedText() {
  const text = window.getSelection().toString().trim();
  return text.length > 0 ? text : null;
}

function isVoiceAvailable(selectedVoice, languages) {
  const selectedLanguage =
    languageSelect.options[languageSelect.selectedIndex].parentNode.label;
  const language = languages.find((lang) => lang.name === selectedLanguage);

  return language && language.voices.includes(selectedVoice);
}

pitchSlider.addEventListener("input", () => {});

rateSlider.addEventListener("input", () => {
  selectedRate = parseFloat(rateSlider.value);
});

textArea.addEventListener("input", () => {
  localStorage.setItem("savedText", textArea.value);
});
