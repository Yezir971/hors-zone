const checkName = (nom) => {
  if (!nom || nom.trim() === "") return "Nom vide";
  const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
  return nameRegex.test(nom) ? "" : "Nom non valide";
}

module.exports = checkName;