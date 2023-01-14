import { get, writable } from 'svelte/store';

type MessageType = 'success' | 'error';

type Message = {
	id: string;
	text: string;
	type: MessageType;
};

type AddMessage = {
	text: string;
	type?: MessageType;
};

const createStore = () => {
	const { subscribe, set } = writable<Message[]>([]);

	return {
		subscribe,
		add: (message: AddMessage) => {
			const id = new Date().getTime().toString();
			set([...get(messages), { id, text: message.text, type: message.type ?? 'success' }]);
			setTimeout(() => {
				messages.delete(id);
			}, 3000);
		},
		delete: (id: string) => set(get(messages).filter((m) => m.id !== id))
	};
};

export const messages = createStore();
