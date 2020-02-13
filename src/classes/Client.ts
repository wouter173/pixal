import { Client as DiscordClient, Message } from 'discord.js';
import { Presence } from '../interfaces/Presence';
import { Callable } from '../interfaces/Callable';
import { Config, Role } from '../interfaces/Config';
import { Command } from './Command';
import { Event } from './Event';

export class Client {
	private client: DiscordClient;
	private ready: Boolean;
	private callables: Array<Callable>;
	public commands: Array<Command>;
	public presence: Presence;
	public config: {
		prefix: string;
		owner: string;
		err_color: string;
		main_color: string;
		roles: Array<Role>;
	}


	public constructor(token: string, config: Config) {

		//main variable setup
		this.client = new DiscordClient();
		this.ready = false;
		this.callables = [];
		this.commands = [];
		this.presence = {};

		//config setup
		this.config = {
			prefix: config.prefix ?? '!',
			owner: config.owner ?? '',
			err_color: config.err_color ?? '#cb2431',
			main_color: config.main_color ?? '#363940',
			roles: config.roles ?? []
		};

		//discord.js event handling
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

	private initialize(): void {
		console.log(`online as user: ${this.client.user.tag}`);
		this.ready = true;
		if (this.presence) this.setPresence(this.presence);
	}

	private onMessage(message: Message): void {

		if (message.author.bot) return;
		if (!message.content.toLowerCase().startsWith(this.config.prefix!)) return;

		const args: Array<string> = message.content.toLowerCase().split(' ');
		const _cmd: string = args.shift() || '';
		const cmd: string = _cmd.split(this.config.prefix!)[1];

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

	public addEvents(events: Array<Event>): void {
		for (let event of events) {
			this.addEvent(event);
		}
	}

	public addEvent(event: Event): void {
		this.client.on(event.name, (...args: any[]) => {
			event.run(this, args);
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