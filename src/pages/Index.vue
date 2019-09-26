<template>
  <q-page class="fluid justify-center">
    <!-- <img alt="Quasar logo" src="~assets/quasar-logo-full.svg" /> -->
    <img alt="ava1" src="~/assets/avatar1.svg" class="px1" />
    <img alt="ava2" src="~/assets/avatar2.svg" class="px1" />
    <div class="row">
      <div class="col col-3 justify-center item-center">
        <AvatarsCarousel ref="avatarCarousel" />
      </div>
      <div class="col col-auto flex justify-center item-center">
        <Avatar ref="avatar" />
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
import Avatar from "../components/Avatar";
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
    Avatar,
    AvatarsCarousel,
    PartsCarousel
  },
  methods: {}
};
</script>
