import { describe, it, expect } from '@jest/globals';

describe('Example test suite', () => {
  it('should pass a basic test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should handle async operations', async () => {
    const promise = Promise.resolve('test');
    await expect(promise).resolves.toBe('test');
  });
});

describe("Practice test which does random stuff", () => {
  it("Multiplies data", () => {
    const a = 100;
    const b = 50;

    expect(a * b).toBe(5000);
  })

})

