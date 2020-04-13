<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="config">{{ $t("configEdit") }}</el-menu-item>
    <el-menu-item index="kit">{{ $t("kitEdit") }}</el-menu-item>
    <el-submenu index="null">
      <template slot="title">🌐</template>
      <el-menu-item @click="switchLang('zh_cn')">中文</el-menu-item>
      <el-menu-item @click="switchLang('en')">english</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import i18n from "../vendor/i18n";
export default {
  props: ["activeIndex"],
  computed: {},
  methods: {
    handleSelect(value) {
      if (value === "kit") {
        this.$notify({
          title: this.$t("tip"),
          message: this.$t("developing"),
          duration: 3000
        });
        return false;
      }
      if (!value || value === "null") {
        return false;
      }
      this.$router.push(value);
    },
    switchLang(lang) {
      i18n.locale = lang;
    }
  }
};
</script>

<style scoped></style>
