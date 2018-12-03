// 全局的一些配置信息
const baseUrl = 'http://api.jinrongjie.com'
const config = {
  locale: 'zh-CN',
  url:  baseUrl,
  debug:  {
    http: false
  },
  api: `${baseUrl}/api`,
  theme:{
    primary: "#2196F3",
    secondary: "#455A64",
    accent: "#9c27b0",
    error: "#f44336",
    warning: "#FFC107",
    info: "#64B5F6",
    success: "#4caf50"
  },
  icons:{
    'complete': '',
    'cancel': '',
    'close': '',
    'delete': '', // delete (e.g. v-chip close)
    'clear': '',
    'success': '',
    'info': '',
    'warning': '',
    'error': '',
    'prev': '',
    'next': '',
    'checkboxOn': '',
    'checkboxOff': '',
    'checkboxIndeterminate': '',
    'delimiter': '', // for carousel
    'sort': '',
    'expand': '',
    'menu': '',
    'subgroup': '',
    'dropdown': '',
    'radioOn': '',
    'radioOff': '',
    'edit': ''
  }
}
export default config
