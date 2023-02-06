# Rad

Rad is an AI-Powered code generation website. It's powered by OpenAI's Codex model and allows you to generate code in JavaScript, Python, C++ and Go.

## Tech Stack

This project uses the T3 Stack, specifically these packages:
* NextJS
* Prisma (With a mysql/sqlite DB)
* Next-Auth
* tRCP
* Mantine UI

## Setting it up

Copy `.env.example` and fill it with the required info.

```shell
cp .env.example .env
```

* You can create your OPEN_AI_SECRET_KEY at https://platform.openai.com/account/api-keys
* Discord client id and client secret can be created at https://discord.com/developers/. Make sure you setup the correct callback URL, it should look like this: http://{domain}/api/auth/callback/discord (example: http://localhost:3000/api/auth/callback/discord)

### Install the dependencies
```
npm install
```

### Set up the DB

*Note: Has to be run **after** you set up your env file, specifically the DATABASE_URL key*
```
npm run postinstall
```

### Starting the development server
```
npm run dev
```
### Build for production
```
npm run build
```

### Starting the production server
```
npm start
```
