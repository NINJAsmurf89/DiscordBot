export const ApplicationCommandType = {
  /**
   * Slash commands; a text-based command that shows up when a user types /
   */
  CHAT_INPUT: 1,
  /**
   * A UI-based command that shows up when you right click or tap on a user
   */
  USER: 2,
  /**
   * A UI-based command that shows up when you right click or tap on a message
   */
  MESSAGE: 3,
};

export const ApplicationCommandOptionType = {
  SUB_COMMAND: 1,
  SUB_COMMAND_GROUP: 2,
  STRING: 3,
  /**
   * Any integer between -2^53 and 2^53
   */
  INTEGER: 4,
  BOOLEAN: 5,
  USER: 6,
  /**
   * Includes all channel types + categories
   */
  CHANNEL: 7,
  ROLE: 8,
  /**
   * Includes users and roles
   */
  MENTIONABLE: 9,
  /**
   * Any double between -2^53 and 2^53
   */
  NUMBER: 10,
  /**
   * Attachment object
   */
  ATTACHMENT: 11,
};

export const ApplicationCommandPermissionType = {
  ROLE: 1,
  USER: 2,
  CHANNEL: 3,
};

export const ComponentType = {
  /**
   * Container for other components
   */
  ACTION_ROW: 1,
  /**
   * Button object
   */
  BUTTON: 2,
  /**
   * Select menu for picking from defined text options
   */
  STRING_SELECT: 3,
  /**
   * Text input object
   */
  TEXT_INPUT: 4,
  /**
   * Select menu for users
   */
  USER_SELECT: 5,
  /**
   * Select menu for roles
   */
  ROLE_SELECT: 6,
  /**
   * Select menu for mentionables (users and roles)
   */
  MENTIONABLE_SELECT: 7,
  /**
   * Select menu for channels
   */
  CHANNEL_SELECT: 8,
};

export const ButtonStyle = {
  /**
   * Blurple
   */
  PRIMARY: 1,
  /**
   * Grey
   */
  SECONDARY: 2,
  /**
   * Green
   */
  SUCCESS: 3,
  /**
   * Red
   */
  DANGER: 4,
  /**
   * Grey, navigates to a URL
   */
  LINK: 5,
};

export const TextInputStyle = {
  /**
   * Single-line input
   */
  SHORT: 1,
  /**
   * Multi-line input
   */
  PARAGRAPH: 2,
};

export const InteractionType = {
  PING: 1,
  APPLICATION_COMMAND: 2,
  MESSAGE_COMPONENT: 3,
  APPLICATION_COMMAND_AUTOCOMPLETE: 4,
  MODAL_SUBMIT: 5,
};

export const InteractionResponseType = {
  /**
     * ACK a Ping
     */
  PONG: 1,
  /**
   * Respond to an interaction with a message
   */
  CHANNEL_MESSAGE_WITH_SOURCE: 4,
  /**
   * ACK an interaction and edit a response later, the user sees a loading state
   */
  DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE: 5,
  /**
   * For components, ACK an interaction and edit the original message later;
   * the user does not see a loading state
   */
  DEFERRED_UPDATE_MESSAGE: 6,
  /**
   * For components, edit the message the component was attached to
   */
  UPDATE_MESSAGE: 7,
  /**
   * Respond to an autocomplete interaction with suggested choices
   */
  APPLICATION_COMMAND_AUTOCOMPLETE_RESULT: 8,
  /**
   * Respond to an interaction with a popup modal
   */
  APPLICATION_MODAL: 9,
};

export const MessageFlag = {
  /**
   * Do not include any embeds when serializing this message
   */
  SUPPRESS_EMBEDS: 1 << 2,
  /**
   * This message is only visible to the user who invoked the Interaction
   */
  EPHEMERAL: 1 << 6,
};
