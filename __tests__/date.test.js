const dateMessage = require('../utils/dateMesage.js')

describe('timeDifference', () => {
    const now = Date.now

    beforeAll(() => {
        // On fige le temps pour avoir des tests déterministes
        jest.useFakeTimers()
        jest.setSystemTime(new Date('2025-06-21T12:00:00Z')) // 21 juin 2025 à 12h00 UTC
    })

    afterAll(() => {
        jest.useRealTimers()
    })

    test('retourne "2h" si timestamp est égal à maintenant (avec décalage de 2h)', () => {
        const timestamp = Date.now()
        expect(dateMessage(timestamp)).toBe('2h')
    })

    test('retourne "1h" pour une différence de 1 heure', () => {
        const timestamp = Date.now() - 1000 * 60 * 60
        expect(dateMessage(timestamp)).toBe('1h')
    })

    test('retourne "21h" pour une différence de 23 heures', () => {
        const timestamp = Date.now() - 23 * 60 * 60 * 1000
        expect(dateMessage(timestamp)).toBe('21h')
    })

    test('retourne "22h" pour une différence de 24 heures', () => {
        const timestamp = Date.now() - 24 * 60 * 60 * 1000
        expect(dateMessage(timestamp)).toBe('22h')
    })

    test('retourne "2j" pour une différence de 3 jours', () => {
        const timestamp = Date.now() - 3 * 24 * 60 * 60 * 1000
        expect(dateMessage(timestamp)).toBe('2j')
    })

    test('retourne "1s" pour une différence de 1 seconde (avec décalage de 2h)', () => {
        const timestamp = Date.now() - 7200000 - 1000
        expect(dateMessage(timestamp)).toBe('1s')
    })
})
