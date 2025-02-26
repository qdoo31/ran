import { GITHUB } from '../../common/index';
import type { DefaultTheme } from 'vitepress';

const themeCnConfig: DefaultTheme.Config = {
  logo: '/home.svg',
  nav: [
    { text: '首页', link: '/cn/' },
    { text: '函数', link: '/cn/src/ranuts/' },
    { text: '组件', link: '/cn/src/ranui/' },
    { text: '璀璨', link: '/cn/src/article/designMode.md' },
  ],
  socialLinks: [{ icon: 'github', link: GITHUB }],
  footer: {
    message: 'Released under the MIT License.',
    copyright: 'Copyright © 2022-11-11',
  },
  // algolia: {
  //   appId: 'RDX0Y4AQW1',
  //   apiKey: 'c7b6e28f95335eddc66c5a1b54ad9834',
  //   indexName: 'chaxus_ran',
  //   placeholder: 'search',
  // },
  sidebar: {
    '/cn/src/ranuts/': [
      {
        text: 'Overview 总览',
        link: '/cn/src/ranuts/',
      },
      {
        text: '通用函数',
        items: [
          { text: '过滤对象', link: '/cn/src/ranuts/utils/filterObj.md' },
          { text: '统计执行时间', link: '/cn/src/ranuts/utils/task.md' },
          { text: '字符串转xml', link: '/cn/src/ranuts/utils/str2xml.md' },
          {
            text: '图片转base64',
            link: '/cn/src/ranuts/utils/convertImageToBase64.md',
          },
          { text: 'OCR文字识别`', link: '/cn/src/ranuts/utils/ocr.md' },
        ],
      },
      {
        text: '文件',
        items: [
          {
            text: '查询一个文件的详细信息',
            link: '/cn/src/ranuts/file/watchFile.md',
          },
          {
            text: '读取目录下的文件名称',
            link: '/cn/src/ranuts/file/readDir.md',
          },
          {
            text: '监听文件是否改变',
            link: '/cn/src/ranuts/file/watchFile.md',
          },
          { text: '读取文件内容', link: '/cn/src/ranuts/file/readFile.md' },
          { text: '追加文件内容', link: '/cn/src/ranuts/file/appendFile.md' },
          { text: '写入文件内容', link: '/cn/src/ranuts/file/writeFile.md' },
        ],
      },
      {
        text: '设计模式',
        items: [{ text: '发布订阅模式', link: '/cn/src/ranuts/mode/subscribe.md' }],
      },
      {
        text: 'mime type',
        items: [
          {
            text: '通过文件后缀获取mime type',
            link: '/cn/src/ranuts/mimeType/mimeType.md',
          },
        ],
      },
    ],
    '/cn/src/ranui/': [
      {
        text: 'Overview 总览',
        link: '/cn/src/ranui/',
      },
      {
        text: '通用',
        items: [
          { text: 'Button 按钮', link: '/cn/src/ranui/button/' },
          { text: 'Icon 图标', link: '/cn/src/ranui/icon/' },
        ],
      },
      {
        text: '数据展示',
        items: [
          { text: 'Image 图片', link: '/cn/src/ranui/image/' },
          { text: 'CheckBox 多选框', link: '/cn/src/ranui/checkbox/' },
          { text: 'Tabs 标签页', link: '/cn/src/ranui/tabs/' },
          { text: 'Preview 预览', link: '/cn/src/ranui/preview/' },
          { text: 'Radar 雷达图', link: '/cn/src/ranui/radar/' },
          { text: 'Select 选择框', link: '/cn/src/ranui/select/' },
          { text: 'Player 视频播放器', link: '/cn/src/ranui/player/' },
          { text: 'Progress 进度条', link: '/cn/src/ranui/progress/' },
          { text: 'Popover 气泡卡片', link: '/cn/src/ranui/popover/' },
        ],
      },
      {
        text: '数据录入',
        items: [{ text: 'Input 输入框', link: '/cn/src/ranui/input/' }],
      },
      {
        text: '反馈',
        items: [
          { text: 'Message 全局提示', link: '/cn/src/ranui/message/' },
          { text: 'Skeleton 骨架屏', link: '/cn/src/ranui/skeleton/' },
          // { text: 'Modal 对话框', link: '/src/ranui/modal/' },
        ],
      },
    ],
    '/cn/src/article/': [
      {
        items: [
          { text: '23 种经典设计模式', link: '/cn/src/article/designMode.md' },
          {
            text: '函数式编程',
            link: '/cn/src/article/functionalProgramming.md',
          },
          {
            text: '排序算法',
            link: '/cn/src/article/sort/index.md',
            items: [
              { text: '冒泡排序', link: '/cn/src/article/sort/bubble/' },
              { text: '选择排序', link: '/src/article/sort/select/' },
              { text: '插入排序', link: '/cn/src/article/sort/insert/' },
              { text: '希尔排序', link: '/cn/src/article/sort/shell/' },
              { text: '归并排序', link: '/cn/src/article/sort/merge/' },
              { text: '快速排序', link: '/cn/src/article/sort/quick/' },
              { text: '堆排序', link: '/cn/src/article/sort/heap/' },
              { text: '计数排序', link: '/cn/src/article/sort/count/' },
              { text: '桶排序', link: '/cn/src/article/sort/bucket/' },
              { text: '基数排序', link: '/cn/src/article/sort/radix/' },
            ],
          },
        ],
      },
    ],
  },
};

export { themeCnConfig };
