const questions = [
  { text: "¿En qué año fue fundada la Universidad del Valle?", options: ["1975", "1982", "1990", "2001"], answer: 1 },
  { text: "¿Cuál es la sede central de Univalle?", options: ["La Paz", "Cochabamba", "Santa Cruz", "Sucre"], answer: 1 },
  { text: "¿Cuántas facultades tiene Univalle actualmente?", options: ["4", "6", "8", "10"], answer: 1 },
  { text: "¿Cuántos programas de pregrado ofrece la universidad?", options: ["20", "28", "34", "40"], answer: 2 },
  { text: "¿En qué ciudad NO tiene sede Univalle?", options: ["Cochabamba", "Santa Cruz", "Trinidad", "Potosí"], answer: 3 },
  { text: "¿Qué color representa principalmente la identidad visual de Univalle?", options: ["Azul", "Verde", "Rojo", "Amarillo"], answer: 2 },
  { text: "¿Qué tipo de asistencia ha beneficiado a más de 7,000 estudiantes en Univalle?", options: ["Becas y asistencia financiera", "Cursos gratuitos", "Intercambios internacionales", "Tutorías académicas"], answer: 0 },
  { text: "¿Cuál es el lema institucional de Univalle?", options: ["Educación para todos", "Excelencia académica con compromiso social", "Formando líderes para el futuro", "Innovación y conocimiento"], answer: 1 },
  { text: "¿Qué modalidad de estudio ofrece Univalle además de la presencial?", options: ["Virtual", "Semi-presencial", "Ambas", "Ninguna"], answer: 2 },
  { text: "¿Cuál es el nombre del campus principal en Cochabamba?", options: ["Campus Norte", "Campus Central", "Campus Sur", "Campus Internacional"], answer: 1 }
];

let currentQuestion = 0;
let selectedOption = null;
let score = 0;

const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const optionButtons = document.querySelectorAll(".option");
const nextBtn = document.getElementById("nextBtn");
const scoreCounter = document.getElementById("score");

function loadQuestion() {
  const q = questions[currentQuestion];
  questionNumber.textContent = `Pregunta ${currentQuestion + 1} de ${questions.length}`;
  questionText.textContent = q.text;
  optionButtons.forEach((btn, i) => {
    btn.textContent = q.options[i];
    btn.style.backgroundColor = "#B22222"; // reset color
    btn.style.opacity = "1";
    btn.onclick = () => { selectedOption = i; highlightSelection(i); };
  });
}

function highlightSelection(i) {
  optionButtons.forEach(btn => btn.style.opacity = "1");
  optionButtons[i].style.opacity = "0.7"; // marca la opción elegida
}

nextBtn.addEventListener("click", () => {
  if (selectedOption === null) {
    alert("Por favor selecciona una opción antes de continuar.");
    return;
  }

  // Espera 3 segundos antes de mostrar resultado
  setTimeout(() => {
    const correctAnswer = questions[currentQuestion].answer;
    if (selectedOption === correctAnswer) {
      optionButtons[selectedOption].style.backgroundColor = "green";
      score++;
      scoreCounter.textContent = `Correctas: ${score}`;
    } else {
      optionButtons[selectedOption].style.backgroundColor = "red";
      optionButtons[correctAnswer].style.backgroundColor = "green";
    }

    // Avanza a la siguiente pregunta después de otros 2 segundos
    setTimeout(() => {
      currentQuestion++;
      selectedOption = null;
      if (currentQuestion < questions.length) {
        loadQuestion();
      } else {
        showResults();
      }
    }, 900);
  }, 1000);
});

function showResults() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = `
    <h2>Terminaste</h2>
    <p>Terminaste: ${score}/${questions.length} respuestas correctas</p>
    <button onclick="window.location.href='index.html'">Volver al Inicio</button>
  `;
}

loadQuestion();