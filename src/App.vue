<template>
  <div class="app" v-if="isBadBrowser">
    <h1>Your web browser is not supported 😢 <br> Please update to the latest version of Chrome or Firefox.</h1>
  </div>
  <div class="app" v-else>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/main-instrument">Play</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  data: function() {
    return {
      isBadBrowser: false
    }
  },
  mounted: function() {
    if (!window.MediaRecorder){
      this.isBadBrowser = true;
    }
  }
});
</script>
<style lang="scss">
#app {
  box-sizing: border-box;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
