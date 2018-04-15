安裝 ionic
```bash
npm i -g ionic cordova
```

安裝 jest

```bash
npm install jest jest-preset-angular @types/jest --save-dev
```

增加 scripts 到 package.json
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:ci": "jest --runInBand",
  }
}
```

增加 jest 設定檔到 package.json
```json
{
  "jest": {
    "preset": "jest-preset-angular",
    "roots": [
      "src"
    ],
    "testRegex": "\\.spec\\.ts$",
    "setupTestFrameworkScriptFile": "<rootDir>/src/setupJest.ts",
    "transformIgnorePatterns": [
      "node_modules/(?!@ngrx|@ionic-native|@ionic)"
    ]
  }
}
```

在 src 資料夾內建立 setupJest.ts
```typescript
import 'jest-preset-angular';
import './jestGlobalMocks'; // browser mocks globally available for every test
```

在 src 資料夾內建立 jestGlobalMocks.ts
```typescript
const mock = () => {
  let storage = {};
  return {
    getItem: key => key in storage ? storage[key] : null,
    setItem: (key, value) => storage[key] = value || '',
    removeItem: key => delete storage[key],
    clear: () => storage = {},
  };
};

Object.defineProperty(window, 'localStorage', {value: mock()});
Object.defineProperty(window, 'sessionStorage', {value: mock()});
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ['-webkit-appearance']
});
```

在 src 資料夾內建立 tsconfig.spec.json
```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "outDir": "../out-tsc/spec",
    "module": "commonjs",
    "target": "es5",
    "allowJs": true
  },
  "include": [
    "**/*.spec.ts"
  ]
}
```