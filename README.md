# pixal
pixal is a next-gen typescript discord bot library


## Installation

To install pixal use npm.

`$ npm install pixal`

## Quick example

```js
const pixal = require('pixal');

const config = { prefix: '?', owner: '294217592007163905' };
const client = new pixal.Client('YOUR_DISCORD_BOT_TOKEN', config);


class hello extends pixal.Command {
  constructor() {
    super("test", "Hello world command!");
  }

  run(msg) {
    client.setPresence({ status: 'online', type: 'PLAYING', name: 'Hello world' });
    msg.channel.send(new pixal.Embed("Hello", "Hello again", "#434343", msg.author));
  }
}

client.setCommands([new hello]);
```

## Documentation

This is the main documentation of pixal, if you can't find what your looking for you're always welcome in my [discord community]("https://discord.gg/NmHAznB")

### Client()

> ```ts
>const client = new pixal.Client(token: string, config?: Config) => Client
> ```

You can initialize a bot client using the pixal.Client() class.
2 arguments are needed:
- **token: string** 	This is the bot token you get when creating a bot user.
- **config?: Config**	This is the config you pass to your client

