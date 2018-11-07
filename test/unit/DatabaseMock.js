function Database(data) {
  this.data = data;
  this.path = [];
}

/* eslint-disable func-names */
Database.prototype.ref = function (path) {
  this.path.push(path);
  return this;
};

/* eslint-disable func-names */
Database.prototype.once = function (path, cb) {
  this.path.push(path);
  cb(this);
};

/* eslint-disable func-names */
Database.prototype.val = function () {
  return this.data;
};

export default Database;
