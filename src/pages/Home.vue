<!-- src/views/Home.vue -->
<template>
  <!-- HERO SECTION -->
  <section
  data-aos="zoom-in"
    class="relative min-h-screen bg-center bg-no-repeat bg-cover overflow-hidden"
    :style="{ backgroundImage: `url(${heroImage})` }"
  >
    <!-- Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent"></div>
    
    <!-- Content -->
    <div class="absolute inset-0 flex justify-center items-center text-gray-50 text-center z-30 px-4 sm:px-6 md:px-8">
      <div class="@container flex flex-col justify-center items-center w-full max-w-4xl bg-gray-800/20 rounded-full p-6 sm:p-8 md:p-12 shadow-2xl">
        <h2
          class="prose prose-invert text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed drop-shadow-md text-balance px-2 sm:px-4"
        >
          Discover high-performance gym and sportswear designed to fuel your passion and elevate your workouts. Our gear is crafted for comfort, durability, and style.
        </h2>
        <p class="mt-4 text-gray-50 sm:mt-6 text-base sm:text-lg md:text-xl lg:text-2xl drop-shadow-sm font-semibold">
          Gear Up, Push Limits, Conquer Goals.
        </p>
        <button
          class="btn btn-secondary mt-6 px-6 py-3 text-sm sm:text-base md:text-lg uppercase tracking-wide animate-pulse hover:scale-105 transition-transform"
          type="button"
          aria-label="Shop our sportswear collection"
          @click="shopNow"
        >
          Shop Now
        </button>
      </div>
    </div>
  </section>

  <!-- NEW ARRIVALS SECTION -->
  <Slider
    title="NEW ARRIVALS ✨"
    details="Fresh styles are here! Explore our latest collection of activewear and loungewear, designed to keep you comfortable and stylish. From gym days to chill days, these new arrivals are perfect for every mood. Don’t wait—grab your favorites before they’re gone!"
    :items="productStore.sections.newArrivals"
    :visibleItems="{ xs: 1, sm: 2, md: 3, lg: 4 }"
    @add-to-cart="handleCartAdd"
    to="/explore"
  />

  <PopularSelling background="bg-pink-100"/>

  <!-- FAST SELLING SECTION -->
  <ProductShowcase
    title="FAST SELLING"
    :mainProduct="productStore.sections.bestSellers[0]"
    :secondaryProduct="productStore.sections.bestSellers[0]"
    @add-to-cart="handleCartAdd"
  />

   <!-- ACCESSORIES SECTION -->
   <section  data-aos="zoom-in" class="bg-pink-100">
    <div class="h-full md:mx-12 text-center flex flex-col p-8">
      <h2 class="text-gray-800 text-balance flex justify-center text-3xl md:text-3xl mb-8">ACCESSORIES</h2>
      <p class="text-gray-900 text-lg p-4 text-balance flex justify-center items-center mb-8">
        From sleek gym-ready essentials to cozy off-duty pieces, these must-have accessories add the perfect finishing touch to any outfit. Don’t miss out—explore our new arrivals and upgrade your style today!
      </p>
      <div class="accessoriesdiv grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-6">
        <div
          v-for="accessory in accessories"
          :key="accessory.category"
          class="relative group bg-slate-100 rounded-3xl shadow-xl shadow-orange-200 overflow-hidden"
        >
          <img
            :src="accessory.image"
            :alt="accessory.name"
            class="object-cover h-full w-full rounded-3xl transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div
            class="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-white text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
          >
            <p class="text-lg text-gray-50 font-semibold mb-2">{{ accessory.name }}</p>
            <button
              class="cartBtn"
              @click="navigateToCategory(accessory.category)"
              :aria-label="`View ${accessory.category} category`"
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CHICKY SETS SECTION -->
  <section data-aos="zoom-in" class="bg-fuchsia-100 pt-12">
    <div class="max-w-7xl text-center mx-auto px-4 sm:px-6 md:px-12">
      <h2 class="text-3xl font-semibold text-center mb-4 text-gray-950">CHICKY SETS 🌟</h2>
      <p class="text-lg mb-10 text-gray-900 p-4 text-balance flex justify-center items-center">
        Whether you’re hitting the gym, running errands, or lounging in style, our trend-forward designs empower you to look confident and feel your best—anywhere, anytime.
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <template v-for="item in productStore.categories.womenSet" :key="item.id">
          <div class="bg-slate-200 rounded-3xl shadow-md p-2 flex flex-col items-center">
            <img
              :src="item.cover_image"
              :alt="item.name"
              class="object-cover w-full h-48 rounded-xl"
              loading="lazy"
            />
            <div class="bg-pink-200 rounded p-4 mt-4 w-full text-center">
              <h3 class="text-lg text-gray-950 font-semibold">{{ item.name }}</h3>
              <p>₦{{ item.price }}</p>
              <!-- Product Options Selector -->
              <ProductOptionsSelector
                v-if="item.available_options"
                :available-options="item.available_options"
                :selected-size="selectedSizes[item.id]"
                :selected-color="selectedColors[item.id]"
                :product-id="item.id"
                @update:size="selectSize(item.id, $event)"
                @update:color="selectColor(item.id, $event)"
                class="mt-3"
              />
          
              <!-- Add to Cart Button -->
              <div class="relative group mt-3">
                <AddToCartBtn
                  :is-adding-to-cart="isAddingToCart[item.id] || false"
                  :is-disabled="!canAddToCart(item.id)"
                  :payload="getCartPayload(item.id)"
                  @add-to-cart="handleCartAdd"
                  class="w-full"
                  :aria-describedby="`error-${item.id}`"
                />
                <span
                  v-if="!canAddToCart(item.id)"
                  class="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2"
                >
                  Select size and color
                </span>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div class="flex justify-center mt-10">
        <button
          class="bg-slate-950 text-white px-6 py-3 mb-6 rounded-full hover:bg-white hover:text-slate-950 transition shadow-md"
          @click="$router.push('/women')"
          aria-label="View more women’s sets"
        >
          VIEW MORE
        </button>
      </div>
    </div>
    
  </section>
   <!-- NEWSLETTER SECTION -->
   <NewsletterSubscribe/>

  <!-- LADIES COMFORT SECTION -->
  <section data-aos="zoom-in" class="p-10 bg-gradient-to-r from-pink-50 to-gray-300">
    <div class="max-w-7xl mx-auto text-center px-4 sm:px-6 md:px-12">
      <h2 class="text-2xl font-semibold text-gray-900 mb-4 font-montserrat">
        LADIES COMFORT 🌟
      </h2>
      <p class="text-lg mb-10 text-gray-700 font-lato">
        From high-intensity workouts to cozy days at home, our versatile designs ensure you look
        stylish and feel confident wherever you go.
      </p>
      <div class="flex flex-wrap justify-center gap-6">
        <div
          v-for="(product, index) in productStore.categories.ladiesComfort.slice(0, 4)"
          :key="product.id"
          :class="[
            'relative group bg-pink-200 shadow-md p-2 overflow-hidden transition',
            index % 2 === 0 ? 'rounded-3xl h-96' : 'rounded-full h-80',
          ]"
          style="width: 16rem;"
        >
          <img
            :src="product.cover_image || '/images/product/placeholder.jpg'"
            :alt="`Image of ${product.name}`"
            class="object-cover w-full h-full rounded-inherit transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div
            class="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-inherit p-4"
          >
            <div class="text-center">
              <router-link
                :to="`/product/${product.id}`"
                class="px-4 py-2 bg-white text-black rounded-full hover:bg-pink-300 transition font-montserrat"
                :aria-label="`View ${product.name}`"
              >
                View
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-12">
        <router-link
          to="/women"
          class="bg-slate-950 text-white px-6 py-3 rounded-full hover:bg-white hover:text-slate-950 transition shadow-md font-montserrat"
          aria-label="View more Ladies Comfort products"
        >
          VIEW MORE
        </router-link>
      </div>
    </div>
  </section>

  <!-- WOMEN SECTION -->
  <section data-aos="zoom-in" class="bg-gradient-to-r from-rose-100 to-rose-200 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
      <div>
        <!-- Title -->
        <h2 class="text-3xl font-semibold text-gray-900 mb-4">POPULAR LADIES</h2>

        <!-- Filter Buttons -->
        <div class="flex gap-4 mb-6">
          <button
            class="px-4 py-2 rounded-full shadow-md transition-all"
            :class="{
              'bg-slate-950 text-white': WomenactiveFilter === 'Shorts',
              'bg-white text-slate-950 hover:bg-slate-950 hover:text-white': WomenactiveFilter !== 'Shorts'
            }"
            @click="WomenactiveFilter = 'Shorts'"
            aria-label="Filter by Shorts"
            :aria-pressed="WomenactiveFilter === 'Shorts'"
          >
            SHORTS
          </button>

          <button
            class="px-4 py-2 rounded-full shadow-md transition-all"
            :class="{
              'bg-slate-950 text-white': WomenactiveFilter === 'Sets',
              'bg-white text-slate-950 hover:bg-slate-950 hover:text-white': WomenactiveFilter !== 'Sets'
            }"
            @click="WomenactiveFilter = 'Sets'"
            aria-label="Filter by Sets"
            :aria-pressed="WomenactiveFilter === 'Sets'"
          >
            SETS
          </button>
        </div>
      </div>

      <!-- Filtered Products Slider -->
      <Slider
        :items="filteredProduct"
        :visibleItems="{ xs: 1, sm: 2, md: 3, lg: 4 }"
        @add-to-cart="handleCartAdd"
        to="/women"
      />
    </div>
  </section>

  <!-- MEN SECTION -->
  <section data-aos="zoom-in" class="bg-gradient-to-r from-gray-300 to-blue-100 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
      <div>
        <!-- Title -->
        <h2 class="text-3xl font-semibold text-gray-900 mb-4">POPULAR MEN</h2>

        <!-- Filter Buttons -->
        <div class="flex gap-4 mb-6">
          <button
            class="px-4 py-2 rounded-full shadow-md transition-all"
            :class="{
              'bg-slate-950 text-white': menactiveFilter === 'Shorts',
              'bg-white text-slate-950 hover:bg-slate-950 hover:text-white': menactiveFilter !== 'Shorts'
            }"
            @click="menactiveFilter = 'Shorts'"
            aria-label="Filter by Shorts"
            :aria-pressed="menactiveFilter === 'Shorts'"
          >
            SHORTS
          </button>

          <button
            class="px-4 py-2 rounded-full shadow-md transition-all"
            :class="{
              'bg-slate-950 text-white': menactiveFilter === 'Sets',
              'bg-white text-slate-950 hover:bg-slate-950 hover:text-white': menactiveFilter !== 'Sets'
            }"
            @click="menactiveFilter = 'Sets'"
            aria-label="Filter by Sets"
            :aria-pressed="menactiveFilter === 'Sets'"
          >
            SETS
          </button>
        </div>
      </div>

      <!-- Filtered Products Slider -->
      <Slider
        :items="filteredMenProduct"
        :visibleItems="{ xs: 1, sm: 2, md: 3, lg: 4 }"
        @add-to-cart="handleCartAdd"
        to="/men"
      />
    </div>
  </section>

   <!-- CUSTOMER FEEDBACK SECTION -->
   <CustomerFeedback />
</template>

<script setup>
import Slider from "@/components/Slider.vue";
import ProductShowcase from "@/components/ProductShowcase.vue";
import AddToCartBtn from "@/components/AddToCartBtn.vue";
import ProductOptionsSelector from "@/components/productOptions.vue";
import { useProductStore } from '@/store/productStore';
import { useCartStore } from '@/store/cartStore';
import { onMounted, ref, computed } from "vue";
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import NewsletterSubscribe from '@/components/Subscribe.vue'
import CustomerFeedback from "@/components/CustomerReviews.vue";
import ImageUrl from '@/assets/hero.jpeg'
import PopularSelling from '@/components/PopularSelling.vue';

// Stores
const productStore = useProductStore();
const cartStore = useCartStore();
const toast = useToast();

// Hero Image
const heroImage = ref(ImageUrl);


// Accessories Data
const accessories = ref([
  {
    category: 'hats',
    name: 'Classic Hats',
    image: '/images/product/0S1A2589-Edit.jpeg',
  },
  {
    category: 'bags',
    name: 'Stylish Bags and Others',
    image: '/images/product/0S1A2556-Edit.jpeg',
  },
  {
    category: 'bottles',
    name: 'Bottles',
    image: '/images/product/0S1A2650-Edit.jpeg',
  },
]);

// Navigation
function navigateToCategory(category) {
  router.push({ path: '/explore', query: { category } });
}


const WomenactiveFilter = ref('Shorts');
const filteredProduct = computed(() => {
  return productStore.categories.women.filter((item)=> 
    item.product_type === WomenactiveFilter.value
  );
});

const menactiveFilter = ref('Sets')
const filteredMenProduct = computed(() => {
  return productStore.categories.men.filter((item) => 
    item.product_type === menactiveFilter.value
  );
});


// Product Showcase Data
const mainProduct = ref(null);
const secondaryProduct = ref(null);

// CHICKY SETS Data
const selectedSizes = ref({});
const selectedColors = ref({});
const isAddingToCart = ref({});

// Load Products
onMounted(() => {
  productStore.loadAllProducts().then(() => {
    if (productStore.sections.bestSellers.length) {
      mainProduct.value = productStore.sections.bestSellers[0];
      secondaryProduct.value = productStore.sections.bestSellers[1] || null;
    }
  });
});

// Cart Handling
async function handleCartAdd(payload) {
  if (!payload || !payload.id || !payload.size || !payload.color) {
    toast.error('Invalid cart item. Missing details.', {
                timeout: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
    return;
  }
  try {
    console.log('Home', payload)
    const response = await cartStore.addProductToCart(payload)
    if (response.success){
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
    
  } catch (err) {
    console.error('Home: Cart store error', err);
    toast.error(response.message, err, {
                timeout: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
    
  }
}

// CHICKY SETS Methods
function selectSize(productId, { sizeIndex }) {
  selectedSizes.value[productId] = sizeIndex;
  selectedColors.value[productId] = null; // Reset color
}

function selectColor(productId, { colorIndex }) {
  selectedColors.value[productId] = colorIndex;
}

function canAddToCart(productId) {
  const item = productStore.categories.womenSet.find((i) => i.id === productId);
  if (!item || !item.available_options) {
    return false;
  }
  const sizeIndex = selectedSizes.value[productId];
  const colorIndex = selectedColors.value[productId];
  if (sizeIndex == null || colorIndex == null) {
    return false;
  }
  const size = item.available_options[sizeIndex];
  const color = size?.colors?.[colorIndex];
  const isValid = size && color && color.instock;
  return isValid;
}

function getCartPayload(productId) {
  const item = productStore.categories.womenSet.find((i) => i.id === productId);
  const payload = {
    id: item?.id || '',
    size: '',
    color: '',
    quantity: '',
  };
  console.log(payload.id)
  if (!item || !item.available_options) {
    return payload;
  }
  const sizeIndex = selectedSizes.value[productId];
  if (sizeIndex != null && item.available_options[sizeIndex]) {
    const size = item.available_options[sizeIndex];
    payload.size = size.size || '';
    const colorIndex = selectedColors.value[productId];
    if (colorIndex != null && size.colors && size.colors[colorIndex]) {
      payload.color = size.colors[colorIndex].name || '';
    }
  }
  return payload;
}


// Router for Navigation
const router = useRouter();
const shopNow = () => {
  router.push('/explore');
};
</script>