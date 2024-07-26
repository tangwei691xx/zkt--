/**
 * Copyright (c) 2018-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import * as ScriptLoader from './ScriptLoader'
import { getTinymce } from './TinyMCE'
import { initEditor, isTextarea, uuid, addLanguage } from './Utils'
import { editorProps, defaultConfig } from './EditorPropTypes'
import addPlugins from '../Plugins'
var __assign = (this && this.__assign) || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i]
      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) { t[p] = s[p] }
      }
    }
    return t
  }
  return __assign.apply(this, arguments)
}
var scriptState = ScriptLoader.create()
var renderInline = function (h, id) {
  return h('div', {
    attrs: { id: id }
  })
}
var renderIframe = function (h, id, name) {
  return h('textarea', {
    attrs: { id: id , name: name},
    style: { visibility: 'hidden' }
  })
}
var initialise = function (ctx) {
  return function () {
    if (isTextarea(ctx.element)) {
      ctx.element.style.visibility = ''
    }
    addPlugins(getTinymce())
    addLanguage(getTinymce())
    getTinymce().init(ctx.config)
  }
}
export default {
  props: editorProps,
  created: function () {
    let ctx = this
    this.elementId = this.id || uuid('tiny-vue')
    this.config = __assign({
      readonly: this.$props.disabled,
      selector: '#' + this.elementId,
      setup: function (editor) {
        ctx.editor = editor
        editor.on('init', function (e) { return initEditor(e, ctx, editor) })
        if (ctx.$props.init && typeof ctx.$props.init.setup === 'function') {
          ctx.$props.init.setup(editor)
        }
      }
    }, defaultConfig, this.$props.init)
  },
  watch: {
    disabled: function () {
      this.editor.setMode(this.disabled ? 'readonly' : 'design')
    }
  },
  mounted: function () {
    this.element = this.$el
    if (getTinymce() !== null) {
      let ctx = this
    this.elementId = !this.elementId ? this.id || uuid('tiny-vue') : this.elementId
    this.config = __assign({
      readonly: this.$props.disabled,
      selector: '#' + this.elementId,
      setup: function (editor) {
        ctx.editor = editor
        editor.on('init', function (e) { return initEditor(e, ctx, editor) })
        if (ctx.$props.init && typeof ctx.$props.init.setup === 'function') {
          ctx.$props.init.setup(editor)
        }
      }
    }, defaultConfig, this.$props.init)
      initialise(this)()
    } else if (this.element && this.element.ownerDocument) {
      var doc = this.element.ownerDocument
      var url = this.config.base_url + 'tinymce' + this.config.suffix + '.js'
      ScriptLoader.load(scriptState, doc, url, initialise(this))
    }
  },
  beforeDestroy: function () {
    if (getTinymce() !== null) {
      getTinymce().remove(this.editor)
    }
  },
  render: function (h) {
    return this.config.inline ? renderInline(h, this.elementId) : renderIframe(h, this.elementId, this.name)
  }
}
