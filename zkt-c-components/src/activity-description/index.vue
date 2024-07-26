<template>
  <div class="container" v-if="activityIntro">
    <img class="bg-img" src="https://static.zhiketong.com/static/eb/bg.png" />
    <img
      class="icon-img"
      src="https://static.zhiketong.com/static/eb/icon.png"
    />
    <img
      class="quotation-img"
      src="https://static.zhiketong.com/static/eb/quotation.png"
      :class="activityTag.length ? '' : 'more'"
    />
    <div class="container-left">
      <div class="tag-list" v-if="activityTag.length">
        <div v-for="(tag, index) in activityTag" class="tag-txt" :key="index">
          <span>{{ tag }}</span>
        </div>
      </div>
      <div class="desc-container" :class="activityTag.length ? '' : 'more'">
        <span class="title">活动介绍</span>
        <div
          class="desc-txt"
          :class="activityTag.length ? '' : 'more'"
          v-html="activityIntro"
        ></div>
      </div>
    </div>
    <div class="container-right">
      <div :class="`${imgClassName} img-list`">
        <img
          :class="`${imgClassName} img-item`"
          v-for="(img, i) in imageList"
          :src="img"
          :key="i"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activityIntro: "",
      activityTag: [],
      imageList: [],
      activityInfo: null
    };
  },
  created() {
    this.getIntroduction();
  },
  computed: {
    imgClassName() {
      let name = "";
      if (this.imageList.length === 2) {
        name = "two";
      }
      if (this.imageList.length === 3) {
        name = "three";
      }
      if (this.imageList.length > 3) {
        name = "more";
      }
      return name;
    },
  },
  methods: {
    getIntroduction() {
      const location = window.location;
    const urlRouter = location.hash;
    const url = '/activity-api/eb/diagnostic/tool/introduction/getByUrlRouter'
    this.$store.dispatch('javaApi', {
      method: 'get',
      url,
      params: {urlRouter}
    }, { root: true })
    .then((res) => {
      if(res){
        this.activityInfo = res
        const {activityIntro, activityTag, imageList} = res
        this.activityIntro = activityIntro
        this.imageList = imageList && imageList.length && imageList.map(item => item.jumpUrl)
        this.activityTag = activityTag && activityTag.length && activityTag.split(',')
      }
    })
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  padding: 21px 0 21px 40px;
  display: flex;
  position: relative;
  margin-bottom: 10px;
  overflow: hidden;
  .bg-img {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  .icon-img {
    position: absolute;
    width: 100px;
    height: 100px;
    right: 0;
    bottom: 0;
  }
  .quotation-img {
    position: absolute;
    width: 24px;
    height: 21px;
    left: 42px;
    top: 50px;
    z-index: 100;
    &.more {
      top: 35px;
    }
  }
  .container-left {
    z-index: 100;
    width: 50%;
    .tag-list {
      display: flex;
      align-items: center;
      margin-bottom: 23px;
      .tag-txt {
        padding: 0 5px;
        height: 17px;
        border-radius: 0 9px;
        background-color: #f40;
        text-align: center;
        line-height: 17px;
        font-size: 12px;
        font-weight: 400;
        margin-right: 8px;
        &:first-of-type {
          color: #4566f8;
          background-color: #d7dcfd;
        }
        &:nth-of-type(2) {
          color: #e94260;
          background-color: #e7d6ef;
        }
        &:nth-of-type(3) {
          color: #f2743c;
          background-color: #ebdeeb;
        }
      }
    }
    .desc-container {
      &.more {
        margin-top: 25px;
      }
      .title {
        display: inline-block;
        font-size: 14px;
        color: #333;
        font-weight: 500;
        margin-left: 11px;
        margin-bottom: 15px;
        font-family: PingFang SC;
        position: relative;
        font-weight: bold;
        &::before {
          content: "";
          position: absolute;
          bottom: -15px;
          left: 0;
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-top: 0;
          border-bottom-color: rgba(255, 255, 255, 0.5);
        }
      }
      .desc-txt {
        padding: 15px 15px 9px;
        background: rgba(255, 255, 255, 0.5);
        // width: 630px;
        height: 103px;
        overflow-y: scroll;
        &.more {
          height: 118px;
        }
      }
    }
  }
  .container-right {
    z-index: 100;
    width: 50%;
    .img-list {
      display: flex;
      align-items: center;
      overflow-x: scroll;
      margin-left: 148px;
      justify-content: space-between;
      &.two {
        width: 243px;
        margin-left: 93px;
      }
      &.three {
        width: 355px;
        margin-left: 95px;
      }
      &.more {
        // width: 386px;
        width: 85%;
        margin-left: 65px;
      }

      .img-item {
        width: 99px;
        height: 176px;
        border-radius: 4px;
        flex: 0 0 99px;
        object-fit: cover;
        margin-bottom: 5px;
        &.two {
          margin-right: 45px;
          &:last-of-type {
            margin: 0;
          }
        }
        &.three {
          margin-right: 29px;
          &:last-of-type {
            margin: 0;
          }
        }
        &.more {
          margin-right: 20px;
          &:last-of-type{
            margin: 0;
          }
        }
      }
    }
  }
  /* Webkit浏览器（如Chrome和Safari）的滚动条样式 */
  /* 垂直滚动条 */
  ::-webkit-scrollbar {
    width: 4px; /* 设置滚动条宽度 */
    height: 4px; /* 设置滚动条高度 */
    background-color: transparent; /* 设置滚动条背景颜色 */
  }

  /* 滚动槽 */
  ::-webkit-scrollbar-track {
    background-color: transparent; /* 设置滚动槽背景颜色 */
  }

  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
    background: rgba(191, 191, 191, 0.8); /* 设置滚动条滑块颜色 */
    border-radius: 2px; /* 设置滚动条滑块的圆角 */
  }
}


</style>
