import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // config
    selectedItem: "air",
    // config craftTable
    output: {
      id: "air"
    },
    itemName: "",
    itemType: "ITEM",
    craftTable: [
      [{ id: "air" }, { id: "air" }, { id: "air" }],
      [{ id: "air" }, { id: "air" }, { id: "air" }],
      [{ id: "air" }, { id: "air" }, { id: "air" }]
    ],
    enchantments: [],
    potion: "",
    reviveWithInventory: false,
    reviveItem: false,

    // filter dialog,
    filterDialogVisible: false
  },
  mutations: {
    selectOneItem(state, { key }) {
      state.selectedItem = key;
    },
    toggleCraftTable(state, { rowIndex, cellIndex }) {
      state.craftTable[rowIndex][cellIndex] = {
        id: state.selectedItem
      };
      state.craftTable = [...state.craftTable];
    },
    typeChange(state, { type }) {
      state.itemType = type;
    },
    itemNameChange(state, { name }) {
      state.itemName = name;
    },
    reviveItemChange(state, { reviveItem }) {
      state.reviveItem = reviveItem;
    },
    reviveWithInventoryChange(state, { reviveWithInventory }) {
      state.reviveWithInventory = reviveWithInventory;
    }
  },
  actions: {}
});
