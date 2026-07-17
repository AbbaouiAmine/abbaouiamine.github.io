(function () {
  "use strict";

  var synth = window.speechSynthesis;
  var activeButton = null;

  function addStyles() {
    var style = document.createElement("style");
    style.textContent =
      ".tts-question-row{display:flex;align-items:flex-start;gap:8px;margin:8px 0 12px}" +
      ".tts-question-row .qtext,.tts-question-row .qt{flex:1;margin:0}" +
      ".tts-button{flex:0 0 auto;border:1px solid #bfdbfe;border-radius:8px;background:#eff6ff;color:#1d4ed8;cursor:pointer;font:600 .78rem/1.2 -apple-system,Segoe UI,Roboto,Arial,sans-serif;padding:6px 9px}" +
      ".tts-button:hover{background:#dbeafe;border-color:#60a5fa}" +
      ".tts-button:focus-visible{outline:3px solid rgba(26,115,232,.3);outline-offset:2px}" +
      ".tts-button.is-speaking{background:#1a73e8;border-color:#1a73e8;color:#fff}" +
      ".opts li{padding-right:46px!important}" +
      ".opts li .tts-answer{position:absolute;right:7px;top:50%;transform:translateY(-50%);padding:5px 7px}" +
      "@media(max-width:560px){.tts-question-row{flex-direction:column}.tts-question{align-self:flex-end}.opts li{padding-right:43px!important}}";
    document.head.appendChild(style);
  }

  function textWithoutButtons(element) {
    var copy = element.cloneNode(true);
    copy.querySelectorAll(".tts-button").forEach(function (button) {
      button.remove();
    });
    return copy.textContent.replace(/\s+/g, " ").trim();
  }

  function englishVoice() {
    var voices = synth.getVoices();
    return voices.find(function (voice) {
      return /^en[-_]/i.test(voice.lang);
    }) || null;
  }

  function resetActiveButton() {
    if (activeButton) {
      activeButton.classList.remove("is-speaking");
      activeButton.setAttribute("aria-pressed", "false");
      activeButton = null;
    }
  }

  function speak(text, button) {
    if (!synth || !text) return;

    if (activeButton === button && synth.speaking) {
      synth.cancel();
      resetActiveButton();
      return;
    }

    synth.cancel();
    resetActiveButton();

    var utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.95;
    utterance.voice = englishVoice();
    utterance.onend = resetActiveButton;
    utterance.onerror = resetActiveButton;

    activeButton = button;
    button.classList.add("is-speaking");
    button.setAttribute("aria-pressed", "true");
    synth.speak(utterance);
  }

  function makeButton(label, className, onClick) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "tts-button " + className;
    button.textContent = className === "tts-question" ? "🔊 Écouter" : "🔊";
    button.title = label;
    button.setAttribute("aria-label", label);
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      onClick(button);
    });
    return button;
  }

  function enhanceQuestion(question) {
    var statement = question.querySelector(".qtext, .qt");
    var options = question.querySelectorAll(".opts li");
    if (!statement || !options.length || statement.closest(".tts-question-row")) return;

    var row = document.createElement("div");
    row.className = "tts-question-row";
    statement.parentNode.insertBefore(row, statement);
    row.appendChild(statement);
    row.appendChild(
      makeButton("Écouter l’énoncé de la question", "tts-question", function (button) {
        speak(textWithoutButtons(statement), button);
      })
    );

    options.forEach(function (option) {
      var letter = option.getAttribute("data-l") || "";
      option.appendChild(
        makeButton("Écouter la réponse " + letter, "tts-answer", function (button) {
          speak((letter ? letter + ". " : "") + textWithoutButtons(option), button);
        })
      );
    });
  }

  function init() {
    if (!synth) return;
    addStyles();
    document.querySelectorAll(".q").forEach(enhanceQuestion);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
