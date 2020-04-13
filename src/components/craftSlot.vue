<template>
  <div class="mc-craft__inv-slot" @click="event => $emit('click', event)">
    <div class="mc-craft__inv-slot-item">
      <img :src="img" alt="" v-if="!pos" />
      <span
        v-else
        :style="{
          backgroundImage: `url(${img}})`,
          backgroundPosition: this.pos
        }"
      />
    </div>
  </div>
</template>

<script>
import ItemData from "./../datas/item_img.yaml";

export default {
  props: ["id"],
  data() {
    return {
      itemData: ItemData
    };
  },
  computed: {
    pos() {
      if (this.itemData[this.id]) {
        console.log(this.itemData[this.id].pos);
        return this.itemData[this.id].pos;
      }
      return false;
    },
    img() {
      if (this.itemData[this.id]) {
        return this.itemData[this.id].img || this.itemData[this.id] || "";
      }
      return "";
    }
  }
};
</script>

<style scoped lang="scss">
.mc-craft__inv-slot {
  display: inline-block;
  vertical-align: middle;
  position: relative;
  span {
    display: inline-block;
    vertical-align: text-top;
    height: 16px;
    width: 16px;
    background-repeat: no-repeat;
  }
}
</style>
