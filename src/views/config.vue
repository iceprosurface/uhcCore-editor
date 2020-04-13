<template>
  <div class="layout">
    <div class="layout-nav">
      <Aside />
    </div>
    <div class="config-main layout-body">
      <div class="layout-body-wrap">
        <h4>
          {{ $t("itemName") }}
        </h4>
        <el-input
          v-model="itemName"
          :placeholder="$t('filterInput')"
        ></el-input>
        <h4>{{ $t("lore") }}</h4>
        <div>
          <Lore />
        </div>
        <h4>{{ $t("revive") }}</h4>
        <h5>{{ $t("reviveItem") }}</h5>
        <div>
          <el-switch v-model="reviveItem" />
        </div>
        <h5>{{ $t("reviveWithInventory") }}</h5>
        <div>
          <el-switch v-model="reviveWithInventory" />
        </div>
        <h4>
          {{ $t("typeChoose") }}
        </h4>
        <div class="type-radio">
          <!--          <el-radio v-model="itemType" label="POTION">{{-->
          <!--            $t("potion")-->
          <!--          }}</el-radio>-->
          <el-radio v-model="itemType" label="ITEM">{{ $t("item") }}</el-radio>
          <!--          <el-radio v-model="itemType" label="EQUIPMENT">{{-->
          <!--            $t("equipment")-->
          <!--          }}</el-radio>-->
          <el-radio v-model="itemType" label="CUSTOM">{{
            $t("customJson")
          }}</el-radio>
        </div>
        <div v-if="itemType === 'CUSTOM'">
          <el-input
            v-model="itemJSON"
            type="textarea"
            :rows="2"
            :placeholder="$t('filterInput')"
          ></el-input>
        </div>
        <div v-if="itemType === 'ITEM'">
          {{ $t("currentOutputItem") }}
          <CraftSlot :id="outputId" />
          <el-button type="text" size="small" @click="toggleOutputModal">
            ({{ $t(this.outputId) }})
          </el-button>
        </div>
        <div v-if="itemType === 'POTION'"></div>
        <div v-if="itemType === 'EQUIPMENT'"></div>
        <h4 style="margin-bottom: 12px;margin-top: 20px;">
          {{ $t("recipe") }}
        </h4>
        <h5>
          {{ $t("currentSelectedItem") }}
          <CraftSlot :id="selectedItem" />
          <el-button type="text" size="small" @click="toggleModal">
            ({{ $t(this.selectedItem) }})
          </el-button>
        </h5>
        <CraftTable />
        <el-button style="margin-top: 20px;" @click="transfer" type="button">
          {{ $t("exportYaml") }}
        </el-button>
      </div>
    </div>
    <ItemFilterDialog :value.sync="filterModal" @choose="choose" />
    <el-dialog :title="$t('yamlExport')" :visible.sync="dialogVisible">
      <div style="text-align: left;">
        <highlight-code lang="yaml" :code="yamlPreview" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t("close") }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CraftSlot from "../components/craftSlot";
import Aside from "../components/aside";
import CraftTable from "../components/craftTable";
import ItemFilterDialog from "../components/itemFilterDialog";
import Lore from "../components/lore";
import yaml from "js-yaml";
function craftJson(table, row) {
  return [
    { type: table[row][0].id.toLocaleUpperCase() },
    { type: table[row][1].id.toLocaleUpperCase() },
    { type: table[row][2].id.toLocaleUpperCase() }
  ]
    .map(_ => JSON.stringify(_))
    .join(" ");
}
export default {
  components: {
    CraftSlot,
    Aside,
    Lore,
    CraftTable,
    ItemFilterDialog
  },
  data() {
    return {
      filterModal: false,
      // customJSON mode
      itemJSON: "",
      // itemType mode,
      outputId: "",
      // ouput
      doc: "",
      dialogVisible: false,
      next: () => {}
    };
  },
  computed: {
    yamlPreview() {
      return this.doc;
    },
    craftTable() {
      return this.$store.state.craftTable;
    },
    selectedItem() {
      return this.$store.state.selectedItem;
    },
    reviveItem: {
      get() {
        return this.$store.state.reviveItem;
      },

      set(reviveItem) {
        this.$store.commit("reviveItemChange", { reviveItem });
      }
    },
    reviveWithInventory: {
      get() {
        return this.$store.state.reviveWithInventory;
      },
      set(reviveWithInventory) {
        this.$store.commit("reviveWithInventoryChange", {
          reviveWithInventory
        });
      }
    },
    itemName: {
      get() {
        return this.$store.state.itemName;
      },
      set(name) {
        this.$store.commit("itemNameChange", { name });
      }
    },
    itemType: {
      set(type) {
        this.$store.commit("typeChange", { type });
      },
      get() {
        return this.$store.state.itemType;
      }
    }
  },
  methods: {
    transfer() {
      let craft = {};
      switch (this.itemType) {
        case "ITEM":
          craft = {
            type: this.outputId.toLocaleUpperCase()
          };
          break;
        case "CUSTOM":
          try {
            craft = JSON.parse(this.itemJSON);
          } catch (e) {
            console.log(e);
          }
          break;
      }
      const doc = yaml.safeDump(
        {
          [this.itemName]: {
            "1": craftJson(this.craftTable, 0),
            "2": craftJson(this.craftTable, 1),
            "3": craftJson(this.craftTable, 2),
            craft: JSON.stringify(craft)
          }
        },
        {
          styles: {
            "!!null": "canonical"
          },
          sortKeys: true
        }
      );
      this.dialogVisible = true;
      this.doc = doc;
      console.log(this.doc);
    },
    choose(id) {
      this.next(id);
    },
    toggleModal() {
      this.next = id => this.$store.commit("selectOneItem", { key: id });
      this.filterModal = true;
    },
    toggleOutputModal() {
      this.next = id => (this.outputId = id);
      this.filterModal = true;
    }
  }
};
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .layout-nav {
    height: 61px;
  }
  .layout-body {
    flex: 1;
    text-align: left;
    .layout-body-wrap {
      margin: 0 auto;
      max-width: 800px;
    }
  }
  .config-main {
    box-sizing: border-box;
    padding: 20px;
  }
  h4 {
    margin-bottom: 8px;
    margin-top: 12px;
  }
  h5 {
    margin: 8px 0;
  }
}
</style>
