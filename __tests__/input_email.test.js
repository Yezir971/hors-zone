import { checkEmail } from '../input_email';

describe('checkEmail', () => {
  it('retourne "Email vide" si vide', () => {
    expect(checkEmail("")).toBe("Email vide");
    expect(checkEmail("   ")).toBe("Email vide");
  });

  it('retourne "Email non valide" si mal formé', () => {
    expect(checkEmail("test")).toBe("Email non valide");
    expect(checkEmail("test@")).toBe("Email non valide");
    expect(checkEmail("test@domain")).toBe("Email non valide");
    expect(checkEmail("test@domain,com")).toBe("Email non valide");
  });

  it('retourne true si email valide', () => {
    expect(checkEmail("test@domain.com")).toBe(true);
    expect(checkEmail("user.name@sub.domain.co")).toBe(true);
  });
});