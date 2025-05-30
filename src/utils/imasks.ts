import type { DirectiveBinding } from '@vue/runtime-core'
import IMask from 'imask'

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    if (el.tagName === 'INPUT') {
      IMask(el, binding.value)
      return
    }

    const htmlInput = el.querySelector('input')
    if (htmlInput) {
      IMask(htmlInput, binding.value)
    }
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    if (el.tagName === 'INPUT') {
      IMask(el, binding.value)
      return
    }

    const htmlInput = el.querySelector('input')
    if (htmlInput) {
      IMask(htmlInput, binding.value)
    }
  },
}