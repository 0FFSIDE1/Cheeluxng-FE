<template>
  <Preloader v-if="isPlacingOrder" />
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

<!-- Success Popup -->
<div v-if="showSuccessPopup" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
  <div class="bg-white rounded-lg p-6 shadow-2xl max-w-md text-center">
    <h2 class="text-2xl font-bold mb-4 text-green-600">Order Successful!🎉</h2>
    <p class="text-gray-900 my-4">Thank you for your purchase. We’ll contact you shortly with the details.</p>
    <button aria-details="success" @click="showSuccessPopup = false" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
      Close
    </button>
  </div>
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
          <div class="font-semibold text-sm text-gray-900">₦ {{ (item.price * item.quantity).toFixed(2) }}</div>
        </div>

        <!-- Coupon Section -->
        <div class="mt-8">
         
          <div class="flex flex-col md:flex-row gap-2">
            <input
              v-model="couponCode"
              type="text"
              placeholder="Enter Promo Code"
              class="flex-1 px-4 py-2 border text-center rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              @input="validateInput"
            />
            <button
              @click="applyCoupon"
              :disabled="!isValid"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              :class="{ 'opacity-50 cursor-not-allowed': !isValid }"
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
            <span>₦ {{ subtotal.toFixed(2) }}</span>
          </div>

          <div v-if="discount > 0" class="flex justify-between font-medium text-green-600">
            <span>Discount</span>
            <span>-{{ discount }}%</span>
          </div>
          <div class="flex justify-between font-bold text-gray-900 text-lg mt-2">
            <span>Total</span>
            <span>₦ {{ total.toFixed(2) }}</span>
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
import Preloader from '@/components/Preloader.vue';

const toast = useToast();
const customerStore = useCustomerStore();
const cartStore = useCartStore();
const showError = ref(false);
const isPlacingOrder = ref(false);
const showSuccessPopup = ref(false);
const isValid = computed(() => couponCode.value.trim().length >= 10);

const validateInput = () => {
  showError.value = couponCode.value.length > 0 && !isValid.value;
};

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
const total = computed(() => subtotal.value - (subtotal.value * (discount.value / 100)));

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
    const response = await customerStore.CustomerRecord(payload);
    if (response.success) {
      toast.success(response.message, {
        timeout: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else {
      toast.error(response.message, {
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
const applyCoupon = async () => {
  const code = couponCode.value.trim().toUpperCase();
  if (isValid.value){
    try {
    const response = await api.post('coupon/apply-coupon', {
      code: code,
    })
    if (response.data.success){
      couponApplied.value = true;
      couponMessage.value = response.data.message
      discount.value = response.data.discount
      toast.success(response.data.message)
    }else{
      couponApplied.value = false;
      toast.error(response.data.message)
    }
    
  }catch(error){
    couponApplied.value = false;
    couponMessage.value = error.response?.data?.message.code[0] || 'Failed to apply coupon. Please try again.';
    toast.error(couponMessage.value);
    console.error('Error applying coupon:', error);
  }
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
      amount: total.value, // amount in Kobo
    });
    const pay_id = response.data.pay_id;
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
              const verifyRes = await api.post('payment/verify', {
                reference: paystackResponse.reference,
              });
              isPlacingOrder.value = true; // show preloader
              if (verifyRes.data.success) {
                try{
                    const createOrder = await api.post('order/create-order', {
                      email: form.email,
                      pay_id: pay_id,
                    })
                    if (createOrder.data.success){
                      showSuccessPopup.value = true; // show success div
                      await cartStore.fetchCart()
                    }else{
                      toast.error(verifyRes.data.message);
                    }
                }catch (error){
                  console.error('Order error:', error);
                  toast.error('Error creating order.');
                } finally{
                  isPlacingOrder.value = false;
                }
              } else {
                toast.error(verifyRes.data.message);
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
