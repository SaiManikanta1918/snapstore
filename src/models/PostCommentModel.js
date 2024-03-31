import BaseModel from './BaseModel';

export default class PostCommentModel extends BaseModel {
  /**
   * @var {String}
   */
  comment;

  /**
   * @var {String}
   */
  createdAt;

  /**
   * @var {String}
   */
  createdBy;

  /**
   * @var {String}
   */
  postId;

  constructor(model = {}) {
    super();
    this.comment = model.comment;
    this.createdAt = model.createdAt;
    this.createdBy = model.createdBy;
    this.postId = model.postId;
  }
}
