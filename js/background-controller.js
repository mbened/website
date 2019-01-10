var backgroundController = {
    uiElements: {
        coverContainer: null,
    },
    init: function () {
        this.uiElements.coverContainer = $('#hero-cover');

        imageNumber = Math.floor((Math.random() * 4) + 1);
        this.uiElements.coverContainer.css("background-image", "url('images/background-" + imageNumber + ".jpg')");
    }
};
