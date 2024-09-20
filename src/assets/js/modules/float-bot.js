export default function floatBoot() {
    $('.alert-close').click(function () {
        $('.float-bot').animate({
            bottom: "-100px",
        }, 500, function () {
            $('.float-bot').css('display', 'none');
        });
    });

}
