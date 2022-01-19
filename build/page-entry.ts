import { EntryPage } from '../demo/pages/page-entry'
import { createPageConfig } from '@/index'

Page(createPageConfig(EntryPage, { root: { nn: 'root' } }, { path: 'pages/page-entry/index' }))
