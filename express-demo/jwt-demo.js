const jwt = require('jsonwebtoken');
const token = jwt.sign({foo:'bar'},'shhhh');
const decoded = jwt.verify(token,'shhhh');
console.log(decoded);