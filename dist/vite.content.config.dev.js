"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vite = require("vite");

var _pluginReact = _interopRequireDefault(require("@vitejs/plugin-react"));

var _path = _interopRequireDefault(require("path"));

var _globalConfig = require("./globalConfig");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = (0, _vite.defineConfig)({
  build: {
    outDir: _globalConfig.CRX_CONTENT_OUTDIR,
    lib: {
      entry: [// eslint-disable-next-line no-undef
      _path["default"].resolve(__dirname, 'src/content/index.jsx')],
      formats: ['cjs'],
      fileName: function fileName() {
        return 'content.js';
      }
    },
    rollupOptions: {
      output: {
        // eslint-disable-next-line no-unused-vars
        assetFileNames: function assetFileNames(assetInfo) {
          return 'content.css';
        }
      }
    }
  },
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@': _path["default"].resolve(__dirname, 'src')
    }
  },
  define: {
    'process.env.NODE_ENV': null
  },
  plugins: [(0, _pluginReact["default"])()]
});

exports["default"] = _default;