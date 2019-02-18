# Book TCD Glass Rooms using AWS Lambda

## Setup 
1. Change the `users` objects in *properties.json* accordingly, using your TCD usernames.
2. Set password environment variables for the process based on these usernames e.g. if the username is *john*, you need an environment variable `PASSWORD_JOHN` with his password.

## Running
Run: `npm run dev` to test locally.  
 
Run: `npm run push` to push to AWS Lambda (provided aws credentials are setup).  
 
## AWS Commands
Handy command for AWS Lambda: `zip -r bookGlassRoom.zip . -x *.git* && aws lambda update-function-code --function-name bookGlassRoom --zip-file fileb://./bookGlassRoom.zip`  
 
You need to change the `--function-name` parameter if your lambda function name does not match.