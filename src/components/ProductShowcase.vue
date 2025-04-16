<template>
    <section class="my-14 mx-1 h-full">
      <div class="flex justify-center items-center flex-col gap-10 relative">
        <h2 class="text-gray-900 text-3xl text-center">{{ title }}</h2>
        <!-- Main image container -->
        <div class="relative flex justify-center">
          <img
            :src="mainProduct.image"
            :alt="mainProduct.name"
            class="object-cover rounded-lg h-auto max-h-[750px] w-full max-w-[700px]"
          />
  
          <div
            v-if="secondaryProduct"
            class="hidden md:block absolute bottom-0 right-0 md:right-[-110px] h-auto max-h-[450px] w-full max-w-[300px] bg-slate-200 rounded-lg p-4 shadow-md"
          >
            <img
              :src="secondaryProduct.image"
              :alt="secondaryProduct.name"
              class="object-cover rounded-lg w-full"
            />
            <div>
              <h3 class="text-gray-900 text-center md:text-left">{{ secondaryProduct.name }}</h3>
              <p class="text-gray-900 text-center md:text-left">{{ secondaryProduct.price }}</p>
              <div class="flex justify-between items-center">
                <ul class="flex gap-4">
                  <li
                    v-for="(color, index) in secondaryProduct.colors"
                    :key="index"
                    :class="`w-4 h-4 rounded-full ${color}`"
                  ></li>
                </ul>
                <button class="bg-gray-900 w-12 rounded-md p-1 text-white">
                  Buy
                </button>
              </div>
            </div>
          </div>
        </div>
        <button class="bg-slate-950 shadow-lg p-4 rounded-full text-xs text-gray-50 hover:text-gray-950 hover:bg-slate-50" type="button">VIEW COLLECTION</button>
      </div>
    </section>
</template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      mainProduct: {
        type: Object,
        required: true,
      },
      secondaryProduct: {
        type: Object,
        required: false, // Optional secondary product
      },
    },
  };
  </script>
