<template>
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
        <h2 class="text-3xl font-bold transition-all duration-1000" :class="titleTransition">MEN</h2>
      </div>
    </div>
  </section>
  <div class="pb-20">
  <div>
    <h2 class="text-gray-900 text-center md:hidden">Explore ✨</h2>
  </div>
  <div class="mt-8">
    <FilterComponent />
  </div>

  <ProductGrid :selectedFilters="selectedFilters" />
  </div>
</template>

<script>
import FilterComponent from '../components/Filter.vue';
import ProductGrid from '../components/ProductGrid.vue';

export default {
  name: 'ProductsPage',
  components: {
    FilterComponent,
    ProductGrid,
  },
  data() {
    return {
      images: [
        '/src/assets/product6.jpeg',
        '/src/assets/image00001.jpeg',
        '/src/assets/image00002.jpeg',
      ],
      transitions: ['fade-in', 'scale-in', 'slide-in'],
      currentSlide: 0,
      titleTransition: 'fade-in',
      textTransition: 'scale-in',
      selectedFilters: {},
    };
  },
  methods: {
    nextSlide() {
      const randomTransition = this.transitions[Math.floor(Math.random() * this.transitions.length)];
      const nextTransition = this.transitions[(this.currentSlide + 1) % this.transitions.length];

      this.currentSlide = (this.currentSlide + 1) % this.images.length;

      this.titleTransition = randomTransition;
      this.textTransition = nextTransition;
    },
  },
  mounted() {
    this.images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    setInterval(this.nextSlide, 5000);
  },
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
  transform: scale(1.05); /* Subtle zoom effect */
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
  background: rgba(0, 0, 0, 0.3); /* Dark overlay for text readability */
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
