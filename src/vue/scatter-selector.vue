<template>
  <div>
    <div class="gjs-trt-traits gjs-one-bg gjs-two-color">
      <theme-select v-model="theme" :t="t"></theme-select>
      <div class="gjs-traits-label trait-header">
        {{ t("grapesjs-echarts.items.label") }}
        <button @click="add" class="btn btn-icon" :title="t('grapesjs-echarts.items.add')">+</button>
      </div>

      <div class="gjs-trt-trait series" v-for="serie in series" :key="serie.id">
        <div class="item">
          <color-swatch v-model="serie.color" :fallback="fallbackColor(serie)" :t="t"></color-swatch>
          <div class="gjs-field-wrp gjs-field-wrp--text" data-input>
            <div class="gjs-field gjs-field-text" data-input>
              <input type="text" :placeholder="t('grapesjs-echarts.items.name')" v-model="serie.label" />
            </div>
          </div>
          <div class="gjs-field-wrp gjs-field-wrp--text" data-input>
            <button class="btn btn-icon" :title="t('grapesjs-echarts.items.remove')" @click="removeSeries(serie.id)">-</button>
          </div>
        </div>
        <div class="gjs-trt-trait point" v-for="point in serie.points" :key="point.id">
          <div class="gjs-field-wrp gjs-field-wrp--text" data-input>
            <div class="gjs-field gjs-field-text" data-input>
              <input type="number" placeholder="x" v-model.number="point.x" />
            </div>
          </div>
          <div class="gjs-field-wrp gjs-field-wrp--text" data-input>
            <div class="gjs-field gjs-field-text" data-input>
              <input type="number" placeholder="y" v-model.number="point.y" />
            </div>
          </div>
          <button class="btn btn-icon danger" @click="removePoint(serie.id, point.id)">-</button>
        </div>
        <button class="btn btn-icon add-point" @click="addPoint(serie.id)">
          + {{ t("grapesjs-echarts.items.point") }}
        </button>
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
  },
  components: { ThemeSelect, ColorSwatch },
  data() {
    return {
      series: [],
      theme: "",
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
  },
  methods: {
    fallbackColor(serie) {
      return nextColor(this.series.indexOf(serie));
    },
    snapshot() {
      return JSON.stringify({ series: this.series, theme: this.theme });
    },
    // Called by the trait's onUpdate when the panel opens/reopens (or
    // whenever grapesjs re-syncs traits after any attribute change,
    // including the one we ourselves just saved). Snapshotting the
    // incoming value lets notify() recognize and ignore that echo
    // instead of racing a temporary suppress flag against Vue's
    // reactivity flush.
    hydrate({ series, theme }) {
      this.series = series;
      this.theme = theme;
      this.lastSaved = this.snapshot();
    },
    add() {
      const nameLabel = this.t("grapesjs-echarts.items.name");
      this.series.push({
        id: new Date().getTime(),
        label: `${nameLabel} ${this.series.length + 1}`,
        color: nextColor(this.series.length),
        points: [
          { id: new Date().getTime(), x: 10, y: 10 },
          { id: new Date().getTime() + 1, x: 20, y: 30 },
        ],
      });
    },
    removeSeries(id) {
      this.series = this.series.filter((serie) => serie.id !== id);
    },
    addPoint(seriesId) {
      const serie = this.series.find(({ id }) => id === seriesId);
      serie.points.push({ id: new Date().getTime(), x: 0, y: 0 });
    },
    removePoint(seriesId, pointId) {
      const serie = this.series.find(({ id }) => id === seriesId);
      serie.points = serie.points.filter(({ id }) => id !== pointId);
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
  .gjs-trt-trait {
    display: flex;
    width: 100%;
    margin-bottom: 10px;
    &.series {
      flex-direction: column;
      background: rgba(0, 0, 0, 0.3);
      padding: 3px;
      .item {
        display: flex;
        align-items: center;
        flex-direction: row;
        margin-bottom: 10px;
        padding: 5px;
        border-radius: 3px;
        background: rgba(255, 255, 255, 0.1);
      }
    }
    &.point {
      align-items: center;
      padding-left: 6px;
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
  }
  .add-point {
    align-self: flex-start;
    margin-left: 6px;
    font-size: 11px;
  }
  .btn {
    background: transparent;
    color: white;
    border: none;
    cursor: pointer;
    &.btn-icon {
      font-size: 20px;
    }
    &.danger {
      background: rgb(173, 94, 94);
      font-size: 14px;
    }
  }
}
</style>
