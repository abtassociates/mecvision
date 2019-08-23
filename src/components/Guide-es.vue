<template>

<div>
<v-layout my-3>
  <v-flex xs12 sm6 offset-sm3>
    <v-card>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-2">Visión General</h3>
          <div>
            <p>MECVision es una aplicación web progresiva (PWA) que utiliza la visión por computadora (detección de objetos) para estimar la cantidad de huevos de mosquito en papel ovitraprap.</p>
            <p>Este sitio web funcionará con la mayoría de los teléfonos inteligentes (iOS y Android), así como con computadoras de escritorio y portátiles. El sitio web, debido a que es una PWA, se comporta de muchas maneras como una aplicación de teléfono nativa, lo que permite que se use sin conexión, para usar las fotos y la cámara de un teléfono, y para permitir que se coloque en la pantalla de inicio de un teléfono, junto con la aplicación nativa aplicaciones.</p>
            <p>El procesamiento algorítmico de la aplicación utiliza una herramienta conocida como "OpenCV" (Open Computer Vision) que analiza una imagen para resaltar el contraste, detectar bordes, encontrar contornos de objetos dentro de una imagen y hacer cálculos basados en ese análisis. Para MECVision, utilizamos varios procedimientos algorítmicos unidos, para aislar los elementos de huevo de mosquito y contarlos por separado.</p>
          </div>
        </div>
      </v-card-title>
    </v-card>
  </v-flex>
</v-layout>

<v-layout my-3>
  <v-flex xs12 sm6 offset-sm3>
    <v-card>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-2">Usando MECVision</h3>
          <div>
            <h3>1. Cargar una Imagen</h3>
            <p>La aplicación (o sitio web) es muy simple. Una vez que se carga en el navegador web de un dispositivo, carga todo el código de la aplicación que necesita para funcionar, de modo que no se envíe información a un servidor remoto o base de datos; todo está sucediendo en el dispositivo en el que se carga.</p>
            <h3>2. Ajuste la Imagen.</h3>
            <p>Después de que se carga la aplicación, un usuario puede tomar una foto o cargar una desde su dispositivo (o usar las imágenes de 'demostración' en la memoria para verla funcionar). Una vez seleccionado, el usuario ajusta la imagen al acercar y alejar (usando 'pellizcar y hacer zoom' en un teléfono o con la función de desplazamiento en un escritorio), así como cosas como rotar y recortar. Además, puede seleccionar el 'tipo' de imagen que está analizando: un papel de ovitrap clásico o una imagen ampliada o microscópica (y se puede agregar más más adelante), esto ayuda a analizar la imagen usando el algoritmo apropiado.</p>
            <h3>3. Analiza la Imagen.</h3>
            <p>Una vez que la imagen ha sido ajustada, el usuario presiona el botón para 'analizar' la imagen. En este punto, la aplicación utiliza una técnica de software (biblioteca de código abierto) para analizar la imagen y encontrar coincidencias dentro de la imagen que coincidan con el patrón lo más cerca posible de los huevos de mosquito y los racimos de huevos de mosquito. En este punto, el usuario puede ver el algoritmo ejecutar su proceso de convertir la imagen a blanco y negro (valor umbral), detectar objetos en la imagen, ordenar los objetos detectados por tamaño y luego superponer los objetos detectados en la parte superior del imagen original.</p>
            <h3>4. Revise el Análisis.</h3>
            <p>Cuando se completa el análisis, se mostrará la estimación total del huevo. El usuario también puede ver una desagregación de recuentos de huevos individuales versus recuentos de huevos agrupados, así como 'detalles' adicionales en el botón emergente. Además, el usuario puede 'comparar' la salida en cada etapa del proceso del algoritmo presionando el botón 'comparar', junto con alternar las flechas izquierda-derecha para revisar los procesos del algoritmo en orden.</p>
            <h3>5. Ajuste el Algoritmo.</h3>
            <p>Dependiendo del proceso y la imagen utilizada, puede ser necesario ajustar los filtros y el valor umbral. Esto se puede hacer seleccionando el botón 'Mostrar filtros' y revisando las diversas configuraciones, incluidas las formas de ajustar el valor umbral (donde los elementos se vuelven negros o blancos), y los valores mínimos y máximos de un solo huevo, así como el tamaño máximo del grupo ( para filtrar objetos extraños grandes como insectos o tierra). Cuando se cambia un valor aquí, el algoritmo se actualiza automáticamente (sin la animación) para reflejar los nuevos valores.</p>
          </div>
        </div>
      </v-card-title>
    </v-card>
  </v-flex>
</v-layout>

<v-layout my-3>
  <v-flex xs12 sm6 offset-sm3>
    <v-card>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-3">Consejos para Resultados Precisos</h3>
          <div>
            <h3>Calidad de la Cámara</h3>
            <p>Use la cámara de mayor calidad y resolución disponible, incluso si no es con un teléfono inteligente. La aplicación puede usar imágenes que se encuentran en la biblioteca de fotos del teléfono -- <em>no</em> deben tomarse con ese dispositivo en particular.</p>
            <h3>Colocación de Cámara</h3>
            <p>Capture la imagen lo más cerca posible del papel de huevo mientras captura todo el papel. Asegúrese de que la cámara esté perpendicular y directamente sobre la imagen tanto como sea posible, y que no esté tomada desde un ángulo.</p>
            <h3>Ambiente e Iluminación</h3>
            <p>Capture la imagen en un lugar con iluminación brillante y constante. Trate de evitar el uso del flash de la cámara, ya que esto crea sombras que pueden identificarse erróneamente como huevos. Además, intente hacer todo lo posible para aumentar el contraste en la imagen entre los huevos y el papel; esto hace que el algoritmo funcione con mayor precisión.</p>
            <h3>Tipo de Papel de Huevo y Calidad</h3>
            <p>Hay mucha variación en el papel de huevo (papel ovitrap) y, por lo tanto, trate de tener un proceso constante a lo largo de los diversos recuentos. Asegúrese de que el papel de huevo sea lo más plano posible, con el menor número de pliegues y arrugas en el papel, ya que esto causa sombras que pueden ser mal identificadas como huevos. Además, intente utilizar un color de fondo que sea diferente al papel de huevo, ya que esto facilitará el recorte de la imagen dentro de la aplicación.</p>
            <h3>La Consistencia y el Algoritmo</h3>
            <p>La aplicación MECVision funciona mejor cuando se usa en un entorno controlado y consistente. Los mejores tipos de imágenes son las que consisten en todas sus cualidades, excepto la cantidad de huevos en el papel, que la aplicación debería capturar de manera diferente. La aplicación en sí es susceptible a cambios en la iluminación, el enfoque y las demandas de procesamiento, por lo que habrá una pequeña variación de una imagen a otra (¡similar a los recuentos humanos!). Las mejores formas de garantizar la coherencia es centrarse en encontrar un proceso coherente, y luego usando valores consistentes de filtrado y umbral que coinciden con el entorno de la imagen.</p>
            <h3>Una Nota Sobre la Retención de Datos</h3>
            <p>La aplicación, debido a que es una aplicación web, no guarda datos localmente en un dispositivo, y nunca se envía a un servidor o base de datos externa. Una vez que se actualiza la página, se borran los datos anteriores. Es muy parecido a una calculadora funcional de esta manera, sin historial. ¡Asegúrese de que su proceso de conteo sea consistente y se recopile en otra ubicación antes de adaptar completamente la aplicación MECVision!</p>
          </div>
        </div>
      </v-card-title>
    </v-card>
  </v-flex>
</v-layout>

</div>
</template>

<script>

export default {
  data () {
    return {
    }
  }
}
</script>
