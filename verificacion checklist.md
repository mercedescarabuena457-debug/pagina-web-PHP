# CHECKLIST DE VERIFICACIÓN - COMPONENTES FRONTEND PHP

*Proyecto:* Software de Moldes de Confección - MoldesPro
*Fecha:* 28/07/2026
*Responsable:* [Tu Nombre]

## 1. VERIFICACIÓN DE ESTRUCTURA
- [ ] 1.1 Existe carpeta /componentes
- [ ] 1.2 Existe archivo componentes/header.php
- [ ] 1.3 Existe archivo componentes/formularioMolde.php
- [ ] 1.4 Existe archivo componentes/tablaMoldes.php
- [ ] 1.5 Existe archivo assets/style.css

## 2. VERIFICACIÓN DE DEFINICIÓN DE COMPONENTES
### Componente: header.php
- [ ] 2.1 Tiene función renderHeader($titulo)
- [ ] 2.2 No tiene consultas a BD
- [ ] 2.3 Solo devuelve HTML + CSS

### Componente: formularioMolde.php
- [ ] 2.4 Tiene función renderFormularioMolde($datos)
- [ ] 2.5 Recibe parámetros por función
- [ ] 2.6 Usa foreach para pintar datos dinámicos
- [ ] 2.7 El action apunta a guardarMolde.php

### Componente: tablaMoldes.php
- [ ] 2.8 Tiene función renderTablaMoldes($moldes)
- [ ] 2.9 Valida si el array viene vacío
- [ ] 2.10 Se puede reutilizar en 2 páginas distintas

## 3. VERIFICACIÓN DE FUNCIONAMIENTO
- [ ] 3.1 XAMPP Apache está corriendo
- [ ] 3.2 Al abrir http://localhost/moldespro-frontend/ carga sin errores
- [ ] 3.3 Se visualiza el Header
- [ ] 3.4 Se visualiza el Formulario con las categorías
- [ ] 3.5 Se visualiza la Tabla

## 4. VERIFICACIÓN DE COMUNICACIÓN BACKEND
- [ ] 4.1 Al enviar el form, llega a guardarMolde.php
- [ ] 4.2 var_dump($_POST) muestra los datos
- [ ] 4.3 Los datos se guardan en la BD MySQL

## 5. VERIFICACIÓN DE REUTILIZACIÓN
- [ ] 5.1 renderTablaMoldes() se usa en index.php
- [ ] 5.2 renderTablaMoldes() se usa en reportes.php
- [ ] 5.3 Cambiar 1 línea en el componente afecta a las 2 páginas

## OBSERVACIONES:
[Escribe aquí los errores encontrados]

## CONCLUSIÓN:
[ ] APROBADO  [ ] APROBADO CON OBSERVACIONES  [ ] RECHAZADO
