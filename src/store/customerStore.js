import { defineStore } from 'pinia';
import { fetchCustomerDetails, CreateCustomer } from '@/services/customer/Customer';

export const useCustomerStore = defineStore('customerstore', {
  state: () => ({
    info: {
        id: '',
        full_name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: '',
    },
    loading: false,
    error: null,
  }),

  actions: {
    async GetCustomerInfo() {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetchCustomerDetails();
        this.info = response;  // assuming API returns the same structure
      } catch (err) {
        console.error('Failed to fetch customer details', err);
        this.error = 'Failed to load customer info. Please try again.';
      } finally {
        this.loading = false;
      }
    },

    async CustomerRecord(payload) {
        this.loading = true
        this.error = null;
        try{
            console.log(payload)
            const response = await CreateCustomer(payload)
            if (response.data.success){
                await this.GetCustomerInfo();
            }
            else{
                this.error = response.data.message
            }
        } catch (err){
            this.error = err.message?.data?.message || 'Failed to create customer record'
        }finally{
            this.loading = false;
        }
    },
  },
});
