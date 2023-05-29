const crypto = require("crypto");
const { deterministicPartitionKey, generateHashKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("should return the provided partition key if it exists", () => {
    const PARTITION_KEY = "my-key"
    const event = { partitionKey: PARTITION_KEY };
    const result = deterministicPartitionKey(event);
    expect(result).toBe(PARTITION_KEY);
  });

  it("should generate a hash-based partition key when no partition key is provided", () => {
    const event = { data: "data" };
    const hashData = crypto
      .createHash("sha3-512")
      .update(JSON.stringify(event))
      .digest("hex");
    const result = deterministicPartitionKey(event);
    expect(result).toBe(hashData);
  });

  it("should convert non-string partition keys to JSON strings", () => {
    const event = { partitionKey: { key: "value" } };
    const key = JSON.stringify(event.partitionKey);
    const result = deterministicPartitionKey(event);
    expect(result).toBe(key);
  });

  it("should generate a hash-based partition key if it exceeds the maximum length", () => {
    const longKey = "x".repeat(300);
    const hashKey = generateHashKey(longKey);
    const result = deterministicPartitionKey({ partitionKey: longKey });
    expect(result).toBe(hashKey);
  });
});
