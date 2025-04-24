<template>
  <Teleport to="body">
    <transition name="slide">
      <div
        v-if="model"
        class="fixed w-72 top-0 right-0 md:w-[700px] h-full bg-white shadow-lg z-[1000] flex flex-col prose prose-sm md:prose-base max-w-none"
      >
        <div class="p-4 border-b flex justify-between items-center mx-3">
          <h2 class="text-lg font-bold text-gray-950">Cart Summary</h2>
          <button @click="model = false" class="text-gray-950 hover:text-black">✕</button>
        </div>

        <div class="p-4 space-y-4 overflow-y-auto flex-1">
          <div v-if="cartStore.loading" class="flex justify-center items-center h-full">
            <span class="loader"></span>
          </div>

          <div class="text-gray-700 flex justify-center items-center" v-else-if="cartStore.cartItems.length === 0">Empty cart.</div>

          <transition-group name="fade" tag="div" v-else>
            <div
              v-for="item in cartStore.cartItems"
              :key="item.id"
              class="border p-4 rounded shadow-sm space-y-3"
            >
              <div class="flex justify-between items-center">
                <div class="font-semibold text-gray-950">{{ item.product_name }}</div>
                <button @click="removeItem(item.id)" class="text-red-500 hover:text-red-700">🗑️</button>
              </div>

              <div class="text-sm text-gray-900">Price: ${{ item.total_price }}</div>

              <div class="flex items-center gap-2 text-sm">
                <label class="w-1/3 text-gray-950">Size:</label>
                <input
                  :id="`size-${item.id}`"
                  v-model="item.size"
                  type="text"
                  class="border text-gray-950 px-2 py-1 rounded w-2/3"
                  @change="highlightAndUpdate(item.id, item, 'size')"
                />
              </div>

              <div class="flex items-center gap-2 text-sm">
                <label class="w-1/3 text-gray-950">Color:</label>
                <input
                  :id="`color-${item.id}`"
                  v-model="item.color"
                  type="text"
                  class="border text-gray-950 px-2 py-1 rounded w-2/3"
                  @change="highlightAndUpdate(item.id, item, 'color')"
                />
              </div>

              <div class="flex items-center gap-2 text-sm">
                <label class="w-1/3 text-gray-950">Quantity:</label>
                <input
                  :id="`quantity-${item.id}`"
                  v-model.number="item.quantity"
                  type="number"
                  min="1"
                  class="border text-gray-950 px-2 py-1 rounded w-2/3"
                  @change="highlightAndUpdate(item.id, item, 'quantity')"
                />
              </div>
            </div>
          </transition-group>

          <div v-if="cartStore.cartItems.length" class="mt-6  text-gray-950 font-bold text-lg text-right">
            Total: ${{ cartStore.totalAmount }}
          </div>
        </div>

        <div class="p-4 border-t">
          <button class="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { watch, nextTick } from 'vue';
import { useCartStore } from '../store/cartStore';

const model = defineModel({ type: Boolean });
const cartStore = useCartStore();

// Fetch cart on open
watch(model, async (val) => {
  if (val) await cartStore.fetchCart();
});

const removeItem = async (itemId: number) => {
  await cartStore.clearCartItem(itemId);
  await cartStore.fetchCart();
};

const highlightAndUpdate = async (itemId: number, product: any, field: string) => {
  const payload = {
    size: product.size,
    color: product.color,
    quantity: product.quantity,
  };

  await cartStore.updateCartItem(itemId, payload);
  await cartStore.fetchCart();

  await nextTick();
  const el = document.getElementById(`${field}-${itemId}`);
  if (el) {
    el.classList.add('updated');
    setTimeout(() => el.classList.remove('updated'), 800);
  }
};
</script>

<style scoped>
/* Slide animation */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

/* Fade animation */
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

/* Highlight input */
.updated {
  background-color: #d1faff;
  transition: background-color 0.8s ease;
}

/* Loading spinner */
.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #050505;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
