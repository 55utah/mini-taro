import { SecondPageClass } from './src/pages/page-second'
import { createPageConfig } from './src/createPageConfig'


Page(createPageConfig(SecondPageClass, { root: { nn: {} } }, { path: 'pages/page-second/index' }))
