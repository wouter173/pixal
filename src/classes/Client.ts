import { Client as DiscordClient } from 'discord.js';
import { Presence } from '../interfaces/Presence';
import { Command } from './Command';

export class Client implements Client {
	private client: DiscordClient;
	private ready: Boolean;
	public commands: Command[];
	public presence: Presence;

	public constructor(token: string) {
		this.client = new DiscordClient();
		this.commands = [];
		this.ready = false;
		this.presence = {};

		this.client.login(token).catch(() => {
			throw Error('Token incorrect or session timeout.');
		});

		this.client.on('ready', () => {
			this.initialize();
		});
	}

	private initialize() {
		console.log(`online as user: ${this.client.user.tag}`);
		this.ready = true;
		if (this.presence) this.setPresence(this.presence);
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

	public setCommands(commands: Command[]): void {
		this.commands = commands;
	}
}