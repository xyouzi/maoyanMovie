<template>
  <div class="search_body">
    <div class="search_input">
      <div class="search_input_wrapper">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" v-model="message" />
      </div>
    </div>
    <div class="search_result">
      <h3>电影/电视剧/综艺</h3>
      <ul>
        <li v-for="(item,index) in movieList" :key="index">
          <div class="img">
            <img :src="item.img | setWH('128.180')" />
          </div>
          <div class="info">
            <p>
              <span>{{item.nm}}</span>
              <span>{{item.sc}}</span>
            </p>
            <p>{{item.enm}}</p>
            <p>{{item.cat}}</p>
            <p>{{item.rt}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      message: "",
      movieList: []
    };
  },
  methods: {
    // 节流防抖
    cancelRequest() {
      if (typeof this.source === "function") {
        this.source("终止请求");
      }
    }
  },
  watch: {
    async message(newVal) {
      this.cancelRequest();
      try {
        const { data: res } = await this.axios.get(
          "/api/searchList?cityId=10&kw=" + newVal,
          {
            cancelToken: new this.axios.CancelToken(c => {
              this.source = c;
            })
          }
        );

        const msg = res.msg;
        const movies = res.data.movies;
        // console.log(res);
        if (msg && movies) {
          this.movieList = res.data.movies.list;
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#content .search_body {
  flex: 1;
  overflow: auto;
  .search_input {
    padding: 8px 10px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #e5e5e5;
    .search_input_wrapper {
      padding: 0 10px;
      border: 1px solid #e6e6e6;
      border-radius: 5px;
      background-color: #fff;
      display: flex;
      line-height: 20px;
      i {
        font-size: 16px;
        padding: 4px 0;
      }
      input {
        border: none;
        font-size: 13px;
        color: #333;
        padding: 4px 0;
        outline: none;
        margin-left: 5px;
        width: 100%;
      }
    }
  }
  .search_result {
    li {
      border-bottom: 1px #c9c9c9 dashed;
      padding: 10px 15px;
      box-sizing: border-box;
      display: flex;
      .img {
        width: 60px;
        float: left;
        img {
          width: 100%;
        }
      }
      .info {
        float: left;
        margin-left: 15px;
        flex: 1;
        p {
          height: 22px;
          display: flex;
          line-height: 22px;
          font-size: 12px;
        }
        p:nth-of-type(1) span:nth-of-type(1) {
          font-size: 18px;
          flex: 1;
          span:nth-of-type(2) {
            font-size: 16px;
            color: #fc7103;
          }
        }
      }
    }
  }
}
</style>
