
export function checkPassword(password) {
    if (password === "") {
        return "password vide";
    }
    if (password.length < 8 || password.length > 20) {
        return "Le mot de passe doit contenir entre 8 et 20 caractères";
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    if (!passwordRegex.test(password)) {
        return "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial";
    }
    
}
export default checkPassword;