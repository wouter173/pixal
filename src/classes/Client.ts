import { Client as DiscordClient, Message } from 'discord.js';
import { Presence } from '../interfaces/Presence';
import { Config } from '../interfaces/Config';
import { Command } from './Command';

export class Client implements Config{
	private client: DiscordClient;
	private ready: Boolean;
	public commands: Array<Command>;
	public presence: Presence;
	public prefix: string;
	public owner: string;


	public constructor(token: string, config: Config = { prefix: '!', owner: '' }) {
		this.client = new DiscordClient();
		this.commands = [];
		this.ready = false;
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
		console.log(`Read new message: ${message}`);
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
	}
}