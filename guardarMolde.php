<?php
header('Content-Type: text/html; charset=utf-8');

$datosRecibidos = $_POST;
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guardar Molde - MoldesPro</title>
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>
<div class="resultado-container">
    <h2>Datos recibidos</h2>
    <pre><?php var_dump($datosRecibidos); ?></pre>

    <p>
        Categoria: <?php echo htmlspecialchars($_POST['categoria'] ?? '', ENT_QUOTES, 'UTF-8'); ?><br>
        Nombre de pieza: <?php echo htmlspecialchars($_POST['nombre_pieza'] ?? '', ENT_QUOTES, 'UTF-8'); ?><br>
        Género: <?php echo htmlspecialchars($_POST['genero'] ?? '', ENT_QUOTES, 'UTF-8'); ?><br>
        Ancho: <?php echo htmlspecialchars($_POST['ancho'] ?? '', ENT_QUOTES, 'UTF-8'); ?><br>
        Alto: <?php echo htmlspecialchars($_POST['alto'] ?? '', ENT_QUOTES, 'UTF-8'); ?><br>
    </p>

    <a class="link-button" href="index.php">Volver</a>
</div>
</body>
</html>