document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('languageSelect');
    const elementsToTranslate = document.querySelectorAll('[data-translate]');

    languageSelect.addEventListener('change', () => {
        const selectedLanguage = languageSelect.value;
        elementsToTranslate.forEach(element => {
            const key = element.getAttribute('data-translate');
            const textToTranslate = element.textContent;
            translateText(textToTranslate, selectedLanguage)
                .then(translatedText => {
                    element.textContent = translatedText;
                })
                .catch(error => console.error('Error translating text:', error));
        });
    });

    // Function to translate text using Google Translate API
    async function translateText(text, targetLanguage) {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=auto|${targetLanguage}`);
        const data = await response.json();
        return data.responseData.translatedText;
    }
});
