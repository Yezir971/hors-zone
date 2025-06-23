import { checkInput } from '../input_name';

describe("Tests du nom", () => {
  test("nom vide", () => {
    expect(checkNom("")).toBe("Nom vide");
  });
  test("nom invalide (avec chiffre)", () => {
    expect(checkNom("Jean123")).toBe("Nom non valide");
  });
  test("nom valide", () => {
    expect(checkNom("Jean Dupont")).toBe(true);
  });
});
