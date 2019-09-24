/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import AvatarsCarousel from '../../../../src/components/AvatarsCarousel.vue'
import * as All from 'quasar'
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

  const wrapper = mount(AvatarsCarousel, {
    localVue
  })
  const vm = wrapper.vm

  it('passes the sanity check and creates a wrapper', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('has a created hook', () => {
    expect(typeof vm.current).toBe('function')
    expect(typeof vm.updateParts).toBe('function')
  })

  it('accesses the shallowMount', () => {
    // expect(vm.$el.textContent).toContain('rocket muffin')
    // expect(wrapper.text()).toContain('rocket muffin') // easier
    // expect(wrapper.find('p').text()).toContain('rocket muffin')
  })

  it('sets the correct default data', () => {
    expect(typeof vm.slide).toBe('string')
    const defaultData2 = AvatarsCarousel.data()
    expect(defaultData2.slide).toBe("0")
    //expect(defaultData2).toBe('array')
    //expect(vm.$refs.qcarousel.next).toBe('function')
    vm.$refs.qcarousel.next()
    expect(vm.slide).toBe("1")
    expect(vm.$data.avatars).toEqual(require('../../../../src/mixins/avatar-mixin').data)

    expect(vm.current()).toEqual(vm.$data[0])
    //expect(vm.$refs.qcarousel).toBeDefined(null)
    vm.$refs.qcarousel.next()
    expect(vm.current()).toEqual(vm.$data[0])
  })

  it('correctly updates data when button is pressed', () => {
    const button = wrapper.find('button')
    button.trigger('click')
    //expect(vm.counter).toBe(1)
  })

})
