# SupplyAlly Config Validator

## Contents

- [Configuration](#configuration)
- [Development](#development)

## Configuration

### AWS Setup Config

You can keep your AWS credentials data in a shared file used by SDKs and the command line interface. When the SDK for JavaScript loads, it automatically searches the shared credentials file, which is named "credentials". Where you keep the shared credentials file depends on your operating system:

- The shared credentials file on Linux, Unix, and macOS: ```~/.aws/credentials```

- The shared credentials file on Windows: ```C:\Users\USER_NAME\.aws\credentials```

The file should look something like this:

```
[default]
aws_access_key_id = <YOUR_ACCESS_KEY_ID>
aws_secret_access_key = <YOUR_SECRET_ACCESS_KEY>
```
_Note: For configuring other profiles, check this [link](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html)._

---

### Parameter Config

When making a PR, you’ll need to have all 5 param stores for now as we’re still in transition:

1. ```rationally-pod-stg-FEATURES``` — all the old features, no min version nor campaign name

2. ```/rationally-api/pod-stg/client/features``` — all the new features, must include min versions + campaign name. All other features will just be ignored by the FE

3. ```rationally-pod-stg-POLICIES``` — all the existing policies, no changes

4. ```/rationally-api/pod-stg/client/policies``` — right now it’s exactly the same as the existing policies, but not used in the FE yet

5. ```/rationally-api/pod-stg/client/c13n/english``` — param for different language strings, this just needs to be defined as {} for now, will use it when we add specific languages. Not used in FE yet

Examples:

- rationally-pr48-POLICIES & rationally-pr48-FEATURES
- rationally-stg-POLICIES & rationally-stg-FEATURES

Examples of the json can be found in the examples folder.

**Note: The params have size limits of 4kb and 8kb depending if it's standard or advance parameter in AWS parameter store**

---

## Development

Copy `.env` from a co-worker or insert own credentials to get started. A copy of the .env file is available at `.env.example`

```
npm run dev
```

To run local tests against dynamodb-local, run commands

`npm run dev` to start the local database

`npm run test` to run the tests

