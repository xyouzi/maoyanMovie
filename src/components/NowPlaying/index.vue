<template>
  <div class="movie_body">
    <ul>
      <li v-for="(item,index) in movieList" :key="index">
        <div class="pic_show">
          <img :src="item.img | setWH('128.180')" />
        </div>
        <div class="info_list">
          <h2>
            {{item.nm}}
            <img v-if="item.version" src="@/assets/maxs.png"  alt=""/>
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
  </div>
</template>

<script>
export default {
  name: "NowPlaying",
  data() {
    return {
      // 电影列表数据
      movieList: []
    };
  },
  mounted() {
    this.getMovieList();
  },
  methods: {
    // 获取电影列表数据
    async getMovieList() {
      const { data: res } = await this.axios.get(
        "/api/movieOnInfoList?city=10"
      );
      // console.log(res);
      this.movieList = res.data.movieList;
      // console.log(this.movieList);
    }
  }
};
</script>

<style lang="scss" scoped>
#content .movie_body {
  flex: 1;
  overflow: auto;
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
