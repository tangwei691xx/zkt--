// 预售券产品

let ticketColumns = [
  {
    "name": "hotelName",
    "header": "商户名称"
  },
  {
    "name": "productName",
    "header": "产品名称",
    "searchable": true,
    "component": "TransTag"
  },
  {
    "name": "salePrice",
    "header": "价格"
  },
  {
    "name": "totalInventory",
    "header": "库存"
  },
  {
    "name": "statusName",
    "header": "产品状态"
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
      },{
        name: '已配置分账',
        value: 'disabled',
        disabled: true,
        class: 'btn-danger',
        visible (row) {
          return row.disabled
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
/* 储值卡 */
let cardPackageColumns = [
  {
    "name": "hotelName",
    "header": "商户名称"
  },
  {
    "name": "categoryName",
    "header": "储值卡名称"
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
      },{
        name: '已配置分账',
        value: 'disabled',
        disabled: true,
        class: 'btn-danger',
        visible (row) {
          return row.disabled
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

let ticketColumns19 = [
  {
    "name": "productName",
    "header": "产品名称",
    "searchable": true
  },
  {
    "name": "salePrice",
    "header": "价格"
  },
  {
    "name": "totalInventory",
    "header": "库存"
  },
  {
    "name": "statusName",
    "header": "产品状态"
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

// /* 操作配置 */
let configBootom = {
  name: "actions",
  header: "操作",
  component: "Buttons",
  buttons: [
    {
      name: "选择",
      value: "select",
      class: "btn-primary",
      visible(row) {
        return !row.isSelected && !row.disabled && !row.exitActivity;
      },
    },
    {
      name: "取消",
      value: "cancel",
      class: "btn-danger",
      visible(row) {
        return row.isSelected && !row.disabled && !row.exitActivity;
      },
    },
    {
      name: "已配置分账",
      value: "disabled",
      disabled: true,
      class: "btn-danger",
      visible(row) {
        return row.disabled;
      },
    },
    {
      name: "已参加其他活动",
      value: "disabled",
      disabled: true,
      class: "btn-danger",
      visible(row) {
        return row.exitActivity;
      },
    },
  ],
};

let ticketPackageColumns = [
  {
    "name": "hotelName",
    "header": "商户名称"
  },
  {
    "name": "posterTitle",
    "header": "产品名称",
    "searchable": true,
    "component": "TransTag"
  },
  {
    "name": "salePrice",
    "header": "价格"
  },
  {
    "name": "totalInventory",
    "header": "库存"
  },
  {
    "name": "statusName",
    "header": "产品状态"
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
      },{
        name: '已配置分账',
        value: 'disabled',
        disabled: true,
        class: 'btn-danger',
        visible (row) {
          return row.disabled
        }
      },{
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
// 客服套餐
const customerServicePackage = [
  {
    name: "ticketProductId",
    header: "产品ID",
  },
  {
    name: "productName",
    header: "产品名称",
    searchable: true,
    component: "Rp"
  },
  {
    name: "rpNames",
    header: "关联房型促销",
    component: "Br",
  },
  {
    name: "minSalePrice",
    header: "售价",
    filter:function(val){return `${val}起`}
  },
  {
    name: "status",
    header: "产品状态",
    filter: function (val) {
      let v;
      switch (val) {
        case "new":
          v = "待审核";
          break;
        case "published":
          v = "已上线";
          break;
        case "offline":
          v = "已下线";
          break;
        case "share":
          v = "共享";
          break;
        default:
          v = "-";
          break;
      }
      return v;
    },
  },
  {
    name: "actions",
    header: "操作",
    component: "Buttons",
    buttons: [
      {
        name: "选择",
        value: "select",
        class: "btn-primary",
        visible(row) {
          return !row.isSelected && !row.disabled && !row.exitActivity;
        },
      },
      {
        name: "取消",
        value: "cancel",
        class: "btn-danger",
        visible(row) {
          return row.isSelected && !row.disabled;
        },
      },
      {
        name: "已配置分账",
        value: "disabled",
        disabled: true,
        class: "btn-danger",
        visible(row) {
          return row.disabled;
        },
      },
      {
        name: "已参加其他活动",
        value: "disabled",
        disabled: true,
        class: "btn-danger",
        visible(row) {
          return row.exitActivity && !row.isSelected;
        },
      },
    ],
  },
];
function ticketProcessData(list, selectedArray, type, prop, exitActivityProp) {
  if (!list) {
    list = []
  }
  let obj = {}
  selectedArray.map(item => {
    obj[item[prop]] = true
  })
  list.map(item => {
    if (obj[item[prop]]) {
      item.isSelected = true
    } else {
      item.isSelected = false
    }
/* 储值卡通过ifSetSeparate判断是否已配置分账 */
    if (item.supplierAccountStatus == 1 || item.ifSetSeparate == 1) {
      item.disabled = true
    } else {
      item.disabled = false
    }

    item.exitActivity = false
    if ([23, 24, 25, 32].indexOf(type) > -1) {
      if (Array.isArray(item[exitActivityProp]) && item[exitActivityProp].length > 0) {
        item.exitActivity = true
      }
    } else {
      if (Array.isArray(item[exitActivityProp]) && item[exitActivityProp].length > 0) {
        item.exitActivity = true
      }
    }
  })
  return list
}
function ticketProcessData19(list, selectedArray, type, prop) {
  if (!list) {
    list = []
  }
  let obj = {}
  selectedArray.map(item => {
    obj[item[prop]] = true
  })
  list.map(item => {
    if (obj[item[prop]]) {
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
  29:{
    columns: customerServicePackage,
    processData: ticketProcessData,
  },
  /* 储值卡 列 */
  30: {
    'columns': cardPackageColumns,
    'processData': ticketProcessData
  },
  'base': {
    'columns': ticketColumns,
    'processData': ticketProcessData
  },
  configBootom,
}
