<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

      <!-- Customer Information -->
      <div class="flex-1 bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-6 text-gray-900">Shipping Info</h2>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <input v-model="form.full_name" type="text" placeholder="Full Name" required
            class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          <input v-model="form.email" type="email" placeholder="Email Address" required
            class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          <input v-model="form.phone" type="text" placeholder="Phone Number" required
            class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          <textarea v-model="form.address" rows="4" placeholder="Shipping Address" required
            class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"></textarea>
            <input v-model="form.city" type="text" placeholder="city" required
            class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
            <input v-model="form.country" type="text" placeholder="Country" required
            class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />

          <button type="submit"
            class="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition">
            {{ saveButtonText }}
          </button>
        </form>
      </div>

      <!-- Order Summary -->
      <div class="flex-1 bg-white p-8 rounded-lg shadow-md h-fit sticky top-24">
        <h2 class="text-2xl font-bold mb-6 text-gray-900">Order Summary</h2>

        <div v-for="item in cartItems" :key="item.id" class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-4">
            <img :src="item.cover_photo" alt="product image" class="w-16 h-16 rounded-lg object-cover" loading="lazy"/>
            <div>
              <h4 class="font-semibold text-gray-800">{{ item.product_name }}</h4>
              <p class="text-sm text-gray-600">Qty: {{ item.quantity }}</p>
            </div>
          </div>
          <div class="font-semibold text-gray-900">${{ (item.price * item.quantity).toFixed(2) }}</div>
        </div>

        <!-- Coupon Section -->
        <div class="mt-6">
          <label class="block mb-2 font-medium text-gray-700">Coupon Code</label>
          <div class="flex gap-2">
            <input v-model="couponCode" type="text" placeholder="Enter coupon code"
              class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
            <button @click="applyCoupon"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              Apply
            </button>
          </div>

          <p v-if="couponMessage" :class="{'text-green-600': couponApplied, 'text-red-500': !couponApplied}" class="text-sm mt-2">
            {{ couponMessage }}
          </p>
        </div>

        <!-- Price Summary -->
        <div class="border-t mt-6 pt-4 space-y-2">
          <div class="flex justify-between font-medium text-gray-700">
            <span>Subtotal</span>
            <span>${{ subtotal.toFixed(2) }}</span>
          </div>

          <div v-if="discount > 0" class="flex justify-between font-medium text-green-600">
            <span>Discount</span>
            <span>-${{ discount.toFixed(2) }}</span>
          </div>

          <div class="flex justify-between font-medium text-gray-700">
            <span>Shipping</span>
            <span>$10.00</span>
          </div>

          <div class="flex justify-between font-bold text-gray-900 text-lg mt-2">
            <span>Total</span>
            <span>${{ (subtotal - discount + 10).toFixed(2) }}</span>
          </div>
        </div>

        <button @click="payNow"
          class="w-full mt-8 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
          Pay Now
        </button>
      </div>

    </div>
  </div>
  <NewsletterSubscribe/>
</template>

<script setup>
import { reactive, computed, ref, onMounted } from 'vue';
import { useCustomerStore } from '@/store/customerStore';
import NewsletterSubscribe from '@/components/Subscribe.vue'
import { useCartStore } from '@/store/cartStore';
import { useToast } from 'vue-toastification';

const toast = useToast();
const customerStore = useCustomerStore();
// Form data
const form = reactive({
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  country: 'Nigeria',
});
const cartStore = useCartStore();
const cartItems = computed(() => cartStore.cartItems);
const subtotal = computed(() =>
  cartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0)
);

// Coupon state
const couponCode = ref('');
const discount = ref(0);
const couponMessage = ref('');
const couponApplied = ref(false);

// Available coupons (could be dynamic later)
const availableCoupons = {
  "SPORT10": 10,   // $10 off
  "FREESHIP": 10,  // simulate free shipping
  "SAVE20": 20,    // $20 off
};

// Load customer info on page mount
onMounted(async () => {
  await customerStore.GetCustomerInfo();
  if (customerStore.info.full_name) {
    Object.assign(form, customerStore.info); // 🔥 Autofill form if customer exists
  }
  await cartStore.fetchCart()
});
// Save or update form
const handleSubmit = () => {
  if (!form.full_name || !form.email || !form.phone || !form.address) {
    const payload = {
      full_name: form.full_name || '',
      email: form.email || '',
      phone: form.phone || '',
      address: form.address || '',
      city: form.city || '',
      country: form.country || '',
  };
    try{
      customerStore.CustomerRecord(payload)
      toast.success("Saved Successfully", {
                timeout: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });

    }catch(err) {
      toast.error('Error saving record, Please try again later or Contact Us!', err, {
                timeout: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });

    }
  
  }
  customerStore.info = { ...form }; // Update the store info too
  alert('Customer information saved! ✅');
};

// Dynamic Save/Update button text
const saveButtonText = computed(() => {
  return customerStore.info.full_name ? 'Update' : 'Save';
});

// Apply coupon
const applyCoupon = () => {
  const code = couponCode.value.trim().toUpperCase();
  if (availableCoupons[code]) {
    discount.value = availableCoupons[code];
    couponMessage.value = `Coupon applied successfully! 🎉`;
    couponApplied.value = true;
  } else {
    discount.value = 0;
    couponMessage.value = `Invalid coupon code. ❌`;
    couponApplied.value = false;
  }
};

// Pay now
const payNow = () => {
  if (!form.full_name || !form.email || !form.phone || !form.address) {
    alert('Please fill in your information first!');
    return;
  }
  alert('Payment Successful! 🎉');
  console.log('Order confirmed', {
    customer: { ...form },
    order: cartItems.value,
    discount: discount.value,
  });
};
</script>

<style scoped>
/* Optional custom styling */
</style>