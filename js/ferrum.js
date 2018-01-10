ferrum = require('./js/ferrum-api');

$(() => {

    $('.tab-button').on('click', (evt) => {
        const self = $(evt.currentTarget);
        const tab = self.attr('data-tab');
        self.parent().find('.active').removeClass('active');
        self.addClass('active');
        const contents = self.parent().next();
        contents.attr('data-tab-active', tab);
        contents.find('.active').removeClass('active');
        contents.find(`.tab-content[data-tab="${tab}"]`).addClass('active');
    });

});
