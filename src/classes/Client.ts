import { Client as DiscordClient, Message } from 'discord.js';
import { Presence } from '../interfaces/Presence';
import { Callable } from '../interfaces/Callable';
import { Config } from '../interfaces/Config';
import { Command } from './Command';

export class Client implements Config{
	private client: DiscordClient;
	private ready: Boolean;
	private callables: Array<Callable>;
	public commands: Array<Command>;
	public presence: Presence;
	public prefix: string;
	public owner: string;


	public constructor(token: string, config: Config = { prefix: '!', owner: '' }) {
		this.client = new DiscordClient();
		this.ready = false;
		this.callables = [];
		this.commands = [];
		this.presence = {};
		this.prefix = config.prefix;
		this.owner = config.owner;

		this.client.login(token).catch(() => {
			throw Error('Token incorrect or session timeout.');
		});

		this.client.on('ready', () => {
			this.initialize();
		});

		this.client.on('message', message => {
			this.onMessage(message);
		});
	}

	private initialize() {
		console.log(`online as user: ${this.client.user.tag}`);
		this.ready = true;
		if (this.presence) this.setPresence(this.presence);
	}

	private onMessage(message: Message) {

		if (message.author.bot) return;
		if (!message.content.toLowerCase().startsWith(this.prefix)) return;

		const args: Array<string> = message.content.toLowerCase().split(' ');
		const _cmd: string = args.shift() || '';
		const cmd: string = _cmd.split(this.prefix)[1];

		for (let callable of this.callables) {
			if (callable.name == cmd) callable.run(message, args, cmd);
		}
	}

	public setPresence(presence: Presence): void {
		this.presence = presence;
		if (this.ready) {
			this.client.user.setPresence({
				status: presence.status,
				game: { type: presence.type, name: presence.name }
			});
		};
	}

	public setCommands(commands: Array<Command>): void {
		this.commands = commands;
		for (let command of this.commands) {
			const alias: Array<string> = command.alias || [];
			const callers: Array<string> = [...alias, command.name];
			const callables: Array<Callable> = callers.map(caller => { return { name: caller.toLowerCase(), run: command.run }; });
			this.callables = [...this.callables, ...callables];
		}
	}
}