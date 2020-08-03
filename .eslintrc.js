module.exports = {
    // Ambientes em que a aplicação irá executar
    "env": {
        "browser": true,
        "es2020": true,
        "node": true
    },
    // Set dos plugins a serem utilizados
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    // Analisador do TypeScript e
    // opções da versão do ECMA
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    // Carregamento dos plugins
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
    },
    // Remove a regra de require para arquivos JS
    "overrides": [
        {
          "files": ["*.js"],
          "rules": {
            "@typescript-eslint/no-var-requires": "off",
          },
        },
    ],
    // Pastas para serem ignoradas
    "ignorePatterns": [ "node_modules/*", "build/*"],
    // Detect para verificar a versão do react de forma automática
    "settings": {
        "react": {
            "version": "detect",
        },
    },
};