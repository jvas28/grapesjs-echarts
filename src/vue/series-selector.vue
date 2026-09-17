<template>
  <div>
    <div class="gjs-trt-traits gjs-one-bg gjs-two-color">
      <theme-select v-model="theme" :t="t"></theme-select>
      <div v-if="showRange" class="gjs-trt-trait range">
        <div class="gjs-field-wrp gjs-field-wrp--text" data-input>
          <div class="gjs-label-wrp" data-label>
            <div class="gjs-label">{{ t("grapesjs-echarts.items.min") }}</div>
          </div>
          <div class="gjs-field gjs-field-text" data-input>
            <input type="number" v-model.number="min" />
          </div>
        </div>
        <div class="gjs-field-wrp gjs-field-wrp--text" data-input>
          <div class="gjs-label-wrp" data-label>
            <div class="gjs-label">{{ t("grapesjs-echarts.items.max") }}</div>
          </div>
          <div class="gjs-field gjs-field-text" data-input>
            <input type="number" v-model.number="max" />
          </div>
        </div>
      </div>
      <div class="gjs-traits-label trait-header">
        {{t('grapesjs-echarts.items.label')}}
        <button @click="add" class="btn btn-icon" :title="t('grapesjs-echarts.items.add')">+</button>
      </div>
      <div class="gjs-trt-trait item" v-for="(serie, index) in series" :key="serie.id">
        <color-swatch v-model="serie.color" :fallback="fallbackColor(index)" :t="t"></color-swatch>
        <div class="gjs-field-wrp gjs-field-wrp--text" data-input>
          <div class="gjs-field gjs-field-text" data-input>
            <input type="text" :placeholder="t('grapesjs-echarts.items.name')" v-model="serie.label" />
          </div>
        </div>
        <div class="gjs-field-wrp gjs-field-wrp--text" data-input>
          <div class="gjs-field gjs-field-text" data-input>
            <input type="number" placeholder="eg. 2000" v-model.number="serie.value" />
          </div>
        </div>
        <div class="gjs-field-wrp gjs-field-wrp--text" data-input>
          <button class="btn btn-icon" :title="t('grapesjs-echarts.items.remove')" @click="remove(serie.id)">-</button>
        </div>
      </div>
      <div v-if="!series.length" class="gjs-trt-trait empty-state">
        {{ t("grapesjs-echarts.items.empty") }}
      </div>
    </div>
  </div>
</template>

<script>
import debounce from "lodash/debounce";
import ThemeSelect from "./ThemeSelect.vue";
import ColorSwatch from "./ColorSwatch.vue";
import nextColor from "./palette";

export default {
  props: {
    t: { type: Function, required: true },
    editor: { type: Object, required: true },
    onChange: { type: Function, required: true },
    showRange: { type: Boolean, default: false },
  },
  components: { ThemeSelect, ColorSwatch },
  data() {
    return {
      series: [],
      theme: "",
      min: null,
      max: null,
    };
  },
  watch: {
    series: {
      deep: true,
      handler() {
        this.notify();
      },
    },
    theme() {
      this.notify();
    },
    min() {
      this.notify();
    },
    max() {
      this.notify();
    },
  },
  methods: {
    fallbackColor(index) {
      return nextColor(index);
    },
    snapshot() {
      return JSON.stringify({
        series: this.series,
        theme: this.theme,
        min: this.min,
        max: this.max,
      });
    },
    // Called by the trait's onUpdate when the panel opens/reopens (or
    // whenever grapesjs re-syncs traits after any attribute change,
    // including the one we ourselves just saved). Snapshotting the
    // incoming value lets notify() recognize and ignore that echo
    // instead of racing a temporary suppress flag against Vue's
    // reactivity flush.
    hydrate({ series, theme, min, max }) {
      this.series = series;
      this.theme = theme;
      this.min = min;
      this.max = max;
      this.lastSaved = this.snapshot();
    },
    add() {
      const categoryLabel = this.t("grapesjs-echarts.items.category");
      this.series.push({
        id: new Date().getTime(),
        label: `${categoryLabel} ${this.series.length + 1}`,
        value: 100,
        color: nextColor(this.series.length),
      });
    },
    remove(serie) {
      this.series = this.series.filter(({ id }) => id !== serie);
    },
    notify() {
      if (this.snapshot() === this.lastSaved) return;
      this.debouncedChange();
    },
    save() {
      this.lastSaved = this.snapshot();
      this.onChange();
    },
  },
  created() {
    this.lastSaved = this.snapshot();
    this.debouncedChange = debounce(this.save, 400);
  },
};
</script>

<style lang="scss" scoped>
.gjs-trt-traits {
  .trait-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .gjs-trt-trait.item {
    display: flex;
    align-items: center;
  }
  .gjs-trt-trait.range {
    display: flex;
    flex-direction: row;
    .gjs-field-wrp {
      flex: 1;
    }
  }
  .gjs-field-wrp {
    margin: 2px;
  }
  .empty-state {
    opacity: 0.6;
    font-size: 11px;
    font-style: italic;
    padding: 6px 2px;
  }
  .btn {
    background: transparent;
    color: white;
    border: none;
    cursor: pointer;
    &.btn-icon {
      font-size: 20px;
    }
    &.btn-full {
      width: 100%;
      font-size: 14px;
    }
  }
}
</style>
