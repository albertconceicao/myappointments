import formatPhone from './formatPhone';

describe('formatPhone', () => {
  it('should format the mobile phone number correctly', () => {
    const phone = '71999998888';
    const formattedPhone = formatPhone(phone);

    expect(formattedPhone).toBe('(71) 99999-8888');
  });

  it('should format the phone number correctly', () => {
    const phone = '7133334444';
    const formattedPhone = formatPhone(phone);

    expect(formattedPhone).toBe('(71) 3333-4444');
  });

  it('should remove non-numeric characters from the phone number and format correctly', () => {
    const phone = '71-9999-8888';
    const formattedPhone = formatPhone(phone);

    expect(formattedPhone).toBe('(71) 9999-8888');
  });

  it('should format an already formatted phone number correctly', () => {
    const phone = '(71) 99999-8888';
    const formattedPhone = formatPhone(phone);

    expect(formattedPhone).toBe('(71) 99999-8888'); // O formato já está correto
  });

  it('should format a phone number with different digits correctly', () => {
    const phone = '1234567890';
    const formattedPhone = formatPhone(phone);

    expect(formattedPhone).toBe('(12) 3456-7890');
  });
});
