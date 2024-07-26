<template>
  <div class="product">
    <div class="col-sm-12 producs-top">
      <Tabs
        v-if="tabs.length > 1"
        :tabs="tabs"
        class="template_tab margin_bottom"
        v-model="tabIndex"
        @change="onChange"
      ></Tabs>
      <div class="all-select" @click="_onSelectAll">全选</div>
    </div>
    <div class="product-list">
      <zkt-table
        :data="listArray"
        :columns="columns"
        :selectable="false"
        :components="components"
        ref="table"
        :searchParams="searchParams"
        @search="_onSearch"
        @select="_onSelect"
        @cancel="_onCancel"
        class="table-bordered producs-table"
      />
      <zkt-page
        v-if="isPage && totalpage"
        class="products-end-page"
        :page-val="args.pageNum"
        :total-page="totalpage"
        :total-num="totalnum"
        :page-size="args.pageSize"
        :page-show="pageShow"
        :first-last="true"
        :prev-next="true"
        :txt="true"
        :jump="false"
        @page-list-fn="pagenumChange"
      ></zkt-page>
    </div>
  </div>
</template>

<script>
import config from "./ListConfig";
import TransTag from "./Common/TransTag";
import TransLabel from "./Common/TransLabel";
import Br from "./Common/br";
import Rp from "./Common/rp";
export default {
  name: "index",
  props: {
    listConfig: {
      // 支持外部传入列
      type: Array,
      default() {
        return [];
      },
    },
    selectedArray: {
      type: Array,
      default() {
        return [];
      },
    },
    hotelInfo: {
      type: Object,
      default() {
        return {};
      },
    },
    tabs: {
      type: Array,
      default() {
        return [];
      },
    },
    extras: {
      type: Object,
      default() {
        return {};
      },
    },
    apiUrl: {
      type: String,
      default: "api/ticket-api/ticketProduct/jsonGetListTicketProduct",
    },
    isRadio: {
      type: Boolean,
      default: false,
    },
    method: {
      type: String,
      default: "get",
    },
    selectProp: {
      type: String,
      default: "ticketProductId",
    },
    exitActivityProp: {
      type: String,
      default: "activityTypes",
    },
    params: {
      type: Object,
    },
    isPage: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      searchParams: { productId: 1 },
      tabIndex: 0,
      listArray: [],
      basicInfo: {},
      selectVal: [],
      totalpage: 1,
      pageShow: 6,
      totalnum: 1,
      auditStatus: 4,
      chooseHotelId: "",
      strategy: 12,
      args: {
        pageNum: 1, // 当前页数量
        pageSize: 10,
        ...this.params,
      },
      columns: [],
      components: {
        TransTag,
        TransLabel,
        Br,
        Rp
      },
      selectedArrayCopy: this.selectedArray,
      // tabs: [{
      //   value: 1,
      //   name: '预售券常规产品'
      // },{
      //   value: 2,
      //   name: '预售券组合产品'
      // }]
    };
  },
  computed: {
    internalListConfig: function () {
      return config[this.tabs[this.tabIndex].value] || config.base;
    },
  },
  watch: {
    selectedArray(value) {
      this.selectedArrayCopy = value;
    },
    selectedArrayCopy: {
      handler: function () {
        const selectProp = this.tabs[this.tabIndex].selectProp
          ? this.tabs[this.tabIndex].selectProp
          : this.selectProp; // 如果tab有配置，则先取tab
        this.internalListConfig.processData(
          this.listArray,
          this.selectedArrayCopy,
          this.tabs[this.tabIndex].value,
          selectProp,
          this.exitActivityProp
        );
      },
      deep: true,
    },
    args: {
      handler: function () {
        this.fetchList();
      },
      deep: true,
    },
  },
  created() {
    this.defaultArgs = { ...this.args||{} };
  },
  mounted() {
    this.columns = this.mergeColumns(this.internalListConfig.columns);
    this.fetchList();
  },
  methods: {
    mergeColumns(baseColumns) {
      let columns = baseColumns.slice();
        // 客服套餐不走这个覆盖操作
        if(this.tabs[this.tabIndex].value !== 29){
          this.listConfig.map((item) => {
            let cover = item.cover ? 1 : 0;
            columns.splice(item.index, cover, item);
          });
        }
         // 主动配置
        if (Array.isArray(this.tabs[this.tabIndex].myConfig)) {
          const newColumns = this.tabs[this.tabIndex].myConfig.slice();
          newColumns.push(config.configBootom)
          columns = newColumns
        }
      return columns;
    },
    fetchList() {
      this.fetchApi(this.tabs[this.tabIndex].value, this.args).then((res) => {
        if (this.isPage) {
          this.totalnum = res.body.data.total;
          this.totalpage = Math.ceil(res.body.data.total / this.args.pageSize);
        }
        const selectProp = this.tabs[this.tabIndex].selectProp
          ? this.tabs[this.tabIndex].selectProp
          : this.selectProp; // 如果tab有配置，则先取tab
        this.listArray = this.internalListConfig.processData(
          this.isPage && res.body.data.list
            ? res.body.data.list
            : res.body.data,
          this.selectedArrayCopy,
          this.tabs[this.tabIndex].value,
          selectProp,
          this.exitActivityProp
        );
      });
    },
    fetchApi(type, args) {
      // 预售券
      const {
        params: tabParams = {},
        apiUrl: tabApiUrl,
        method: tabMethod,
      } = this.tabs[this.tabIndex];
      let method = tabMethod || this.method;
      let {
        pageNum,
        pageSize,
        auditStatus,
        posterTitle,
        productName,
        chooseHotelId,
        ticketProductId,
        ...otherArgs
      } = args || {};
      let { hotelId, brandId } = this.hotelInfo;
      let argObj = {
        pageNum,
        pageSize,
        hotelId,
        brandId,
        strategy: type,
        auditStatus,
        chooseHotelId,
        ticketProductId,
        ...otherArgs,
        ...this.extras,
        ...tabParams,
      };

      if (ticketProductId != null) {
        argObj.productIds = ticketProductId || "";
      }

      if (posterTitle != null || productName != null) {
        argObj.productName =
          type === 13 || type === 24 ? posterTitle : productName;
      }
      const url = tabApiUrl || this.apiUrl;
      if(url && url.includes('api/ticket-api/ticketProduct/jsonGetListTicketProduct')){
          method = "post";
      }
      return this.$http[method](
        url,
        method === "post" ? argObj : { params: argObj }
      ).then((response) => {
        response.data.data.list.forEach(item =>{
          if(item.productType === 'gift'){
            item.salePrice = 0;
            item.totalInventory = '-';
            item.statusName = '-'
          }
        })
        return response;
      });
    },
    onChange(index) {
      this.searchParams = {};
      this.tabIndex = index;
      this.columns = this.mergeColumns(this.internalListConfig.columns);
      this.args = { ...this.defaultArgs };
      this.fetchList();
    },
    pagenumChange(obj) {
      this.args.pageNum = obj.page;
    },
    search(e) {
      this.args.keyword = e.target.value;
      this.args.pageNum = 1;
    },
    close() {
      this.$emit("close");
    },
    _onSelect(data, type) {
      if (this.isRadio) {
        this.selectedArrayCopy = [{...data}];
      } else {
        this.selectedArrayCopy.push({...data});
      }

      this.$emit("onChange", this.selectedArrayCopy);
    },

    _onSelectAll() {
      const selectProp = this.tabs[this.tabIndex].selectProp
        ? this.tabs[this.tabIndex].selectProp
        : this.selectProp; // 如果tab有配置，则先取tab
      // let _arr = unique(this.selectedArrayCopy.concat(this.listArray));
      // function unique(arr) {
      //   const res = new Map();
      //   return arr.filter(
      //     (arr) => !res.has(arr[selectProp]) && res.set(arr[selectProp], 1)
      //   );
      // }
      // this.selectedArrayCopy = _arr;
      const selectedItems = this.selectedArrayCopy.map(x=>x[selectProp]);
      const newItems = this.listArray.filter(x=>!selectedItems.includes(x[selectProp])).map(x=>({...x}));
      this.selectedArrayCopy = this.selectedArrayCopy.concat(newItems);
      this.$emit("onChange", this.selectedArrayCopy);
    },
    _onCancel(data, type) {
      const selectProp = this.tabs[this.tabIndex].selectProp
        ? this.tabs[this.tabIndex].selectProp
        : this.selectProp; // 如果tab有配置，则先取tab
      this.selectedArrayCopy.map((item, index) => {
        if (item[selectProp] === data[selectProp]) {
          this.selectedArrayCopy.splice(index, 1);
        }
      });
      this.$emit("onChange", this.selectedArrayCopy);
    },
    _onSearch(key, value) {
      this.$emit("onSearch", key, value);
      // let _key = key === 'hotelName' ? 'chooseHotelId' : key
      this.$set(this.args, key, value);
      // this.args[_key] = value
      this.args.pageNum = 1;
    },
  },
};
</script>
<style scoped>
/* >>> table{
  width: 867px;
  margin: auto;
}
>>> .end-pager{
  margin-left: 15px;
  margin-top: 10px;
} */
.col-sm-9 {
  margin-bottom: -1px;
}
.products-end-page {
  margin-top: -35px;
}
.producs-table {
  margin-bottom: 40px;
}
.product-list {
  padding: 0 10px;
}
.producs-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-right: 32px;
}
.all-select {
  line-height: 22px;
  color: #337ab7;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}
</style>
