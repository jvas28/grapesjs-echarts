<template>
  <div class="gjs-trt-trait" style="display:flex; flex-direction: column;">
    <div
      class="gjs-field-wrp gjs-field-wrp--text"
      style="display:flex; flex-direction: row;"
      data-input
      v-for="(v, index) in value"
      :key="index"
    >
      <div v-if="lead" class="gjs-field gjs-field-text" data-input>
        <input type="text" placeholder="eg. 01-28-1994" v-model="v.category" />
      </div>
      <div v-if="!lead" class="gjs-label-wrp" data-label>
        <div class="gjs-label" title="Category">{{v.category}}</div>
      </div>
      <div class="gjs-field gjs-field-text" data-input>
        <input type="text" placeholder="eg. 2000" v-model="v.value" />
      </div>
      <div v-if="lead && index > 0" class="gjs-field gjs-field-text" data-input>
        <button class="btn btn-icon danger" @click="remove(v.id)">-</button>
      </div>
    </div>
    <div
      class="gjs-field-wrp gjs-field-wrp--text"
      style="display:flex; width:100%; margin-top:5px;"
      v-if="lead"
    >
      <div class="gjs-field gjs-field-text" style="width:100%;" data-input>
        <input type="button" value="+" @click="add" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value", "t", "lead"],
  methods: {
    add() {
      const categoryLabel = this.t("grapesjs-echarts.items.category");
      let category = `${categoryLabel} ${this.value.length + 1}`;
      const categories = this.value.map(({ category }) => category);
      while (categories.includes(category)) {
        category += "n";
      }
      const values = [
        ...this.value,
        {
          id: new Date().getTime(),
          category,
          value: 100
        }
      ];
      this.$emit("input", values);
      if (this.lead) {
        this.$emit(
          "categoriesChange",
          values.map(({ category }) => category)
        );
      }
    },
    remove(serie) {
      const removed = this.value.filter(({ id }) => id !== serie);
      this.$emit("input", removed);
      if (this.lead) {
        this.$emit(
          "categoriesChange",
          removed.map(({ category }) => category)
        );
      }
    },
    save() {
      this.$emit("input", this.values);
    }
  }
};
</script>

<style lang="scss" scoped>
.gjs-trt-trait {
  justify-content: flex-start;
  padding: 0px 5px;
  font-weight: lighter;
  align-items: center;
  text-align: left;
  .gjs-label {
    font-size: 10px;
  }
}
.gjs-field {
  margin-right: 3px;
  margin-bottom: 5px;
  height: 100%;
}
.btn {
  background: transparent;
  color: white;
  border: none;
  cursor: pointer;
  &.danger {
    background: rgb(173, 94, 94);
  }
}
</style>