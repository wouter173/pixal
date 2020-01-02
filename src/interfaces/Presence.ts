export interface Presence {
  status?: 'online' | 'idle' | 'invisible' | 'dnd';
	type?: 'PLAYING' | 'STREAMING' | 'LISTENING' | 'WATCHING';
	name?: string;
}