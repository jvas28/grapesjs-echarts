<template>
  <div>
    <div class="gjs-trt-traits gjs-one-bg gjs-two-color">
      <div class="gjs-traits-label trait-header">{{label}} <button @click="add" class="btn btn-icon">+</button></div>
      <div class="gjs-trt-trait__wrp">
        <div class="gjs-trt-trait" v-for="serie in series" :key="serie.id">
          <div class="gjs-field-wrp gjs-field-wrp--text" data-input>
            <div class="gjs-field gjs-field-text" data-input>
              <input type="text" placeholder="eg. 2019" v-model="serie.label" />
            </div>
          </div>
          <div class="gjs-field-wrp gjs-field-wrp--text" data-input>
            <div class="gjs-field gjs-field-text" data-input>
              <input type="text" placeholder="eg. 2000" v-model="serie.value" />
            </div>
          </div>
          <div class="gjs-field-wrp gjs-field-wrp--text" data-input>
            <button class="btn btn-icon" @click="remove(serie.id)">-</button>
          </div>
        </div>
        <div class="gjs-trt-trait save-button-wrapper" >
            <div class="gjs-field gjs-field-text" data-input>
              <button class="btn btn-full" @click="save"> Save </button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['label', 'editor','onChange'],
  data() {
    return  {
      series: [],
    };
  },
  methods: {
    add() {
      this.series.push({id: new Date().getTime(),label: 'My Bar', value:   100});
    },
    remove(serie) {
      this.series = this.series.filter(({id})=> id!==serie);
    },
    save() {
      this.onChange();
    }
    
  }
}
</script>

<style lang='scss' scoped>
  .gjs-trt-traits {
    .trait-header {
    padding: 0;
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
</style>