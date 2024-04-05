import BaseModel from './BaseModel';

export default class UserModel extends BaseModel {
  /**
   * @var {String}
   */
  id;

  /**
   * @var {String}
   */
  bio;

  /**
   * @var {Number}
   */
  createdAt;

  /**
   * @var {String}
   */
  email;

  /**
   * @var {[String]}
   */
  followers;

  /**
   * @var {[String]}
   */
  following;

  /**
   * @var {String}
   */
  fullName;

  /**
   * @var {[String]}
   */
  posts;

  /**
   * @var {String}
   */

  profilePicURL;

  /**
   * @var {String}
   */
  uid;

  /**
   * @var {String}
   */
  username;

  constructor(model = {}) {
    super();
    this.id = model.id;
    this.bio = model.bio;
    this.createdAt = model.createdAt;
    this.email = model.email;
    this.isPrivate = model.isPrivate || false;
    this.followers = model.followers || [];
    this.following = model.following || [];
    this.fullName = model.fullName;
    this.posts = model.posts || [];
    this.profilePicURL = model.profilePicURL;
    this.uid = model.uid;
    this.username = model.username;
  }
}
