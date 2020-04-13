<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12">
        <h5>{{ $t("input") }}</h5>
        <div class="grid-content ">
          <el-input
            type="textarea"
            :rows="2"
            :placeholder="$t('filterInput')"
            v-model="val"
          />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content ">
          <h5>{{ $t("preview") }}</h5>
          <div v-html="previews" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ["value"],
  computed: {
    val: {
      set(v) {
        this.$emit("update:value", v);
      },
      get() {
        return this.value;
      }
    },
    previews() {
      return this.val
        .split(/\n+/)
        .map(line => {
          let str = "";
          let end = "";
          for (let index = 0; index < line.length; index++) {
            let char = line[index];
            let nextChar = line[index + 1];
            if (char === "&") {
              switch (nextChar) {
                case "0":
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                case "a":
                case "b":
                case "c":
                case "d":
                case "e":
                case "f":
                  str += `<span class="c${nextChar}">`;
                  end = `</span>${end}`;
                  index++;
                  break;
                case "l":
                  str += `<b>`;
                  end = `</b>${end}`;
                  index++;
                  break;
                case "o":
                  str += `<i>`;
                  end = `</i>${end}`;
                  index++;
                  break;
                case "n":
                  str += `<u>`;
                  end = `</u>${end}`;
                  index++;
                  break;
                case "m":
                  str += `<del>`;
                  end = `</del>${end}`;
                  index++;
                  break;
              }
            } else {
              str += char;
            }
          }
          return str + end + "<br/>";
        })
        .join("");
    }
  }
};
</script>

<style lang="scss">
$colors: (
  0: #000000,
  1: #0000aa,
  2: #00aa00,
  3: #00aaaa,
  4: #aa0000,
  5: #aa00aa,
  6: #ffaa00,
  7: #aaaaaa,
  8: #555555,
  9: #5555ff,
  a: #55ff55,
  b: #55ffff,
  c: #ff5555,
  d: #ff55ff,
  e: #ffff55,
  f: #ffffff
);
@each $key, $color in $colors {
  .c#{$key} {
    color: $color;
  }
  .b#{$key} {
    background-color: $color;
  }
}
</style>
<style scoped>
h5 {
  margin: 8px 0;
}
</style>
