# ava

Home automation project based on api.ai for nlp and wit.ai for voice recognition

Look into cherry-core (node package) for controlling things

## Usage
Run
```
npm install
```
to install dependencies.

Then you must create accounts at both [api.ai](https://api.ai.) and
[wit.ai](https://wit.ai). Create apps in each thing and then copy
`config.example.json` to `config.json` and add your `client_token`
values (for wit.ai it's called a server token).

## TODO
 * Proper error handling
 * Logging