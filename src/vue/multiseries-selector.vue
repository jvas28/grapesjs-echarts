<template>
  <div>
    <div class="gjs-trt-traits gjs-one-bg gjs-two-color">
      <div class="gjs-trt-trait">
        <div class="gjs-label-wrp" data-label>
          <div class="gjs-label" title="Id">{{t('grapesjs-echarts.theme.label')}}</div>
        </div>
        <div class="gjs-field-wrp gjs-field-wrp--text">
          <div class="gjs-field gjs-field-text">
            <select v-model="theme" data-input>
              <option value disabled selected>{{t("grapesjs-echarts.theme.placeholder")}}</option>
              <option value="macarons">Macarons</option>
              <option value="dark">Dark</option>
              <option value="dark-blue">Dark Blue</option>
            </select>
          </div>
        </div>
      </div>
      <div class="gjs-traits-label trait-header">
        {{t('grapesjs-echarts.items.label')}}
        <button @click="add" class="btn btn-icon">+</button>
      </div>

      <div class="gjs-trt-trait series" v-for="(serie, index) in series" :key="serie.id">
        <div class="item">
          <div class="gjs-field-wrp gjs-field-wrp--text" data-input>
            <div class="gjs-field gjs-field-text" data-input>
              <input type="text" placeholder="eg. 2019" v-model="serie.label" />
            </div>
          </div>
          <div class="gjs-field-wrp gjs-field-wrp--text" data-input>
            <div class="gjs-field gjs-field-text" data-input>
              <input type="text" placeholder="Color" v-model="serie.color" />
            </div>
          </div>
          <div class="gjs-field-wrp gjs-field-wrp--text" data-input>
            <button class="btn btn-icon" @click="remove(serie.id)">-</button>
          </div>
        </div>
        <series-values
          v-model="serie.values"
          :t="t"
          :lead="index===0"
          @categoriesChange="updateCategories"
        ></series-values>
      </div>
      <div class="gjs-trt-trait save-button-wrapper">
        <div class="gjs-field gjs-field-text" data-input>
          <button class="btn btn-full" @click="save">{{t('grapesjs-echarts.items.save')}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import values from "./values.vue";
export default {
  props: ["t", "editor", "onChange"],
  components: {
    "series-values": values
  },
  data() {
    return {
      series: [],
      categories: [],
      theme: ""
    };
  },
  watch: {
    categories(categories) {
      const categoryLabel = this.t("grapesjs-echarts.items.category");
      const series = this.series;
      const lead = series[0];
      this.series = series.map(serie => {
        if (lead.id === serie.id) return serie;
        return {
          ...serie,
          values: categories.map((search, index) => {
            const found = serie.values.find(({ category }) => {
              return search === category;
            });
            console.log({ ...found });
            if (found) {
              return { ...found };
            }
            return {
              id: new Date().getTime(),
              category: `${categoryLabel} ${index + 1}`,
              value: 100
            };
          })
        };
      });
    }
  },
  methods: {
    updateCategories(categories) {
      this.categories = categories;
    },
    add() {
      const categoryLabel = this.t("grapesjs-echarts.items.category");
      const nameLabel = this.t("grapesjs-echarts.items.name");
      this.series.push({
        id: new Date().getTime(),
        label: `${nameLabel} ${this.series.length + 1}`,
        values: [
          {
            id: new Date().getTime(),
            category: `${categoryLabel} 1`,
            value: 100
          }
        ],
        color: null
      });
    },
    remove(serie) {
      this.series = this.series.filter(({ id }) => id !== serie);
    },
    save() {
      this.onChange();
    }
  }
};
</script>

<style lang='scss' scoped>
.gjs-trt-traits {
  .gjs-trt-trait {
    display: flex;
    &.series {
      flex-direction: column;
      background: rgba(0, 0, 0, 0.3);
      .item {
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;
        padding: 5px;
        border-radius: 3px;
        background: rgba(255, 255, 255, 0.1);
      }
    }
    margin-bottom: 10px;
    .trait-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .gjs-field-wrp {
      margin: 2px;
    }
    .save-button-wrapper {
      width: 100%;
      .gjs-field {
        width: calc(100% - 12px);
      }
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
}
</style>