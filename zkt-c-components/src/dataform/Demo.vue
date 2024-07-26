<template>
  <DataForm
    ref="dataForm"
    :fields="fields"
    :model="model"
    :validation="validation"
    :components="components"
    :options="options"
    :primaryKey="primaryKey"
    :urlConfig="urlConfig"
    :beforeCreateForm="beforeCreateForm"
    :beforeSubmit="beforeSubmit"
    :afterSubmit="afterSubmit"
    :showSaveBtn="showSaveBtn"
    @cancel="handleCancel"
    @change="onChange"
    />
</template>

<script>
import DataForm from './components/DataForm.vue'
import fields from './assets/fields'
import model from './assets/model'
import validation from './assets/validation'

export default {
  name: 'Demo',
  components: {
    DataForm
  },
  data () {
    return {
      fields,
      model,
      validation,
      components: {},
      options: {},
      primaryKey: 'pid',
      urlConfig: {
        add: {
          method: 'post',
          url: 'ticket-api/add'
        },
        detail: {
          method: 'get',
          url: 'ticket-api/detail'
        },
        edit: {
          method: 'post',
          url: 'ticket-api/edit'
        },
        copy: {
          method: 'post',
          url: 'ticket-api/copy'
        }
      },
      showSaveBtn: true
    }
  },
  mounted () {
    const dataForm = this.$refs.dataForm
    setTimeout(() => {
      // 更新fields字段
      dataForm.updateFields([{
        name: 'input',
        key: 'message',
        value: '呵呵呵呵呵呵呵呵'
      }])
      // 保存禁用
      this.showSaveBtn = false
    }, 1000)
  },
  methods: {
    onSubmit () {
      this.$emit('submit')
    },
    beforeCreateForm ({ model }) {
      return Promise.all([Promise.resolve(1), Promise.resolve(2)])
        .then((res) => {
          model.input = 'xxxxx'
          console.log('beforeCreateForm:', res, model)
        })
    },
    beforeSubmit (config) {
      Reflect.deleteProperty(config, 'number')
      Reflect.deleteProperty(config, 'url')
      return Promise.resolve(config)
    },
    afterSubmit (res) {
      console.log('afterSubmit:', res)
    },
    handleCancel () {
      window.history.back(-1)
    },
    onChange (key, value) {
      console.log(key, value)
    }
  }
}
</script>

<style>
</style>
