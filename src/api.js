// Simulating api to test async data
const api = {
    createItem: (url, newItem) => {
      return Promise.resolve(newItem);
    }
  };
  
  export default api;