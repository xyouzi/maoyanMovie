<template>
  <div id="main">
    <Header title="猫眼电影"></Header>
    <div id="content">
      <div class="movie_menu">
        <router-link tag="div" to="/movie/city" class="city_name">
          <span>{{$store.state.city.nm}}</span>
          <i class="iconfont icon-lower-triangle"></i>
        </router-link>
        <div class="hot_swtich">
          <router-link tag="div" to="/movie/nowPlaying" class="hot_item">正在热映</router-link>
          <router-link tag="div" to="/movie/comingSoon" class="hot_item">即将上映</router-link>
        </div>
        <router-link tag="div" to="/movie/search" class="search_entry">
          <i class="iconfont icon-sousuo"></i>
        </router-link>
      </div>
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import Header from "@/components/Header";
import TabBar from "@/components/TabBar";
import { messageBox } from "@/components/JS";
export default {
  name: "Movie",
  components: {
    TabBar,
    Header
  },
  mounted() {
    setTimeout(() => {
      this.axios.get("/api/getLocation").then(res => {
        let msg = res.data.msg;
        if (msg === "ok") {
          let nm = res.data.data.nm;
          let id = res.data.data.id;
          if (this.$store.state.city.id == id) {
            return;
          }
          messageBox({
            title: "城市定位",
            content: nm,
            cancel: "取消",
            ok: "切换定位",
            handleCancel() {
              console.log(1);
            },
            handleOk() {
              window.localStorage.setItem("nowNm", nm);
              window.localStorage.setItem("nowId", id);
              window.location.reload();
            }
          });
        }
      });
    }, 2000);
  }
};
</script>

<style lang="scss" scoped>
#content .movie_menu {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  z-index: 10;
  .city_name {
    margin-left: 20px;
    height: 100%;
    line-height: 45px;
  }
  .city_name.active {
    color: #ef4238;
    border-bottom: 2px #ef4238 solid;
  }
  .city_name.router-link-active {
    color: #ef4238;
    border-bottom: 2px #ef4238 solid;
  }
  .hot_swtich {
    display: flex;
    height: 100%;
    line-height: 45px;
  }
  .hot_item {
    font-size: 15px;
    color: #666;
    width: 80px;
    text-align: center;
    margin: 0 12px;
    font-weight: 700;
  }
  .hot_item.active {
    color: #ef4238;
    border-bottom: 2px #ef4238 solid;
  }
  .hot_item.router-link-active {
    color: #ef4238;
    border-bottom: 2px #ef4238 solid;
  }
  .search_entry {
    margin-right: 20px;
    height: 100%;
    line-height: 45px;
    i {
      font-size: 24px;
      color: red;
    }
  }
  .search_entry.active {
    color: #ef4238;
    border-bottom: 2px #ef4238 solid;
  }
  .search_entry.router-link-active {
    color: #ef4238;
    border-bottom: 2px #ef4238 solid;
  }
}
</style>
