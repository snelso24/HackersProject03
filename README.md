# PeerReview
Steps BEFORE download:

1. List of Chrome Flags Enabled
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
(assuming it is a Chrome extension downloadable from the Chrome store)

3. Add to Chrome > Select Text > Right click > Press summarize
4. USE PEER REVIEW!

Steps AFTER download:
(assuming it is NOT a Chrome extension downloadable from the Chrome store)

3. Download all of the files in the Project Peer Review folder from GitHub Repository
   (background.js, manifest.json,peerReview.html, and peerReview.js)

4. Make sure they are all in the same folder, and proceed to chrome://extensions/
   (you must be in developer mode)

5. Load unpacked and select the folder, it will now be a part of your personal extensions and the whole extension will be local.
6. USE PEER REVIEW!


Ways to customize your experience based on your needs:

  Choose the response length: Long, Medium, Short

  
  Choose the summary type: Key points, teaser, headline,TL;DR
  
  Press summarize button to retrieve a summary
  
  Ask a question from the dropdown press Ask and wait for a response

*Note from authors: We did this for a school project, but please feel free to fork it and make changes.  Thank you we hope you enjoy! *

