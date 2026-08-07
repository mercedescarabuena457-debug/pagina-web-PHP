<?php
include __DIR__ . '/componentes/header.php';
include __DIR__ . '/componentes/formularioMolde.php';
include __DIR__ . '/componentes/tablaMoldes.php';

$categoriasPrueba = ['Camisa', 'Pantalon', 'Vestido'];
$moldesPrueba = [
    ['categoria' => 'Camisa', 'nombre_pieza' => 'Delantero', 'genero' => 'Hombre', 'ancho' => '40.5', 'alto' => '60.0'],
    ['categoria' => 'Pantalon', 'nombre_pieza' => 'Trasero', 'genero' => 'Mujer', 'ancho' => '45.0', 'alto' => '90.0'],
];

renderHeader('MoldesPro - Inicio');
renderFormularioMolde($categoriasPrueba);
renderTablaMoldes($moldesPrueba);
?>
</main>
</body>
</html>