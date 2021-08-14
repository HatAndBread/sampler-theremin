<template>
  <div>
    <button @click='handleRecordClick'>Record</button>
    <button @click='handleStopClick'>Stop</button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import * as mic from '../music/mic';

export default defineComponent({
  methods: {
    handleRecordClick() {
      console.log('hoi!')
      mic.recordMic();
    },
    handleStopClick() {
      mic.stopMic();
    }
  }
});
</script>
<style lang="">

</style>
