import { Message } from 'discord.js';
import { Client } from './Client';


export class Command {
	public name: string;
	public description: string;
	public category: string;
	public usage: string;
	public alias?: Array<string>;

	public constructor(name: string, description: string, category: string, usage: string, alias?: string[]) {
		this.name = name;
		this.description = description;
		this.usage = usage;
		this.alias = alias;
		this.category = category;
	}

	public run(msg: Message, args: Array<string>, cmd: string, client: Client) {
		console.log(`new command issued: ${this.name}`);
	}
}