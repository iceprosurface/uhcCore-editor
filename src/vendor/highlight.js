import Vue from "vue";
import VueHighlightJS from "vue-highlight.js";

import yaml from "highlight.js/lib/languages/yaml";
import "highlight.js/styles/default.css";

Vue.use(VueHighlightJS, {
  // Register only languages that you want
  languages: {
    yaml
  }
});
