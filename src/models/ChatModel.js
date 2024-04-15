import BaseModel from './BaseModel';
import ChatMessageModel from './ChatMessageModel';

export default class ChatModel extends BaseModel {
  /**
   * @var {String}
   */
  id;

  /**
   * @var {Array}
   */
  users;

  /**
   * @var {String}
   */
  messages;

  constructor(model = {}) {
    super();
    this.id = model.id;
    this.users = model.users || [];
    this.messages = ChatMessageModel.mapModels(model.messages);
  }
}
