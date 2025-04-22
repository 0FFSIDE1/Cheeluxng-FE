<template>
    <div>
      <!-- Size Options -->
      <div class="mt-3 flex flex-wrap justify-center gap-2">
        <span
          v-for="(size, sIndex) in availableOptions"
          :key="sIndex"
          class="text-xs font-medium cursor-pointer px-3 py-1 rounded-full border transition duration-200"
          :class="{
            'bg-gray-900 text-white border-gray-900': selectedSize === sIndex,
            'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200': selectedSize !== sIndex
          }"
          @click="emitSizeChange(sIndex)"
        >
          {{ size.size }}
        </span>
      </div>
  
      <!-- Color Options -->
      <div
        v-if="selectedSize !== null && availableOptions[selectedSize]"
        class="flex gap-2 mt-3 justify-center items-center flex-wrap"
      >
        <button
          v-for="(color, cIndex) in availableOptions[selectedSize].colors"
          :key="cIndex"
          class="w-6 h-6 rounded-full border-4 transition-all duration-200"
          :style="{
            backgroundColor: color.name,
            opacity: color.instock ? 1 : 0.1,
            borderColor: selectedColor === cIndex ? '#111827' : '#ccc',
            transform: selectedColor === cIndex ? 'scale(1.2)' : 'scale(1)'
          }"
          :title="`${color.name}${!color.instock ? ' (Out of stock)' : ''}`"
          @click="emitColorChange(cIndex)"
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
        required: true
      },
      selectedSize: {
        type: [Number, null],
        default: null
      },
      selectedColor: {
        type: [Number, null],
        default: null
      },
      productId: {
        type: [String, Number],
        required: true
      }
    },
    emits: ['update:size', 'update:color'],
    methods: {
      emitSizeChange(sizeIndex) {
        this.$emit('update:size', { productId: this.productId, sizeIndex });
      },
      emitColorChange(colorIndex) {
        this.$emit('update:color', { productId: this.productId, colorIndex });
      }
    }
  };
  </script>
