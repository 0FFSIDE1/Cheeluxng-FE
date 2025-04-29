<template>
  <div :class="categoryBgClass">
    <!-- Slideshow and other page content here -->
    <section class="text-center py-10">
      <div class="slideshow-container h-[30vh] md:h-[50vh]">
        <div
          v-for="(image, index) in slideshowImages"
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
        <FilterComponent v-model:filters="userFilters" />
      </div>
      <ProductGrid :selectedFilters="computedFilters" />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '@/store/productStore';

import FilterComponent from '@/components/Filter.vue';
import ProductGrid from '@/components/ProductGrid.vue';

// Import Men Images
import ImgMen1 from '@/assets/men1.jpeg';
import ImgMen2 from '@/assets/men2.jpeg';
import ImgMen3 from '@/assets/men3.jpeg';

// Import Women Images
import ImgWomen1 from '@/assets/women1.jpeg';
import ImgWomen2 from '@/assets/women2.jpeg';
import ImgWomen3 from '@/assets/women3.jpeg';

// Import Accessories Images
import ImgAccessories1 from '@/assets/accessory1.jpeg';
import ImgAccessories2 from '@/assets/accessory2.jpeg';
import ImgAccessories3 from '@/assets/accessory3.jpeg';

// Category to images map
const categoryImageMap = {
  men: [ImgMen1, ImgMen2, ImgMen3],
  women: [ImgWomen1, ImgWomen2, ImgWomen3],
  accessories: [ImgAccessories1, ImgAccessories2, ImgAccessories3],
};

export default {
  name: 'ProductsPage',
  components: {
    FilterComponent,
    ProductGrid,
  },
  props: {
    category: {
      type: String,
      default: 'men'
    }
  },
  data() {
    return {
      transitions: ['fade-in', 'scale-in', 'slide-in'],
      currentSlide: 0,
      titleTransition: 'fade-in',
      userFilters: {
        name: '',
        type: null,
        minPrice: null,
        maxPrice: null
      }
    };
  },
  computed: {
    computedFilters() {
      const searchQuery = this.$route.query.search || '';
      return {
        ...this.userFilters,
        category: this.currentCategory.toLowerCase(),
        name: searchQuery || this.userFilters.name
      };
    },
    currentCategory() {
      return this.category || (this.$route.params.category || 'men');
    },
    currentCategoryTitle() {
      return this.currentCategory.charAt(0).toUpperCase() + this.currentCategory.slice(1);
    },
    categoryBgClass() {
      const map = {
        men: 'bg-blue-100',
        women: 'bg-rose-100',
        accessories: 'bg-yellow-100',
      };
      return map[this.currentCategory.toLowerCase()] || 'bg-white';
    },
    slideshowImages() {
      return categoryImageMap[this.currentCategory.toLowerCase()] || [];
    }
  },
  methods: {
    nextSlide() {
      if (!this.slideshowImages.length) return;
      const randomTransition = this.transitions[Math.floor(Math.random() * this.transitions.length)];
      this.currentSlide = (this.currentSlide + 1) % this.slideshowImages.length;
      this.titleTransition = randomTransition;
    },
    preloadImages() {
      this.slideshowImages.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    }
  },
  mounted() {
    const productStore = useProductStore();
    if (!productStore.allProducts.length) {
      productStore.loadAllProducts();
    }
    this.preloadImages();
    setInterval(this.nextSlide, 5000);
  },
  watch: {
    '$route.params.category'(newCat) {
      this.preloadImages(); // preload new category images when category changes
      this.currentSlide = 0; // Reset to first slide when changing category
    }
  },
  setup() {
    const route = useRoute();
    return { route };
  }
};
</script>

<style scoped>
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
