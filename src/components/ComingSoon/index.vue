<template>
  <div class="movie_body">
    <ul>
      <li v-for="(item,index) in comingList" :key="index">
        <div class="pic_show">
          <img :src="item.img | setWH('128.180')" />
        </div>
        <div class="info_list">
          <h2>{{item.nm}}<img v-if="item.version" src="@/assets/maxs.png"></h2>
          <p>
            <span class="person">{{item.wish}}</span> 人想看
          </p>
          <p>主演: {{item.star}}</p>
          <p>{{item.rt}}上映</p>
        </div>
        <div class="btn_pre">预售</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "comingSoon",
  data() {
    return {
      comingList: []
    }
  },
  mounted() {
    this.getComingSoonList();
  },
  methods: {
    // 获取即将上映电影列表
    async getComingSoonList() {
      const { data: res } = await this.axios.get('/api/movieComingList?cityId=10');
      if(res.msg === 'ok') {
        this.comingList = res.data.comingList;
      }
      // console.log(this.comingList);
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
