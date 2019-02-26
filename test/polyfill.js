
if (!Array.prototype.includes) {
  Array.prototype.includes = function() {
    return Array.prototype.indexOf.apply(this, arguments) !== -1;
  }
}
