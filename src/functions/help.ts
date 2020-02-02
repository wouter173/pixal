import { Message } from 'discord.js';
import { Command } from '../classes/Command';
import { Client } from '../classes/Client';
import { Embed } from '../classes/Embed';
import { Field } from '../interfaces/Field';

export class help extends Command {
	constructor() {
		super('help', 'The default help command.', 'help <command>', ['h']);
	}

	run(msg: Message, args: Array<string>, cmd: string, client: Client) {
		let fields: Array<Field> = [];
		for (let command of client.commands) {
			fields.push({ title: command.name, description: `${client.prefix}${command.usage}`, inline: true });
		}
		msg.channel.send(new Embed('Help', 'These are the commands this bot has!', '#363940', msg.author, fields));
	}
}