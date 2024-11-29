import delay from './delay';

describe('delay', () => {
  it('should resolve with a delay', async () => {
    const start = Date.now();
    await delay(1000);
    const end = Date.now();
    const duration = end - start;
    expect(duration).toBeGreaterThanOrEqual(1000);
  });

  it('should resolve without a standard delay time', async () => {
    const start = Date.now();
    await delay();
    const end = Date.now();
    const duration = end - start;
    expect(duration).toBeGreaterThanOrEqual(0);
  });

  it('should resolve without a delay', async () => {
    const start = Date.now();
    await delay(0);
    const end = Date.now();
    const duration = end - start;
    expect(duration).toBeGreaterThanOrEqual(0);
  });
});
