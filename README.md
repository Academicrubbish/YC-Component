# YC-Component

YC-Component 是一个基于 Vue 2.x 和 Element UI 的组件库，提供了一系列实用的业务组件，包括验证码、导航栏、可编辑表格等。

## 特性

- 🎨 基于 Vue 2.x 和 Element UI 构建
- 📦 提供多个开箱即用的业务组件
- 🛡 使用 TypeScript 开发，提供完整的类型定义
- 🎯 支持按需引入
- 📱 响应式设计，支持移动端

## 技术栈

- Vue ^2.6.14
- Element UI ^2.15.10
- Axios 0.18.1
- Dayjs ^1.11.5
- Splitpanes ^2.4.1
- QWeather Icons ^1.1.1

## 组件列表

### 1. 验证码组件 (Identify)

基于 Canvas 的图形验证码组件，支持：
- 自定义字体大小和颜色
- 文字旋转
- 干扰线和干扰点
- 自动重绘

```vue
<template>
  <identify :identifyCode="code" :contentWidth="100" :contentHeight="40"/>
</template>

<script>
import Identify from '@/common/indentify'

export default {
  components: { Identify },
  data() {
    return {
      code: '1234'
    }
  }
}
</script>
```

### 2. 导航栏组件 (NavBar)

可配置的多标题导航栏组件：
- 支持多个标题项切换
- 当前选中项高亮显示
- 可选的"更多"按钮
- 响应式布局

```vue
<template>
  <nav-bar-item 
    :titles="titles" 
    :currentTitle="currentTitle"
    @titleClick="handleTitleClick"
  />
</template>

<script>
import NavBarItem from '@/common/navBarItem'

export default {
  components: { NavBarItem },
  data() {
    return {
      titles: ['标题1', '标题2', '标题3'],
      currentTitle: '标题1'
    }
  },
  methods: {
    handleTitleClick(title) {
      this.currentTitle = title
    }
  }
}
</script>
```

### 3. 可编辑表格组件 (EditableTable)

基于 Element UI 的可编辑表格组件：
- 支持行内编辑
- 添加/删除行
- 清空数据
- 序号自动计算
- 当前行高亮

```vue
<template>
  <editable-table 
    :data="tableData"
    :columns="columns"
    @row-add="handleRowAdd"
    @row-delete="handleRowDelete"
  />
</template>
```

## 安装

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run serve

# 构建生产版本
npm run build
```

## 开发环境

- Node.js >= 12.0.0
- Vue CLI >= 5.0.0
- npm >= 6.0.0

## 浏览器支持

- 现代浏览器和 IE11
- Chrome >= 61
- Firefox >= 60
- Safari >= 10.1
- Edge >= 16

## 目录结构

```
YC-Component
├── src
│   ├── common              # 通用组件
│   │   ├── indentify      # 验证码组件
│   │   ├── navBarItem     # 导航栏组件
│   │   └── dynamicTest    # 测试组件
│   ├── components         # 业务组件
│   │   ├── editableTable  # 可编辑表格
│   │   ├── identifyCode   # 登录页面
│   │   └── navBar        # 导航栏示例
│   └── assets            # 静态资源
├── public                 # 公共资源
└── package.json          # 项目配置
```

## 使用说明

1. 克隆项目
```bash
git clone [项目地址]
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run serve
```

4. 构建生产版本
```bash
npm run build
```

## 贡献指南

1. Fork 本仓库
2. 创建新的功能分支
3. 提交你的更改
4. 创建 Pull Request

## 许可证

[MIT](LICENSE)