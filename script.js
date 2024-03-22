document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('languageSelect');
    const elementsToTranslate = document.querySelectorAll('[data-translate]');

    languageSelect.addEventListener('change', () => {
        const selectedLanguage = languageSelect.value;
        elementsToTranslate.forEach(element => {
            const key = element.getAttribute('data-translate');
            translateText(key, selectedLanguage)
                .then(translatedText => {
                    element.textContent = translatedText;
                })
                .catch(error => console.error('Error translating text:', error));
        });
    });

    // Function to translate text using Google Translate API
    async function translateText(text, targetLanguage) {
        const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=YOUR_API_KEY&target=${targetLanguage}&q=${encodeURIComponent(text)}`, {
            method: 'POST'
        });
        const data = await response.json();
        return data.data.translations[0].translatedText;
    }
});
