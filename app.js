// ===============================
// Offline OCR App - Main Logic
// ===============================

// Elements
const imageInput = document.getElementById("imageInput");
const imagePreview = document.getElementById("imagePreview");
const resultText = document.getElementById("resultText");
const ocrButton = document.getElementById("ocrButton");
const copyButton = document.getElementById("copyButton");
const clearButton = document.getElementById("clearButton");
const statusText = document.getElementById("statusText");

// Selected image
let selectedImage = null;

// -------------------------------
// Image Select
// -------------------------------
if (imageInput) {
    imageInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) {
            return;
        }

        selectedImage = file;

        // Show image preview
        const imageURL = URL.createObjectURL(file);

        if (imagePreview) {
            imagePreview.src = imageURL;
            imagePreview.style.display = "block";
        }

        if (statusText) {
            statusText.textContent = "Image selected";
        }

        if (resultText) {
            resultText.value = "";
        }
    });
}


// -------------------------------
// OCR Button
// -------------------------------
if (ocrButton) {
    ocrButton.addEventListener("click", function () {

        if (!selectedImage) {
            alert("पहले एक image चुनें।");
            return;
        }

        if (statusText) {
            statusText.textContent = "OCR शुरू हो रहा है...";
        }

        /*
          अभी OCR engine connect नहीं किया गया है।

          अगले चरण में यहाँ offline OCR engine
          और Hindi + English language model जोड़ा जाएगा।
        */

        if (resultText) {
            resultText.value =
                "OCR engine अभी जोड़ा जाना बाकी है।\n\n" +
                "अगले चरण में इसी जगह image से text निकलेगा।";
        }
    });
}


// -------------------------------
// Copy Text
// -------------------------------
if (copyButton) {
    copyButton.addEventListener("click", async function () {

        const text = resultText ? resultText.value : "";

        if (!text) {
            alert("Copy करने के लिए कोई text नहीं है।");
            return;
        }

        try {
            await navigator.clipboard.writeText(text);
            alert("Text copy हो गया।");
        } catch (error) {
            alert("Text copy नहीं हो पाया।");
        }
    });
}


// -------------------------------
// Clear
// -------------------------------
if (clearButton) {
    clearButton.addEventListener("click", function () {

        selectedImage = null;

        if (imageInput) {
            imageInput.value = "";
        }

        if (imagePreview) {
            imagePreview.src = "";
            imagePreview.style.display = "none";
        }

        if (resultText) {
            resultText.value = "";
        }

        if (statusText) {
            statusText.textContent = "Ready";
        }
    });
});


// -------------------------------
// Service Worker
// -------------------------------
if ("serviceWorker" in navigator) {

    window.addEventListener("load", function () {

        navigator.serviceWorker
            .register("./service-worker.js")
            .then(function () {
                console.log("Offline service worker registered.");
            })
            .catch(function (error) {
                console.log("Service worker error:", error);
            });

    });
}