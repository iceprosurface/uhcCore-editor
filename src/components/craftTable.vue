<template>
  <div class="mc-craft">
    <div class="mc-craft__input">
      <div
        class="mc-craft__input__row"
        v-for="(row, rowIndex) in cells"
        :key="`craftTable-${row}-${rowIndex}`"
      >
        <CraftSlot
          :id="cell.id"
          v-for="(cell, cellIndex) in row"
          :key="`${rowIndex}-${cellIndex}`"
          @click="event => toggleCraftSlot(event, rowIndex, cellIndex)"
        />
      </div>
    </div>
    <!--    <div class="mc-craft__arrow"></div>-->
    <!--    <div class="mc-craft__output">-->
    <!--      <CraftSlot :id="outPut.id" />-->
    <!--    </div>-->
  </div>
</template>

<script>
import craftSlot from "./craftSlot";
export default {
  components: {
    CraftSlot: craftSlot
  },
  props: {},
  computed: {
    outPut() {
      return this.$store.state.outPut || {};
    },
    cells() {
      return (
        this.$store.state.craftTable || [
          [{}, {}, {}],
          [{}, {}, {}],
          [{}, {}, {}]
        ]
      );
    }
  },
  methods: {
    toggleCraftSlot(event, rowIndex, cellIndex) {
      this.$store.commit("toggleCraftTable", {
        rowIndex,
        cellIndex
      });
    }
  }
};
</script>

<style scoped lang="scss">
.mc-craft {
  display: block;
  width: 110px;
  position: relative;
  background-color: #c6c6c6;
  border: 2px solid;
  border-color: #dbdbdb #5b5b5b #5b5b5b #dbdbdb;
  padding: 6px;
  text-align: left;
  white-space: nowrap;
  vertical-align: bottom;
  > * {
    display: inline-block;
    vertical-align: top;
  }
  &__output {
    margin-top: 28px;
    .mc-craft__inv-slot {
      padding: 8px;
    }
  }
  &__arrow {
    background: url(https://minecraft-zh.gamepedia.com/media/8/86/Grid_layout_Arrow_%28small%29.png)
      no-repeat;
    width: 32px;
    height: 26px;
    margin: 40px 4px 0;
  }
  &__input {
    &__row {
      display: block;
    }
  }
  &__inv-slot {
    position: relative;
    display: inline-block;
    background: #8b8b8b no-repeat center center / 32px 32px;
    border: 2px solid;
    border-color: #373737 #fff #fff #373737;
    width: 32px;
    height: 32px;
    font-size: 16px;
    line-height: 1;
    text-align: left;
    vertical-align: bottom;
    &-item {
      position: relative;
      display: block;
      margin: -2px;
      padding: 2px;
      width: 32px;
      height: 32px;
    }
  }
}
</style>
