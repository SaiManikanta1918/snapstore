import BaseModel from "./BaseModel";
import PostCommentModel from "./PostCommentModel";

export default class PostModel extends BaseModel {
  /**
   * @var {String}
   */
  caption;

  /**
   * @var {[PostCommentModel]}
   */
  comments;

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
  imageURL;

  /**
   * @var {[String]}
   */
  likes;

  /**
   * @var {[String]}
   */
  saves;

  constructor(model = {}) {
    super();
    this.caption = model.caption;
    this.comments = PostCommentModel.mapModels(model.comments);
    this.createdAt = model.createdAt;
    this.createdBy = model.createdBy;
    this.imageURL = model.imageURL;
    this.likes = model.likes;
    this.saves = model.saves;
  }
}

