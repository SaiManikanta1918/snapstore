import BaseModel from './BaseModel';

export default class ChatModel extends BaseModel {
  /**
   * @var {String}
   */
  message;

  /**
   * @var {String}
   */
  senderId;

  /**
   * @var {String}
   */
  createdAt;

  constructor(model = {}) {
    super();
    this.message = model.message;
    this.senderId = model.senderId;
    this.createdAt = model.createdAt;
  }
}
