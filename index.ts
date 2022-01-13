import { EntryPageClass } from './src/pages/page-entry'
import { createPageConfig } from './src/createPageConfig'


Page(createPageConfig(EntryPageClass, { root: { nn: {} } }, { path: 'pages/page-entry/index' }))
