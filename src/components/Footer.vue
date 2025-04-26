<!-- src/components/Footer.vue -->
<template>
    <footer
      class="bg-gradient-to-r from-black to-gray-700 text-gray-100 py-12"
      role="contentinfo"
      aria-label="Cheeluxng Footer"
    >
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Logo -->
        <div class="flex justify-center mb-10">
          <img
            src="../assets/whitelogo.png"
            alt="Cheeluxng logo"
            class="w-48 lg:w-56 h-auto object-contain"
            loading="lazy"
          />
        </div>
  
        <!-- Main Content -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
          <!-- Stay Connected -->
          <div class="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 class="text-2xl font-montserrat font-bold mb-4">Stay Connected</h2>
            <ul class="text-lg font-lato space-y-3">
              <li>
                Helpline:
                <a href="tel:+2347084704784"  aria-label="Call our helpline" class="hover:underline text-gray-50">
                  +234 708 470 4784
                </a>
              </li>
              <li>Opening Hours: Tue - Sat, 8:00 AM - 9:00 PM</li>
            </ul>
          </div>
  
          <!-- Newsletter Subscription -->
          <div class="flex flex-col items-center md:items-start">
            <h2 class="text-2xl font-montserrat font-bold mb-4">Join Our Community</h2>
            <NewsletterSubscribe
              title="Stay Updated"
              description="Get exclusive offers and fitness tips!"
              @subscribe="handleNewsletterSubscribe"
              class="w-full max-w-md md:hidden"
            />
          </div>
  
          <!-- Follow Us -->
          <div class="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 class="text-2xl font-montserrat font-bold mb-4">Follow Us</h2>
            <ul class="flex gap-4 mb-6">
              <li>
                <a
                  href="https://instagram.com/cheeluxng"
                  target="_blank"
                  aria-label="Follow us on Instagram"
                >
                  <img
                    src="../assets/instagram.png"
                    alt="Instagram icon"
                    class="w-10 h-10 hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com/cheeluxng"
                  target="_blank"
                  aria-label="Follow us on Facebook"
                >
                  <img
                    src="../assets/facebook.png"
                    alt="Facebook icon"
                    class="w-10 h-10 hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/cheeluxng"
                  target="_blank"
                  aria-label="Follow us on Twitter"
                >
                  <img
                    src="../assets/twitter.png"
                    alt="Twitter icon"
                    class="w-10 h-10 hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com/@cheeluxng"
                  target="_blank"
                  aria-label="Follow us on TikTok"
                >
                  <img
                    src="../assets/tiktok.png"
                    alt="TikTok icon"
                    class="w-10 h-10 hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@cheeluxng"
                  target="_blank"
                  aria-label="Follow us on YouTube"
                >
                  <img
                    src="../assets/youtube.png"
                    alt="YouTube icon"
                    class="w-10 h-10 hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/+2347084704784"
                  target="_blank"
                  aria-label="Contact us on WhatsApp"
                >
                  <img
                    src="../assets/whatsapp.png"
                    alt="WhatsApp icon"
                    class="w-10 h-10 hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                </a>
              </li>
            </ul>
          </div>
  
          <!-- Helpful Links -->
          <div class="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 class="text-2xl font-montserrat font-bold mb-4">Helpful Links</h2>
            <ul class="text-lg font-lato space-y-3">
              <li class="text-gray-50">
                <router-link to="" class="hover:underline text-gray-50" aria-label="Learn about us">
                  About Us
                </router-link>
              </li>
              <li class="text-gray-50">
                <router-link to="" class="hover:underline text-gray-50" aria-label="View our trading policy">
                  Our Trading Policy
                </router-link>
              </li>
              <li class="text-gray-50">
                <router-link
                  to=""
                  class="hover:underline text-gray-50"
                  aria-label="View trade instructions"
                >
                  Trade Instructions
                </router-link>
              </li>
            </ul>
          </div>
        </div>
  
        <!-- Copyright -->
        <p class="mt-12 text-center text-gray-50 text-base font-lato">2025 © Cheeluxng Abuja</p>
      </div>
    </footer>
  </template>
  
  <script setup>
  import NewsletterSubscribe from './Subscribe.vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  function handleNewsletterSubscribe(email) {
    console.log('Footer: Newsletter subscription received', { email });
    // Add API call (e.g., Mailchimp, Shopify) or analytics tracking
  }
  </script>
  
  <style scoped>
  /* Ensure NewsletterSubscribe fits footer */
  .newsletter-subscribe {
    @apply bg-gray-800 rounded-xl p-4;
  }
  .newsletter-subscribe input {
    @apply bg-gray-700 text-gray-100 border-gray-600;
  }
  .newsletter-subscribe button {
    @apply bg-white text-black hover:bg-gray-200;
  }
  </style>