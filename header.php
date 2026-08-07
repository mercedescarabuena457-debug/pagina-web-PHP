<?php
function renderHeader($titulo = "MoldesPro") {
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($titulo, ENT_QUOTES, 'UTF-8'); ?></title>
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>
<header class="navbar">
    <div class="nav-logo"><?php echo htmlspecialchars($titulo, ENT_QUOTES, 'UTF-8'); ?></div>
    <nav>
        <a href="index.php">Inicio</a>
        <a href="reportes.php">Reportes</a>
        <a href="#">Salir</a>
    </nav>
</header>
<main class="contenido">
<?php
}
?>