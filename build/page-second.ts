import { SecondPage } from '../demo/pages/page-second'
import { createPageConfig } from '@/index'

Page(createPageConfig(SecondPage, { root: { nn: 'root' } }, { path: 'pages/page-second/index' }))
