import { User, RichEmbed } from 'discord.js';
import { Field } from '../interfaces/Field';


export class Embed {
	private embed: RichEmbed;
	public title: string;
	public description: string;
	public color: string;
	public author: User;
	public fields?: Array<Field>;


	constructor(title: string, description: string, color: string, author: User, fields?: Array<Field>) {
		this.title = title;
		this.description = description;
		this.color = color;
		this.author = author;
		this.fields = fields;

		this.embed = new RichEmbed()
			.setTitle(this.title)
			.setDescription(this.description)
			.setColor(this.color)
			.setFooter(author.username, author.avatarURL)
			.setTimestamp();
		
		if (this.fields) for (let field of this.fields) {
			this.embed.addField(field.title, field.description, field.inline);
		}
	}

	get() {
		return this.embed; 
	}
}