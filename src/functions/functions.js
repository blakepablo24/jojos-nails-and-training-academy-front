let myFunctionsClass = {}

myFunctionsClass = {
    checkBasket(data) {
        let alreadyInBasket = false;
        let basketItems = JSON.parse(localStorage.getItem("basketItems"));

        if(data.match(".*\\d.*")){
            basketItems.forEach(basketItem => {
                if (basketItem.id === data) {
                    alreadyInBasket = true;
                }
            });
         } else {
            basketItems.forEach(basketItem => {
                if (basketItem.type === data) {
                    alreadyInBasket = true;
                }
            });
         }

        return alreadyInBasket;
    }
}


export default myFunctionsClass