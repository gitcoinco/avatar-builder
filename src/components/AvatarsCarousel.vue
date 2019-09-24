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
          v-for="(avatar, index) in avatars"
          :key="index"
        />
      </q-carousel>
    </div>
  </div>
</template>
<script>
import AvatarMixin from "../mixins/avatar-mixin";
export default {
  name: "AvatarCarousel",
  mixins: [AvatarMixin],
  // mounted() {
  //   console.log("mounted");
  //   setTimeout(() => {
  //     this.updateParts(0);
  //     this.$parent.$parent.$refs.parts.$forceUpdate();
  //   }, 3000); // TODO workaround
  // },
  data() {
    return {
      slide: "0"
    };
  },
  props: {},
  computed: {
    avatars() {
      return this.$data;
    }
  },
  methods: {
    current() {
      return this.$data[parseInt(this.$data.slide, 10) - 1];
    },
    updateParts() {
      //this.$parent.$refs.parts.$forceUpdate();
      console.log("Slide:", arguments);
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
