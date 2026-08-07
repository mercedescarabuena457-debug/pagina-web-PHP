<?php
function renderTablaMoldes($moldes = []) {
?>
<div class="table-container">
    <h2>Lista de Moldes</h2>
    <?php if (empty($moldes)): ?>
        <p>No hay moldes para mostrar.</p>
    <?php else: ?>
        <table>
            <thead>
                <tr>
                    <th>Categoría</th>
                    <th>Pieza</th>
                    <th>Género</th>
                    <th>Ancho (cm)</th>
                    <th>Alto (cm)</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($moldes as $molde): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($molde['categoria'] ?? '', ENT_QUOTES, 'UTF-8'); ?></td>
                        <td><?php echo htmlspecialchars($molde['nombre_pieza'] ?? '', ENT_QUOTES, 'UTF-8'); ?></td>
                        <td><?php echo htmlspecialchars($molde['genero'] ?? '', ENT_QUOTES, 'UTF-8'); ?></td>
                        <td><?php echo htmlspecialchars($molde['ancho'] ?? '', ENT_QUOTES, 'UTF-8'); ?></td>
                        <td><?php echo htmlspecialchars($molde['alto'] ?? '', ENT_QUOTES, 'UTF-8'); ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php endif; ?>
</div>
<?php
}
?>