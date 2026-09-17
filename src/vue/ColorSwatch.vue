<template>
  <div class="color-swatch">
    <input
      type="color"
      :value="value || fallback"
      @input="$emit('input', $event.target.value)"
      data-input
    />
    <button
      v-if="value"
      type="button"
      class="btn btn-icon clear"
      :title="t('grapesjs-echarts.items.autoColor')"
      @click="$emit('input', null)"
    >
      &times;
    </button>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: String, default: null },
    fallback: { type: String, default: "#5470c6" },
    t: { type: Function, required: true },
  },
};
</script>

<style lang="scss" scoped>
.color-swatch {
  display: flex;
  align-items: center;
  input[type="color"] {
    width: 28px;
    height: 24px;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
  }
  .clear {
    padding: 0 4px;
    font-size: 14px;
    line-height: 1;
  }
}
</style>
