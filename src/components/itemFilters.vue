<template>
  <el-card
    class="box-card"
    body-style="box-sizing: border-box;height: auto;position: absolute;top: 60px;bottom: 0;width: 100%;"
  >
    <div slot="header" class="clearfix">
      <span>{{ $t("mcItemFilterInput") }}</span>
    </div>
    <div class="item-filter-body">
      <div class="item-filter-body-wrap">
        <div class="item-filter-body__input">
          <el-input
            v-model="keyWord"
            :placeholder="$t('filterInput')"
          ></el-input>
        </div>
        <div class="item-filter-body__list">
          <div class="table-wrap">
            <div class="table">
              <el-table
                :data="computedTable"
                style="width: 100%; height: 100%;"
                border
                height="100%"
              >
                <el-table-column prop="img" label="" width="60">
                  <template slot-scope="scope">
                    <CraftSlot :id="scope.row.key" />
                  </template>
                </el-table-column>
                <el-table-column prop="text" :label="$t('tableName')" />
                <el-table-column prop="text" :label="$t('tableOperation')">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="small"
                      @click="select(scope.row)"
                      >{{ $t("selectOperation") }}</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="pagination">
              <el-pagination
                small
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageIndex"
                :page-sizes="[20, 30, 40, 50]"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="total"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import ItemData from "./../datas/item_img.yaml";
import lodash from "lodash";
import CraftSlot from "./craftSlot";
export default {
  components: {
    CraftSlot
  },
  data() {
    return {
      pageSize: 50, // 每页大小默认值
      pageIndex: 1, // 默认第一页

      keyWord: "",
      origin: [],
      dataArr: []
    };
  },
  watch: {
    keyWord() {
      this.debouncer();
    },
    "$i18n.locale"() {
      this.loadConfig();
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
    },
    debouncer: lodash.debounce(function() {
      if (this.keyWord) {
        this.dataArr = this.origin.filter(
          v => v.key.includes(this.keyWord) || v.text.includes(this.keyWord)
        );
        return;
      }
      this.pageIndex = 1;
      this.dataArr = this.origin;
    }, 150),
    select(row) {
      this.$emit("choose", row.key);
    },
    loadConfig() {
      this.dataArr = this.origin = lodash.map(ItemData, (img, key) => ({
        img,
        key,
        text: String(this.$t(key))
      }));
    }
  },
  computed: {
    total() {
      return this.dataArr.length;
    },
    computedTable() {
      return this.dataArr.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
    }
  },
  mounted() {
    this.loadConfig();
  }
};
</script>
<style>
.el-table .warning-row {
  background: oldlace;
}
</style>
<style scoped lang="scss">
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.clearfix {
  &:before,
  &:after {
    display: table;
    content: "";
  }
  &:after {
    clear: both;
  }
}
.box-card {
  width: 480px;
  height: 100%;
  position: relative;
  margin: 0 auto;
}
.item-filter-body {
  text-align: left;
  height: 100%;

  .item-filter-body-wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  &__input {
    height: 50px;
  }

  &__list {
    flex: 1;
    overflow: hidden;
    img {
      vertical-align: middle;
      width: 24px;
      height: 24px;
      display: block;
      margin: 0 auto;
    }
    * {
      box-sizing: border-box;
    }
    > div {
      height: 100%;
    }
  }
  .item-img {
    width: 28px;
    height: 28px;
    margin-right: 15px;
  }
  .item-text,
  .item-img {
    display: inline-block;
    vertical-align: middle;
  }
}
.table-wrap {
  display: flex;
  height: 100%;
  flex-direction: column;
  .table {
    flex: 1;
    overflow: hidden;
  }
  .pagination {
    height: 60px;
  }
}
</style>
