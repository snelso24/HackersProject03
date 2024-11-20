
async function sumText(textToSummarize){
    if (!textToSummarize)   return;
    document.body.querySelector('#summarizedText').innerText = "Working the magic...";

    // Verify browser supports Summarizer API
    try {
        const capabilities = await ai.summarizer.capabilities();
        if (capabilities.available === 'no'){
            console.log('API unavailable in your browser!');
            return;
        }

        const keyPoints = await ai.summarizer.create({type: 'key-points', format: 'plain-text'});
        cont tldr = await keyPoints.summarize(textToSummarize);
        document.body.querySelector('#summarizedText').innerText = tldr;
    } catch(error){
        console.error('Error: ', error);
        document.body.querySelector('#summarizedText').innerText = 'Whoops! An error occured!';
    }
}

chrome.storage.session.get('lastTextSummarized', ({lastTextSummarized}) => {
    sumText(lastTextSummarized);
});

chrome.storage.session.onChanged.addListener(async (changes) => {
    const lastTextSummarizedChange = changes['lastTextSummarized'];
    if(!lastTextSummarizedChange){  return; }
    await sumText(lastTextSummarizedChange.newValue);
});
