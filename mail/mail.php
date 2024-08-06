<?php
// Defina o endereço de e-mail para o qual a mensagem será enviada
$toEmail = "admin@phppot_samples.com";

// Verifique se os dados foram enviados via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize e valide os dados do formulário
    $userName = filter_var(trim($_POST["Nome"]), FILTER_SANITIZE_STRING);
    $userEmail = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $estado = filter_var(trim($_POST["estado"]), FILTER_SANITIZE_STRING);
    $telefone = filter_var(trim($_POST["telefone"]), FILTER_SANITIZE_STRING);
    $precatorio = filter_var(trim($_POST["precatorio"]), FILTER_SANITIZE_STRING);
    $processo = filter_var(trim($_POST["numero_processo"]), FILTER_SANITIZE_STRING);
    $privacyPolicy = isset($_POST["privacyPolicy"]) ? true : false;

    // Valida e sanitiza os campos obrigatórios
    if (empty($userName) || empty($userEmail) || empty($precatorio) || empty($processo) || !$privacyPolicy) {
        echo "<p class='error'>Todos os campos obrigatórios devem ser preenchidos e a política de privacidade deve ser aceita.</p>";
        exit;
    }

    // Verifique se o e-mail é válido
    if (!filter_var($userEmail, FILTER_VALIDATE_EMAIL)) {
        echo "<p class='error'>E-mail inválido.</p>";
        exit;
    }

    // Crie o corpo do e-mail
    $emailBody = "Nome: $userName\n";
    $emailBody .= "E-mail: $userEmail\n";
    $emailBody .= "Estado: $estado\n";
    $emailBody .= "Telefone: $telefone\n";
    $emailBody .= "Valor do precatório: $precatorio\n";
    $emailBody .= "Número do processo: $processo\n";

    // Crie o cabeçalho do e-mail
    $mailHeaders = "From: " . $userName . " <" . $userEmail . ">\r\n";
    $mailHeaders .= "Reply-To: " . $userEmail . "\r\n";
    $mailHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Envie o e-mail
    if (mail($toEmail, "Formulário de Contato", $emailBody, $mailHeaders)) {
        echo "<p class='success'>E-mail de contato enviado com sucesso.</p>";
    } else {
        echo "<p class='error'>Problema ao enviar o e-mail.</p>";
    }
} else {
    echo "<p class='error'>Método de solicitação inválido.</p>";
}
?>
