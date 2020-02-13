import { Message } from 'discord.js';
import { Command } from '../classes/Command';
import { Client } from '../classes/Client';
import { Embed } from '../classes/Embed';
import { Field } from '../interfaces/Field';

export class help extends Command {
	constructor() {
		super('help', 'The default help command.', 'help', 'help <command>', ['h']);
	}

	run(msg: Message, args: Array<string>, _cmd: string, client: Client) {


		if (args.length == 0) {

			let fields: Array<Field> = [];
			for (let command of client.commands) {
				fields.push({ title: command.name, description: `${client.config.prefix}${command.usage}`, inline: true });
			}

			return msg.channel.send(new Embed('Help: ', 'These are the commands this bot has!', client.config.main_color, msg.author, fields));

		} else {

			let command = client.commands.find(cur => cur.name == args[0]);

			if (command)
				return msg.channel.send(new Embed(`Help:  **${command.name}**`, `**description:** ${command.description} \n **usage:** ${client.config.prefix}${command.usage} \n **aliases:** ${command.alias?.join(', ') || 'No aliases defined.'}`, client.config.main_color, msg.author));

			
			return msg.channel.send(new Embed('Error', `**${args[0]}** is not a command!`, client.config.err_color, msg.author));
		}
	}
}