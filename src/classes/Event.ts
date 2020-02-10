import { Client } from './Client';

export class Event {
	public name: string;

	constructor(name: string) {
		this.name = name;
	}

	public run(client: Client, params: Array<any>): void {
		console.log(`new event issued: ${this.name}`);
	};
}