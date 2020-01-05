import { Message } from 'discord.js';

export interface Callable {
  name: string;
  // run: Function;
  run(msg: Message, args: Array<string>, cmd: string): void;
}