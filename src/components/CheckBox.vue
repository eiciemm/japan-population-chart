<script lang="ts">
import { ref, type Ref, defineComponent, computed, watch } from 'vue'

export default defineComponent({
  name: 'CheckBox',
  props: {
    label: {
      type: String,
      required: true
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  emits: ['onChange'],
  setup(props, context) {
    const isChecked: Ref<boolean> = ref(false)

    const isCheckedComputed = computed({
      get: () => isChecked.value,
      set: (value: boolean) => {
        isChecked.value = value
      }
    })

    const handleOnChange = () => {
      context.emit('onChange', isCheckedComputed.value)
    }

    watch(props, () => {
      isCheckedComputed.value = props.checked
    })

    return {
      handleOnChange,
      isCheckedComputed
    }
  }
})
</script>

<template>
  <div class="wrapper">
    <input
      :id="label"
      v-model="isCheckedComputed"
      type="checkbox"
      class="checkbox"
      @change="handleOnChange"
    />
    <label :for="label">{{ label }}</label>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
}
.checkbox {
  width: 16px;
  height: 16px;
}
label {
  margin-left: 4px;
  font-size: 13.5px;
}

@media (min-width: 1024px) {
}
</style>
