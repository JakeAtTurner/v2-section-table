<template>
  <div v-if="false">
    <slot></slot>
  </div>
</template>

<script>
/**
 * so the deal hear is that this is a section,   a section will contain a list of columns in it.  Columns will be apart of the slot,
 * each section will contain multiple columns
 */
export default {
  name: 'v2-section',
  props: {
    label: String
  },
  computed: {
    columns () {
      return this.$slots.default
    }
  }
}
</script>