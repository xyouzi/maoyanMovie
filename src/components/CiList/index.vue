<template>
  <div class="cinema_body">
    <ul>
      <li v-for="(item,index) in cinemaList" :key="index">
        <div>
          <span>{{item.nm}}</span>
          <span class="q">
            <span class="price">{{item.sellPrice}}</span> 元起
          </span>
        </div>
        <div class="address">
          <span>{{item.addr}}</span>
          <span>{{item.distance}}</span>
        </div>
        <div class="card">
          <div v-for="(num,key) in item.tag" v-if="num === 1" :key="key" :class="key | classCard">{{key | formatCard}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CiList",
  data() {
    return {
      cinemaList: []
    };
  },
  mounted() {
    this.getCinemaList();
  },
  methods: {
    async getCinemaList() {
      const { data: res } = await this.axios.get("/api/cinemaList?cityId=10");
      this.cinemaList = res.data.cinemas;
      console.log(this.cinemaList);
    }
  },
  filters: {
    formatCard(key) {
      const card = [
        { key: "allowRefund", value: "标签" },
        { key: "endorse", value: "退" },
        { key: "sell", value: "折扣卡" },
        { key: "snack", value: "小吃" }
      ];
      for (let i = 0; i < card.length; i++) {
        if(card[i].key === key){
          return card[i].value;
        }
      };
    },
    classCard(key) {
      const card = [
        { key: "allowRefund", value: "or" },
        { key: "endorse", value: "or" },
        { key: "sell", value: "bl" },
        { key: "snack", value: "bl" }
      ];
      for (let i = 0; i < card.length; i++) {
        if(card[i].key === key){
          return card[i].value;
        }
      };
    }
  }
};
</script>

<style lang="scss" scoped>
#content .cinema_body {
  flex: 1;
  overflow: auto;
}
.cinema_body ul {
  padding: 20px;
}
.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.cinema_body div {
  margin-bottom: 10px;
}
.cinema_body .q {
  font-size: 11px;
  color: #f03d37;
}
.cinema_body .price {
  font-size: 18px;
}
.cinema_body .address {
  font-size: 13px;
  color: #666;
}
.cinema_body .address span:nth-of-type(2) {
  float: right;
}
.cinema_body .card {
  display: flex;
}
.cinema_body .card div {
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  color: #f90;
  border: 1px solid #f90;
  font-size: 13px;
  margin-right: 5px;
}
.cinema_body .card div.or {
  color: #f90;
  border: 1px solid #f90;
}
.cinema_body .card div.bl {
  color: #589daf;
  border: 1px solid #589daf;
}
</style>
