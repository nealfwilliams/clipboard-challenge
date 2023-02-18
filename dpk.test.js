

const {
  deterministicPartitionKey,
  TRIVIAL_PARTITION_KEY,
  MAX_PARTITION_KEY_LENGTH
} = require("./dpk");

const { createHash } = require('./cryptoUtils');

jest.mock('./cryptoUtils');

const MOCKED_HASH = 'MOCK';

describe("deterministicPartitionKey", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    createHash.mockReturnValue(MOCKED_HASH);
  });

  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe(TRIVIAL_PARTITION_KEY);
  });

  it("Returns the literal '0' when given null input", () => {
    const trivialKey = deterministicPartitionKey(null);
    expect(trivialKey).toBe(TRIVIAL_PARTITION_KEY);
  });

  it("Returns the partitionKey key as string when input", () => {
    const stringKey = deterministicPartitionKey({
      partitionKey: 'foo'
    });
    expect(stringKey).toBe('foo');

    const numberKey = deterministicPartitionKey({
      partitionKey: 1 
    });
    expect(numberKey).toBe('1');

    const jsonKey = deterministicPartitionKey({
      partitionKey: {}
    });
    expect(jsonKey).toBe('{}');
  });

  it("Returns a hashed value when partitionKey on input is too long", () => {
    let longString = '';
    for (let i = 0; i <= MAX_PARTITION_KEY_LENGTH; i++) {
      longString += '-';
    }

    const longKey = deterministicPartitionKey({
      partitionKey: longString
    });

    expect(longKey).toBe(MOCKED_HASH);
    expect(createHash).toBeCalledTimes(1);
    expect(createHash).toBeCalledWith(longString);
  });

  it("Returns a hash of stringified event if event does not include partitionKey", () => {
    const testObject = {
      foo: 'bar'
    }
    const emptyEventKey = deterministicPartitionKey(testObject);

    expect(emptyEventKey).toBe(MOCKED_HASH);
    expect(createHash).toBeCalledTimes(1);
    expect(createHash).toBeCalledWith(JSON.stringify(testObject));
  });

  it("Returns a hash of stringified event if event is not an object", () => {
    const eventKey1 = deterministicPartitionKey('1');
    const eventKey2 = deterministicPartitionKey(2);

    expect(eventKey1).toBe(MOCKED_HASH);
    expect(eventKey2).toBe(MOCKED_HASH);

    expect(createHash).toBeCalledTimes(2);
    expect(createHash).toBeCalledWith('"1"');
    expect(createHash).toBeCalledWith('2');
  });

});
