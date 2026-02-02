import { createDeck, updateDeck } from '@deck.gl/jupyter-widget';

export default {
  name: 'TrameDeck',
  props: {
    mapboxApiKey: {
      type: String,
    },
    jsonInput: {
      type: Object,
    },
    tooltip: {
      type: Boolean,
      default: false,
    },
    customLibraries: {
      type: Object,
    },
  },
  watch: {
    async jsonInput() {
      if (this.viz) {
        updateDeck(this.jsonInput, this.viz);
        return;
      }
      await this.mountVis();
    },
    async opt() {
      if (this.viz) {
        updateDeck(this.jsonInput, this.viz);
        return;
      }
      await this.mountVis();
    },
  },
  methods: {
    async mountVis() {
      this.unmoutViz();
      if (this.jsonInput && this.$el) {
        const { $el: container, jsonInput, tooltip, customLibraries, mapboxApiKey } = this;

        this.viz = createDeck({
          container,
          jsonInput,
          tooltip,
          customLibraries,
          mapboxApiKey,
        });
      }
    },
    unmoutViz() {
      if (this.viz) {
        this.viz.finalize();
        this.viz = null;
      }
    },
  },
  async mounted() {
    await this.mountVis();
  },
  beforeDestroy() {
    this.unmoutViz();
  },
  template: `<div></div>`,
};
