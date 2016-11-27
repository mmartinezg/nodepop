# Documentación nodepop
##Arranque del servidor
Para arrancar el servidor deberemos ejecutar en el terminal 
```npm start```
Una vez arrancado nuestro servidor, si es la primera vez que ejecutamos la aplicación cargaremos unos datos de
prueba. Para ello lanzaremos en un navegador cualquiera la siguiente url
[http://54.164.150.139:3001/apiv1/script](http://54.164.150.139:3001/apiv1/script) y se generarán unos anuncios de prueba
y un usuario para problar la aplicación. El usuario de prueba sera el siguiente:
```
    "nombre": "Manuel",
    "email": "manu.martinez.gomez@gmail.com",
    "clave": "000000"
```
##Funcionamiento de la aplicación
Para poder utilizar la aplicación será necesario estar autentificado con un usuario válido. Si no tenemos uno podremos
darnos de alta con uno nuevo.
###Registrar usuario.
Para darse de alta con un nuevo usuario, deberemos hacer una llamada **POST** a la siguiente url 
[http://54.164.150.139:3001/apiv1/users/signup](http://54.164.150.139:3001/apiv1/users/signup) a esta url deberemos pasarle los
siguientes parametros en el body: 
```
    email: Nuestro email con el cual nos loguearemos{String},
    pass: La contraseña que deseemos{String},
    name: Nuestro nombre{String}
```
Esta llamada nos devolverá un token que deberemos guardar para poder interactuarl con la API.
###Loguearse en la aplicación
Para realizar un loguin deberemos ir a la siguiente url [http://54.164.150.139:3001/apiv1/users/login](http://54.164.150.139:3001/apiv1/users/login)
y realizar una llamada **POST** con los siguientes parametros:
```
    email: Nuestro email con el cual nos loguearemos{String},
    pass: La contraseña que deseemos{String},
```
Esta llamada nos devolverá un token que deberemos guardar para poder interactuarl con la API.
###Interacción con los anuncios
Para poder interactuar con los anuncios es necesario estar validado y para eso la comprobación se hace a través de un token. Se podrá introducir en token de 3 maneras diferentes:
1. En la propia url. Un ejemplo sería:
 [http://54.164.150.139:3001/apiv1/anuncios?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4MTVlMGEwNTAyNmQ1MGEzZDAyY2Y4OSIsImlhdCI6MTQ3NzgzMDQ4NywiZXhwIjoxNDc4MDAzMjg3fQ.1QrlksN098VS4HkBOqtf8kQkbdDBldR1Ydw7PnYD9gQ](http://54.164.150.139:3001/apiv1/anuncios?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4MTVlMGEwNTAyNmQ1MGEzZDAyY2Y4OSIsImlhdCI6MTQ3NzgzMDQ4NywiZXhwIjoxNDc4MDAzMjg3fQ.1QrlksN098VS4HkBOqtf8kQkbdDBldR1Ydw7PnYD9gQ)
2. En el body de la petición.
3. En la cabecera de la peticion con la clave ***x-access-token***. Siendo esta la mas recomendable.
####Listado de Anuncios
Para obtener un listado de todos los anuncios sin filtrar ejecutaremos la siguiente url cuyo metodo sea **GET**
[http://54.164.150.139:3001/apiv1/anuncios](http://54.164.150.139:3001/apiv1/anuncios)
Para ejecutar un listado de anuncios filtrado emplearemos la siguiente estructura. Añadiremos *?* al final de la query y tantos parametros como filtros deseemos tener separados por &
Un ejemplo seria [http://54.164.150.139:3001/apiv1/anuncios?nombre=bi&venta=true](http://54.164.150.139:3001/apiv1/anuncios?nombre=bi&venta=true).
Los parametros por los que podemos filtrar son:
1. **nombre:** Filtra por todo el nombre o por que empieze por el.
2. **tags:** Filtra por que contenga los tags que se le añaden.
3. **venta:** {true/false} Filtra si el articulo esta en venta o no
4. **precio:** Filtra por el precio del articulo:
- 10-50 buscará anuncios con precio incluido entre estos valores .
- 10- buscará los que tengan precio mayor que 10. 
- -50 buscará los que tengan precio menor de 50
- 50 buscará los que tengan precio igual a 50 
5. **start:** Indicara el primer numero de registro que se devolvera en caso de ser paginado.
6. **limit:** Indicara el numero de registros que queremos que se devuelva.
7. **fields:** Indicara si no queremos devolver todos los campos y solo queremos uno en concreto
####Listado de tags
Para obtener un listado de todos los tags almacenados solo tendremos que ejecutar la siguiente url cuyo método sea **GET**
[http://54.164.150.139:3001/apiv1/anuncios/tags](http://54.164.150.139:3001/apiv1/anuncios/tags)