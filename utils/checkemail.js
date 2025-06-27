const checkEmail = (email) => {
    if (!email || email.trim() === "") {
        return "Email vide";
    }

    // Correction : le point doit être échappé
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "Email non valide";
    }

    return "";
}

module.exports = checkEmail;