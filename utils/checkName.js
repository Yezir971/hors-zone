export function checkNom(nom) {
  if (!nom || nom.trim() === "") return "Nom vide";
  const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
  return nameRegex.test(nom) ? true : "Nom non valide";
}

export default checkNom;