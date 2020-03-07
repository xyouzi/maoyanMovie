<template>
  <div id="detailContainer" class="slide-enter-active">
    <Header title="影片详情">
      <i class="iconfont icon-right" @touchstart="handleToBack"></i>
    </Header>
    <div id="content" class="contentDetail">
      <div class="detail_list">
        <div class="detail_list_bg" :style="{'background-image':'url('+detailList.img.replace(/w\.h/,'148.208')+''}"></div>
        <div class="detail_list_filter"></div>
        <div class="detail_list_content">
          <div class="detail_list_img">
            <img :src="detailList.img | setWH('148.208')" alt />
          </div>
          <div class="detail_list_info">
            <h2>{{detailList.nm}}</h2>
            <p>{{detailList.enm}}</p>
            <p>{{detailList.sc}}</p>
            <p>{{detailList.cat}}</p>
            <p>{{detailList.src}} / {{detailList.dur}}分钟</p>
            <p>{{detailList.pubDesc}}</p>
          </div>
        </div>
      </div>
      <div class="detail_intro">
        <p>{{detailList.dra}}</p>
      </div>
      <div class="detail_player swiper-container" ref="detail_player">
        <ul class="swiper-wrapper">
          <li v-for="(item,index) in detailList.photos" :key="index" class="swiper-slide">
            <div>
              <img :src="item | setWH('140.127')" alt />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  name: "Detail",
  data() {
    return {
      detailList: []
    };
  },
  components: {
    Header
  },
  props: ["movieId"],

  mounted() {
    this.getDetailList();
  },
  methods: {
    handleToBack() {
      this.$router.back();
    },
    async getDetailList() {
      const { data: res } = await this.axios.get(
        "/api/detailMovie?movieId=" + this.movieId
      );
      if (res.msg === "ok") {
        this.detailList = res.data.detailMovie;
        this.$nextTick(() => {
          new Swiper(this.$refs.detail_player, {
            slidesPerView: "auto",
            freeMode: true,
            freeModeSticky: true
          });
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#detailContainer.slide-enter-active {
  animation: 0.3s slideMove;
}
@keyframes slideMove {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
#detailContainer {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  width: 100%;
  min-height: 100%;
  background: white;
  #content .detail_list {
    height: 200px;
    width: 100%;
    position: relative;
    overflow: hidden;
    .detail_list_bg {
      width: 100%;
      height: 100%;
    //   background: url(/images/movie_1.jpg) 0 40%;
      filter: blur(20px);
      background-size: cover;
      position: absolute;
      left: 0;
      top: 0;
    }
    .detail_list_filter {
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: #40454d;
      opacity: 0.55;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
    }
    .detail_list_content {
      display: flex;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 2;
      .detail_list_img {
        width: 108px;
        height: 150px;
        border: solid 1px #f0f2f3;
        margin: 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .detail_list_info {
        margin-top: 20px;
        h2 {
          font-size: 20px;
          color: white;
          font-weight: normal;
          line-height: 40px;
        }
        p {
          color: white;
          line-height: 20px;
          font-size: 14px;
          color: #ccc;
        }
      }
    }
  }
  #content .detail_intro {
    padding: 10px;
  }
  #content .detail_player {
    margin: 20px;
    .swiper-slide {
      width: 70px;
      margin-right: 20px;
      text-align: center;
      font-size: 14px;
      img {
        width: 100%;
        height: 88px;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
