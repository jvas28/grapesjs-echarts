<template>
  <div class="gjs-trt-trait" style="display:flex; flex-direction: column;">
    <div
      class="gjs-field-wrp gjs-field-wrp--text"
      style="display:flex; flex-direction: row;"
      data-input
      v-for="(v, index) in value"
      :key="index"
    >
      <div class="gjs-field gjs-field-text" data-input>
        <input type="text" placeholder="eg. 01-28-1994" :value="v.category" />
      </div>
      <div class="gjs-field gjs-field-text" data-input>
        <input type="text" placeholder="eg. 2000" :value="v.value" />
      </div>
    </div>
    <div
      class="gjs-field-wrp gjs-field-wrp--text"
      style="display:flex; width:100%; margin-top:5px;"
    >
      <div class="gjs-field gjs-field-text" style="width:100%;" data-input>
        <input type="button" value="+" @click="add" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value", "t"],
  methods: {
    add() {
      const categoryLabel = this.t("grapesjs-echarts.items.category");
      this.$emit("input", [
        ...this.value,
        {
          category: `${categoryLabel} ${this.value.length + 1}`,
          value: 100
        }
      ]);
    },
    typing(index) {
      return e => {
        this.values[index] = e.target.value;
      };
    },
    save() {
      this.$emit("input", this.values);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>