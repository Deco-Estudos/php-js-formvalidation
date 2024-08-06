// validation.js

// Função para enviar o contato via AJAX
function sendContact() {
    // Valida os dados do formulário
    var valid = validateContact();
    
    // Se os dados forem válidos, envie o formulário via AJAX
    if (valid) {
        jQuery.ajax({
            url: "contact_mail.php", // URL do script PHP que processará o formulário
            data: {
                userName: $("#nome").val(),       // Nome do usuário
                userEmail: $("#email").val(),     // E-mail do usuário
                subject: $("#precatorio").val(),  // Valor do precatório
                content: $("#processo").val(),    // Número do processo
                state: $("#estado").val()         // Estado selecionado
            },
            type: "POST", // Método de envio dos dados
            success: function(data) {
                // Exibe mensagem de sucesso
                $("#mail-status").html('<div class="success">Mensagem enviada com sucesso!</div>');
            },
            error: function() {
                // Exibe mensagem de erro
                $("#mail-status").html('<div class="error">Ocorreu um erro. Tente novamente.</div>');
            }
        });
    }
}

// Função para validar os dados do formulário
function validateContact() {
    var valid = true;
    
    // Remove estilos e mensagens anteriores
    $(".demoInputBox").css('background-color', '');
    $(".info").html('');

    // Valida o Nome
    if (!$("#nome").val()) {
        $("#userName-info").html("(required)"); // Mensagem de campo obrigatório
        $("#nome").css('background-color', '#FFFFDF'); // Destaca o campo em amarelo
        valid = false;
    }

    // Valida o E-mail
    var email = $("#email").val();
    if (!email) {
        $("#userEmail-info").html("(required)"); // Mensagem de campo obrigatório
        $("#email").css('background-color', '#FFFFDF'); // Destaca o campo em amarelo
        valid = false;
    } else if (!email.match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})$/)) {
        $("#userEmail-info").html("(invalid)"); // Mensagem de e-mail inválido
        $("#email").css('background-color', '#FFFFDF'); // Destaca o campo em amarelo
        valid = false;
    }

    // Valida o Valor do Precatório
    if (!$("#precatorio").val()) {
        $("#subject-info").html("(required)"); // Mensagem de campo obrigatório
        $("#precatorio").css('background-color', '#FFFFDF'); // Destaca o campo em amarelo
        valid = false;
    }

    // Valida o Número do Processo
    if (!$("#processo").val()) {
        $("#content-info").html("(required)"); // Mensagem de campo obrigatório
        $("#processo").css('background-color', '#FFFFDF'); // Destaca o campo em amarelo
        valid = false;
    }

    // Valida o Estado (State)
    if (!$("#estado").val()) {
        $("#estado-info").html("(required)"); // Mensagem de campo obrigatório
        $("#estado").css('background-color', '#FFFFDF'); // Destaca o campo em amarelo
        valid = false;
    } else {
        $("#estado-info").html(''); // Limpa a mensagem de erro se o campo for válido
    }

    // Valida a Checkbox da Política de Privacidade
    if (!$("#privacyPolicy").is(':checked')) {
        $("#privacyPolicy-info").html("(required)"); // Mensagem de campo obrigatório
        valid = false;
    } else {
        $("#privacyPolicy-info").html(''); // Limpa a mensagem de erro se o campo for válido
    }

    return valid; // Retorna se os dados são válidos ou não
}
