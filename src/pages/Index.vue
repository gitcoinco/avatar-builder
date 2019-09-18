<template>
  <q-page class="flex flex-center">
    <!-- <img alt="Quasar logo" src="~assets/quasar-logo-full.svg" /> -->
    <img alt="ava" src="~/assets/avatar.svg" />
    <q-btn @click="toggleType('hair')">Toggle Hair</q-btn>
    <q-btn @click="toggleType('eyes')">Toggle Eyes</q-btn>
    <q-btn @click="toggleType('nose')">Toggle Nose</q-btn>
    <q-btn @click="toggleType('mouth')">Toggle Mouth</q-btn>
    <q-btn @click="toggleType('ears')">Toggle Ears</q-btn>
    <q-btn @click="toggleType('clothing')">Toggle Clothing</q-btn>
    <q-btn @click="toggleType('background')">Toggle Background</q-btn>

    <br />
    <object type="image/svg+xml" data="img/avatar.svg" class="avatar"></object>
  </q-page>
</template>

<style>
.avatar {
  height: 600px;
}
</style>

<script>
export default {
  name: "PageIndex",
  data: function() {
    return {
      visibility: true
    };
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
