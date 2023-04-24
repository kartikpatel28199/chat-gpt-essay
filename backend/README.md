# Assignment Ace

## Creating New Branches

- Branches will be named their Jira tag number and description (ex: _"AA-12 - Create a new ConversationNode table"_)
- Make a Pull Request once ready to be merged and briefly describe the changes made.

## Prerequisite

- Node version 16

## Environment variable setup

- Create a new .env file and paste the sample data from the sample.env file
- Update the environment variable as required

## Installation

```bash
npm install
npm run migration:run   # to run the migration script
npm run build
```

- Then run the following command and the service will start running on the specified PORT

```bash
npm run start
```
