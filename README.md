# cambalache-web
Frontend Web de la Aplicación Cambalache.

## Requisitos
* [Node.js v14](https://nodejs.org/)
* [NVM: Node Version Manager](https://github.com/nvm-sh/nvm) (opcional para ejecutar múltiples versiones de Node.js lado a lado)
* [Nuxt.js](https://nuxtjs.org)


## Preparación
```shell
nvm install 14
nvm use 14
[[ -d node_modules ]] && rm -rf node_modules
```


## Compilación y Ejecución
Ejecutar los siguientes comandos para compilar e iniciar la aplicación.
```shell
# Instalar dependencias
npm install

# Ejecutar localmente con hot reload en localhost:3000
npm run dev

# Compilar para producción e iniciar servidor
npm run build
npm run start
```
