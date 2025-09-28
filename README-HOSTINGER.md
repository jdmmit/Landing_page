# 🚀 Guía de Implementación en Hostinger

## **Dominio: https://juandmurillom.com.co**

### **📋 PASOS PREVIOS**

1. **Verificar Propiedad del Dominio**
   - Asegúrate de que el dominio `juandmurillom.com.co` está correctamente configurado en Hostinger
   - Verifica que los DNS apuntan correctamente a Hostinger

2. **Preparar Archivos para Producción**
   ```bash
   # Los archivos están listos:
   # - index.html (optimizado)
   # - styles.css (optimizado)
   # - script.js (optimizado)
   # - .htaccess (configuración de seguridad)
   # - assets/images/profile.jpg
   ```

---

### **📤 SUBIR ARCHIVOS A HOSTINGER**

#### **Método 1: File Manager (Recomendado)**

1. **Acceder al Panel de Hostinger**
   - Ir a https://hpanel.hostinger.com/
   - Iniciar sesión con tus credenciales

2. **Navegar al Administrador de Archivos**
   - En el panel, hacer clic en "Sitios web" → "Administrador de archivos"
   - O desde el dashboard: "Administrador de archivos"

3. **Subir Archivos**
   ```
   public_html/
   ├── index.html
   ├── styles.css
   ├── script.js
   ├── .htaccess
   └── assets/
       └── images/
           └── profile.jpg
   ```

4. **Proceso de Subida**
   - Seleccionar "Subir archivos"
   - Arrastrar y soltar todos los archivos
   - Verificar que `.htaccess` se suba correctamente

#### **Método 2: FTP**

```bash
# Conexión FTP
Host: ftp.juandmurillom.com.co
Usuario: tu_usuario_hostinger
Contraseña: tu_contraseña
Puerto: 21

# Subir archivos
put index.html /public_html/
put styles.css /public_html/
put script.js /public_html/
put .htaccess /public_html/
```

---

### **⚙️ CONFIGURACIÓN POST-DEPLOYMENT**

#### **1. Verificar HTTPS (SSL)**

1. **Activar SSL Gratuito**
   - Ir a "Sitios web" → "SSL gratuito"
   - Activar SSL para `juandmurillom.com.co`

2. **Forzar HTTPS**
   - El archivo `.htaccess` ya incluye la regla para forzar HTTPS
   - Verificar que funcione correctamente

#### **2. Configurar CDN (Opcional)**

Hostinger tiene Cloudflare integrado:
- Ir a "Sitios web" → "Cloudflare"
- Activar protección DDoS y optimizaciones

#### **3. Configurar Caching**

El `.htaccess` ya incluye:
- Cache para archivos estáticos (CSS, JS, imágenes)
- Sin cache para HTML

#### **4. Verificar Funcionalidades**

**Botón de Tema Oscuro:**
- Aparece en esquina superior derecha (🌙/☀️)
- Cambia entre modo claro y oscuro al hacer clic
- Recuerda la preferencia del usuario
- Se adapta responsivamente a diferentes pantallas

---

### **🔒 VERIFICACIONES DE SEGURIDAD**

#### **1. Headers de Seguridad**

Verificar que estos headers estén activos:
```bash
curl -I https://juandmurillom.com.co
```

**Deberías ver:**
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

#### **2. Pruebas de Seguridad**

- [x] Formulario de contacto validado
- [x] Headers de seguridad configurados
- [x] Protección contra XSS
- [x] Compresión GZIP activada
- [x] Archivos sensibles protegidos

---

### **🚀 VERIFICACIÓN FINAL**

#### **URLs a Verificar:**

1. **Sitio Principal:** https://juandmurillom.com.co
2. **Sin www:** https://juandmurillom.com.co
3. **Con www:** https://www.juandmurillom.com.co (debe redirigir)

#### **Pruebas Funcionales:**

- [ ] El sitio carga correctamente
- [ ] Las animaciones funcionan
- [ ] El botón 🌙/☀️ del tema oscuro funciona (esquina superior derecha)
- [ ] El formulario de contacto responde
- [ ] Los enlaces sociales funcionan
- [ ] El sitio es responsive
- [ ] HTTPS está activo
- [ ] Las tarjetas se ven correctamente en móviles angostos

---

### **📊 MONITOREO Y MANTENIMIENTO**

#### **Herramientas de Hostinger:**

1. **Estadísticas de Visitas**
   - Panel → "Estadísticas"

2. **Respaldos Automáticos**
   - Configurados automáticamente por Hostinger

3. **Certificado SSL**
   - Se renueva automáticamente

#### **Optimizaciones Adicionales:**

- Configurar Cloudflare para CDN global
- Monitorear tiempo de carga con GTmetrix
- Configurar Google Analytics/Search Console

---

### **🆘 SOLUCIÓN DE PROBLEMAS**

#### **Problema: Sitio no carga**
```bash
# Verificar DNS
nslookup juandmurillom.com.co

# Verificar HTTPS
curl -I https://juandmurillom.com.co
```

#### **Problema: HTTPS no funciona**
- Verificar que SSL esté activado en Hostinger
- Esperar 5-10 minutos para propagación

#### **Problema: Archivos no se suben**
- Verificar permisos de archivo (644 para archivos, 755 para carpetas)
- Usar File Manager en lugar de FTP

---

### **📝 NOTAS IMPORTANTES**

- **Dominio:** juandmurillom.com.co
- **Hosting:** Hostinger (compartido recomendado)
- **SSL:** Activado automáticamente
- **CDN:** Cloudflare integrado disponible
- **Backup:** Configurado automáticamente

---

### **🎯 URLS IMPORTANTES**

- **Panel Hostinger:** https://hpanel.hostinger.com/
- **Webmail:** https://webmail.hostinger.com/
- **File Manager:** Accesible desde hPanel
- **Sitio en Vivo:** https://juandmurillom.com.co

---

**¡Tu portafolio está listo para producción! 🚀**