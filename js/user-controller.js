var userController = {
    data: {
        config: null
    },
    uiElements: {
        loginButton: null,
        logoutButton: null,
        profileButton: null,
        profileNameLabel: null,
        profileImage: null
    },
    init: function (config) {
        this.uiElements.loginButton = $('#cognito-login');
        this.uiElements.logoutButton = $('#cognito-logout');
        this.uiElements.profileButton = $('#user-profile');
        this.uiElements.profileNameLabel = $('#profilename');
        this.uiElements.profileImage = $('#profilepicture');

        this.data.config = config;

        // check to see if the user has previously logged in
        auth = this.initCognitoSDK()
		auth.parseCognitoWebResponse(window.location.href);

        this.wireEvents();
    },
    initCognitoSDK() {
		var authData = {
			ClientId : this.data.config.cognito.clientId,
			AppWebDomain : this.data.config.cognito.domain,
			TokenScopesArray : ['phone', 'email', 'openid', 'aws.cognito.signin.user.admin', 'profile'],
			RedirectUriSignIn : this.data.config.cognito.redirectUri,
			RedirectUriSignOut : this.data.config.cognito.redirectUri,
            UserPoolId : this.data.config.cognito.userPoolId, 
            AdvancedSecurityDataCollectionFlag : false
		};

        var auth = new AmazonCognitoIdentity.CognitoAuth(authData);
        var that = this

        auth.userhandler = {
			onSuccess: function(result) {
//                that.uiElements.profileNameLabel.text(profile.nickname || profile.email);
//                that.uiElements.profileImage.attr('src', profile.picture);

                that.uiElements.loginButton.toggle(false);
                that.uiElements.logoutButton.toggle(true);
                that.uiElements.profileButton.toggle(true);
            },
			onFailure: function(result) {
                that.uiElements.loginButton.toggle(true);
                that.uiElements.logoutButton.toggle(false);
                that.uiElements.profileButton.toggle(false);
            }
        };
        // We do not use Authorization code grant flow
		// auth.useCodeGrantFlow();
		return auth;
	},
    configureAuthenticatedRequests: function () {
        $.ajaxSetup({
            'beforeSend': function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('idToken'));
            }
        });
    },
    wireEvents: function () {
        var that = this;

        this.uiElements.loginButton.click(function (e) {
            auth.getSession();
        });

        this.uiElements.logoutButton.click(function (e) {
            auth.signOut();

            that.uiElements.logoutButton.hide();
            that.uiElements.profileButton.hide();
            that.uiElements.loginButton.show();
        });
    }
};
