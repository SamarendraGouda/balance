// @ts-check
import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
    yaml: false,
    rules: {
      'style/max-statements-per-line': 'off',
      'max-statements-per-line': 'off',
      '@stylistic/max-statements-per-line': 'off',
      'vue/return-in-computed-property': 'off',
      'no-console': 'off',
      'ts/ban-ts-comment': 'off',
      'node/prefer-global/process': 'off',
    },
  }),
)
