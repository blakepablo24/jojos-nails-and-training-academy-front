let myFunctionsClass = {
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

    // Scroll Positions

    scrollToTop() {
        window.scrollTo(0, 0);
    },

    handleOldScrollPosition() {
        const scrollPosition = localStorage.getItem("scrollPosition");
        if (scrollPosition) {
            window.scrollTo(0, parseInt(scrollPosition));
            localStorage.removeItem("scrollPosition");
        }
    },

    handleStoringScrollPosition() {
    localStorage.setItem("scrollPosition", window.pageYOffset);
    },

    // Site Form Error checking
    
    checkAllowedTextInput(input, type){
        let error = "";
        if(type){
            if(input === ""){
                error = <h4 className="error">{type} cannot be empty</h4>;
            } else if (/[^a-zA-Z0-9 ,?!':().£&-/"]/.test(input)) {
                error = <h4 className="error">Please enter only letters and numbers</h4>;
            }
            return error;
        } else if (/[^a-zA-Z0-9 ,?!':().£&-/"]/.test(input)) {
            error = <h4 className="error">Please enter only letters and numbers</h4>;
        }
        return error;
    },

    checkAllowedPriceInput(input){
        let error = "";
        if(input === ""){
            error = <h4 className="error">Price cannot be empty</h4>;
        } else if (/[^0-9.]/.test(input)) {
            error = <h4 className="error">Please enter only numbers and decimal point</h4>;
        }
        return error;
    },

    checkAllowedDurationInput(input){
        let error = "";
        if(input === ""){
            error = <h4 className="error">Duration cannot be empty</h4>;
        } else if (/[^0-9]/.test(input)) {
            error = <h4 className="error">Please enter only numbers</h4>;
        }
        return error;
    },

    checkAllowedSelectInput(input, type){
        let error = "";
        if(input === "select" || input === ""){
            error = <h4 className="error">Please choose a {type}!</h4>;
        }
        return error;
    }

}


export default myFunctionsClass