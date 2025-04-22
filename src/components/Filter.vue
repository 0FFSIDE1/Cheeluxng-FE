<template>
  <div>
    <!-- Floating Filter Button for Mobile -->
    <button
      v-if="isMobile"
      @click="toggleFilterModal"
      class="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Filters
    </button>

    <!-- Filter Modal -->
    <div
      v-if="isMobile && showFilterModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-md w-11/12 max-w-md">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Filter</h3>
          <button @click="toggleFilterModal" class="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        <div class="flex flex-wrap gap-4 items-center">
          <!-- Name Input -->
          <div class="flex-1">
            <input
              v-model="filters.name"
              type="text"
              placeholder="Name"
              class="w-full text-sm px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Type Dropdown -->
          <div class="flex-1">
            <select
              v-model="filters.type"
              class="w-full text-sm px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option :value="null">All</option>
              <option value="Shorts">Shorts</option>
              <option value="Sleeves">Sleeves</option>
              <option value="Sets">Sets</option>
            </select>
          </div>

          <!-- Min Price -->
          <div class="flex-1">
            <input
              v-model.number="filters.minPrice"
              type="number"
              placeholder="Min Price"
              class="w-full text-sm px-4 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Max Price -->
          <div class="flex-1">
            <input
              v-model.number="filters.maxPrice"
              type="number"
              placeholder="Max Price"
              class="w-full text-sm px-4 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Submit Button -->
          <div class="flex-1">
            <button
              @click="applyFilters"
              class="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Large Screen Filters (non-modal) -->
    <div v-else-if="!isMobile" class="p-6 bg-gray-100 rounded-lg shadow-md">
      <h3 class="text-lg font-semibold mb-4 text-gray-900">Filter</h3>
      <div class="flex flex-wrap gap-4 items-center">
        <div class="flex-1">
          <input
            v-model="filters.name"
            type="text"
            placeholder="Name"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="flex-1">
          <select
            v-model="filters.type"
            class="w-full text-sm px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option :value="null">All</option>
            <option value="Shorts">Shorts</option>
            <option value="Sleeves">Sleeves</option>
            <option value="Sets">Sets</option>
          </select>
        </div>
        <div class="flex-1">
          <input
            v-model.number="filters.minPrice"
            type="number"
            placeholder="Min Price"
            class="w-full text-sm px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="flex-1">
          <input
            v-model.number="filters.maxPrice"
            type="number"
            placeholder="Max Price"
            class="w-full text-sm px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="flex-1">
          <button
            @click="applyFilters"
            class="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterComponent",
  emits: ['update:filters'],
  data() {
    return {
      isMobile: window.innerWidth <= 768,
      showFilterModal: false,
      filters: {
        name: '',
        type: null,
        minPrice: null,
        maxPrice: null
      }
    };
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.isMobile = window.innerWidth <= 768;
    },
    toggleFilterModal() {
      this.showFilterModal = !this.showFilterModal;
    },
    applyFilters() {
      this.$emit('update:filters', this.filters);
      if (this.isMobile) this.showFilterModal = false;
    }
  }
};
</script>
