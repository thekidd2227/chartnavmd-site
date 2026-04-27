/**
 * ChatbotPlaceholder — formerly Tidio, now a no-op.
 *
 * Chatwoot is loaded via /assets/chatwoot.js in the root index.html,
 * NOT through a React component. This file exists only so existing
 * imports (<ChatbotPlaceholder />) do not break.
 *
 * To remove entirely: delete this file and remove any <ChatbotPlaceholder />
 * usage from the component tree.
 */
export function ChatbotPlaceholder() {
  return null;
}
