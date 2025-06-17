

describe('test de l\'input password', () => {
  test('input password vide', () => {
    expect(checkPassword("")).toBe("password vide");
  });

  test('test 2 l\'input n\'est pas valide', () => {
    expect(checkEmail("test.fr")).toBe("Email non valide");
  });
  test('test de la taille du mdp', () => {
      expect(checkPassword("TestMdp1593@yd")).toBe(true);
  });


});