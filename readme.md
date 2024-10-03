El extractor de exportaciones Hildemaro Importaciones comprende un archivo principal llamado main.js, en él se encuentran tres dos funciones principales: 

URLS__extractor y PRODUCT__extractor. 

  la primera, extrae las dirrecciones url de cada producto según el catálogo de su página web.
  la segunda, entra a esas urls y extrae la información de cada producto. Generando un objeto que guarda su título, descripción, url, imágenes y otros datos valiosos.

El script trabaja con consultas y promesas según el protocolo http.

Por lo cual, el operador de este script debe manejarlo en base a los recursos de su computadora y servidor.
  Por ejemplo, el equipo desde el cual se probó el script, acepta aproximadamente 100 consultas por acción. Por lo cual, se operó de forma tal que no sobrepasase los 90 productos por consulta. Es decir, que no extrajese más de 90 productos a la vez.

Esto se controla desde las variables "first" y "last" en las líneas 11 y 12 del código.
Esas variables definirán el queryparam en la url del catálogo. Para solo consultar 6 páginas del mismo por acción. Ya que cada página cuenta con 15 productos en su interior.

(Según la arquitectura del sitio web, el catálogo está dividido en varias subpáginas según categorías. Por lo cual, hay que ir modificando la ruta en varias ocasiones. Esto se hace cambiando el contenido de la variable "main__URL" en el archivo "main__URL.js")

Con cada acción se genera un archivo .txt donde se escribe la información extraida. Y esta información se va traslandado manualmente a un archivo final llamado HILDEMARO_data.txt.

Con esto, el código corrió unas 30 veces para extraer toda la data. Vigilando y siguiendo todo el proceso por parte del operador.

Después de esto, el archivo .txt contiene todos los datos de interés y está listo para ser formateado según la empresa prefiera.
