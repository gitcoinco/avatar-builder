<template>
  <div class="q-pa-md">
    <div class="q-gutter-md">
      <q-carousel
        v-model="slide"
        @input="updateParts"
        @load="updateParts"
        transition-prev="scale"
        transition-next="scale"
        swipeable
        animated
        control-color="white"
        navigation
        padding
        arrows
        height="300px"
        ref="qcarousel"
        class="bg-primary text-white shadow-1 rounded-borders"
      >
        <q-carousel-slide
          :name="index"
          class="column no-wrap"
          :img-src="avatar.src"
          v-for="(avatar, index) in $data.avatars"
          :key="index"
        />
      </q-carousel>
    </div>
  </div>
</template>
<script>
import AvatarMixin from "../mixins/avatar-mixin";

import Log from "console-log-level";
const log = Log({ level: "debug" });

export default {
  name: "AvatarsCarousel",
  mixins: [AvatarMixin],
  data() {
    return {
      slide: 0
    };
  },
  mounted() {
    //log.debug("DATA:", this.$data);
    this.$forceUpdate();
  },
  methods: {
    current() {
      return this.$data.avatars[parseInt(this.$data.slide, 10)];
    },
    updateParts() {
      log.debug("data()", this.$data);
      log.debug("slide", this.$data.slide);
      log.debug("current().src", this.current().src);
      const partsInstance = this.$parent.$refs.parts;
      partsInstance && partsInstance.$forceUpdate();
      this.$parent.$emit("avatar-changed", { src: this.current().src });

      log.debug("Slide:", arguments);
      let avaSVG = document.querySelector("object");
      if (avaSVG) {
        let avaSVGDoc = avaSVG.contentDocument || avaSVG.getSVGDocument();
        avaSVG.setAttribute("data", this.current().src);
        this.current().parts = Array.prototype.slice
          .call(avaSVGDoc.rootElement.querySelectorAll("g[id]"))
          .map(it => {
            return {
              id: it.getAttribute("id"),
              el: it,
              html: it.innerHTML
            };
          });
      }
    }
  }
};
</script>
