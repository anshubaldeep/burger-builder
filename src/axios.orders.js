import Axios from 'axios'

const instance = Axios.create({
    baseURL:'https://react-burger-builder-91641.firebaseio.com/'
});


export default instance;