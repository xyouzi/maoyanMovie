<template>
  <div class="movie_body" ref="movie_body">
    <Loading v-if="isLoading"></Loading>
    <Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
      <ul>
        <li class="pullDown">{{pullDownMsg}}</li>
        <li v-for="(item,index) in movieList" :key="index">
          <div class="pic_show" @tap="handleToDetail(item.id)">
            <img :src="item.img | setWH('128.180')" />
          </div>
          <div class="info_list">
            <h2 @tap="handleToDetail">
              {{item.nm}}
              <img v-if="item.version" src="@/assets/maxs.png" alt />
            </h2>
            <p>
              观众评
              <span class="grade">{{item.sc}}</span>
            </p>
            <p>主演: {{item.star}}</p>
            <p>{{item.showInfo}}</p>
          </div>
          <div class="btn_mall">购票</div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>

<script>
// import BScroll from "better-scroll";
export default {
  name: "NowPlaying",
  data() {
    return {
      // 电影列表数据
      movieList: [],
      pullDownMsg: "",
      isLoading: true,
      // 未切换城市时的id
      preCityId: -1
    };
  },
  activated() {
    this.getMovieList();
  },
  methods: {
    // 获取电影列表数据
    async getMovieList() {
      const cityId = this.$store.state.city.Id;
      if(this.preCityId === cityId){return;}
      this.isLoading = true;
      const { data: res } = await this.axios.get(
        "/api/movieOnInfoList?cityId=" + cityId
      );
      if (res.msg === "ok") {
        this.movieList = res.data.movieList;
        this.isLoading = false;
        this.preCityId = cityId;
      }
    },
    handleToScroll(pos) {
      if (pos.y > 30) {
        this.pullDownMsg = "正在刷新";
      }
    },
    handleToTouchEnd(pos) {
      if (pos.y > 30) {
        this.axios.get("/api/movieOnInfoList?city=12").then(res => {
          let msg = res.data.msg;
          if (msg === "ok") {
            this.pullDownMsg = "刷新完成";
            setTimeout(() => {
              this.movieList = res.data.data.movieList;
              this.pullDownMsg = "";
            }, 1000);
          }
        });
      }
    },
    // 跳转详情页
    handleToDetail(movieId) {
      this.$router.push('/movie/detail/1/' + movieId).catch(err=>{
        console.log('若无法跳转详情页，可能是该公共api调整了');
        console.log(err);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#content .movie_body {
  flex: 1;
  overflow: auto;
  .pullDown {
    margin: 0;
    padding: 0;
    border: none;
    color: #3c9fe6;
    justify-content: center;
  }
  ul {
    margin: 0 12px;
    overflow: hidden;
    li {
      margin-top: 12px;
      display: flex;
      align-items: center;
      border-bottom: 1px #e6e6e6 solid;
      padding-bottom: 10px;
      .pic_show {
        width: 64px;
        height: 90px;
        img {
          width: 100%;
        }
      }
      .info_list {
        margin-left: 10px;
        flex: 1;
        position: relative;
        h2 {
          font-size: 17px;
          line-height: 24px;
          width: 150px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        p {
          font-size: 13px;
          color: #666;
          line-height: 22px;
          width: 200px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .grade {
          font-weight: 700;
          color: #faaf00;
          font-size: 15px;
        }
        img {
          width: 50px;
          position: absolute;
          right: 10px;
          top: 5px;
        }
      }
    }
  }
  .btn_mall,
  .btn_pre {
    width: 47px;
    height: 27px;
    line-height: 28px;
    text-align: center;
    background-color: #f03d37;
    color: #fff;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
  }
}
.movie_body .btn_pre {
  background-color: #3c9fe6;
}
</style>
