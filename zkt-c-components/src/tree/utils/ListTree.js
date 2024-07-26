/**
 *
 * @param {Array} data 节点数据
 * @param {String} dataType 节点数据类型
 */
function ListTree (data = [], {
  dataType = 'list',
  idKey = 'id',
  parentIdKey = 'parentId',
  labelKey = 'name',
  rootParentId = 0,
  levelKey = '_level',
  childrenKey = 'children',
  sortKey = 'sort'
} = {}) {
  this._dataType = dataType
  this._idKey = idKey
  this._parentIdKey = parentIdKey
  this._idKey = idKey
  this._labelKey = labelKey
  this._rootParentId = rootParentId
  this._levelKey = levelKey
  this._childrenKey = childrenKey
  this._sortKey = sortKey
  this._list = dataType === 'list' ? JSON.parse(JSON.stringify(data)) : []
  this._tree = dataType === 'tree' ? JSON.parse(JSON.stringify(data)) : []
  this._listMap = {}
  this.init()
}

/**
 * 初始化
 */
ListTree.prototype.init = function () {
  this.setList()
  this.setListMap()
  this.setLevel()
  this.getTree()
}

ListTree.prototype.setList = function () {
  if (this._dataType === 'tree') {
    this._list = this.flatTree(this._tree)
  }
}
/**
 * listMap {
 *  id: node1,
 *  id2: node2
 * }
 */
ListTree.prototype.setListMap = function () {
  for (let i in this._list) {
    this._listMap[this._list[i][this._idKey]] = this._list[i]
    delete this._listMap[this._list[i][this._idKey]][this._childrenKey]
  }
}

/**
 * 给listMap设置层级
 */
ListTree.prototype.setLevel = function () {
  for (let i in this._listMap) {
    this._listMap[i][this._levelKey] = this.getNodeLevel(this._listMap[i])
  }
}

/**
 * 获取一个节点的 层级
 * node 节点
 * level 根节点层级
 */
ListTree.prototype.getNodeLevel = function (node, level = 1) {
  let parentNode = this._listMap[node[this._parentIdKey]]
  if (parentNode) {
    let countLevel = level + 1
    return this.getNodeLevel(parentNode, countLevel)
  } else {
    return level
  }
}

/**
 * 获取数据的tree结构
 */
ListTree.prototype.getTree = function () {
  if (this._tree.length && this.dataType === 'list') {
    return this._tree
  }
  let tree = []
    for (let i in this._listMap) {
    let parentId = this._listMap[i][this._parentIdKey]
    if (parentId !== this._rootParentId) {
      let parent = this._listMap[parentId]
      if (!parent[this._childrenKey]) {
        parent[this._childrenKey] = []
      }
      parent[this._childrenKey].push(this._listMap[i])
      if (this._listMap[i].hasOwnProperty(this._sortKey)) {
        parent[this._childrenKey].sort((a, b) => {
          return a[this._sortKey] - b[this._sortKey]
        })
      }
    } else {
      tree.push(this._listMap[i])
      if (this._listMap[i].hasOwnProperty(this._sortKey)) {
        tree.sort((a, b) => {
          return a[this._sortKey] - b[this._sortKey]
        })
      }
    }
  }
  this._tree = tree
  return this._tree
}

/**
 * tree 转 list
 */
ListTree.prototype.flatTree = function (tree) {
  if (!tree) {
    return []
  }
  tree = this.checkAndSetId(tree)
  let treeTemp = JSON.parse(JSON.stringify(tree))
  let result = []
  treeTemp.forEach(item => {
    result.push(item)
    if (item[this._childrenKey] && item[this._childrenKey].length) {
      result = result.concat(this.flatTree(item[this._childrenKey]))
    }
  })
  return result.map(item => {
    delete item[this._childrenKey]
    return item
  })
}

/**
 * 获取节点下的所有节点 list
 */
ListTree.prototype.getListByParentId = function (parentId) {
  let parentNode = this._listMap[parentId]
  return this.flatTree([parentNode])
}

/**
 * 获取 一个节点 所有parentId数组 给cascader级联选择器 用的（回显）
 * id
 * result
 * containsId 结果是否包含当前id
 */
ListTree.prototype.getParentIdsArr = function (id, result = [], containsId = false) {
  if (containsId) {
    result.push(id)
  }
  let parentId = this._listMap[id][this._parentIdKey]
  if (parentId + '' !== this._rootParentId + '') {
    result.unshift(parentId)
    return this.getParentIdsArr(parentId, result)
  } else {
    return result.map(item => item - 0)
  }
}

/**
 * 获取层级小于指定值得节点list
 */
ListTree.prototype.getIdsByLevel = function (level) {
  let result = []
  for (const i in this._listMap) {
    if (this._listMap[i][this._levelKey] <= level) {
      result.push(i - 0)
    }
  }
  return result
}

/**
 * 检查设置 id和parentId
 */
ListTree.prototype.checkAndSetId = function (tree) {
  let tree0 = tree[0]
  if (tree0 && !tree0.hasOwnProperty(this._idKey)) {
    this.setId(tree, 1)
  }
  if (!tree0.hasOwnProperty(this._parentIdKey)) {
    this.setParentId(tree, this._rootParentId)
  }
  return tree
}

/**
 * 设置id
 */
ListTree.prototype.setId = function (tree, idx) {
  tree.map(node => {
    node[this._idKey] = idx
    idx ++
    let childTree = node[this._childrenKey]
    if (childTree && childTree.length) {
      idx = this.setId(childTree, idx)
    }
  })
  return idx
}

/**
 * 设置parentId
 */
ListTree.prototype.setParentId = function (tree, pId) {
  tree.map(node => {
    node[this._parentIdKey] = pId
    let childTree = node[this._childrenKey]
    if (childTree && childTree.length) {
      this.setParentId(childTree, node[this._idKey])
    }
  })
}
export default ListTree
