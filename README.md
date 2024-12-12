# PeerReview
Steps BEFORE download:

1.List of Chrome Flags Enabled
Enables optimization guide on device: BypassPerfRequirement
Prompt API for Gemini Nano: Enabled
Summarization API for Gemini Nano : Enabled
Writer API for Gemini Nano
Rewriter API for Gemini Nano: Enabled
To Enable the flags on Chrome go to: chrome://flags/#optimization-guide-on-device-model

2. Ensure and Finalize Setup(Dev Tools Console Changes)
Go to the Dev tools console(right click > inspect > console)
Input await ai.summarizer.create();
Input await ai.summarizer.capabilities();
Readily should return
Input (await ai.languageModel.capabilities()).available;
Input await ai.languageModel.create();
Readily should return

Steps AFTER download:
(assuming it is a Chrome extension downloadable from the chrome store)
3. Add to Chrome > Select Text > Right click > Press summarize

Ways to customize your experience based on your needs:
Choose the response length: Long, Medium, Short
Choose the summary type: Key points, teaser, headline,TL;DR
Press summarize button to retrieve a summary
Ask a question from the dropdown press Ask and wait for a response



