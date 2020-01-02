import { Message } from 'discord.js';


export class Command {
	public name: string;
	public description: string;
	public usage?: string;
	public alias?: Array<string>;

	private constructor(name: string, description: string, usage?: string, alias?: string[]) {
		this.name = name;
		this.description = description;
		this.usage = usage;
		this.alias = alias;
	}

	public run(msg: Message, args: Array<string>, cmd: string) {

	}
}