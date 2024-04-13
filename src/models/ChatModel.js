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

  get isUrl() {
    return !!this.message.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/g
    );
  }
}
