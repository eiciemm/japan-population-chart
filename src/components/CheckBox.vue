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
    },
    accentColor: {
      type: String,
      default: '#696969'
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
  <div class="wrapper" :style="{ '--accent-color': accentColor }">
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
  accent-color: var(--accent-color, #696969);
}
label {
  margin-left: 4px;
  font-size: 13.5px;
}
.checkbox:checked + label {
  color: var(--accent-color, #696969);
  font-weight: bold;
}
@media (min-width: 1024px) {
}
</style>
