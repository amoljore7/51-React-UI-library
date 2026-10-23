import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default {
  stories: ['../src/**/*.stories.@(js|jsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: '@storybook/react-vite',
  viteFinal: async config => {
    config.plugins = [
      ...(config.plugins || []),
      react({ jsxRuntime: 'automatic' }),
      svgr({
        svgrOptions: {
          replaceAttrValues: {
            '#161616': 'currentColor',
            '#393939': 'currentColor',
          },
        },
      }),
    ]
    config.css = {
      ...config.css,
      preprocessorOptions: { scss: { api: 'modern-compiler' } },
    }
    return config
  },
}
