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
    },

    scrollToTop() {
        window.scrollTo(0, 0);
    },
    
    checkAllowedInputTextArea(description){
        let error = "";
        if(description === ""){
            error = <h4 className="error">Description cannot be empty</h4>;
        } else if(description.length < 5){
            error = <h4 className="error">Title must be longer 5 characters</h4>;
        } else if (/[^a-zA-Z0-9 ,?!.'-]/.test(description)) {
            error = <h4 className="error">Please enter only letters and numbers</h4>;
        }
        return error;
    }

}


export default myFunctionsClass