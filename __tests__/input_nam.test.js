

describe('test 1 de l\'input nom', () => {
  test('test 1 email vide', () => {
    expect(checkInput("")).toBe(false);
  });
  test('test 3 l\'input est valide', () => {
    expect(checkEmail("test")).toBe(true);
  });
});