// Function to summarize text
async function sumText(textToSummarize, summaryLength, summaryType) {
    if (!textToSummarize) return;

    document.body.querySelector('#summarizedText').innerText = "Working the magic...";

    try {
        const capabilities = await ai.summarizer.capabilities();
        if (capabilities.available === 'no') {
            console.log('API unavailable in your browser!');
            document.body.querySelector('#summarizedText').innerText = "Oops! The API is unavailable in your browser!";
            return;
        }

        // Summary options
        const summarizerOptions = {
            type: summaryType,	// Teaser, TL;DR, Key Points, etc.
            format: 'plain-text',
            length: summaryLength	// Long, short, medium
        };

        const keyPoints = await ai.summarizer.create(summarizerOptions);
        const tlDr = await keyPoints.summarize(textToSummarize);
        document.body.querySelector('#summarizedText').innerText = tlDr;

    } catch (error) {
        console.error('Error: ', error);
        document.body.querySelector('#summarizedText').innerText = 'Whoops! An error occurred!';
    }
}

// Prompt API
async function askAI(question, summarizedText) {
    if (!summarizedText) {
        document.body.querySelector('#aiResponse').innerText = "No summarized text available!";
        return;
    }

    document.body.querySelector('#aiResponse').innerText = "I'm Thinking...";

	// Deploy the API
    try {
	const capabilities = await ai.languageModel.capabilities();
        if (capabilities.available === 'no') {
            console.log('Prompt API unavailable in your browser!');
            document.body.querySelector('#aiResponse').innerText = "Oops! The Prompt API is unavailable in your browser!";
            return;
        }

	const session = await ai.languageModel.create();
        const response = await session.prompt(`Based on the following summary: "${summarizedText}", ${question}`);

        document.body.querySelector('#aiResponse').innerText = response;
    } catch (error) {
        console.error('Error with Gemini Prompt API:', error);
        document.body.querySelector('#aiResponse').innerText = "An error occurred while asking the AI.";
    }
}


// Summarize Button
document.body.querySelector('#btn').addEventListener('click', async () => {
    chrome.storage.session.get('lastTextSummarized', ({ lastTextSummarized }) => {
        // Get the selected values from the dropdowns
        const summaryLength = document.querySelector('#lengthDropdown').value;
        const summaryType = document.querySelector('#typeDropdown').value;

	// Get last text summarized (if no text selected)
        sumText(lastTextSummarized || "No text available!", summaryLength, summaryType);
    });
});

chrome.storage.session.onChanged.addListener(async (changes) => {
    const lastTextSummarizedChange = changes['lastTextSummarized'];
    if (!lastTextSummarizedChange) { return; }

    // Get selected values from the dropdowns
    const summaryLength = document.querySelector('#lengthDropdown').value;
    const summaryType = document.querySelector('#typeDropdown').value;

    await sumText(lastTextSummarizedChange.newValue, summaryLength, summaryType);
});

// Ask AI Button
document.body.querySelector('#askBtn').addEventListener('click', async () => {
    const questionDropdown = document.querySelector('#questionDropdown').value;
    const summarizedText = document.querySelector('#summarizedText').innerText;

	// Questions to ask AI
    const questionMap = {
        "tell-me-more": "tell me more about this!",
        "why-is-this-important": "why is this important?",
        "how-can-i-use-this": "how can I use this?"
    };

    const question = questionMap[questionDropdown];
    await askAI(question, summarizedText);
});
