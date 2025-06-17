// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // Pour gérer les imports CSS/SCSS ou images
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};