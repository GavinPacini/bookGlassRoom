Run: `npm run dev` to test locally.
Run: `npm run push` to push to AWS Lambda (provided aws credentials are setup).

Handy command for AWS Lambda: `zip -r bookGlassRoom.zip . -x *.git* && aws lambda update-function-code --function-name bookGlassRoom --zip-file fileb://./bookGlassRoom.zip`  
Handy alias: `alias up="zip -r bookGlassRoom.zip . -x *.git* && aws lambda update-function-code --function-name bookGlassRoom --zip-file fileb://./bookGlassRoom.zip"`