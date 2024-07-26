<template>
  <div class="zkt-dataform">
    <zkt-form 
      ref="_zktForm"
      v-model="model"
      :fields="fields"
      :options="options"
      :components="components"
      :validation="_validateWrapper()"
      @change="_onChange"
      />
    <div class="zkt-group row">
      <div class="col-md-offset-2">
        <button type="button" v-if="showSaveBtn" class="btn btn-primary btn-lg save-btn" @click="onSubmit">保存</button>
        <button type="button" class="btn btn-default btn-lg" @click="_handleCancel">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZktDataForm',
  props: {
    fields: {
      type: Array,
      default () {
        return []
      }
    },
    model: {
      type: Object,
      default () {
        return {}
      }
    },
    validation: {
      type: [Object, Function],
      default () {
        return {}
      }
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    components: {
      type: Object,
      default () {
        return {}
      }
    },
    primaryKey: {
      type: String,
      default: '',
      required: true
    },
    urlConfig: {
      type: Object,
      default () {
        return {}
      }
    },
    beforeCreateForm: {
      type: Function,
      default () {
        return function beforeCreateForm () {
          return Promise.resolve()
        }()
      }
    },
    beforeSubmit: {
      type: Function,
      default () {
        return (() => {
          return Promise.resolve(this.model)
        })()
      }
    },
    afterSubmit: {
      type: Function,
      default () {
        return function afterSubmit () {
          return Promise.resolve('ok')
        }()
      }
    },
    showSaveBtn: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    mode () {
      return this.$route.params.mode || 'add'
    },
    id () {
      if (this.mode !== 'add' && this.primaryKey) {
        return this.$route.params[this.primaryKey] || this.$route.query[this.primaryKey]
      }
      return ''
    },
    reqParams () {
      return this.urlConfig[this.mode]
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    this.beforeCreateForm(this)
      .then(() => {
        if (this.id) {
          this._getDetail()
        }
      })
  },
  methods: {
    getForm () {
      return this.$refs._zktForm
    },
    onSubmit () {
      const form = this.$refs._zktForm
      form.validate()
      setTimeout(() => {
        if (!form.$v.$error) {
          this._save()
        }
      }, 100)
    },
    updateFields (configs = []) {
      configs.forEach(config => {
        const { name, key, value } = config
        this._updateField(name, key, value)
      })
    },
    throwCustomError (name, value) {
      this._updateField(name, 'message', value)
      return Promise.reject(new Error()).catch(() => {})
    },
    _validateWrapper () {
      if (typeof this.validation === 'function') {
        return this.validation(this.throwCustomError)
      }
      return this.validation
    },
    _updateField (name, key, value) {
      const field = window._.find(this.fields, { name })
      field[key] = value
    },
    _getDetail () {
      const { url, method } = this.urlConfig.detail
      return this._fetch({
        url,
        method,
        params: {
          [this.primaryKey]: this.id
        }
      })
    },
    _save () {
      const { url, method } = this.reqParams
      return this.beforeSubmit(this.model)
        .then((config) => {
          return this._fetch({
            url,
            method,
            params: config
          })
        })
        .then((res) => {
          return this.afterSubmit(res)
        })
    },
    _tip () {
    },
    _fetch ({ url, method, params }) {
      if (method === 'get') {
        params = { params }
      }
      return this.$http[method](url, params)
    },
    _handleCancel () {
      this.$emit('cancel')
    },
    _onChange (key, value) {
      this.$emit('change', key, value)
    }
  }
}
</script>

<style scoped>
  .zkt-dataform .save-btn {
    margin: 10px;
  }
  .zkt-dataform .zkt-group {
    margin-top: 50px;
  }
</style>
