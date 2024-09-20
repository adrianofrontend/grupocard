toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-bottom-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}
jQuery.extend(jQuery.validator.messages, {
    digits: "Por favor insira apenas dígitos.",
    min: jQuery.validator.format("Insira um valor maior ou igual a 20."),
});


// Validate Form Motoris
const formSendData = () => {
    let formSend = $('#sendForm')
    formSend.validate({
        rules: {
            name: 'required',
            email: {
                required: true,
                email: true
            },
            whatsapp: 'required',
            quantity: "required",
            digits: "required"
        },
        messages: {
            name: 'Campo obrigatório',
            email: {
                required: 'Campo obrigatório',
                email: 'E-mail inválido'
            },
            whatsapp: 'Campo obrigatório',
            assunto: {
                required: "Insira um assunto",
                
            }

        },
        errorPlacement: function (error, element) {
            if (element.is(':radio') || element.is(':checkbox')) {

                element.parents('span').append(error);

            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function () {
            formSend.addClass('load');

            $.ajax({
                method: 'POST',
                url: formSend.attr('action'),
                data: formSend.serialize()
            })
                .done(function (result) {
                    formSend.removeClass('load');

                    if (result == "success") {

                        formSend.find('fieldset').hide();
                        formSend.find('.sucess').fadeIn();

                        formSend[0].reset();
                    } else {
                        toastr.warning('Desculpe ocorreu um erro, tente novamente', 'ERRO');
                    }
                })
                .fail(function () {
                    toastr.warning('Desculpe ocorreu um erro, tente novamente', 'ERRO');
                })

            return false;
        }
    });
}

$(function () {
    formSendData();
});


