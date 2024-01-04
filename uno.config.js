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
    ['box-shadow', { "box-shadow": '0 2px 12px rgba(100, 101, 102, .12)' }],
    ['h-sc', { "height": 'calc(100vh - 60px)' }],
  ]
})