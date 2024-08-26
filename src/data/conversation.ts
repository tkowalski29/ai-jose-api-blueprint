export const ConversationSelectedTypeAssistant = "assistant";
export const ConversationSelectedTypeSnippet = "snippet";

export interface IConversation {
	conversationId: string;
	createdAt: string;
	updatedAt: string;
	summary: string | undefined;
	title: string | undefined;
	responseStream: boolean;
	assistant: string;
	assistantTitle: string;
	assistantAvatar: string;
	device: string | undefined;
	userName: string | undefined;
}
