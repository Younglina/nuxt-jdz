// uno.config.ts
import { defineConfig, presetAttributify, presetUno } from 'unocss'
import presetIcons from '@unocss/preset-icons'

export default defineConfig({
  presets: [
    presetAttributify({ /* preset options */ }),
    presetUno(),
    presetIcons()
    // ...custom presets
  ],
  shortcuts: {},
  rules: [
    ['bg-aliceblue', { "background-color": 'aliceblue', "--un-bg-opacity": 1 }],
  ]
})