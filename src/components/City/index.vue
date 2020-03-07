<template>
  <div class="city_body">
    <div class="city_list">
      <Loading v-if="isLoading"></Loading>
      <Scroller v-else ref="city_List">
        <div>
          <div class="city_hot">
            <h2>热门城市</h2>
            <ul class="clearfix">
              <li v-for="(item,index) in hotList" :key="index">{{item.nm}}</li>
            </ul>
          </div>
          <div class="city_sort" ref="city_sort">
            <div v-for="(item,index) in cityList" :key="index">
              <h2>{{item.index}}</h2>
              <ul>
                <li
                  v-for="itemList in item.list"
                  :key="itemList.id"
                  @tap="handleToCity(itemList.nm,itemList.id)"
                >{{itemList.nm}}</li>
              </ul>
            </div>
          </div>
        </div>
      </Scroller>
    </div>
    <div class="city_index">
      <ul>
        <li
          v-for="(item,index) in cityList"
          :key="index"
          @touchstart="handleToIndex(index)"
        >{{item.index}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "City",
  data() {
    return {
      cityList: [],
      hotList: [],
      isLoading: true
    };
  },
  mounted() {
    this.getCityList();
  },
  methods: {
    //   获取城市列表数据
    async getCityList() {
      const cityList = window.localStorage.getItem("cityList");
      const hotList = window.localStorage.getItem("hotList");
      if (cityList && hotList) {
        this.cityList = JSON.parse(cityList);
        this.hotList = JSON.parse(hotList);
        this.isLoading = false;
      } else {
        const { data: res } = await this.axios.get("/api/cityList");
        const msg = res.msg;
        if (msg === "ok") {
          let cities = res.data.cities;
          const { cityList, hotList } = this.formatCityList(cities);
          this.cityList = cityList;
          this.hotList = hotList;
          this.isLoading = false;
          window.localStorage.setItem("cityList", JSON.stringify(cityList));
          window.localStorage.setItem("hotList", JSON.stringify(hotList));
        }
      }
    },
    // 格式化城市列表数据
    formatCityList(cities) {
      // 城市列表
      const cityList = [];
      // 热门城市列表
      const hotList = [];
      //   循环遍历热门城市列表
      for (let i = 0; i < cities.length; i++) {
        if (cities[i].isHot === 1) {
          hotList.push(cities[i]);
        }
      }
      for (let i = 0; i < cities.length; i++) {
        let firstLetter = cities[i].py.substring(0, 1).toUpperCase();
        if (toCom(firstLetter)) {
          // 新添加index
          cityList.push({
            index: firstLetter,
            list: [{ nm: cities[i].nm, id: cities[i].id }]
          });
        } else {
          // 添加到已有index中
          for (let j = 0; j < cityList.length; j++) {
            if (cityList[j].index === firstLetter) {
              cityList[j].list.push({ nm: cities[i].nm, id: cities[i].id });
            }
          }
        }
      }
      cityList.sort((a, b) => {
        if (a.index > b.index) {
          return 1;
        } else if (a.index < b.index) {
          return -1;
        } else {
          return 0;
        }
      });
      //   对比城市拼音首字母
      function toCom(firstLetter) {
        for (let i = 0; i < cityList.length; i++) {
          if (cityList[i].index === firstLetter) {
            return false;
          }
        }
        return true;
      }
      //   console.log(hotList);
      return {
        cityList,
        hotList
      };
    },
    // 锚点索引
    handleToIndex(index) {
      let h2 = this.$refs.city_sort.getElementsByTagName("h2");
      this.$refs.city_List.toScrollTop(-h2[index].offsetTop);
    },
    // 切换城市
    handleToCity(nm, id) {
      this.$store.commit("city/CITY_INFO", { nm, id });
      window.localStorage.setItem('nowNm',nm);
      window.localStorage.setItem('nowId',id);
      this.$router.push('/movie/nowPlaying');
    }
  }
};
</script>

<style lang="scss" scoped>
#content .city_body {
  margin-top: 45px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  .city_list {
    flex: 1;
    overflow: auto;
    background: #fff5f0;
    .city_hot {
      margin-top: 20px;
      ul li {
        float: left;
        background: #fff;
        width: 29%;
        height: 33px;
        margin-top: 15px;
        margin-left: 3%;
        padding: 0 4px;
        border: 1px solid #e6e6e6;
        border-radius: 3px;
        line-height: 33px;
        text-align: center;
        box-sizing: border-box;
      }
      h2 {
        padding-left: 15px;
        line-height: 30px;
        font-size: 14px;
        background: #f0f0f0;
        font-weight: normal;
      }
    }
    .city_sort div {
      margin-top: 20px;
      h2 {
        padding-left: 15px;
        line-height: 30px;
        font-size: 14px;
        background: #f0f0f0;
        font-weight: normal;
      }
      ul {
        padding-left: 10px;
        margin-top: 10px;
        li {
          line-height: 30px;
          line-height: 30px;
        }
      }
    }
  }
  .city_list::-webkit-scrollbar {
    background-color: transparent;
    width: 0;
  }
  .city_index {
    width: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    border-left: 1px #e6e6e6 solid;
  }
}
</style>
