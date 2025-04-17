import { defineStore } from 'pinia'
import { fetchAllProducts } from '../services/product/Products'
export const useProductStore =  defineStore(
    'product', {
        state: () => ({
            newArrivals: [],
            bestSellers: [],
            men: [],
            women: [],
            accessories: [],
            loading: false,
            error: null,
        }),
        actions: {
            async loadAllProducts(){
                this.loading = true;
                this.error = null;
                try {
                    const [m, w, acc, bs, na] = await Promise.all([
                        fetchAllProducts({category: 'Men'}),
                        fetchAllProducts({category: 'Women'}),
                        fetchAllProducts({category: 'Accessories'}),
                        fetchAllProducts({section: 'Best Sellers'}),
                        fetchAllProducts({section: 'New Arrivals'})
                    ]);
                    this.men = m.data.data;
                    this.women = w.data.data;
                    this.accessories = acc.data.data;
                    this.bestSellers = bs.data.data;
                    this.newArrivals = na.data.data;

                } catch (err){
                    console.error('Product loading failed', err)
                    this.error = 'Failed to load products'
                } finally {
                    this.loading = false;
                }
                
            },
        },
    },
);