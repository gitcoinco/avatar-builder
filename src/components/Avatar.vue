<template>
  <!-- should use func(...arguments) notation for for stubs in tests -->
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 278.454834 357.205414"
    style="enable-background:new 0 0 278.454834 357.205414;"
    xml:space="preserve"
    :src="src"
    @svg-loaded="loadSVG(...arguments)"
    @error="errorHappened(...arguments)"
    @show-part="showPart(...arguments)"
    class="avatar wrap"
  ></svg>
</template>

<script>
import _ from "lodash";
import * as axios from "axios";
import xml2js from "xml2js";
import adapter from "axios/lib/adapters/http";
export default {
    name: "Avatar",
    data: () => {
        return {
            src: "img/avatar1.svg",
            partsGrouped: undefined
        };
    },
    created() {
        this.$emit("svg-loaded", { src: "img/avatar1.svg" });
    },
    methods: {
        errorHappened(event) {
            console.error(event.err);
        },
        loadSVG: async function(event) {
            console.log("Event.options", event.src);
            // for some reason strings are not passed correctly
            let stringEvent = event.src;

            let src = stringEvent || this.$data.src;
            this.$data.src = src;
            console.info("SRC", src);
            await axios
                .get(`http://localhost:8080/${src}`, {
                    adapter
                })
                .then(response =>
                      xml2js
                      .parseStringPromise(response.data)
                      .catch(err => console.error("Error loading XML", err))
                      .then(
                          xml =>
                              (this.svg().innerHTML = new xml2js.Builder().buildObject(
                                  xml // TODO make sure we don't put nested SVG
                              ))
                      )
                      .then(() => {
                          console.log("partsGrouped!");
                          const parts = Array.prototype.slice.call(
                              this.svg().querySelectorAll("g[id]")
                          );
                          console.log("Parts:", parts);
                          this.showPart(
                              this.$parent.$parent.$refs.parts.$data.slides
                          );
                          this.$parent.$parent.$refs.parts.$forceUpdate();
                          return (this.$data.partsGrouped = _.groupBy(
                              parts,
                              it => it.id.split("_")[0]
                          ));
                      })
                     )
                .catch(err => this.$emit("errorHappened", { err: err }));
        },
        update() {
            _.each(this.$data.slides, (val, key) => {
                console.log("Key:Val", val, key);
                this.svg()
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
        },

        /**
     Called from underlaying component when part should be shown, other hidden
    */
        showPart(slides) {
            console.log(slides);
            _.each(slides, (idx, name) => {
                console.log('idx:name', idx, name, this.svg().querySelectorAll('g[id]'));
                this.svg()
                    .querySelectorAll(`g[id][id *= '${name}_']`)
                    .forEach(el => {
                        console.log(el.id);
                        const visible = el.id.match(`_${idx + 1}$`) ? "visible" : "hidden";
                        el.setAttribute("visibility", visible);
                        console.log('idx:name', idx, name, visible);
                    })
          })
    }, // ,
    // changePart(name, idx) {
    //   _.each(this.$data.slides, (val, key) => {
    //     console.log("Key:Val", val, key);
    //     let svgDoc =
    //       document.querySelector("object").contentDocument ||
    //       document.querySelector("object").getSVGDocument();

    //     svgDoc.rootElement
    //       .querySelectorAll("g[id *= '" + key + "_']")
    //       .forEach(el => {
    //         let id = el.getAttribute("id");
    //         let visibility = id.endsWith("_" + (val + 1))
    //           ? "visible"
    //           : "hidden";
    //         console.log("Setting", key, val + 1, id, "to", visibility);
    //         el.setAttribute("visibility", visibility);
    //       });
    //   });
    // }
    svg() {
      return (
        this.$el.contentDocument ||
        (this.$el.getSVGDocument && this.$el.getSVGDocument()) ||
        this.$el
      );
    }
  }
};
</script>

<style></style>
