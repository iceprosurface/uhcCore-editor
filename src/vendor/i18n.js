import VueI18n from "vue-i18n";
import Vue from "vue";
import en_main from "./../locale/en.yaml";
import en_item from "./../locale/en.yaml";
import zh_cn_main from "./../locale/zh_cn.yaml";
import zh_cn_item from "./../locale/item_zh_cn.yaml";

Vue.use(VueI18n);

export default new VueI18n({
  // 设置地区
  locale: "en",
  // 设置地区信息
  messages: {
    en: {
      ...en_main,
      ...en_item
    },
    zh_cn: {
      ...zh_cn_main,
      ...zh_cn_item
    }
  }
});
