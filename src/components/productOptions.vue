<!-- src/components/productOptions.vue -->
<template>
  <div class="mt-2">
    <!-- Size Options -->
    <div class="flex flex-wrap justify-center gap-2">
      <button
        v-for="(size, sIndex) in availableOptions"
        :key="sIndex"
        class="btn btn-sm rounded-full transition-all"
        :class="{
          'btn-primary': selectedSize === sIndex,
          'btn-ghost hover:bg-gray-200': selectedSize !== sIndex,
        }"
        @click="$emit('update:size', { sizeIndex: sIndex })"
        :aria-label="`Select size ${size.size}`"
      >
        {{ size.size }}
      </button>
    </div>

    <!-- Color Options -->
    <div
      v-if="selectedSize !== null && availableOptions[selectedSize]"
      class="flex gap-2 mt-2 justify-center items-center flex-wrap"
    >
      <button
        v-for="(color, cIndex) in availableOptions[selectedSize].colors"
        :key="cIndex"
        class="w-6 h-6 rounded-full border-2 transition-all focus:ring-2 focus:ring-offset-2"
        :style="{ backgroundColor: color.name }"
        :class="{
          'opacity-40': !color.instock,
          'border-gray-900 scale-110': selectedColor === cIndex,
          'border-gray-300': selectedColor !== cIndex,
        }"
        @click="$emit('update:color', { colorIndex: cIndex })"
        :aria-label="`Select color ${color.name}${!color.instock ? ' (Out of stock)' : ''}`"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductOptionsSelector',
  props: {
    availableOptions: {
      type: Array,
      required: true,
    },
    selectedSize: {
      type: Number,
      default: null,
    },
    selectedColor: {
      type: Number,
      default: null,
    },
    productId: {
      type: String,
      required: true,
    },
  },
};
</script>