document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggling
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.replace('dark-mode', 'light-mode');
        themeIcon.classList.replace('ph-sun', 'ph-moon');
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.replace('light-mode', 'dark-mode');
            themeIcon.classList.replace('ph-moon', 'ph-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.replace('dark-mode', 'light-mode');
            themeIcon.classList.replace('ph-sun', 'ph-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // Inputs & Button
    const textInput = document.getElementById('poster-text');
    const analyzeBtn = document.getElementById('analyze-btn');
    const imageUpload = document.getElementById('image-upload');
    const fileNameSpan = document.getElementById('file-name');
    const imagePreview = document.getElementById('image-preview');
    const previewImg = document.getElementById('preview-img');
    const removeImgBtn = document.getElementById('remove-img-btn');

    function checkInput() {
        analyzeBtn.disabled = textInput.value.trim().length === 0;
    }

    textInput.addEventListener('input', checkInput);

    imageUpload.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const file = this.files[0];
            fileNameSpan.textContent = file.name;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImg.src = e.target.result;
                imagePreview.classList.remove('hidden');
            }
            reader.readAsDataURL(file);
        } else {
            fileNameSpan.textContent = "No file chosen";
            imagePreview.classList.add('hidden');
        }
    });

    removeImgBtn.addEventListener('click', () => {
        imageUpload.value = '';
        fileNameSpan.textContent = "No file chosen";
        imagePreview.classList.add('hidden');
    });

    // Analysis Logic (Fetching from Flask Backend)
    const inputArea = document.getElementById('input-area');
    const resultsArea = document.getElementById('results-area');
    const loadingState = document.getElementById('loading-state');
    const finalResult = document.getElementById('final-result');
    const aiResponseContent = document.getElementById('ai-response-content');
    const resetBtn = document.getElementById('reset-btn');
    const verdictIcon = document.getElementById('verdict-icon');

    // Simple markdown to HTML parser for the AI response
    function parseMarkdown(text) {
        let html = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/## (.*?)\n/g, '<h3>$1</h3>')
            .replace(/# (.*?)\n/g, '<h2>$1</h2>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n- (.*?)(?=\n|$)/g, '<li>$1</li>');
        
        // Wrap lists
        html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
        
        return `<p>${html}</p>`;
    }

    analyzeBtn.addEventListener('click', async () => {
        const textToAnalyze = textInput.value.trim();
        if (!textToAnalyze) return;

        // UI Updates for Loading
        inputArea.classList.add('hidden');
        resultsArea.classList.remove('hidden');
        loadingState.classList.remove('hidden');
        finalResult.classList.add('hidden');

        try {
            const response = await fetch('http://localhost:5000/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: textToAnalyze })
            });

            if (!response.ok) {
                throw new Error(`Server returned status: ${response.status}`);
            }

            const data = await response.json();
            const aiText = data.response;

            if (aiText) {
                aiResponseContent.innerHTML = parseMarkdown(aiText);

                // Simple heuristic to change color based on content
                const lowerResponse = aiText.toLowerCase();
                if (lowerResponse.includes('fake') || lowerResponse.includes('red flag')) {
                    verdictIcon.className = 'verdict-icon-container danger';
                    verdictIcon.innerHTML = '<i class="ph ph-warning-circle"></i>';
                } else if (lowerResponse.includes('real') && !lowerResponse.includes('fake')) {
                    verdictIcon.className = 'verdict-icon-container safe';
                    verdictIcon.innerHTML = '<i class="ph ph-shield-check"></i>';
                } else {
                    verdictIcon.className = 'verdict-icon-container';
                    verdictIcon.innerHTML = '<i class="ph ph-info"></i>';
                }
            } else {
                aiResponseContent.innerHTML = "<p><em>No response received. Ensure Ollama is running.</em></p>";
            }

        } catch (error) {
            console.error("Analysis Error:", error);
            aiResponseContent.innerHTML = `<p class="text-danger"><strong>Error connecting to the backend.</strong><br>Ensure your Flask server (server.py) and Ollama are both running locally.<br>Details: ${error.message}</p>`;
            verdictIcon.className = 'verdict-icon-container danger';
            verdictIcon.innerHTML = '<i class="ph ph-x-circle"></i>';
        }

        // Show Results
        loadingState.classList.add('hidden');
        finalResult.classList.remove('hidden');
    });

    resetBtn.addEventListener('click', () => {
        inputArea.classList.remove('hidden');
        resultsArea.classList.add('hidden');
        textInput.value = '';
        removeImgBtn.click(); // Reset image too
        checkInput();
    });
});
