class errorCheck { 
    constructor(status, message, res) {
        this.status = status;
        this.message = message;
        this.res = res;

        console.log(status);
        console.log(message);

    }

    showError = () => {
        return this.res.status(this.status).json({errorMessage: this.message})
    }
}

module.exports = errorCheck