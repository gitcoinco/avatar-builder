export default {
  props: {
    // src: {
    //   type: String
    // },
    // parts: {
    //   type:Array
    // }
  },
  data() {
    return {
      slide: 0,
      avatars: [
        {
          src: "img/avatar1.svg",
          parts: []
        },
        {
          src: "img/avatar2.svg",
          parts: []
        }
      ]
    };
  }
};
