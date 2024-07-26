<template>
  <div class="iframe-wrapper">
    <div v-if="loaded && !src">地址错误</div>
    <iframe
      v-if="!iframeChanging"
      ref="iframe"
      :style="{'visibility': loaded?'visible':'hidden'}"
      :src="src"
      frameborder="0"
      class="iframe-content"
      @load="iframeLoad()"
    ></iframe>
    <div v-show="!loaded" style="position: absolute;top: 0;left: 0;right: 0;height:400px;background:  url(data:image/svg+xml;base64,Cjxzdmcgd2lkdGg9IjgxcHgiICBoZWlnaHQ9IjgxcHgiICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCIgY2xhc3M9Imxkcy1icmlja3MiPgogICAgPHJlY3QgIGZpbGw9IiNmZjdjODEiIHg9IjIxLjUiIHk9IjIxLjUiIHdpZHRoPSIyNSIgaGVpZ2h0PSIyNSIgcng9IjMiIHJ5PSIzIj4KICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ieCIgY2FsY01vZGU9ImxpbmVhciIgdmFsdWVzPSIyMS41OzUzLjU7NTMuNTs1My41OzUzLjU7MjEuNTsyMS41OzIxLjU7MjEuNSIga2V5VGltZXM9IjA7MC4wODM7MC4yNTswLjMzMzswLjU7MC41ODM7MC43NTswLjgzMzsxIiBkdXI9IjEuNSIgYmVnaW49Ii0xLjM3NXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU+CiAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InkiIGNhbGNNb2RlPSJsaW5lYXIiIHZhbHVlcz0iMjEuNTs1My41OzUzLjU7NTMuNTs1My41OzIxLjU7MjEuNTsyMS41OzIxLjUiIGtleVRpbWVzPSIwOzAuMDgzOzAuMjU7MC4zMzM7MC41OzAuNTgzOzAuNzU7MC44MzM7MSIgZHVyPSIxLjUiIGJlZ2luPSItMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU+CiAgICA8L3JlY3Q+CiAgICA8cmVjdCAgZmlsbD0iI2ZmZWM1OCIgeD0iMjEuNSIgeT0iNTMuNSIgd2lkdGg9IjI1IiBoZWlnaHQ9IjI1IiByeD0iMyIgcnk9IjMiPgogICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJ4IiBjYWxjTW9kZT0ibGluZWFyIiB2YWx1ZXM9IjIxLjU7NTMuNTs1My41OzUzLjU7NTMuNTsyMS41OzIxLjU7MjEuNTsyMS41IiBrZXlUaW1lcz0iMDswLjA4MzswLjI1OzAuMzMzOzAuNTswLjU4MzswLjc1OzAuODMzOzEiIGR1cj0iMS41IiBiZWdpbj0iLTAuODc1cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT4KICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ieSIgY2FsY01vZGU9ImxpbmVhciIgdmFsdWVzPSIyMS41OzUzLjU7NTMuNTs1My41OzUzLjU7MjEuNTsyMS41OzIxLjU7MjEuNSIga2V5VGltZXM9IjA7MC4wODM7MC4yNTswLjMzMzswLjU7MC41ODM7MC43NTswLjgzMzsxIiBkdXI9IjEuNSIgYmVnaW49Ii0wLjVzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPgogICAgPC9yZWN0PgogICAgPHJlY3QgZmlsbD0iIzdjZDdmZiIgeD0iNTMuNSIgeT0iNDIuOTE5IiB3aWR0aD0iMjUiIGhlaWdodD0iMjUiIHJ4PSIzIiByeT0iMyI+CiAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9IngiIGNhbGNNb2RlPSJsaW5lYXIiIHZhbHVlcz0iMjEuNTs1My41OzUzLjU7NTMuNTs1My41OzIxLjU7MjEuNTsyMS41OzIxLjUiIGtleVRpbWVzPSIwOzAuMDgzOzAuMjU7MC4zMzM7MC41OzAuNTgzOzAuNzU7MC44MzM7MSIgZHVyPSIxLjUiIGJlZ2luPSItMC4zNzVzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPgogICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJ5IiBjYWxjTW9kZT0ibGluZWFyIiB2YWx1ZXM9IjIxLjU7NTMuNTs1My41OzUzLjU7NTMuNTsyMS41OzIxLjU7MjEuNTsyMS41IiBrZXlUaW1lcz0iMDswLjA4MzswLjI1OzAuMzMzOzAuNTswLjU4MzswLjc1OzAuODMzOzEiIGR1cj0iMS41IiBiZWdpbj0iMHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU+CiAgICA8L3JlY3Q+CiAgPC9zdmc+Cg==) center no-repeat"></div>
  </div>
</template>
<script>
export default {
  name: 'Iframe',
  props: {
    path: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'hotel'
    }
  },
  data () {
    return {
      loaded: false,
      iframeChanging: false
    }
  },
  computed: {
    src () {
      const hostname = location.host.split('.')
      const temp = hostname[0].replace(/ebooking|eb/g, 'z')
      hostname.shift()
      let domainMap = {
        'hotel': `${temp}.${hostname.join('.')}`,
        'report': this.$store.state.constant.DOMAIN_REPORT
      }
      let domain = domainMap[this.type] || ''
      // 不允许跳转自定义链接
      if (!domain) {
        return ''
      }
      let url = location.protocol + '//' + domain + decodeURIComponent(atob(this.path))
      url = this.setAuth(url)
      url = this.setQuery(url)
      url = this.setHash(url)
      return url
    }
  },
  watch: {
    // 先把iframe干掉 防止 上一个页面样式 影响下一个
    path () {
      this.iframeChanging = true
      setTimeout(() => {
        this.iframeChanging = false
        if (!window.IS_IN_NEW_EB || !window.IS_IN_NEW_EB()) {
          this.loaded = false
        }
      })
    }
  },
  methods: {
    iframeLoad () {
      this.loaded = true
    },
    setAuth (url) {
      if (url.indexOf('?') >= 0) {
        url += '&auth=' + this.$store.state.token
      } else {
        url += '?auth=' + this.$store.state.token
      }
      return url
    },
    setQuery (url) {
      let queryParams = qs.stringify(this.$route.query)
      if (queryParams) {
        url = url + '&' + queryParams
      }
      return url
    },
    setHash (url) {
      let pathname = location.pathname
      let indexHashMath = pathname.match(/index-\w*.html/)
      if (indexHashMath) {
        url += '&index_hash=' + indexHashMath[0]
      }
      return url
    }
  }
}
</script>

<style lang="css" scoped>
  .iframe-wrapper {
    position: relative;
  }
  .iframe-content {
    width: 100%;
    height: 1100px;
    overflow-y: auto;
  }
</style>
