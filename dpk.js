const { createHash } = require('./cryptoUtils');

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const deterministicPartitionKey = (event) => {
  const partitionKey = event && event.partitionKey;

  if (partitionKey) {
    const stringKey = typeof partitionKey === 'string' ? partitionKey : JSON.stringify(partitionKey);
    return stringKey.length > MAX_PARTITION_KEY_LENGTH ? createHash(stringKey) : stringKey;
  }
  
  if (event) {
    return createHash(JSON.stringify(event));
  }
  
  return TRIVIAL_PARTITION_KEY;
}

exports.deterministicPartitionKey = deterministicPartitionKey;
exports.TRIVIAL_PARTITION_KEY = "0";
exports.MAX_PARTITION_KEY_LENGTH = 256;

