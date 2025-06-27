const checkEmail = require('../utils/checkemail.js')

describe('checkEmail', () => {
    it('retourne "Email vide" si vide', () => {
        expect(checkEmail('')).toBe('Email vide')
        expect(checkEmail('   ')).toBe('Email vide')
    })

    it('retourne "Email non valide" si mal formé', () => {
        expect(checkEmail('test')).toBe('Email non valide')
        expect(checkEmail('test@')).toBe('Email non valide')
        expect(checkEmail('test@domain')).toBe('Email non valide')
        expect(checkEmail('test@domain,com')).toBe('Email non valide')
    })

    it('retourne "" si email valide', () => {
        expect(checkEmail('test@domain.com')).toBe('')
        expect(checkEmail('user.name@sub.domain.co')).toBe('')
    })
})
