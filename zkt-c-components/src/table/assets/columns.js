export default [
  {
    name: "name",
    header: "姓名",
    sortable: true,
    // "filters": "replace|hello"
    component: "links"
  },
  {
    name: "isAdmin",
    header: "管理员",
    options: [0, 1]
    // [
    //   {
    //     label: "是",
    //     value: '1'
    //   },
    //   {
    //     label: "否",
    //     value: '0'
    //   }
    // ]
  },
  {
    name: "tel",
    header: "电话",
    sortable: true,
    searchable: true,
    style: {
      color: "#0f0"
    },
    filter(value, row) {
      return value.replace(/\*/g, "$");
    },
    tipContent: {
      type: "popover",
      content:
        "<div>slkdjflksjdflkjak;lsdjflkjasdl;fk阿卡丽时间到了付款建设路口；大姐夫；拉克丝京东方数量等会计法拉克丝京东方离开；加速度数量等会计分录卡世纪东方；卡拉坚实的<br>234234</div>"
    }
  },
  {
    name: "hobby",
    header: "爱好",
    merge: true,
    filterable: true,
    style: {
      width: "150px"
    },
    // "options":{
    //   "key1": "钢琴",
    //   "key2": "二胡",
    // }
    options: ["123", "345"]
    // "options":[
    //   {
    //     label: 'lable1',
    //     value: '1'
    //   },
    //   {
    //     label: 'lable2',
    //     value: '2'
    //   }
    // ]
  },
  {
    name: "actions",
    header: "",
    component: "Buttons",
    buttons: [
      {
        name: "编辑",
        value: "edit",
        class: "btn-primary",
        visible(row) {
          return row.tel === "183*****6678";
        }
      },
      {
        name: "编辑2",
        value: "edit2",
        class: "btn-primary",
        visible(row) {
          return row.tel === "183*****6678";
        }
      },
      {
        name: " ",
        class: "btn-link glyphicon glyphicon-plus",
        value: "delete"
      },
      {
        name: "更新",
        value: "update"
      }
    ]
  }
];
