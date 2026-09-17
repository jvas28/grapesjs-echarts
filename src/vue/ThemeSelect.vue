<template>
  <div class="gjs-trt-trait">
    <div class="gjs-label-wrp" data-label>
      <div class="gjs-label" title="Theme">{{ t("grapesjs-echarts.theme.label") }}</div>
    </div>
    <div class="gjs-field-wrp gjs-field-wrp--text">
      <div class="gjs-field gjs-field-text">
        <select :value="value" @change="$emit('input', $event.target.value)" data-input>
          <option value="">{{ t("grapesjs-echarts.theme.placeholder") }}</option>
          <option v-for="theme in themes" :key="theme.value" :value="theme.value">
            {{ theme.label }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import themes from "./themes";
export default {
  props: {
    value: { type: String, default: "" },
    t: { type: Function, required: true },
  },
  data() {
    return { themes };
  },
};
</script>
