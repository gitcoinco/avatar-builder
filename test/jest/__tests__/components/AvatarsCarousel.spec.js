/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import Avatar from '../../../../src/components/Avatar.vue'
import AvatarsCarousel from '../../../../src/components/AvatarsCarousel.vue'
import AvatarMixin from '../../../../src/mixins/avatar-mixin'
import * as All from 'quasar'
import Vue from 'vue'
// import langEn from 'quasar/lang/en-us' // change to any language you wish! => this breaks wallaby :(
const { Quasar, date } = All

let components = Object.keys(All).reduce((object, key) => {
  const val = All[key]
  if (val && val.component && val.component.name != null) {
    object[key] = val
  }
  return object
}, {})
//components['Avatar'] = Avatar

describe('Mount Quasar', () => {
  const localVue = createLocalVue()
  localVue.config.productionTip = false;
  localVue.component('avatar', Avatar)
  localVue.component('avatarsCarousel', AvatarsCarousel)

  localVue.use(Quasar, { components }) // , lang: langEn
  // })
  const wrapper = mount({template:'<div><div><Avatar ref="avatar"/></div><div><AvatarsCarousel ref="avatarsCarousel"/></div></div>'}, {
    localVue,
//    attachToDocument: true
  })
        //.destroy()
  const avatarsCarousel = wrapper.find(AvatarsCarousel)
  const avatar = wrapper.find(Avatar)

  it('passes the sanity check and creates a wrapper', () => {
    expect(wrapper.isVueInstance()).toBe(true)
    expect(avatar.isVueInstance()).toBe(true)
    expect(avatarsCarousel.isVueInstance()).toBe(true)
    expect(avatar.is(Avatar)).toBe(true)
    expect(avatarsCarousel.is(AvatarsCarousel)).toBe(true)
  })

  it('has a created hook', () => {
    expect(typeof avatarsCarousel.vm.current).toBe('function')
    expect(typeof avatarsCarousel.vm.updateParts).toBe('function')
  })

  it('accesses the shallowMount', () => {
    expect(wrapper.find('.q-carousel')).toBeDefined()
//    expect(wrapper.text()).toContain('rocket muffin') // easier
//    expect(wrapper.find('p').text()).toContain('rocket muffin')
  })

  jest.setTimeout(5000)
  it('sets the correct default data', async () => {
    expect(typeof avatarsCarousel.vm.slide).toBe('number')
    const defaultData2 = avatarsCarousel.vm.$data
    expect(defaultData2.slide).toBe(0)
    expect(avatarsCarousel.vm.slide).toBe(0)
    expect(avatarsCarousel.vm.current()).toEqual(avatarsCarousel.vm.$data.avatars[0])
    expect(avatar.vm.$data.src).toBe('img/avatar1.svg');

    expect(avatar.emitted()['svg-loaded']).toBeDefined();

    expect(avatarsCarousel.vm.$refs.qcarousel).toBeDefined()
    expect(typeof avatarsCarousel.vm.$refs.qcarousel.next).toBe('function')

    avatarsCarousel.vm.$refs.qcarousel.next()
    expect(avatarsCarousel.vm.slide).toBe(1)
    expect(defaultData2.slide).toBe(1)
    expect(avatarsCarousel.vm.current()).toEqual(avatarsCarousel.vm.$data.avatars[1])

    avatar.vm.$emit('svg-loaded', {src: 'img/avatar2.svg'})
    console.log('!!',avatar.emitted()['svg-loaded'][1][0]);
    expect(avatar.emitted()['svg-loaded'][1][0]).toBe('img/avatar2.svg');
    // Letting SVG load - delyaing for 1 second
    avatar.trigger('svg-loaded', {src: 'img/avatar2.svg'})
    console.log(wrapper.find(Avatar).vm.$data.src);
    expect(avatar.vm.$data.src).toBe('img/avatar2.svg');
  })

  it('correctly updates data when button is pressed', () => {
    //expect(vm.counter).toBe(1)
  })
})
