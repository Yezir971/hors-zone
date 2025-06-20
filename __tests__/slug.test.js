const toSlug = require('@/utils/slug')

describe('test de le fonction toSlug', () => {
    test('avec espace', () => {
        expect(toSlug('password vide')).toBe('password-vide')
    })

    test('supprime les accents', () => {
        expect(toSlug('été')).toBe('ete')
    })
    test('supprime les espaces au début et à la fin', () => {
        expect(toSlug(' test ')).toBe('test')
    })
    test('remplace les espaces par des tirets', () => {
        expect(toSlug('salut test ')).toBe('salut-test')
    })
    test('remplace plusieurs tirets par un seul', () => {
        expect(toSlug('salut-- test ')).toBe('salut-test')
    })
})
