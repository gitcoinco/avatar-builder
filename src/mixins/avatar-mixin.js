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
          //src: 'http://localhost:8080/img/avatar1.svg',
          src: "/img/avatar1.svg",
          parts: []
        },
        {
          //src: 'http://localhost:8080/img/avatar2.svg',
          src: "/img/avatar2.svg",
          parts: []
        }
      ]
    };
  }
};
