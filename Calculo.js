// Dimensionamento de molas Belleville **SISTEMA iS**
let E = 207e3;        // E - MÓDULO DE ELASTICIDADE DO MATERIAL
let v = 0.28;         // V - COEFICIENTE DE POISSON
let PTC = 1.2; // PROCENTAGEM DA TENSÃO DE ESCOAMENTO QUE PODE SER USADA PARA O MATERIAL
let Sut = 1700e6;             // TENSÃO DE ESCOAMENTO DO MATERIAL

// Variáveis de entrada
// 1° PASSO > Pressuponha um diâmetro externo Do de 1,2 in de modo a deixar alguma folga com relação ao furo.
let Do = 39.55; //DIÂMETRO EXTERNO

// 2° PASSO > Escolher a razão h / t e Do/Di da mola (ver a Figura 14-30).

let h_over_t = 1.414; // RAZÃO H/T
let Rd = 2;           // RAZÃO ENTRE DIÂMETRO EXTERNO E INTERNO
let F_plana = 400;    // FORÇA PLANA

// 3° PASSO > Definir o intervalo de deflexão adequado para manter a variação de força dentro da tolerância desejada e montar a mola de forma simétrica para operar em ambos os lados da posição plana.
let def_inferior = 0.53; //DEFLEXÃO INFERIOR E SUPERIOR (CONSULTAR TABELA 14-31)
let def_superior = 1.46;

// 4° PASSO > Cálculo de espessura h.
let t = (1/10)*(Math.pow((F_plana * Math.pow(Do, 2)) / (132.4* h_over_t), 1/4));
 // CÁLCULO DE ESPESSURA

// 5° PASSO > A altura h pode ser agora determinada:
let h = h_over_t*t; // ALTURA INTERNA DE CONE


// 6° PASSO > Baseado nas escolhas feitas no PASSO 3, determine as deflexões mínima e máxima.
let y_max = h*def_superior;
let y_min = h*def_inferior;

// 7° PASSO > Considerando o pior estado de tensão cálcular as tensões.
// Fórmulas dos coeficientes K das molas Belleville

let y = y_max; // ou y_min, depende do caso analisado

let K1 = (6 / (Math.PI * Math.log(Rd))) * Math.pow(((Rd - 1) / Rd), 2);

let K2 = (6 / (Math.PI * Math.log(Rd))) * (((Rd - 1) / Math.log(Rd))-1);

let K3 = (6 / (Math.PI * Math.log(Rd))) * ((Rd - 1) / 2);

let K4 = ((Rd * Math.log(Rd) - (Rd - 1)) / Math.log(Rd)) * (Rd / Math.pow((Rd - 1), 2));

let K5 = Rd / (2 * (Rd - 1));

// Fórmulas das tensões da mola Belleville

let sigma_c = - ((4 * E * y) /( K1*Math.pow(Do,2)*(1-Math.pow(v,2)))*(K2*(h-y/2)+K3*t)); //TENSÃO DE COMPRESSÃO NO CONE



let sigma_ti = (4 * E * y) / (K1 * Math.pow(Do, 2) * (1 - Math.pow(v, 2))) *  (-K2 * (h - y/2) + K3 * t); //TENSÃO DE TRAÇÃO NO DIÂMETRO INTERNO

let sigma_to = (4 * E * y) / (K1 * Math.pow(Do, 2) * (1 - Math.pow(v, 2))) *   (K4 * (h - y/2) + K5 * t); //TENSÃO DE TRAÇÃO NO DIÂMETRO EXTERNO

// 8° PASSO > Coefiente de segurança;
let sigma_max = Math.max(Math.abs(sigma_c), Math.abs(sigma_ti), Math.abs(sigma_to));
let Ns = (PTC * Sut) / sigma_max;  //COEFICIENTE DE SEGURANÇA

// 9° PASSO > Calculo do Diâmetro interno
let Di = Do/Rd;

// 10° PASSO > Resumo do projeto de molas 

// Impressões finais
console.log("=== RESUMO DO PROJETO ===");
console.log("Do =", Do);            // DIÂMETRO EXTERNO
console.log("Di =", Di);            // DIÂMETRO INTERNO
console.log("t =", t);              // ESPESSURA
console.log("h =", h);              // ALTURA
console.log("Coef. de segurança Ns =", Ns); //COEFICIENTE DE SEGURANÇA
console.log("Rd =", Rd);            // RAZÃO Do/Di
console.log("y_min =", y_min);      // DEFLEXÃO MÍNIMA
console.log("y_max =", y_max);      // DEFLEXÃO MÁXIMA
console.log("y (usada) =", y);      // DEFLEXÃO ANALISADA

console.log("K1 =", K1);
console.log("K2 =", K2);
console.log("K3 =", K3);
console.log("K4 =", K4);
console.log("K5 =", K5);

console.log("sigma_c =", sigma_c);   // compressão no cone
console.log("sigma_ti =", sigma_ti); // tração no diâmetro interno
console.log("sigma_to =", sigma_to); // tração no diâmetro externo
