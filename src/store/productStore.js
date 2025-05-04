// stores/productStore.js
import { defineStore } from 'pinia';
import { fetchAllProducts, fetchAllProductsById } from '@/services/product/Products';

export const useProductStore = defineStore('product', {
  state: () => ({
    allProducts: [],
    categories: {
      men: [],
      women: [],
      accessories: [],
      menShort: [],
      menSet: [],
      menSleeves: [],
      womenSleeves: [],
      womenShort: [],
      womenSet: [],
      caps: [],
      socks: [],
      bags: [],
      ladiesComfort: [],
    },
    sections: {
      bestSellers: [],
      newArrivals: []
    },
    loading: false,
    error: null,
  }),
  actions: {
    async loadAllProducts() {
      this.loading = true;
      this.error = null;
      try {
        const productRequests = [
          { key: 'categories.men', params: { category: 'Men' } },
          { key: 'categories.menSleeves', params: { category: 'Men' , product_type: "Men's sleeves"} },
          { key: 'categories.womenSleeves', params: { category: 'Women' , product_type: "Women's sleeves"} },
          { key: 'categories.women', params: { category: 'Women' } },
          { key: 'categories.accessories', params: { category: 'Accessories' } },
          { key: 'sections.bestSellers', params: { section: 'Best Sellers' } },
          { key: 'sections.newArrivals', params: { section: 'New Arrivals' } },
          { key: 'categories.menShort', params: { category: 'Men', product_type: "Men's short" } },
          { key: 'categories.menSet', params: { category: 'Men', product_type: "Men's set" } },
          { key: 'categories.womenShort', params: { category: 'Women', product_type: "Women's short" } },
          { key: 'categories.womenSet', params: { category: 'Women', product_type: "Women's set" } },
          { key: 'categories.caps', params: { category: 'Accessories', product_type: 'Caps' } },
          { key: 'categories.socks', params: { category: 'Accessories', product_type: 'Socks' } },
          { key: 'categories.bags', params: { category: 'Accessories', product_type: 'Bags' } },
          { key: 'categories.ladiesComfort', params: { category: 'Women', section: 'Ladies Comfort' } },
        ];

        const responses = await Promise.all(
          productRequests.map(request => fetchAllProducts(request.params))
        );

        const allProductsSet = new Set(); // use Set to avoid duplicates
        responses.forEach((response, index) => {
          const { key } = productRequests[index];
          const [mainKey, subKey] = key.split('.');
          const products = response.data.data;

          this[mainKey][subKey] = products;

          // Add unique products to allProducts
          products.forEach(product => {
            allProductsSet.add(JSON.stringify(product));
          });

        });

        // Convert set back to array of objects
        this.allProducts = Array.from(allProductsSet).map(p => JSON.parse(p));
      } catch (err) {
        console.error('Product loading failed', err);
        this.error = 'Failed to load products';
      } finally {
        this.loading = false;
      }
    },

    async loadProductById(id) {
      this.loading = true;
      try {
        const response = await fetchAllProductsById(id);
        return response.data;
        
      } catch (err) {
        console.error('ProductStore: Failed to load product', err);
        return null;
      } finally {
        this.loading = false;
      }
    },
  },
  
});
