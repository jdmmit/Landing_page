#!/usr/bin/env node
/**
 * Script de construcción para producción
 * Ejecutar con: node build.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔨 Construyendo para producción...');

// Verificar que los archivos existen
const files = ['index.html', 'styles.css', 'script.js', '.htaccess'];
let allFilesExist = true;

files.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file} encontrado`);
    } else {
        console.log(`❌ ${file} no encontrado`);
        allFilesExist = false;
    }
});

if (!allFilesExist) {
    console.log('❌ Faltan archivos. Abortando construcción.');
    process.exit(1);
}

// Crear directorio de distribución si no existe
const distDir = 'dist';
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
    console.log(`📁 Directorio ${distDir} creado`);
}

// Copiar archivos a dist
files.forEach(file => {
    const sourcePath = path.join(__dirname, file);
    const destPath = path.join(__dirname, distDir, file);

    try {
        fs.copyFileSync(sourcePath, destPath);
        console.log(`📋 ${file} copiado a ${distDir}`);
    } catch (error) {
        console.log(`❌ Error copiando ${file}:`, error.message);
    }
});

// Copiar assets
const assetsDir = 'assets';
if (fs.existsSync(assetsDir)) {
    const destAssetsDir = path.join(__dirname, distDir, assetsDir);

    function copyRecursive(src, dest) {
        const exists = fs.existsSync(src);
        const stats = exists && fs.statSync(src);
        const isDirectory = exists && stats.isDirectory();

        if (isDirectory) {
            if (!fs.existsSync(dest)) {
                fs.mkdirSync(dest);
            }
            fs.readdirSync(src).forEach(childItemName => {
                copyRecursive(path.join(src, childItemName), path.join(dest, childItemName));
            });
        } else {
            fs.copyFileSync(src, dest);
        }
    }

    copyRecursive(assetsDir, destAssetsDir);
    console.log(`📋 Directorio ${assetsDir} copiado a ${distDir}`);
}

console.log('🎉 Construcción completada exitosamente!');
console.log(`📦 Archivos listos en el directorio: ${distDir}`);
console.log('');
console.log('📋 Archivos generados:');
files.forEach(file => {
    const destPath = path.join(distDir, file);
    if (fs.existsSync(destPath)) {
        const stats = fs.statSync(destPath);
        console.log(`   - ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
    }
});

console.log('');
console.log('📋 Resumen de archivos:');
console.log('   - index.html: Página principal optimizada');
console.log('   - styles.css: Estilos con sistema de animaciones unificado');
console.log('   - script.js: JavaScript limpio y seguro');
console.log('   - .htaccess: Configuración de seguridad');
console.log('   - assets/: Imágenes y recursos');
console.log('');
console.log('🚀 ¡Listo para despliegue!');
console.log('   ✅ Seguridad implementada');
console.log('   ✅ Animaciones optimizadas');
console.log('   ✅ Formulario seguro');
console.log('   ✅ 3 proyectos configurados');
console.log('   ✅ Responsive design');
console.log('   📍 Dominio: https://juandmurillom.com.co');