// jest.config.js
module.exports = {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        // Pour gérer les imports CSS/SCSS ou images
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/$1', // attention aux slashs et regex
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}
