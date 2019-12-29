const prod = {
    url: {
     API_URL: 'http://34.228.52.192:8080/familytree/'
    }
};
   
const dev = {
    url: {
        API_URL: 'http://localhost:8093/familytree/'
    }
};
//export const config = process.env.NODE_ENV === 'development' ? dev : prod;
export const config = prod