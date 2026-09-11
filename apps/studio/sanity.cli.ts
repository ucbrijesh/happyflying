import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '819qznh7',
    dataset: 'production',
  },
  deployment: {
    autoUpdates: false,
  },
  typegen: {
    enabled: true,
    path: '../web/src/**/*.{ts,tsx,js,jsx}',
    schema: 'schema.json',
    generates: '../web/src/sanity/types.ts',
    overloadClientMethods: true,
  },
})
