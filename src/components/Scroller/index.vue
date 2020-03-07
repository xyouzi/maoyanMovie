<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroller",
  props: {
    handleToScroll: {
      type: Function,
      default: function() {}
    },
    handleToTouchEnd: {
      type: Function,
      default: function() {}
    }
  },
  mounted() {
    const scroll = new BScroll(this.$refs.wrapper, {
      tap: true,
      probeType: 1
    });
    this.scroll = scroll;
    scroll.on("scroll", pos => {
      this.handleToScroll(pos);
    });
    scroll.on("touchEnd", pos => {
      this.handleToTouchEnd(pos);
    });
  },
  methods: {
    toScrollTop(y) {
      this.scroll.scrollTo(0, y);
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
}
</style>
