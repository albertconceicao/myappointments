import isEmailValid from './isEmailValid';

describe('isEmailValid', () => {
  it('should return true for a valid email', () => {
    const email = 'test@test.com';
    const result = isEmailValid(email);
    expect(result).toBe(true);
  });

  it('should return false for an invalid email', () => {
    const email = 'test@test';
    const result = isEmailValid(email);
    expect(result).toBe(false);
  });

  it('should return false for an email without @', () => {
    const email = 'test.test.com';
    const result = isEmailValid(email);
    expect(result).toBe(false);
  });

  it('should return false for an email without domain', () => {
    const email = 'test@';
    const result = isEmailValid(email);
    expect(result).toBe(false);
  });
  it('should return false resultor an email without username', () => {
    const email = '@test.com';
    const result = isEmailValid(email);
    expect(result).toBe(false);
  });

  it('should return true for an email with valid special characters', () => {
    const email = 'test.jest_2@test.com';
    const result = isEmailValid(email);
    expect(result).toBe(true);
  });

  it('should return false for an email with a invalid domain', () => {
    const email = 'test@test!com';
    const result = isEmailValid(email);
    expect(result).toBe(false);
  });

  it('should return true for an email with a shot TLD', () => {
    const email = 'test@test.co';
    const result = isEmailValid(email);

    expect(result).toBe(true);
  });

  it('should return true forn an email with international characters', () => {
    const email = 'úser@domain.com';
    const result = isEmailValid(email);

    expect(result).toBe(true);
  });

  it('should return false for an empty email', () => {
    const email = '';
    const result = isEmailValid(email);

    expect(result).toBe(false);
  });
});
