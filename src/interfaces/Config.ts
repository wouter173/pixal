export interface Config {
	prefix?: string;
	owner?: string;
	
	main_color?: string;
	err_color?: string;

	roles?: Array<Role>;
}

export interface Role {
	name: string;
	id: string;
}