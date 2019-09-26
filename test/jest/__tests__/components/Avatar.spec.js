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
  let localVue, wrapper, vm

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Quasar, { components }) // , lang: langEn

    wrapper = shallowMount(Avatar, {
      localVue
    })
    vm = wrapper.vm
  })

  jest.setTimeout(10000)
  it('passes the sanity check and creates a wrapper', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })
  describe("events", () => {
    it('`svg-loaded` event', () => {
      vm.$emit('svg-loaded', {src: '/img/some_img.svg'})
      wrapper.trigger('svg-loaded', {src: '/img/some_img.svg'})
      expect(wrapper.emitted()['svg-loaded'][1]).toEqual([{src:'/img/some_img.svg'}])
      expect(vm.$data.src).toBe("/img/some_img.svg")
    })

    it('`svg-loaded` even via stubs', () => {
      vm.loadSVG = sinon.stub()
      vm.errorHappened = sinon.stub()
      wrapper.trigger('svg-loaded', {src: '/img/some_img.svg'})
      expect(vm.loadSVG.called).toBe(true)
      expect(vm.errorHappened.called).toBe(false)
    })
  })

  describe("methods", () => {
    it("showPart sould properly set part visibility", async() => {
      expect(true).toBe(true)

      vm.errorHappened = sinon.stub()
      vm.showPart = sinon.stub()

      vm.$emit('svg-loaded', {src: 'img/avatar1.svg'})
      wrapper.trigger('svg-loaded', {src: "img/avatar1.svg"})

      expect(vm.$data.src).toBe("img/avatar1.svg")
      await new Promise(resolve => setTimeout(resolve, 1000))

      expect(vm.svg().querySelector('g[id]')).toBeDefined()
      expect(vm.svg().querySelector('g[id]')).not.toBeNull()
      expect(vm.svg().querySelectorAll('g[id]').length).toBe(24)


    })
    it("showPart sould properly set part visibility", async () => {
      console.log('---');

      vm.$emit('svg-loaded', {src: 'img/avatar2.svg'})
      wrapper.trigger('svg-loaded', {src: "img/avatar2.svg"})
      // letting component redraw
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log(vm.$data.src);
      expect(vm.$data.src).toBe("img/avatar2.svg")

      expect(vm.svg().querySelector('g[id]')).toBeDefined()
      expect(vm.svg().querySelector('g[id]')).not.toBeNull()
      expect(vm.svg().querySelectorAll('g[id]').length).toBe(58)


      const parts = vm.partsGrouped()
      const megaObject = _.reduce(parts, function(memo, current) { return _.assign(memo, current) },  {})
      expect(Object.keys(megaObject).length).toBe(10);

    })

    it("$event via stub", async () => {
      // checking loadSVG via stubs
      vm.loadSVG = sinon.stub()
      vm.errorHappened = sinon.stub()
      wrapper.trigger('svg-loaded', {src: "img/avatar2.svg"})
      expect(vm.loadSVG.called).toBe(true)
      expect(vm.loadSVG.callCount).toBe(1)
      expect(vm.errorHappened.called).toBe(false)
      //console.log(vm.partsGrouped())
    })
  })

  it('Snapshot matches', () => expect(vm.$el).toMatchSnapshot())

})
