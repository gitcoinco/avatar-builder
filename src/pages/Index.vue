<template>
  <q-page
    class="fluid justify-center"
    @avatar-changed="avatarChanged(...arguments)"
  >
    <!-- <img alt="Quasar logo" src="~assets/quasar-logo-full.svg" /> -->
    <img alt="ava1" src="~/assets/avatar1.svg" class="px1" />
    <img alt="ava2" src="~/assets/avatar2.svg" class="px1" />
    <div class="row">
      <AvatarsCarousel
        ref="avatarCarousel"
        class="col col-3 justify-center item-center"
      />
      <Avatar
        ref="avatar"
        class="col col-auto flex justify-center item-center"
      />
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
    // TODO make it loading default
    this.$refs.avatar.loadSVG({ src: "img/avatar1.svg" });
    this.$refs.avatar.$forceUpdate();

    this.$refs.parts.selectItem();
    this.$refs.parts.$forceUpdate();
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
  methods: {
    avatarChanged(event) {
      console.log("Avatar changed", event.src, this);
      this.$refs.avatar.loadSVG({ src: event.src });
      this.$refs.avatar.$forceUpdate();

      this.$refs.parts.selectItem();
      this.$refs.parts.$forceUpdate();
    }
  }
};
</script>
