<template>
  <div>
    <button @click="handleLoadAudio" v-if="!toneIsStarted">Load Audio</button>
    <Recorder v-if="toneIsStarted"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as Tone from 'tone';
import Recorder from '@/components/Recorder.vue';
import { initializeInstruments } from '@/music/initializer';

export default defineComponent({
  components: {
    Recorder
  },
  computed: {
    toneIsStarted(): boolean {
      if (this.$store.state.toneStarted) return true;
      return false;
    }
  },
  methods: {
    async handleLoadAudio() {
      if (!this.$store.state.toneStarted) {
        await Tone.start();
        this.$store.commit('setToneStarted');
        console.log('tone started ✨');
        initializeInstruments();
      }
    },
  },
});
</script>

<style lang="scss">

</style>
