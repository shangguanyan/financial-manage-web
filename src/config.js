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
  },
  toolbarOptions:[
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{'header': 1}, {'header': 2}],               // custom button values
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
    [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
    [{'direction': 'rtl'}],                         // text direction

    [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
    [{'header': [1, 2, 3, 4, 5, 6, false]}],

    [{'color': []}, {'background': []}],          // dropdown with defaults from theme
    [{'font': []}],
    [{'align': []}],
    ['link', 'image', 'video'],
    ['clean']
  ]
}
export default config
