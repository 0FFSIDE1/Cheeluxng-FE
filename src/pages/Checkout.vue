<template>
  <div class="min-h-screen bg-gradient-to-r from-pink-50 to-gray-300 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      <!-- Customer Information -->
      <div class="flex-1 bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-6 text-gray-900">Shipping Info</h2>

        <div v-if="customerStore.loading" class="text-center text-gray-600">
          Loading customer info...
        </div>
        <div v-else-if="customerStore.error" class="text-red-500 mb-4">
          {{ customerStore.error }}
        </div>

        <form v-else @submit.prevent="handleSubmit" class="space-y-4">
          <input
            v-model="form.full_name"
            type="text"
            placeholder="Full Name"
            required
            class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            v-model="form.email"
            type="email"
            placeholder="Email Address"
            required
            class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            v-model="form.phone"
            type="text"
            placeholder="Phone Number"
            required
            class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            v-model="form.address"
            rows="4"
            placeholder="Shipping Address"
            required
            class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          ></textarea>
          <input
            v-model="form.city"
            type="text"
            placeholder="City"
            required
            class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            v-model="form.country"
            type="text"
            placeholder="Country"
            required
            class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <button
            type="submit"
            :disabled="customerStore.loading"
            class="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition disabled:bg-gray-400"
          >
            {{ saveButtonText }}
          </button>
        </form>
      </div>

      <!-- Order Summary -->
      <div class="flex-1 bg-white p-8 rounded-lg shadow-md h-fit sticky top-24">
        <h2 class="text-2xl font-bold mb-6 text-gray-900">Order Summary</h2>

        <div v-if="cartItems.length === 0" class="text-gray-600">
          Your cart is empty.
        </div>
        <div v-else v-for="item in cartItems" :key="item.id" class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-4">
            <img
              :src="item.cover_photo"
              alt="product image"
              class="w-16 h-16 rounded-lg object-cover"
              loading="lazy"
            />
            <div>
              <h4 class="font-semibold text-sm text-gray-800">{{ item.product_name }}</h4>
              <p class="text-sm text-gray-600">Qty: {{ item.quantity }}</p>
            </div>
          </div>
          <div class="font-semibold text-sm text-gray-900">${{ (item.price * item.quantity).toFixed(2) }}</div>
        </div>

        <!-- Coupon Section -->
        <div class="mt-6">
          <label class="block mb-2 text-center font-medium text-gray-700">Coupon Code</label>
          <div class="flex flex-col md:flex-row gap-2">
            <input
              v-model="couponCode"
              type="text"
              placeholder="Enter coupon code"
              class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              @click="applyCoupon"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Apply
            </button>
          </div>

          <p
            v-if="couponMessage"
            :class="{ 'text-green-600': couponApplied, 'text-red-500': !couponApplied }"
            class="text-sm mt-2"
          >
            {{ couponMessage }}
          </p>
        </div>

        <!-- Price Summary -->
        <div v-if="cartItems.length > 0" class="border-t mt-6 pt-4 space-y-2">
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

        <button
          @click="payNow"
          :disabled="cartItems.length === 0 || customerStore.loading"
          class="w-full mt-8 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
        >
          Pay Now
        </button>
      </div>
    </div>
    <div class="my-6">
    <NewsletterSubscribe />
  </div>
  </div>
  
  
</template>

<script setup>
import { reactive, computed, ref, onMounted } from 'vue';
import { useCustomerStore } from '@/store/customerStore';
import NewsletterSubscribe from '@/components/Subscribe.vue';
import { useCartStore } from '@/store/cartStore';
import { useToast } from 'vue-toastification';
import api from '@/services/axios';

const toast = useToast();
const customerStore = useCustomerStore();
const cartStore = useCartStore();

// Form data
const form = reactive({
  full_name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  country: 'Nigeria',
});

// Cart data
const cartItems = computed(() => cartStore.cartItems);
const subtotal = computed(() =>
  cartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0)
);

// Coupon state
const couponCode = ref('');
const discount = ref(0);
const couponMessage = ref('');
const couponApplied = ref(false);

// Available coupons
const availableCoupons = {
  SPORT10: 10, // $10 off
  FREESHIP: 10, // simulate free shipping
  SAVE20: 20, // $20 off
};

// Load customer info and cart items on page mount
onMounted(async () => {
  if (customerStore.info?.full_name) {
    Object.assign(form, {
      full_name: customerStore.info.full_name || '',
      email: customerStore.info.email || '',
      phone: customerStore.info.phone || '',
      address: customerStore.info.address || '',
      city: customerStore.info.city || '',
      country: customerStore.info.country || 'Nigeria',
    });
  }
  // Fetch customer info from API
  await customerStore.GetCustomerInfo();
  // Update form with fetched data if available
  if (customerStore.info?.full_name) {
    Object.assign(form, {
      full_name: customerStore.info.full_name || '',
      email: customerStore.info.email || '',
      phone: customerStore.info.phone || '',
      address: customerStore.info.address || '',
      city: customerStore.info.city || '',
      country: customerStore.info.country || 'Nigeria',
    });
  }
  // Fetch cart items
  await cartStore.fetchCart();
});
// Save or update form
const handleSubmit = async () => {
  // Validate required fields
  if (!form.full_name || !form.email || !form.phone || !form.address || !form.city || !form.country) {
    toast.error('Please complete all required fields!', {
      timeout: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
    return;
  }
  // Prepare payload
  const payload = {
    full_name: form.full_name,
    email: form.email,
    phone: form.phone,
    address: form.address,
    city: form.city,
    country: form.country,
  };
  try {
    await customerStore.CustomerRecord(payload);
    if (!customerStore.error) {
      toast.success('Customer information saved successfully!', {
        timeout: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else {
      toast.error(customerStore.error, {
        timeout: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  } catch (err) {
    toast.error('Error saving customer information. Please try again later or contact support.', {
      timeout: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
    console.error('Error saving customer info:', err);
  }
};

// Dynamic Save/Update button text
const saveButtonText = computed(() => {
  return customerStore.info?.full_name ? 'Update' : 'Save';
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
const payNow = async () => {
  if (!form.full_name || !form.email || !form.phone || !form.address || !form.city || !form.country) {
    toast.error('Please fill in your information first!', { timeout: 3000 });
    return;
  }

  if (cartItems.value.length === 0) {
    toast.error('Your cart is empty!', { timeout: 3000 });
    return;
  }

  try {
    const response = await api.post('payment/init', {
      email: form.email,
      amount: cartStore.totalAmount, // amount in Kobo
    });

    console.log('Payment Init Response:', response.data);

    if (response.data.success) {
      const handler = window.PaystackPop.setup({
        key: response.data.paystack_public_key,
        email: form.email,
        amount: response.data.amount_value, // already in Kobo
        ref: response.data.ref,
        currency: 'NGN',

        callback: function (paystackResponse) {
          (async () => {
            try {
              const verifyRes = await api.get('payment/verify', {
                reference: paystackResponse.reference,
              });

              if (verifyRes.data.status === 'success') {
                toast.success('Payment successful and verified!');
                // await cartStore.clearCart();
              } else {
                toast.error('Payment verification failed.');
              }
            } catch (error) {
              console.error('Verification error:', error);
              toast.error('Error verifying payment.');
            }
          })();
        },

        onClose: () => {
          toast.info('Payment popup closed.');
        },
      });

      handler.openIframe();
    } else {
      toast.error('Failed to initiate payment!', { timeout: 3000 });
    }
  } catch (error) {
    console.error('Payment init error:', error);
    toast.error('An error occurred during payment initiation.', { timeout: 3000 });
  }
};

</script>

<style scoped>
/* Optional custom styling */
</style>