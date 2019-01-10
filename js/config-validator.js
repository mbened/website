var configValidator = {
    data: {
        config: null
    },
    init: function (config) {
        this.data.config = config;

        var validators = [
            this.definedCheck,
            this.emptyCheck,
            this.whitespaceCheck
        ];

        var variables = {
            "cognito.userPoolId": this.data.config.cognito.userPoolId,
            "cognito.domain": this.data.config.cognito.domain,
            "cognito.clientId": this.data.config.cognito.clientId,
            "cognito.redirectUri": this.data.config.cognito.redirectUri
        }

        var error = false;
        for (var validatorIndex = 0; validatorIndex < validators.length; validatorIndex++) {
            for (var resource in variables) {
                error |= validators[validatorIndex](resource, variables[resource])
            }
        }
 
        if (error) {
            alert("One or more errors have been detected inside config file.\nPlease open the Javascript console to verify it.")
        }
    },
    definedCheck: function(resource, variable) {
        if (typeof(variable) == 'undefined') {
            console.warn(resource + " is undefined");
            return true;
        } else {
            return false;
        }
    },
    emptyCheck: function(resource, variable) {
        if (variable == '') {
            console.warn(resource + " is empty");
            return true;
        } else {
            return false;
        }
    },
    whitespaceCheck: function(resource, variable) {
        if (variable.indexOf(' ') != -1) {
            console.warn(resource + " contains spaces");
            return true;
        } else {
            return false;
        }
    }
};
