

describe('test 1 de l\'input email', () => {
  test('test 1 email vide', () => {
    expect("").toBe("Email vide");
  });

  test('test 2 l\'input n\'est pas valide', () => {
    expect(checkEmail("test.fr")).toBe("Email non valide");
  });
  test('test 3 l\'input est valide', () => {
    expect(checkEmail("test@gmail.fr")).toBe("Email valide");
  });
});