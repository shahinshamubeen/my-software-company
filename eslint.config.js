import js from "@eslint/js";
import tseslint from "typescript-eslint";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "jsx-a11y": jsxA11y,
    },
    rules: {
      // Disable rules that give false positives with React dynamic expressions
      "jsx-a11y/aria-proptypes": "off", // React handles boolean-to-string conversion
      "jsx-a11y/label-has-associated-control": "off", // False positive with wrapper labels

      // Allow inline styles for dynamic values (project colors, etc.)
      // Note: This is a VS Code HTML extension warning, not ESLint
    },
  },
  {
    ignores: ["dist/**", ".astro/**", "node_modules/**"],
  }
);
