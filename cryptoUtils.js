const crypto = require("crypto");

const createHash = (data) => {
  crypto.createHash("sha3-512").update(data).digest("hex");
};

exports.createHash = createHash;