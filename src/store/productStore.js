import { defineStore } from 'pinia';
import { fetchAllProducts } from '../services/product/Products';

export const useProductStore = defineStore('product', {
    state: () => ({
        categories: {
            men: [],
            women: [],
            accessories: [],
            menShort: [],
            menSet: [],
            womenShort: [],
            womenSet: [],
            caps: [],
            socks: [],
            bags: []
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
                ];

                const responses = await Promise.all(
                    productRequests.map(request => fetchAllProducts(request.params))
                );
                console.log(responses)

                responses.forEach((response, index) => {
                    const { key } = productRequests[index];
                    const [mainKey, subKey] = key.split('.');
                    this[mainKey][subKey] = response.data.data;
                });
            } catch (err) {
                console.error('Product loading failed', err);
                this.error = 'Failed to load products';
            } finally {
                this.loading = false;
            }
        },
    },
});