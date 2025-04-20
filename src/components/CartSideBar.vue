<template>
  <Teleport to="body">
    <transition name="slide">
      <div v-if="model" class="fixed w-72 top-0 right-0 md:w-[700px] h-full bg-white shadow-lg z-[1000] flex flex-col">
        <div class="p-4 border-b flex justify-between items-center mx-3">
          <h2 class="text-lg font-bold text-gray-950">My Cart</h2>
          <button @click="model = false" class="text-gray-950 hover:text-black">✕</button>
        </div>

        <div class="p-4 space-y-4 overflow-y-auto flex-1">
          <div v-if="cartStore.loading" class="text-center">Loading cart...</div>
          <div v-else-if="cartStore.cartItems.length === 0">Your cart is empty.</div>
          <div v-else>
            <div v-for="item in cartStore.cartItems" :key="item.id" class="border p-3 rounded shadow-sm space-y-2">
              <div class="flex justify-between items-center">
                <div class="font-semibold">{{ item.product }}</div>
                <button @click="removeItem(item.id)" class="text-red-500 hover:text-red-700">🗑️</button>
              </div>

              <div class="text-sm text-gray-600">Price: ${{ item.price }}</div>

              <div class="flex items-center gap-2 text-sm">
                <label class="w-1/3">Size:</label>
                <input v-model="item.size" type="text" class="border px-2 py-1 rounded w-2/3" @change="updateItem(item.id)" />
              </div>

              <div class="flex items-center gap-2 text-sm">
                <label class="w-1/3">Color:</label>
                <input v-model="item.color" type="text" class="border px-2 py-1 rounded w-2/3" @change="updateItem(item.id)" />
              </div>

              <div class="flex items-center gap-2 text-sm">
                <label class="w-1/3">Quantity:</label>
                <input v-model.number="item.quantity" type="number" min="1" class="border px-2 py-1 rounded w-2/3" @change="updateItem(item)" />
              </div>
            </div>

            <div class="mt-6 font-bold text-lg text-right">
              Total: ${{ cartStore.totalAmount }}
            </div>
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
import { onMounted, watch } from 'vue';
import { useCartStore } from '../store/cartStore';

const model = defineModel({ type: Boolean });
const cartStore = useCartStore();

// Fetch cart when drawer opens
watch(model, async (val) => {
  if (val) await cartStore.fetchCart();
});

// Delete cart item
const removeItem = async (itemId: number) => {
  await cartStore.clearCartItem(itemId);
  await cartStore.fetchCart();
};

// Update cart item
const updateItem = async (item: any) => {
  const payload = {
    size: item.size,
    color: item.color,
    quantity: item.quantity,
  };
  await cartStore.updateCartItem(item, payload);
  await cartStore.fetchCart();
};
</script>


<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
