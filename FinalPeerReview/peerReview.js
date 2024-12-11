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

        // Adjusting summary settings based on user selection
        const summarizerOptions = {
            type: summaryType,
            format: 'plain-text',
            length: summaryLength
        };

        const keyPoints = await ai.summarizer.create(summarizerOptions);
        const tlDr = await keyPoints.summarize(textToSummarize);
        document.body.querySelector('#summarizedText').innerText = tlDr;

    } catch (error) {
        console.error('Error: ', error);
        document.body.querySelector('#summarizedText').innerText = 'Whoops! An error occurred!';
    }
}

async function askAI(question, summarizedText) {
    if (!summarizedText) {
        document.body.querySelector('#aiResponse').innerText = "No summarized text available!";
        return;
    }

    document.body.querySelector('#aiResponse').innerText = "I'm Thinking...";

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


document.body.querySelector('#btn').addEventListener('click', async () => {
    chrome.storage.session.get('lastTextSummarized', ({ lastTextSummarized }) => {
        // Get the selected values from the dropdowns
        const summaryLength = document.querySelector('#lengthDropdown').value;
        const summaryType = document.querySelector('#typeDropdown').value;

        sumText(lastTextSummarized || "No text available!", summaryLength, summaryType);
    });
});

chrome.storage.session.onChanged.addListener(async (changes) => {
    const lastTextSummarizedChange = changes['lastTextSummarized'];
    if (!lastTextSummarizedChange) { return; }

    // Get the selected values from the dropdowns
    const summaryLength = document.querySelector('#lengthDropdown').value;
    const summaryType = document.querySelector('#typeDropdown').value;

    await sumText(lastTextSummarizedChange.newValue, summaryLength, summaryType);
});

// Event listener for the "Ask" button
document.body.querySelector('#askBtn').addEventListener('click', async () => {
    const questionDropdown = document.querySelector('#questionDropdown').value;
    const summarizedText = document.querySelector('#summarizedText').innerText;

    const questionMap = {
        "tell-me-more": "tell me more about it.",
        "why-is-this-important": "why is this important?",
        "how-can-i-use-this": "how can I use this information?"
    };

    const question = questionMap[questionDropdown];
    await askAI(question, summarizedText);
});
