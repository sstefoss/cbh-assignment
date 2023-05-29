const crypto = require("crypto");

// Generate a deterministic partition key
const deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  // if no event is provided, return a trivial partition key
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  // use the provided partition key if available, otherwise generate a hash-based key
  let candidate = event.partitionKey || generateHashKey(event);

  // make sure candiate is a string
  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  // if the candidate exceeds the maximum length, generate a hash-based key
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = generateHashKey(candidate);
  }

  // Return the final candidate as the partition key
  return candidate;
};

// Generate a hash-based key
const generateHashKey = (data) => {
  const hash = crypto.createHash("sha3-512");
  hash.update(JSON.stringify(data));
  return hash.digest("hex");
}

module.exports = {
  generateHashKey,
  deterministicPartitionKey,
};