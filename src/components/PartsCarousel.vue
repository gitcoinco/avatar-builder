<template>
  <div class="q-pa-md q-gutter-md flex">
    <q-carousel
      transition-prev="scale"
      transition-next="scale"
      swipeable
      animated
      control-color="white"
      navigation
      padding
      arrows
      height="200px"
      @input="selectItem"
      :name="key"
      class="bg-secondary text-white shadow-1 rounded-borders"
      v-model="slides[key]"
      v-for="(type, key) in partsGrouped"
      :key="key"
    >
      <q-carousel-slide
        :name="index"
        class="column no-wrap"
        v-for="(part, index) in partsGrouped[key]"
        :key="index"
      >
        <div class="q-mt-md text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            xml:space="preserve"
            v-html="part.html"
          ></svg>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>
<script>
import _ from "lodash";
export default {
  data() {
    return {
      slides: {
        background: 0,
        clothing: 0,
        ears: 0,
        head: 0,
        mouth: 0,
        nose: 0,
        eyes: 0,
        hair: 0
      }
    };
  },
  props: {},
  computed: {
    /**
         Using this.$data.slides values updates the avatar setting visible/hidden to some items
 *
 */
      partsGrouped() {
          console.log(this.$parent.$parent.$refs.avatar.current().parts);
      return _.groupBy(
        this.$parent.$parent.$refs.avatar.current().parts,
        it => it.id.split("_")[0]
      );
    }
  },
  mounted() {
    console.log("Mounted");
  },
  methods: {
    selectItem() {
      console.log(this.$data.slides, this.$data.partsGrouped);
      this.updateAvatar();
    },
    updateAvatar() {
      _.each(this.$data.slides, (val, key) => {
        console.log("Key:Val", val, key);
        document
          .querySelector("object")
          .getSVGDocument()
          .rootElement.querySelectorAll("g[id *= '" + key + "_']")
          .forEach(el => {
            let id = el.getAttribute("id");
            let visibility = id.endsWith("_" + (val + 1))
              ? "visible"
              : "hidden";
            console.log("Setting", key, val + 1, id, "to", visibility);
            el.setAttribute("visibility", visibility);
          });
      });
    }
  }
};
</script>
