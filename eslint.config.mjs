import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"
import importPlugin from "eslint-plugin-import"
import unusedImports from "eslint-plugin-unused-imports"

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "docs-buyer/**",
    "marketing/**",
    "node_modules/**",
  ]),
  {
    plugins: {
      import: importPlugin,
      "unused-imports": unusedImports,
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
      },
      "import/internal-regex": "^@/",
    },
    rules: {
      // Import hygiene
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
            "object",
            "type",
          ],
          pathGroups: [
            { pattern: "react", group: "external", position: "before" },
            { pattern: "next/**", group: "external", position: "before" },
            { pattern: "@/**", group: "internal", position: "before" },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "import/no-duplicates": "error",
      "import/no-relative-packages": "error",
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../*", "../../*", "../../../*", "../../../../*"],
              message:
                "Use @/ path aliases instead of deep relative imports (see CODE-STANDARDS.md).",
            },
          ],
        },
      ],

      // Unused imports / vars
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // Accessibility — jsx-a11y registered by eslint-config-next
      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          components: ["Link"],
          specialLink: ["hrefLeft", "hrefRight"],
          aspects: ["invalidHref", "preferButton"],
        },
      ],

      // React hooks — enforced via eslint-config-next; keep explicit
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
    },
  },
  {
    files: ["src/**"],
    rules: {
      // No debug logging in app source (error boundaries may use console.error)
      "no-console": ["error", { allow: ["error"] }],
    },
  },
  {
    files: [
      "src/components/ui/**",
      "src/hooks/**",
      "src/components/showcase/**",
    ],
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
      "react-hooks/incompatible-library": "off",
    },
  },
])

export default eslintConfig
