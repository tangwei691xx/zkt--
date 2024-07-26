<template lang="html">
  <div class="panel panel-default explorer">
    <div class="panel-heading clearfix">
      <toolbar
        @upload="handleUpload"
        @mkdir="handleCreate"
        @refresh="handleRefresh"
        @view="changeView"
        @search="handleSearch"
        @sort="handleSort"
        :multiple="multiple"
      />
    </div>
    <message ref="message" />
    <div class="panel-body explorer-container" ref="container">
      <div class="explorer-sidebar col-sm-3">
        <Tree ref="tree" v-if="tree" :data="tree" v-model="currentOssDisplayId" @paths="handlePaths" class="row" />
      </div>
      <div class="col-sm-9 explorer-content-container">

        <template v-if="isSearch">
          <searchcrumb :value="searchValue" class="row"></searchcrumb>
          <div class="explorer-list-container">
            <search-list
              v-model="currentValue"
              :files="files"
              :urlPrefix="urlPrefix"
              :rootDisplayName="searchDisplayName"
              :highlight="searchValue"
              @cd="handleChangeId"
              @select="select"
            />
          </div>
        </template>
        <template v-else>
          <div class="explorer-bar row clearfix">
            <breadcrumb :paths="currentPaths" @change="handleChangeCrumb" class="pull-left" />
            <actionbar
              :quantity="quantity"
              v-model="activeVisible"
              class="pull-right"
              :checkAll="checkAll"
              @checkAll="handleCheckAll"
              @move="handleMove"
              @remove="handleRemove"
            ></actionbar>
          </div>

          <div class="explorer-list-container">
            <list
              v-if="view=='list'"
              v-model="currentValue"
              :checkValue="checkValue"
              :files="files"
              :isMore="isMore"
              :urlPrefix="urlPrefix"
              :isCheck="activeVisible"
              @cd="handleChangeId"
              @select="select"
              @check="check"
              @more="handleMore"
              @remove="handleRemove"
              @edit="handleEdit"
            />
            <grid
              v-if="view=='grid'"
              v-model="currentValue"
              :checkValue="checkValue"
              :files="files"
              :isMore="isMore"
              :urlPrefix="urlPrefix"
              :isCheck="activeVisible"
              @cd="handleChangeId"
              @select="select"
              @check="check"
              @more="handleMore"
              @remove="handleRemove"
              @edit="handleEdit"
            />
          </div>
        </template>
      </div>

      <modal
        v-if="uploaderVisible"
        title="上传文件"
        @close="handleCloseUploader"
        ref="modal"
        size="lg"
      >
        <uploader
          @change="uploaded"
          :multiple="multiple"
          :accept="accept"
          :client="client"
          :maxSize="maxSize"
          :special-check="specialCheck"
          :ossDisplayId="currentOssDisplayId"
        />
        <div class="text-center" slot="footer">
          <button type="button" @click="handleCloseUploader" class="btn btn-primary">确定</button>
        </div>
      </modal>

      <edit-modal v-if="editVisible" @close="handleCloseEdit" @submit="handleSubmitEdit" :isFolder="currentFolder" :loading="loading" :value="currentName" :regexp="SPECIAL_REGEXP" :regexpText="SPECIAL_REGEXP_TEXT"></edit-modal>

      <remove-modal v-if="removeVisible" :isFolder="currentFolder" :isMulti="!!quantity" :force="force" :loading="loading" @close="handleCloseRemove" @submit="handleSubmitRemove"></remove-modal>

      <select-modal v-if="moveVisible" :data="moveTree" :value="currentRootOssDisplayId" :loading="loading" @close="handleCloseMove" @submit="handleSubmitMove"></select-modal>

      <modal
        title="提醒"
        v-if="!!message"
        @close="handleCloseMessage"
      >
        <div class="text-center">
          <h4>{{message}}</h4>
        </div>
        <div class="text-center" slot="footer">
          <button type="button" @click="handleCloseMessage" class="btn btn-primary">知道了</button>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import LazyLoad from 'vanilla-lazyload'
import Toolbar from './Toolbar.vue'
import Actionbar from './Actionbar.vue'
import Breadcrumb from './Breadcrumb.vue'
import Searchcrumb from './Searchcrumb.vue'
import Tree from './Tree.vue'
import Grid from './Grid.vue'
import List from './List.vue'
import SearchList from './SearchList.vue'
import Uploader from './Uploader.vue'
import Modal from './Modal.vue'
import EditModal from './EditModal.vue'
import RemoveModal from './RemoveModal.vue'
import SelectModal from './SelectModal.vue'
import Message from './Message.vue'
import { SPECIAL_REGEXP, SPECIAL_REGEXP_TEXT } from '../const'

export default {
  name: 'Explorer',
  components: {
    Toolbar,
    Actionbar,
    Breadcrumb,
    Searchcrumb,
    Tree,
    Grid,
    List,
    SearchList,
    Modal,
    EditModal,
    RemoveModal,
    SelectModal,
    Message,
    Uploader
  },
  props: {
    client: {
      type: Object,
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 0
    },
    specialCheck: {
      type: Boolean,
      defualt: false
    },
    private: {
      type: Boolean,
      defualt: false
    },
    value: {
      type: Array,
      default () {
        return []
      }
    },
    maxSize: {
      type: Number,
      default: 10 * 1024 * 1024
    }
  },
  data () {
    return {
      SPECIAL_REGEXP,
      SPECIAL_REGEXP_TEXT,
      files: [],
      urlPrefix: null,
      isMore: false,
      uploads: [],
      uploaderVisible: false,
      view: 'grid',
      searchValue: '',
      currentValue: this.value,
      checkValue: [],
      activeVisible: false,
      editVisible: false,
      removeVisible: false,
      moveVisible: false,
      currentFile: null,
      tree: null,
      currentOssDisplayId: null,
      currentPaths: null,
      force: false,
      message: null,
      loading: false,
      searchDisplayName: null,
      searchOssDisplayId: null,
      checkAll: false,
    }
  },
  computed: {
    isSearch() {
      return this.searchValue !== '';
    },
    quantity(){
      return this.checkValue.length;
    },
    currentFolder() {
      const { isFolder } = this.currentFile || {};
      return !!isFolder;
    },
    currentName() {
      const { displayName } = this.currentFile || {};
      return displayName;
    },
    currentRoot() {
      return Array.isArray(this.currentPaths) ? this.currentPaths[0] : null;
    },
    currentRootOssDisplayId() {
      const { ossDisplayId } = this.currentRoot || {};
      return ossDisplayId != null ? ossDisplayId : null
    },
    moveTree() {
      return this.tree.filter(item => item.ossDisplayId === this.currentRootOssDisplayId)
    },
  },
  watch: {
    value(value, oldValue) {
      if(value !== oldValue){
        this.currentValue = value;
      }
    },
    currentValue(value){
      this.$emit('input', value);
    },
    files(value){
      if(this.activeVisible){
        this.activeVisible = false;
      }

      if(value.length){
        this.setLazyload();
      }
    },
    view(value) {
      if(value === 'grid'){
        this.setLazyload();
      }
    },
    activeVisible(value) {
      if(!value){
        this.checkValue = [];
        this.checkAll = false;
      }
    },
    currentOssDisplayId(value) {
      if(value != null){
        this.searchValue = '';
        this.getFiles()
      }
    },
    searchValue(value) {
      if(value !== ''){

        if(this.currentOssDisplayId != null){
          this.currentOssDisplayId = null;
          this.searchDisplayName = this.currentRoot && this.currentRoot.displayName;
          this.searchOssDisplayId = this.currentRootOssDisplayId;
        }

        this.files = [];
        this.getSearch(value, this.searchOssDisplayId);
      }
    },
    editVisible(value) {
      if(!value){
        this.currentFile = null;
      }
    },
    moveVisible(value) {
      if(!value){
        this.currentFile = null;
      }
    },
    removeVisible(value) {
      if(!value){
        this.currentFile = null;
        this.force = false;
      }
    },
    checkValue(value){
      this.checkAll = value.length ? value.length === this.files.length : false
    }
  },
  methods: {
    setLazyload(){
      this.$nextTick(() => {
        this.$emit('lazyload')
      })
    },
    handleUpload () {
      if(this.currentOssDisplayId == null){
        this.showMessage('请先选择目录结构');
        return false;
      }
      this.uploaderVisible = true
    },
    handleRefresh () {
      if(this.currentOssDisplayId == null){
        this.showMessage('请先选择目录结构');
        return false;
      }
      this.getFiles();
    },
    handleChangeCrumb(value) {
      this.currentOssDisplayId = value;
    },
    handleCheckAll (value) {
      if(value){
        this.checkValue = [...this.files]
      }else{
        this.checkValue = []
      }
    },
    handleSearch(value) {
      this.searchValue = value;
    },
    changeView (view) {
      this.view = view
    },
    select (object) {
      let set = new Set(this.currentValue)
      if (!set.has(object) && this.currentValue.length >= this.limit) {
        return this.showMessage(`最多选${this.limit}个`)
      }
      set.has(object) ? set.delete(object) : set.add(object)
      this.currentValue.splice(0, this.currentValue.length, ...set)
    },
    check (object) {
      let set = new Set(this.checkValue)
      set.has(object) ? set.delete(object) : set.add(object)
      this.checkValue.splice(0, this.checkValue.length, ...set)
    },
    filesSort(files, key, order) {
      return files.sort((prev, next) => {
        return (key === 'createTime' ? dayjs(prev[key]).isBefore(dayjs(next[key])) : prev[key] < next[key]) ? order : -order
      })
    },
    handleSort (sort) {
      const arr = sort.split('-')
      const key = arr[0]
      const order = arr[1] === 'asc' ? -1 : 1

      const prefixes = this.filesSort(this.files.filter(item => item.isFolder), key, order)
      const objects = this.filesSort(this.files.filter(item => !item.isFolder), key, order)
      this.files = []
      // 触发重新渲染
      setTimeout(() => {
        this.files = prefixes.concat(objects)
      })
    },
    uploaded (files) {
      this.uploads = files
    },
    handleEdit (file) {
      if (file) {
        this.editVisible = true;
        this.currentFile = file;

        return;
      }
    },
    handleChangeId (value) {
      this.currentOssDisplayId = value;
    },
    handleCreate () {
      if(this.currentOssDisplayId == null){
        this.showMessage('请先选择目录结构');
        return false;
      }
      this.editVisible = true;
      this.currentFile = {
        isFolder: true,
        parentDisplayId: this.currentOssDisplayId,
        displayName: '',
      };
    },
    handleSubmitEdit(displayName) {
      const {parentDisplayId, ossDisplayId, isFolder} = this.currentFile;
      this.loading = true;
      if(isFolder && ossDisplayId == null){
        this.client.create(parentDisplayId, displayName).then((data) => {
          this.editVisible = false;
          this.files.unshift(data);
          this.$refs.tree.appendNode({...data, subNode: []}, parentDisplayId);
          this.setMessage('文件夹创建成功');
        }).catch((err) => {
          this.showMessage(err.message)
        }).finally(() => {
          this.loading = false;
        })
      }else{
        this.client.rename(ossDisplayId, displayName, isFolder).then(() => {
          this.editVisible = false;
          this.setFile(ossDisplayId, 'displayName', displayName);
          if(isFolder){
            this.$refs.tree.setNode(ossDisplayId, 'displayName', displayName);
          }else{
            this.setLazyload();
          }
          this.setMessage(`${isFolder ? '文件夹' : '文件'}名称修改成功`);
        }).catch((err) => {
          this.showMessage(err.message)
        }).finally(() => {
          this.loading = false;
        })
      }
    },
    setFile(ossDisplayId, key, value) {
      const index = this.files.map(item => item.ossDisplayId).indexOf(ossDisplayId)
      this.$set(this.files[index], key, value)
    },
    deletetFiles(ossDisplayIds) {
      this.files = this.files.filter(item => ossDisplayIds.indexOf(item.ossDisplayId) === -1)
      this.currentValue = this.currentValue.filter(item => ossDisplayIds.indexOf(item.ossDisplayId) === -1)
    },
    handleSubmitMove(parentDisplayId) {
      if(parentDisplayId == null){
        this.showMessage('请先选择目录结构')
        return false;
      }

      let ossDisplayIds = []
      let msg = null;
      let folderOssDisplayIds = []
      if(this.currentFile){
        const { ossDisplayId, isFolder } = this.currentFile
        ossDisplayIds = [ossDisplayId]
        msg = `${isFolder ? '文件夹': '文件'}已转移`
        if(isFolder){
          folderOssDisplayIds = [ossDisplayId]
        }
      }

      if(this.quantity){
        ossDisplayIds = this.checkValue.map(item => item.ossDisplayId)
        folderOssDisplayIds = this.checkValue.filter(item => item.isFolder).map(item => item.ossDisplayId)
        msg = '文件/文件夹已转移'
      }

      if(this.currentOssDisplayId === parentDisplayId){
        this.showMessage('不能移动到当前目录');
        return false;
      }

      if(ossDisplayIds.length){
        this.loading = true;
        this.client.move(ossDisplayIds, parentDisplayId).then(() => {
          this.moveVisible = false;
          this.deletetFiles(ossDisplayIds)
          folderOssDisplayIds.forEach(item => {
            this.$refs.tree.moveNode(item, parentDisplayId);
          })
          this.setMessage(msg);
        }).catch((err) => {
          this.showMessage(err.message)
        }).finally(()=>{
          this.loading = false;
        });

      }
    },
    handleSubmitRemove(force){
      let ossDisplayIds = []
      let msg = null;
      let folderOssDisplayIds = []
      if(this.currentFile){
        const { ossDisplayId, isFolder } = this.currentFile
        ossDisplayIds = [ossDisplayId]
        msg = `${isFolder ? '文件夹': '文件'}已删除`
        if(isFolder){
          folderOssDisplayIds = [ossDisplayId]
        }
      }

      if(this.quantity){
        ossDisplayIds = this.checkValue.map(item => item.ossDisplayId)
        folderOssDisplayIds = this.checkValue.filter(item => item.isFolder).map(item => item.ossDisplayId)
        msg = '文件/文件夹已删除'
      }

      if(folderOssDisplayIds.length > 5){
        this.showMessage('最多支持同时删除5个文件夹，请重新选择')
        return false;
      }

      if(ossDisplayIds.length){
        this.loading = true;
        this.client.delete(ossDisplayIds, force).then(() => {
          this.removeVisible = false;
          this.deletetFiles(ossDisplayIds);
          folderOssDisplayIds.forEach(item => {
            this.$refs.tree.removeNode(item);
          })
          this.setMessage(msg);
        }).catch((err) => {
          const { code } = err.data;

          if(Number(code) === 403){
            this.force = true;
          }else{
            this.showMessage(err.message)
          }

        }).finally(()=>{
          this.loading = false;
        });
      }

    },
    setMessage(msg){
      this.message = msg
    },
    handleCloseMessage () {
      this.setMessage(null)
    },
    handleRemove (file) {

      if (file == null && !this.quantity) {
        return this.showMessage('没有选择文件')
      }

      this.removeVisible = true;
      if (file) {
        this.currentFile = file;
      }
    },
    handleMove () {
      if (!this.quantity) {
        return this.showMessage('没有选择文件')
      }
      this.moveVisible = true;
    },
    handleMore () {
      this.getFiles(true)
    },
    showMessage (message) {
      this.$refs.message.open(message)
    },
    handleCloseUploader () {
      this.uploaderVisible = false
      this.files = [...this.uploads, ...this.files]
      this.uploads = []
    },
    handlePaths (paths) {
      this.currentPaths = paths;
    },
    handleCloseEdit () {
      this.editVisible = false
    },
    handleCloseRemove() {
      this.removeVisible = false
    },
    handleCloseMove() {
      this.moveVisible = false
    },
    getSearch(keyword, ossDisplayId) {
      const res = this.client.search(keyword, ossDisplayId).then((data)=> {
        const { list, urlPrefix } = data;
        const filterable = Array.isArray(list) && this.maxSize;
        this.files = filterable ? list.filter(x => x.isFolder || !x.fileSize || x.fileSize <= this.maxSize) : list;
        this.urlPrefix = urlPrefix;
      }).catch(err => this.showMessage(err.message));
      this.showMessage(res)
      return res;
    },
    getTree() {
      const res = Promise.all([this.client.tree(true), this.client.tree()]).then((data) => {
        const newData = [];
        const [privateData, publicData] = data || [];
        const { ossDisplayId: publicOssDisplayId } = publicData || {}
        const { ossDisplayId } = privateData || {}

        if(privateData != null){
          newData.push(privateData)
        }
        if(publicOssDisplayId != null){
          newData.push(publicData)
        }

        this.tree = newData;
        this.currentOssDisplayId = (this.private && ossDisplayId != null) ? ossDisplayId : publicOssDisplayId || null;
      }).catch(err => this.showMessage(err.message));
      this.showMessage(res)
      return res;
    },
    getFiles(isMore) {
      const res = this.client.files(this.currentOssDisplayId, isMore).then((res) => {
        this.currentValue.splice(0, this.currentValue.length)
        this.files = []
        return res
      }).then((data) => {
        const { list, isMore, urlPrefix } = data;
        let filteredList = list;
        if(Array.isArray(list) && this.maxSize){
          filteredList = list.filter(x => x.isFolder || !x.fileSize || x.fileSize <= this.maxSize);
        }
        this.files = filteredList;
        this.isMore = isMore;
        this.urlPrefix = urlPrefix;
      }).catch(err => {
        this.showMessage(err.message)
      })
      this.showMessage(res)
      return res;
    },
  },
  mounted () {
    this.lazyLoad = new LazyLoad({
      container: this.$refs.container
    })
    this.$on('lazyload', () => {
      this.lazyLoad.update()
    })

    this.getTree()
  },
  beforeDestroy () {
    this.lazyLoad.destroy()
  }
}
</script>

<style lang="css">
.explorer {
  position: relative;
}

.explorer-sidebar{
  height: 100%;
  overflow: auto;
}

.explorer .btn:focus, .explorer .btn:active:focus, .explorer .btn.active:focus, .explorer .btn.focus, .explorer .btn:active.focus, .explorer .btn.active.focus{
  outline: none;
  outline-offset: 0;
}

.explorer .panel-body {
  position:relative;
  padding: 0;
}

.explorer-container > div{
  height: 180px;
}

.explorer-list-container {
  flex: 1;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 10px 0 0;
}

.explorer-container .explorer-content-container {
  box-shadow: -1px 0px 0px #ddd;
  display: flex;
  flex-direction: column;
  height: 400px;
}

.explorer-bar{
  background-color: #f5f5f5;
}

@media (min-width: 768px){
  .explorer .panel-body{
    height: 428px;
  }

  .explorer-container > div, .explorer-container .explorer-content-container{
    height: 100%;
  }
}
</style>
