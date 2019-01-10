(function () {
    $(document).ready(function () {
        backgroundController.init();
        configValidator.init(configConstants);
        userController.init(configConstants);
    });
}());
