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
        @render="renderSlide()"
        v-for="(part, index) in partsGrouped[key]"
        :key="index"
      >
        <div class="q-mt-md text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            xml:space="preserve"
            v-html="part.outerHTML"
          ></svg>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>
<script>
// import _ from "lodash";

import Log from "console-log-level";
const log = Log({ level: "debug" });

export default {
  /* eslint-disable vue/no-shared-component-data */
  data() {
    return {
      slide: 0,
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
  computed: {
    partsGrouped() {
      return this.$parent.$parent.$refs.avatar.$data.partsGrouped;
    }
  },
  //  props: {},
  //  computed: {
  //    /**
  //         Using this.$data.slides values updates the avatar setting visible/hidden to some items
  // *
  // */
  //  },
  methods: {
    selectItem() {
      log.debug("In Parts", this.partsGrouped, this.$data.slides, arguments);
      this.$parent.$parent.$refs.avatar.showPart(this.$data.slides);
    }
  }
};
</script>
