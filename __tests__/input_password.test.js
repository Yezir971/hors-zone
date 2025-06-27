const checkPassword = require('../utils/checkpassword.js')

describe("test de l'input password", () => {
    test('input password vide', () => {
        expect(checkPassword('')).toBe('password vide')
    })

    test('test de la taille du mdp', () => {
        expect(checkPassword('TestMdp1593@yd')).toBe('')
    })
})
