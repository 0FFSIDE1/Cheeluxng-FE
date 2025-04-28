<!-- views/ProductsPage.vue -->
<template>
  <div :class="categoryBgClass">
    <!-- Slideshow and other page content here -->
    <section class="text-center py-10">
      <div class="slideshow-container h-[60vh] md:h-[70vh]">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="slide"
          :class="{ active: currentSlide === index }"
          :style="{ backgroundImage: `url(${image})` }"
        ></div>
        <div class="content">
          <h2 class="text-3xl font-bold transition-all duration-1000" :class="titleTransition">
            {{ currentCategoryTitle }}
          </h2>
        </div>
      </div>
    </section>

    <div class="pb-20">
      <div>
        <h2 class="text-gray-900 text-center md:hidden">Explore ✨</h2>
      </div>
      <div class="mt-8">
        <FilterComponent  v-model:filters="userFilters" />
      </div>
      <ProductGrid :selectedFilters="computedFilters" />
    </div>
  </div>
</template>

<script>
import { computed, watch } from 'vue';
import FilterComponent from '@/components/Filter.vue';
import ProductGrid from '@/components/ProductGrid.vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '@/store/productStore'
import Img1 from '@/assets/product6.jpeg'
import Img2 from '@/assets/image00001.jpeg'
import Img3 from '@/assets/image00002.jpeg'
export default {
  name: 'ProductsPage',
  components: {
    FilterComponent,
    ProductGrid,
  },
  props: {
    // coming from route props
    category: {
      type: String,
      default: 'men'
    }
  },
  data() {
    return {
      images: [
Img1,
Img2,
Img3
      ],
      transitions: ['fade-in', 'scale-in', 'slide-in'],
      currentSlide: 0,
      titleTransition: 'fade-in',
      // Hold user-applied filters (from FilterComponent)
      userFilters: {
        name: '',
        type: null,
        minPrice: null,
        maxPrice: null
      }
    };
  },
  computed: {
    // Merge route category with user filters
    computedFilters() {
      return {
        ...this.userFilters,
        category: this.currentCategory.toLowerCase() // ensure matching with product data
      };
    },
    // Determine current category either from prop or route param
    currentCategory() {
      return this.category || (this.$route.params.category || 'men');
    },
    categoryBgClass() {
    const map = {
      men: 'bg-blue-100',
      women: 'bg-rose-100',
      accessories: 'bg-yellow-100',
    };
    return map[this.currentCategory.toLowerCase()] || 'bg-white';
  },
    currentCategoryTitle() {
      return this.currentCategory.charAt(0).toUpperCase() + this.currentCategory.slice(1);
    },
    computedFilters() {
  const searchQuery = this.$route.query.search || '';
  return {
    ...this.userFilters,
    category: this.currentCategory.toLowerCase(),
    name: searchQuery || this.userFilters.name
  };
}
  },
  setup() {
    const route = useRoute();
    return { route };
  },
  methods: {
    nextSlide() {
      const randomTransition = this.transitions[Math.floor(Math.random() * this.transitions.length)];
      const nextTransition = this.transitions[(this.currentSlide + 1) % this.transitions.length];
      this.currentSlide = (this.currentSlide + 1) % this.images.length;
      this.titleTransition = randomTransition;
    }
  },
  mounted() {
    const productStore = useProductStore();
    if (!productStore.allProducts.lenght){
      productStore.loadAllProducts();
    }
    this.images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
    setInterval(this.nextSlide, 5000);
  },
  watch: {
    // If the route param changes, update the filters if needed.
    '$route.params.category'(newCat) {
      // You can further react to category change here if needed.
      // For example, you could reset certain filters.
    }
  }
};
</script>

<style scoped>
/* Your current styles for slideshow and transitions */
.slideshow-container {
  position: relative;
  overflow: hidden;
}
.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0;
  transition: opacity 1.5s ease-in-out, transform 8s ease-in-out;
  transform: scale(1);
}
.slide.active {
  opacity: 1;
  transform: scale(1.05);
}
.content {
  position: relative;
  z-index: 10;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}
.slideshow-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 5;
}
.fade-in {
  animation: fadeIn 1s ease-in-out;
}
.scale-in {
  animation: scaleIn 1.5s ease-in-out;
}
.slide-in {
  animation: slideIn 1s ease-in-out;
}
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
@keyframes scaleIn {
  0% { transform: scale(1.2); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes slideIn {
  0% { transform: translateX(50%); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}
</style>
