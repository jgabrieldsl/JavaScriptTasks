// Hello World
console.log("Hello World!")

// Variáveis
const nome = "João Gabriel"
console.log(nome);

// Arrays & Objetos
let metasArray = ["João", "Aluno Rocket Seat"]
console.log(metasArray[0] + " - " + metasArray[1]);

let metasObject = {
    value: 'Ler um livro todo mês!',
    checked: false,
    isChecked: (info) => {
        console.log(info);
    }
}

metasObject.isChecked(metasObject.checked);

// Testando Arrays & Objetos
let metas =  [
    metasObject, {
        value: 'Caminhar 20 minutos /dia',
        checked: true
    }
]

console.log(metas[0].value)


// Arrow Function
const arrowFunctionCriarMetas = () => {
    // Conteúdo da Arrow Function aqui
}

// Function 
function FunctionCriarMetas () {
    // Conteúdo da Function aqui
}


