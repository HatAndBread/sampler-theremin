import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';

declare module '@vue/runtime-core' {
  // Declare your own store states.
  interface State {
    toneStarted: boolean;
  }
// eslint-disable-next-line
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
