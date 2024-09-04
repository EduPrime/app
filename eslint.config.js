import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
}, {
  rules: {
    'vue/no-deprecated-slot-attribute': 'off',
  },
})
