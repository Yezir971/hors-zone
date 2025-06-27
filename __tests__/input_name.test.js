const checkName = require('../utils/checkname.js')

describe('Tests du nom', () => {
    test('nom vide', () => {
        expect(checkName('')).toBe('Nom vide')
    })
    test('nom invalide (avec chiffre)', () => {
        expect(checkName('Jean123')).toBe('Nom non valide')
    })
    test('nom valide', () => {
        expect(checkName('Jean Dupont')).toBe('')
    })
})
