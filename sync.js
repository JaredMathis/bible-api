const u = require('wlj-utilities');

const command = `aws s3 sync ./api s3://bible-api`;
const output = u.executeCommand(command);
console.log(output);