# 🛒 Tienda

> Aplicación web desarrollada con Angular 21 que simula una tienda en línea moderna utilizando componentes reutilizables, arquitectura escalable y buenas prácticas de desarrollo.

---

# 📌 Tabla de Contenido

- [📖 Descripción](#-descripción)
- [🚀 Tecnologías](#-tecnologías)
- [⚙️ Requisitos Previos](#️-requisitos-previos)
- [📥 Instalación](#-instalación)
- [🖥️ Servidor de Desarrollo](#️-servidor-de-desarrollo)
- [📂 Estructura del Proyecto](#-estructura-del-proyecto)
- [🧱 Generación de Componentes](#-generación-de-componentes)
- [🏗️ Compilación del Proyecto](#️-compilación-del-proyecto)
- [🧪 Testing](#-testing)
- [✨ Funcionalidades](#-funcionalidades)
- [📚 Buenas Prácticas](#-buenas-prácticas)
- [📱 Diseño Responsive](#-diseño-responsive)
- [🔐 Escalabilidad](#-escalabilidad)
- [👨‍💻 Autor](#-autor)
- [📚 Recursos Adicionales](#-recursos-adicionales)

---

# 📖 Descripción

**Tienda** es una aplicación web desarrollada con Angular enfocada en ofrecer una experiencia moderna e intuitiva para la visualización y gestión de productos de una tienda virtual.

El proyecto fue construido siguiendo buenas prácticas de desarrollo frontend, manteniendo una estructura organizada, reutilizable y escalable.

### Objetivos del proyecto

- Crear una interfaz moderna y atractiva
- Implementar navegación dinámica con rutas
- Mantener una arquitectura limpia
- Utilizar componentes reutilizables
- Facilitar el mantenimiento del código
- Preparar el proyecto para futuras escalas

---

# 🚀 Tecnologías

Las principales tecnologías utilizadas en este proyecto son:

| Tecnología | Descripción |
|---|---|
| Angular 21 | Framework frontend |
| TypeScript | Lenguaje principal |
| HTML5 | Estructura del contenido |
| CSS3 | Estilos y diseño |
| Node.js | Entorno de ejecución |
| Angular CLI | Herramienta de desarrollo |
| Vitest | Framework de testing |

---

# ⚙️ Requisitos Previos

Antes de ejecutar el proyecto asegúrate de tener instalado:

- Node.js
- npm
- Angular CLI

Verifica las versiones instaladas:

```bash
node -v
npm -v
ng version
```

Instalar Angular CLI globalmente:

```bash
npm install -g @angular/cli
```

---

# 📥 Instalación

## 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/usuario/tienda.git
```

## 2️⃣ Entrar a la carpeta del proyecto

```bash
cd tienda
```

## 3️⃣ Instalar dependencias

```bash
npm install
```

---

# 🖥️ Servidor de Desarrollo

Para ejecutar el servidor local:

```bash
ng serve
```

Después abre el navegador en:

```bash
http://localhost:4200/
```

Angular recargará automáticamente la aplicación cada vez que detecte cambios en el código.

---

# 📂 Estructura del Proyecto

```bash
src/
│
├── app/
│   ├── components/
│   │   ├── navbar/
│   │   ├── footer/
│   │   ├── product-card/
│   │   └── sidebar/
│   │
│   ├── pages/
│   │   ├── home/
│   │   ├── products/
│   │   ├── cart/
│   │   └── login/
│   │
│   ├── services/
│   │   ├── product.service.ts
│   │   └── auth.service.ts
│   │
│   ├── models/
│   │
│   ├── shared/
│   │
│   ├── app.routes.ts
│   ├── app.config.ts
│   └── app.ts
│
├── assets/
│
├── environments/
│
├── styles.css
│
└── main.ts
```

### 📌 Organización

- **components/** → Componentes reutilizables
- **pages/** → Páginas principales
- **services/** → Lógica y conexión de datos
- **models/** → Interfaces y modelos
- **shared/** → Recursos compartidos
- **assets/** → Imágenes, iconos y recursos estáticos

---

# 🧱 Generación de Componentes

Generar un componente:

```bash
ng generate component nombre-componente
```

Versión corta:

```bash
ng g c nombre-componente
```

Generar un servicio:

```bash
ng g s services/nombre-servicio
```

Generar una página:

```bash
ng g c pages/nombre-pagina
```

Ver todos los comandos disponibles:

```bash
ng generate --help
```

---

# 🏗️ Compilación del Proyecto

Para generar una build de producción:

```bash
ng build
```

Los archivos optimizados se almacenarán en:

```bash
dist/
```

## Build de producción optimizada

```bash
ng build --configuration production
```

Angular optimiza automáticamente:

- Tamaño de archivos
- Rendimiento
- Minificación
- Lazy loading
- Optimización de assets

---

# 🧪 Testing

## Unit Testing

Ejecutar pruebas unitarias:

```bash
ng test
```

El proyecto utiliza **Vitest** como framework de testing.

---

## End-to-End Testing

Ejecutar pruebas e2e:

```bash
ng e2e
```

Angular permite integrar cualquier framework de pruebas end-to-end según las necesidades del proyecto.

---

# ✨ Funcionalidades

## 🛍️ Catálogo de Productos

Visualización dinámica de productos mediante componentes reutilizables.

---

## 🔎 Buscador de Productos

Sistema de búsqueda rápida para encontrar productos fácilmente.

---

## 🧭 Navegación Dinámica

Uso de Angular Router para navegación entre páginas.

---

## 📱 Diseño Responsive

Compatible con:

- Desktop
- Tablets
- Smartphones

---

## ⚡ Optimización

- Lazy loading
- Componentes standalone
- Código modular
- Renderizado eficiente

---

# 📚 Buenas Prácticas

Este proyecto implementa múltiples buenas prácticas de Angular:

### ✅ Arquitectura Modular

Separación clara de responsabilidades.

### ✅ Componentes Reutilizables

Evita duplicación de código.

### ✅ Tipado Fuerte

Uso de TypeScript para mejorar la seguridad del código.

### ✅ Lazy Loading

Carga eficiente de módulos.

### ✅ Código Limpio

Nombres descriptivos y estructura organizada.

### ✅ Escalabilidad

Preparado para crecimiento futuro.

---

# 📱 Diseño Responsive

La interfaz fue diseñada para adaptarse correctamente a diferentes tamaños de pantalla utilizando:

- Flexbox
- CSS Grid
- Media Queries
- Diseño adaptable

---

# 🔐 Escalabilidad

La arquitectura del proyecto permite agregar fácilmente:

- Autenticación
- Base de datos
- API REST
- Carrito de compras
- Pasarela de pagos
- Panel administrativo
- Gestión de usuarios

---

# 👨‍💻 Autor

Desarrollado por:

## Guillermo Gines Martínez

Proyecto académico y de práctica enfocado en el desarrollo frontend con Angular.

---

# 📚 Recursos Adicionales

## Angular Oficial

https://angular.dev/

---

## Angular CLI

https://angular.dev/tools/cli

---

## TypeScript

https://www.typescriptlang.org/

---

## Node.js

https://nodejs.org/

---

# ⭐ Notas Finales

Este proyecto sirve como base para futuras aplicaciones ecommerce desarrolladas con Angular, manteniendo una arquitectura moderna y preparada para escalar.

```