<?php
function renderFormularioMolde($categorias = []) {
?>
<div class="form-container">
    <h2>Crear Nuevo Molde</h2>
    <form action="guardarMolde.php" method="post">
        <label for="categoria">Categoría:</label>
        <select id="categoria" name="categoria" required>
            <?php if (empty($categorias)): ?>
                <option value="">-- Sin categorías --</option>
            <?php else: ?>
                <?php foreach ($categorias as $cat): ?>
                    <option value="<?php echo htmlspecialchars($cat, ENT_QUOTES, 'UTF-8'); ?>"><?php echo htmlspecialchars($cat, ENT_QUOTES, 'UTF-8'); ?></option>
                <?php endforeach; ?>
            <?php endif; ?>
        </select>

        <label for="nombre_pieza">Nombre de la Pieza:</label>
        <select id="nombre_pieza" name="nombre_pieza" required>
            <option value="Delantero">Delantero</option>
            <option value="Trasero">Trasero</option>
            <option value="Manga">Manga</option>
        </select>

        <label for="genero">Género:</label>
        <select id="genero" name="genero">
            <option value="Mujer">Mujer</option>
            <option value="Hombre">Hombre</option>
        </select>

        <label for="ancho">Ancho Base (cm):</label>
        <input id="ancho" type="number" name="ancho" step="0.1" required placeholder="Ej: 40.5">

        <label for="alto">Alto Base (cm):</label>
        <input id="alto" type="number" name="alto" step="0.1" required placeholder="Ej: 60.0">

        <button type="submit">Guardar Molde</button>
    </form>
</div>
<?php
}
?>