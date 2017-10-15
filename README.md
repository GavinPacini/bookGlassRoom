Run: `node wrapper.js` if testing locally.
Run: `node --debug wrapper.js` if debugging locally.

Handy command for AWS Lambda: `zip -r bookGlassRoom.zip . -x *.git* && aws lambda update-function-code --function-name bookGlassRoom --zip-file fileb://./bookGlassRoom.zip`  
Handy alias: `alias up="zip -r bookGlassRoom.zip . -x *.git* && aws lambda update-function-code --function-name bookGlassRoom --zip-file fileb://./bookGlassRoom.zip"`