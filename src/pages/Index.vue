<template>
  <q-page class="fluid justify-center">
    <!-- <img alt="Quasar logo" src="~assets/quasar-logo-full.svg" /> -->
    <img alt="ava1" src="~/assets/avatar1.svg" class="px1" />
    <img alt="ava2" src="~/assets/avatar2.svg" class="px1" />
    <img alt="ava3" src="~/assets/avatar3.svg" class="px1" />
    <img alt="ava4" src="~/assets/avatar4.svg" class="px1" />
    <div class="row">
      <div class="col col-3 justify-center item-center">
        <AvatarsCarousel ref="avatar" />
      </div>
      <div class="col col-auto flex justify-center item-center">
        <object
          type="image/svg+xml"
          data="img/avatar1.svg"
          class="avatar wrap"
        ></object>
      </div>
    </div>
    <div class="row justify-beginning">
      <div class="col-auto flex">
        <PartsCarousel ref="parts" />
      </div>
    </div>
  </q-page>
</template>

<style>
.avatar {
  height: 600px;
}
.px1 {
  width: 1px;
  height: 1px;
}
</style>

<script>
import AvatarsCarousel from "../components/AvatarsCarousel";
import PartsCarousel from "../components/PartsCarousel";
export default {
  name: "PageIndex",
  mounted() {
    console.log("mounted", this.$refs.parts);
  },
  data: function() {
    return {
      visibility: true
    };
  },
  components: {
    AvatarsCarousel,
    PartsCarousel
  },
  methods: {
    toggleType: function(type) {
      //console.log("click:" + this.visibility);

      this.visibility = !this.visibility;

      let getStringVisibility = it => (it ? "visible" : "hidden");

      const set1 = document
        .querySelector("object.avatar")
        .getSVGDocument()
        .rootElement.getElementById(type + "_x5F_1");
      if (set1)
        set1.setAttribute("visibility", getStringVisibility(this.visibility));

      const set2 = document
        .querySelector("object.avatar")
        .getSVGDocument()
        .rootElement.getElementById(type + "_x5F_2");
      if (set2)
        set2.setAttribute("visibility", getStringVisibility(!this.visibility));
    }
  }
};
</script>
