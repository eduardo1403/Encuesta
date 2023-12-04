// Configura Firebase con tu configuración
const firebaseConfig = {
    apiKey: "AIzaSyASBageXHzyEMjdCskMqjdhZda8zJuT_6k",
    authDomain: "my-quiz-21ac7.firebaseapp.com",
    projectId: "my-quiz-21ac7",
    storageBucket: "my-quiz-21ac7.appspot.com",
    messagingSenderId: "195371925441",
    appId: "1:195371925441:web:beafc5612062daa3d73940"
  };
  
  // Inicializa Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Obtiene una referencia a la colección
  const db = firebase.firestore();
  const miColeccionRef = db.collection("quiz");//nombre de la coleccion
  
  // Función para obtener y mostrar los datos de la colección
  function mostrarDatosColeccion() {
    miColeccionRef.get().then((querySnapshot) => {
      const datosColeccion = [];
      querySnapshot.forEach((doc) => {
        datosColeccion.push(doc.data());
      });
  
      // Llama a la función para crear el gráfico
      crearGrafico(datosColeccion);
    });
  }
  
  // Función para crear el gráfico
  function crearGrafico(datosColeccion) {
    // Filtra los datos por tipo de calificación
    const Satisfecho = datosColeccion.filter(item => item.calificacion && item.calificacion.calificacion === 'Satisfecho').length;
    const Neutral = datosColeccion.filter(item => item.calificacion && item.calificacion.calificacion === 'Neutral').length;
    const Insatisfecho = datosColeccion.filter(item => item.calificacion && item.calificacion.calificacion === 'Insatisfecho').length;
  
    //console.log(Insatisfecho);
    console.log(Neutral);
    // Obtiene el contexto del lienzo
    const ctx = document.getElementById('graficoCalificaciones').getContext('2d');
  
    // Configura el gráfico
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Satisfecho', 'Neutral', 'Insatisfecho'],
        datasets: [{
          label: 'Resultados',
          data: [Satisfecho, Neutral, Insatisfecho],
          backgroundColor: [
            'green',
            'yellow',
            'red'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  // Llama a la función para mostrar los datos al cargar la página
  mostrarDatosColeccion();
  