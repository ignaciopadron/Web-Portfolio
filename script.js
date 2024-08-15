let menuVisible = false;
//Función que oculta o muestra el menu
function mostrarOcultarMenu(){
    const nav = document.getElementById("nav");
    if (menuVisible){
        nav.classList.remove("responsive");
        menuVisible = false;
    }else {
        nav.classList.add("responsive");
        menuVisible = true;
    }
}

// Oculta el menú cuando se hace clic fuera de él
document.addEventListener('click', function(event) {
    const nav = document.getElementById("nav");
    const menuButton = document.querySelector(".nav-responsive");
    if (menuVisible && !nav.contains(event.target) && !menuButton.contains(event.target)) {
        nav.classList.remove("responsive");
        menuVisible = false;
    }
});

//Oculta el menú cuando el ratón no está sobre él (solo en pantallas móviles si se considera necesario)
document.getElementById("nav").addEventListener('mouseleave', function() {
    if (menuVisible) {
        document.getElementById("nav").classList.remove("responsive");
        menuVisible = false;
    }
});






function seleccionar(){
    //oculto el menu una vez que selecciono una opcion
    document.getElementById("nav").classList ="";
    menuVisible = false;
}

// Aparece la sección sobre mi
document.addEventListener('DOMContentLoaded', () => {
    const aboutMeSection = document.querySelector('.sobremi');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    observer.observe(aboutMeSection);
});



 // Datos del gráfico de radar
 const data = {
    labels: ['' ,'HTML & CSS', 'JavaScript', 'Python', 'database', 'Web server', 'Virtual Machine', 'VPN', 'SAMBA', 'Networks', 'OS'],
    datasets: [{
        label: 'Technical Skills',
        data: [0, 90, 75, 50, 95, 85, 80, 85, 90, 90, 95], // Niveles de habilidades
        fill: false,
        backgroundColor: '#fff',
        borderColor: '#2e8b57',
        pointBackgroundColor: '#2e8b57',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 5
    }]
};

// Opciones del gráfico de radar
const options = {
    scales: {
        r: { // 'r' para el eje radial en Chart.js 3.x y posteriores
            ticks: {
                beginAtZero: true,
                max: 100,
                stepSize: 25,
                font: {
                    size: 12 // Ajusta el tamaño de la fuente de los ticks
                }
            },
            pointLabels: {
                font: {
                    size: 18 // Ajusta el tamaño de las etiquetas alrededor del gráfico
                }
            }
        }
    },
    responsive: true,
    maintainAspectRatio: false, // Esto permite que el gráfico sea más flexible
    plugins: {
        tooltip: {
            enabled: true
        }
    }
};

// Crear el gráfico de radar
const ctx = document.getElementById('technicalskills').getContext('2d');
new Chart(ctx, {
    type: 'radar',
    data: data,
    options: options
});

const printCharts = () => {

    renderModelsChart()
}

const renderModelsChart = () => {


    const data = {
        labels: ['Comunicación', 'Trabajo en Equipo', 'Resolución de problemas', 'Dedicación y constancia', 'Proyect Management', 'Productividad', 'Trabajar bajo presión', 'Proactividad y Aprendizaje', 'Documentación', 'Adaptabilidad'],
        datasets: [{
            label:'Professional Skills',
            data: [9.5, 9.5, 9, 8, 6, 8, 9, 9.5, 9, 8.5],
            borderColor: '#2e8b57',
            backgroundColor: [
                'rgba(255, 215, 0, 0.2)',   // Oro con 40% de opacidad
                'rgba(255, 69, 0, 0.2)',    // Naranja rojizo con 40% de opacidad
                'rgba(0, 206, 209, 0.2)',   // Turquesa oscuro con 40% de opacidad
                'rgba(148, 0, 211, 0.2)',   // Violeta oscuro con 40% de opacidad
                'rgba(255, 20, 147, 0.2)',  // Rosa fuerte con 40% de opacidad
                'rgba(30, 144, 255, 0.2)',  // Azul Dodger con 40% de opacidad
                'rgba(255, 99, 71, 0.2)',   // Tomate con 40% de opacidad
                'rgba(50, 205, 50, 0.2)',   // Verde lima con 40% de opacidad
                'rgba(139, 0, 0, 0.2)',     // Rojo oscuro con 40% de opacidad
                'rgba(70, 130, 180, 0.2)'   // Azul acero con 40% de opacidad
            ],
            hoverBackgroundColor: [
                'rgba(255, 215, 0, 1)', 
                'rgba(255, 69, 0, 1)',  
                'rgba(0, 206, 209, 1)',  
                'rgba(148, 0, 211, 1)', 
                'rgba(255, 20, 147, 1)',  
                'rgba(30, 144, 255, 1)',
                'rgba(255, 99, 71, 1)',     
                'rgba(50, 205, 50, 1)',   
                'rgba(139, 0, 0, 1)',       
                'rgba(70, 130, 180, 1)'     
            ],
            borderWidth: 4,
            hoverOffset: 20,
            
            
       
        }]
    }   

    const options = {
        
        cutout: '25%',
        plugins: {
            legend: { position: 'right', 
                
            }
        }
    }

    new Chart('professionalskills', {type: 'doughnut', data, options})

}


printCharts()

//detecto el scrolling para aplicar la animacion de la barra de habilildades
window.onscroll = function(){
    efectoHabilidades();
}

// Ejemplo simple de cómo podrías agregar interactividad
document.getElementById("skill-octagon").addEventListener("mouseover", function(event) {
    // Cambiar el color de la sección cuando el ratón está sobre ella
    event.target.style.fill = "lightblue";
});

