import { create } from "zustand";

const useConversation = create((set) => ({
	selectedConversation: null,
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
	messages: [],//act as usestate
	setMessages: (messages) => set({ messages }),
}));

export default useConversation;