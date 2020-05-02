<template>
  <div id="app">
    <TestPlatform v-bind:testId="1"/>
  </div>
</template>

<script>
import TestPlatform from './components/TestPlatform'

export default {
  name: 'App',
  components: {
    TestPlatform
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 5vh;
}
</style>
