/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null;
    this.username = null;
    this.status = null;
    this.creationdate = null;
    this.birthday = "not assigned";
    this.token = null;
    this.password = null;
    Object.assign(this, data);
  }
}
export default User;
