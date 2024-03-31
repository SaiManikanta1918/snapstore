import BaseModel from "./BaseModel";

export default class UserModel extends BaseModel {
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
    this.bio = model.bio;
    this.createdAt = model.createdAt;
    this.email = model.email;
    this.followers = model.followers;
    this.following = model.following;
    this.fullName = model.fullName;
    this.posts = model.posts;
    this.profilePicURL = model.profilePicURL;
    this.uid = model.uid;
    this.username = model.username;
  }
}

