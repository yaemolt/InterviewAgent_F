<template>
  <div id="app">
    <!-- 路由视图 -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f5f5f5;
}

#app {
  min-height: 100vh;
}

/* 输入框通用样式优化 */
input {
  box-sizing: border-box;
}

/* 按钮通用样式 */
button {
  font-family: inherit;
}

/* 链接样式 */
a {
  color: inherit;
  text-decoration: none;
}

/* 响应式字体大小 */
@media (max-width: 768px) {
  body {
    font-size: 14px;
  }
}
</style> 