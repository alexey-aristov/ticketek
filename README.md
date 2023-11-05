# TEG Coding Challenge
## Task: implement full stack app for showing events on diffenet venues

## Architecture
### API
The API is hosted as an AWS Lambda function. This is the fastest method and works perfectly fine for its purpose. In real life, we could consider using ECS or EKS, but they require more configuration.

The API contains methods for the frontend app. Methods for a private API are also added to the same API. This should not be considered best practice. In a real application, these methods should be implemented as a private API, or as handlers for streaming events.
For internal communication, it's preferable to use another type of API, such as gRPC or Thrift. Proto contracts are also well-suited for events in a message broker.

The API has no authentication. It seems like it's not required for the currently implemented methods for the frontend. For the private part of the API, this is problematic, but it's not a real-life application.

Proper secret storage was not used either, all in the interest of fast progress...

### Frontend
The frontend is hosted as a static web app on AWS S3. It is implemented using Angular and contains two pages: a venues view and a calendar view for events at the selected venue.

### Events sync task
The events sync task is implemented as an AWS Lambda function. This sync task is very simplified; it does not perform proper error handling and retries. I didn't have enough time for this.

### Environment
I prefer to keep all environments as code and avoid any manual actions. However, I didn't have enough time to assemble all the templates for CloudFormation. I created templates for the S3 bucket and stopped there. Everything else was done manually.

## Generate api client for Angular
ng-openapi-gen --input https://wfh93atxta.execute-api.ap-southeast-2.amazonaws.com/dev/swagger/v1/swagger.json --output src/app/api

## Generate api client dotnet
docker run --rm -v %CD%:/local swaggerapi/swagger-codegen-cli generate -i https://wfh93atxta.execute-api.ap-southeast-2.amazonaws.com/dev/swagger/v1/swagger.json -l csharp-dotnet2 -o /local/out/csharp