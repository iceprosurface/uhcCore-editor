<template>
  <div>
    <el-dialog
      :title="$t('filterDialog')"
      :visible.sync="show"
      :fullscreen="true"
      custom-class="filter-dialog"
    >
      <ItemFilters @choose="choose" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="show = false">{{ $t("cancel") }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ItemFilters from "./itemFilters";
export default {
  props: {
    value: {
      default: false,
      required: true
    }
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("update:value", v);
      }
    }
  },
  methods: {
    choose(v) {
      this.$emit("choose", v);
      this.show = false;
    }
  },
  components: {
    ItemFilters
  }
};
</script>

<style lang="scss">
.filter-dialog {
  display: flex;
  flex-direction: column;
  .el-dialog__body {
    flex: 1;
  }
}
</style>
