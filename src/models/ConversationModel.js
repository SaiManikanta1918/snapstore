import BaseModel from './BaseModel';

export default class ConversationModel extends BaseModel {
  /**
   * @var {String}
   */
  chatId;

  /**
   * @var {String}
   */
  userId;

  /**
   * @var {String}
   */
  createdAt;

  /**
   * @var {String}
   */
  hasHistory;

  constructor(model = {}) {
    super();
    this.chatId = model.chatId;
    this.userId = model.userId;
    this.createdAt = model.createdAt;
    this.hasHistory = model.hasHistory || true;
  }
}
