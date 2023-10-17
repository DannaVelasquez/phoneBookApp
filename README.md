# PhoneBookApp

Esta app está estructurada usando REACT, tiene un contexto global que permite una mejor gestión de los estados en este caso para el consumo de datos en una API y poder compartirlos con los componentes que lo necesiten, se creó la ruta principal llamada Home '/' para una mejor organización en caso que a futuro se creen más rutas para diferentes funcionalidades y se crearon diferentes componentes para las funcionalidades requeridas, cada uno maneja sus estilos mediantes modules.css, puesto que es más eficiente tenerlos encapsulados para cada uno y que no entre en conflictos con otros estilos aplicados a otras unidades de la app, a s vez es mucho más sencillo modificar el estilo de alguna sección del aplicativo con solo saber que componente lo está utilizando.
Para simulación de la API se realizó mediante el uso de Json Server

## PhoneBookApp Funcionalidades:

### Creación de Contacto:
- Al darle click al botón '+' se abre un form (pop-up) donde permite crear un contacto con Nombre, Apellido y Teléfono.
- En el form de creación el botón 'Add' solo se habilitará si se ha ingresado Nombre y Teléfono ya que son datos obligatorios para crear contacto.
- En el form también se tiene en el campo 'Phone' una validación para que no permita letras.

### Listado de Contactos:
- Se verá un listado de los contactos agregados con sus nombres y números de teléfono, se ordena alfabéticamente (A-Z)
- Al darle click al nombre de cada contacto se emitirá un pop up que permite ver la información del contacto (icono, nombre y apellido, telefono) a modo informativo.
- Cada contacto agregado tendrá la opción de poderse eliminar (tiene un icono de basura para realizar dicha acción, se tendrá una alerta para confirmar la eliminación o cancelarla)

### Búsqueda de Contactos:
- Al ingresar nombre o número de télefono en la barra de búsqueda se va a ir filtrando de manera automática en el listado actual las opciones que hagan match de acuerdo a lo que se va ingresando
- En caso de que no se encuentre el nombre o teléfono dado en la barra de búsqueda se mostrará un mensaje en el listado que indique que no se encontraron resultados.

## Ejecutar PhoneBookApp#:
- Se ejecuta el comando: json-server --watch db.json --port 3001 (para levantar el json server)
- Luego se ejecuta el comando: npm run dev (para levantar la applicación en en el local host)
- También se hizo el deploy usando Vercel, así que se puede acceder y usar la app desde el siguiente link https://phone-book-app-3x17-76wovcqc9-dannavelasquez.vercel.app/
