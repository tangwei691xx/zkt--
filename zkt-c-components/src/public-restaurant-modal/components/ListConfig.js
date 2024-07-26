// 预售券产品

let baseColumns = [
  {
    "name": "restaurantName",
    "header": "餐厅名称",
    "searchable": true
  },
  {
    "name": "name",
    "header": "产品名称",
    "searchable": true
  },
  {
    "name": "price",
    "header": "价格",
    filter (data) {
      return data / 100
    }
  },
  {
    "name": "status",
    "header": "产品状态",
    filter (data) {
      let json = {
        'PUBLISHED': '已上线',
        'OFFLINE': '已下线',
        'NEW': '待审核'
      }
      return json[data] || ''
    }
  },
  {
    "name": "actions",
    "header": "操作",
    "component": "Buttons",
    "buttons": [
      {
        name: '选择',
        value: 'select',
        class: 'btn-primary',
        visible (row) {
          return !row.isSelected && !row.exitActivity
        }
      },
      {
        name: '取消',
        value: 'cancel',
        class: 'btn-danger',
        visible (row) {
          return row.isSelected && !row.exitActivity
        }
      },{
        name: '已参加其他活动',
        value: 'disabled',
        disabled: true,
        class: 'btn-danger',
        visible (row) {
          return row.exitActivity
        }
      }]
  }
]


function processData(list = [], selectedArray = []) {
  list.map(item => {
    item.restaurantName = item.Restaurant.name
    let flag = false
    selectedArray.map((val) => {
      if (item.restaurant_product_id === val.restaurant_product_id) {
        flag = true
      }
    })
    if (flag) {
      item.isSelected = true
    } else {
      item.isSelected = false
    }
    if (item.activityStatus) {
      item.exitActivity = true
    } else {
      item.exitActivity = false
    }
  })
  return list
}

export default {
  'columns': baseColumns,
  'processData': processData
}
