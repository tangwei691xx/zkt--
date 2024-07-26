// 预售券产品

let ticketColumns = [
  {
    'name': 'categoryName',
    'header': '预售券分类'
  },
  {
    'name': 'actions',
    'header': '操作',
    'component': 'Buttons',
    'buttons': [
      {
        name: '选择',
        value: 'select',
        class: 'btn-primary',
        visible (row) {
          return !row.isSelected && !row.disabled && !row.exitActivity
        }
      },
      {
        name: '取消',
        value: 'cancel',
        class: 'btn-danger',
        visible (row) {
          return row.isSelected && !row.disabled && !row.exitActivity
        }
      }, {
        name: '已配置分账',
        value: 'disabled',
        disabled: true,
        class: 'btn-danger',
        visible (row) {
          return row.disabled
        }
      }, {
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

let ticketColumns19 = [
  {
    'name': 'productName',
    'header': '产品名称',
    'searchable': true
  },
  {
    'name': 'salePrice',
    'header': '价格'
  },
  {
    'name': 'totalInventory',
    'header': '库存'
  },
  {
    'name': 'statusName',
    'header': '产品状态'
  },
  {
    'name': 'actions',
    'header': '操作',
    'component': 'Buttons',
    'buttons': [
      {
        name: '选择',
        value: 'select',
        class: 'btn-primary',
        visible (row) {
          return !row.isSelected && !row.disabled
        }
      },
      {
        name: '取消',
        value: 'cancel',
        class: 'btn-danger',
        visible (row) {
          return row.isSelected && !row.disabled
        }
      },
      {
        name: '多规格产品不支持',
        value: 'disabled',
        disabled: true,
        class: 'btn-danger',
        visible (row) {
          return row.productSpecType === 1 && row.disabled
        }
      },
      {
        name: '多店通用不支持',
        value: 'disabled',
        disabled: true,
        class: 'btn-danger',
        visible (row) {
          return row.isBrandMultiple === 1 && row.disabled
        }
      },
      {
        name: '不支持每日限时',
        value: 'disabled',
        disabled: true,
        class: 'btn-danger',
        visible (row) {
          return row.productStatusVmo && row.productStatusVmo.limitTime === 1 && row.disabled
        }
      },
      {
        name: '不支持每日限量',
        value: 'disabled',
        disabled: true,
        class: 'btn-danger',
        visible (row) {
          return row.productStatusVmo && row.productStatusVmo.limitSell === 1 && row.disabled
        }
      },
      {
        name: '已参加其他活动',
        value: 'disabled',
        disabled: true,
        class: 'btn-danger',
        visible (row) {
          return row.exitActivity
        }
      }
    ]
  }
]

let ticketPackageColumns = [
  {
    'name': 'categoryName',
    'header': '预售券分类'
  },
  {
    'name': 'actions',
    'header': '操作',
    'component': 'Buttons',
    'buttons': [
      {
        name: '选择',
        value: 'select',
        class: 'btn-primary',
        visible (row) {
          return !row.isSelected && !row.disabled && !row.exitActivity
        }
      },
      {
        name: '取消',
        value: 'cancel',
        class: 'btn-danger',
        visible (row) {
          return row.isSelected && !row.disabled
        }
      }, {
        name: '已配置分账',
        value: 'disabled',
        disabled: true,
        class: 'btn-danger',
        visible (row) {
          return row.disabled
        }
      }, {
        name: '已参加其他活动',
        value: 'disabled',
        disabled: true,
        class: 'btn-danger',
        visible (row) {
          return row.exitActivity && !row.isSelected
        }
      }]
  }
]
function ticketProcessData (list, selectedArray, type) {
  if (!list) {
    list = []
  }
  let obj = {}
  selectedArray.map(item => {
    obj[item.ticketCategoryId] = true
  })
  list.map(item => {
    if (obj[item.ticketCategoryId]) {
      item.isSelected = true
    } else {
      item.isSelected = false
    }

    if (item.supplierAccountStatus == 1) {
      item.disabled = true
    } else {
      item.disabled = false
    }
    if ((type == 23 || type == 24 || type == 25 || type == 32) && item.activityTypes && item.activityTypes.length > 0) {
      item.exitActivity = true
    } else {
      item.exitActivity = false
    }
  })
  return list
}
function ticketProcessData19 (list, selectedArray, type) {
  if (!list) {
    list = []
  }
  let obj = {}
  selectedArray.map(item => {
    obj[item.ticketCategoryId] = true
  })
  list.map(item => {
    if (obj[item.ticketCategoryId]) {
      item.isSelected = true
    } else {
      item.isSelected = false
    }
    item.disabled = [
      item.productSpecType === 1,
      item.isBrandMultiple === 1,
      item.productStatusVmo && item.productStatusVmo.limitTime === 1,
      item.productStatusVmo && item.productStatusVmo.limitSell === 1
    ].some(itemInner => itemInner)
    if (item.activityTypes && item.activityTypes.length > 0) {
      item.exitActivity = true
      item.disabled = true
    } else {
      item.exitActivity = false
    }
  })
  return list
}

export default {
  13: {
    'columns': ticketPackageColumns,
    'processData': ticketProcessData
  },
  19: {
    'columns': ticketColumns19,
    'processData': ticketProcessData19
  },
  24: {
    'columns': ticketPackageColumns,
    'processData': ticketProcessData
  },
  'base': {
    'columns': ticketColumns,
    'processData': ticketProcessData
  }
}
