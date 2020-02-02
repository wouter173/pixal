import { Client as DiscordClient, Message } from 'discord.js';
import { Presence } from '../interfaces/Presence';
import { Callable } from '../interfaces/Callable';
import { Config } from '../interfaces/Config';
import { help } from '../functions/help';
import { Command } from './Command';

export class Client implements Config{
	private client: DiscordClient;
	private ready: Boolean;
	private callables: Array<Callable>;
	public commands: Array<Command>;
	public presence: Presence;
	public prefix: string;
	public owner: string;
	public help: boolean;


	public constructor(token: string, config: Config) {
		this.client = new DiscordClient();
		this.ready = false;
		this.callables = [];
		this.commands = [];
		this.presence = {};
		this.prefix = config.prefix || '!';
		this.owner = config.owner || '';
		this.help = config.help || false;
		console.log(this.help);
		console.log(config);

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
		if (this.help == true) this.addCommand(new help());
		console.log(this);
	}

	private onMessage(message: Message) {

		if (message.author.bot) return;
		if (!message.content.toLowerCase().startsWith(this.prefix)) return;

		const args: Array<string> = message.content.toLowerCase().split(' ');
		const _cmd: string = args.shift() || '';
		const cmd: string = _cmd.split(this.prefix)[1];

		for (let callable of this.callables) {
			if (callable.name == cmd) callable.run(message, args, cmd, this);
		}
	}

	public setPresence(presence: Presence): void {
		this.presence = presence;
		if (this.ready) this.client.user.setPresence({
			status: presence.status,
			game: { type: presence.type, name: presence.name }
		});
	}

	public addCommands(commands: Array<Command>): void {
		for (let command of commands) {
			this.addCommand(command);
		}
	}

	public addCommand(command: Command): void {

		this.commands = [...this.commands, command];

		const alias: Array<string> = command.alias || [];
		const callers: Array<string> = [...alias, command.name];
		const callables: Array<Callable> = callers.map(caller => { return { name: caller.toLowerCase(), run: command.run }; });
		this.callables = [...this.callables, ...callables];
	}
}