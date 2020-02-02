import { Message } from 'discord.js';
import { Client } from '../classes/Client';

export interface Callable {
  name: string;
  run(msg: Message, args: Array<string>, cmd: string, client: Client): void;
}