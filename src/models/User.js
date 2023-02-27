/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null;
    this.username = null;
    this.password = null;
    this.creation_date = null;
    this.token = null;
    this.status = null;
    Object.assign(this, data);
  }
}
export default User;
