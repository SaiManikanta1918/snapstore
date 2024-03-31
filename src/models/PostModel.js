import BaseModel from './BaseModel';
import PostCommentModel from './PostCommentModel';

export default class PostModel extends BaseModel {
  /**
   * @var {String}
   */
  id;

  /**
   * @var {String}
   */
  caption;

  /**
   * @var {[String]}
   */
  tags;

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
    this.id = model.id;
    this.caption = model.caption;
    this.tags = model.tags || [];
    this.comments = PostCommentModel.mapModels(model.comments);
    this.createdAt = model.createdAt;
    this.createdBy = model.createdBy;
    this.imageURL = model.imageURL;
    this.likes = model.likes || [];
    this.saves = model.saves || [];
  }

  get noOfLikes() {
    return this.likes.length;
  }

  setLikes(likes) {
    this.likes = likes;
  }

  setSaves(saves) {
    this.saves = saves;
  }

  isUserLiked(userId) {
    return this.likes.includes(userId);
  }

  likesExceptUser(user) {
    return this.likes.filter((userId) => userId !== user);
  }

  savesExceptUser(user) {
    return this.saves.filter((userId) => userId !== user);
  }
}
