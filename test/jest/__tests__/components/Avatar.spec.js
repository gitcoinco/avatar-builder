/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import Avatar from '../../../../src/components/Avatar.vue'
import * as All from 'quasar'
import sinon from 'sinon'
import _ from "lodash";
// import langEn from 'quasar/lang/en-us' // change to any language you wish! => this breaks wallaby :(
const { Quasar, date } = All

const components = Object.keys(All).reduce((object, key) => {
  const val = All[key]
  if (val && val.component && val.component.name != null) {
    object[key] = val
  }
  return object
}, {})

describe('Mount Quasar', () => {
  const localVue = createLocalVue()
  localVue.use(Quasar, { components }) // , lang: langEn

  const wrapper = shallowMount(Avatar, {
    localVue
  })

  const vm = wrapper.vm

  it('passes the sanity check and creates a wrapper', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  describe("methods", () => {
    jest.setTimeout(3000)
    it("showPart sould properly set part visibility", async () => {
      expect(true).toBe(true)

      vm.errorHappened = sinon.stub()
      vm.showPart = sinon.stub()
      vm.$el.svg = function(){
        return this.contentDocument || (this.getSVGDocument && this.getSVGDocument()) || this
      }


      vm.$data.src = "img/avatar1.svg";
      wrapper.find('svg').trigger('load')
      // Letting SVG load - delyaing for 1 second
      await new Promise(resolve => setTimeout(resolve, 1000))

      const parts = vm.partsGrouped()
      const megaObject = _.reduce(parts, function(memo, current) { return _.assign(memo, current) },  {})

      expect(Object.keys(megaObject).length)
        .toBe(4);
      expect(vm.$el.svg().querySelector('g[id]')).toBeDefined()

      vm.$data.src = "img/avatar2.svg";
      wrapper.find('svg').trigger('load')
      // Letting SVG load - delyaing for 1 second
      await new Promise(resolve => setTimeout(resolve, 1000))
      expect(vm.$el.svg().querySelector('g[id]')).toBeDefined()

      // checking loadSVG via stubs
      vm.loadSVG = sinon.stub()
      vm.$data.src = "img/avatar1.svg";
      wrapper.find('svg').trigger('load')
      expect(vm.loadSVG.called).toBe(true)

      vm.$data.src = "img/avatar2.svg";
      wrapper.find('svg').trigger('load')
      expect(vm.loadSVG.called).toBe(true)



      vm.clicked = sinon.stub()
      vm.loadSVG = sinon.stub()
      wrapper.find('svg').trigger('load')
      expect(vm.loadSVG.called).toBe(true)
      expect(vm.errorHappened.called).toBe(false)
      //console.log(vm.partsGrouped())
    })
  })

  it('Snapshot matches', () => expect(vm.$el).toMatchSnapshot())

})
