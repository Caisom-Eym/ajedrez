const cas = document.getElementsByClassName("casilla")
const tablero = document.getElementById("tablero")

let jugador1 = true

for (let i = 0; i < cas.length; i++){
    var inicio;
    var final
    cas[i].addEventListener("dragover",(e)=>{
        e.preventDefault()
        e.target.classList.add("green")
    })
    cas[i].addEventListener("dragleave", (e)=>{
        e.target.classList.remove("green")
    })
    cas[i].addEventListener("dragstart",(e)=>{
        inicio = e.target
    })
    cas[i].addEventListener("drop",(e)=>{
        if (inicio.getAttribute("equipo") == "1" && jugador1){
            final = e.target
            if (mover(inicio,final,inicio.textContent)){
                jugador1 = false
            document.body.style.backgroundColor = "red"
            }
        }else if (inicio.getAttribute("equipo") == "2" && !(jugador1)){
            final = e.target
            if (mover(inicio,final,inicio.textContent)){
                jugador1 = true
            document.body.style.backgroundColor = "blue"
            }
        }
        e.target.classList.remove("green")
        
    })
}

var casLetterA = []
var casLetterB = []
var casLetterC = []
var casLetterD = []
var casLetterE = []
var casLetterF = []
var casLetterG = []
var casLetterH = []

var casNumber1 = []
var casNumber2 = []
var casNumber3 = []
var casNumber4 = []
var casNumber5 = []
var casNumber6 = []
var casNumber7 = []
var casNumber8 = []
const leerTablero = ()=>{
    casLetterA = []
    casLetterB = []
    casLetterC = []
    casLetterD = []
    casLetterE = []
    casLetterF = []
    casLetterG = []
    casLetterH = []


    for (let i = 0; i < cas.length; i++) if (cas[i].getAttribute("letter") == "a") casLetterA.push(cas[i])
    for (let i = 0; i < cas.length; i++) if (cas[i].getAttribute("letter") == "b") casLetterB.push(cas[i])
    for (let i = 0; i < cas.length; i++) if (cas[i].getAttribute("letter") == "c") casLetterC.push(cas[i])
    for (let i = 0; i < cas.length; i++) if (cas[i].getAttribute("letter") == "d") casLetterD.push(cas[i])
    for (let i = 0; i < cas.length; i++) if (cas[i].getAttribute("letter") == "e") casLetterE.push(cas[i])
    for (let i = 0; i < cas.length; i++) if (cas[i].getAttribute("letter") == "f") casLetterF.push(cas[i])
    for (let i = 0; i < cas.length; i++) if (cas[i].getAttribute("letter") == "g") casLetterG.push(cas[i])
    for (let i = 0; i < cas.length; i++) if (cas[i].getAttribute("letter") == "h") casLetterH.push(cas[i])


    casNumber1 = []
    casNumber2 = []
    casNumber3 = []
    casNumber4 = []
    casNumber5 = []
    casNumber6 = []
    casNumber7 = []
    casNumber8 = []


    for (let i = 0; i < cas.length; i++) if (cas[i].getAttribute("number") == "1") casNumber1.push(cas[i])
    for (let i = 0; i < cas.length; i++) if (cas[i].getAttribute("number") == "2") casNumber2.push(cas[i])
    for (let i = 0; i < cas.length; i++) if (cas[i].getAttribute("number") == "3") casNumber3.push(cas[i])
    for (let i = 0; i < cas.length; i++) if (cas[i].getAttribute("number") == "4") casNumber4.push(cas[i])
    for (let i = 0; i < cas.length; i++) if (cas[i].getAttribute("number") == "5") casNumber5.push(cas[i])
    for (let i = 0; i < cas.length; i++) if (cas[i].getAttribute("number") == "6") casNumber6.push(cas[i])
    for (let i = 0; i < cas.length; i++) if (cas[i].getAttribute("number") == "7") casNumber7.push(cas[i])
    for (let i = 0; i < cas.length; i++) if (cas[i].getAttribute("number") == "8") casNumber8.push(cas[i])

    for (let i = 0; i < casNumber8.length;i++){
        if (casNumber8[i].textContent == "♙"){
            casNumber8[i].textContent = "♕"
        }
    }

    for (let i = 0; i < casNumber8.length;i++){
        if (casNumber8[i].textContent == "♟"){
            casNumber8[i].textContent = "♛"
        }
    }
}
leerTablero()

const mover = (inicial,final,pieza) =>{
    leerTablero()
    let distanciaY = parseInt(final.getAttribute("number")) - parseInt(inicial.getAttribute("number"))
    let distanciaX = parseInt(final.getAttribute("column")) - parseInt(inicial.getAttribute("column"))
    let letra1 = inicial.getAttribute("letter")
    let letra2 = final.getAttribute("letter")
    let mov = parseInt(inicial.getAttribute("mov"))
    let equipo = inicial.getAttribute("equipo")

    if (pieza == "♙" || pieza == "♟"){
        if (final.textContent != "" && inicial != final){
            if (comer(pieza,inicial,final)){
                inicial.textContent = ""
                inicial.setAttribute("draggable","false")
                inicial.setAttribute("mov","empty")
                inicial.setAttribute("equipo","none")
                return true
            }
            return false
        }
        else if (distanciaY > 2 || distanciaY < -2 || letra1 != letra2 || distanciaY == 0){
            return false
        }
        else if ((distanciaY >= 2 || distanciaY <= -2 || letra1 != letra2 || distanciaY == 0)
                 && (mov > 0)){
            return false
        }
        else if (final.textContent == ""){
            if (inicial.getAttribute("mov") == "0"){
                if (pieza == "♙" && distanciaY <= 2 && distanciaY > 0){
                    if (verificarBloques(pieza,inicial,final,"ver")){
                        final.textContent = inicial.textContent
                        final.setAttribute("draggable","true")
                        final.setAttribute("mov",mov+1)
                        final.setAttribute("equipo",equipo)
                        inicial.textContent = ""
                        inicial.setAttribute("draggable","false")
                        inicial.setAttribute("mov","empty")
                        inicial.setAttribute("equipo","none")
                    }
                }
                else if (pieza == "♟" && distanciaY >= -2 && distanciaY < 0){   
                    if (verificarBloques(pieza,inicial,final,"ver")){
                        final.textContent = inicial.textContent
                        final.setAttribute("draggable","true")
                        final.setAttribute("mov",mov+1)
                        final.setAttribute("equipo",equipo)
                        inicial.textContent = ""
                        inicial.setAttribute("draggable","false")
                        inicial.setAttribute("mov","empty")
                        inicial.setAttribute("equipo","none")
                    }        
                }
            }
            else {
                if (pieza == "♙" && distanciaY < 2 && distanciaY > 0){
                    final.textContent = inicial.textContent
                    final.setAttribute("draggable","true")
                    final.setAttribute("mov",mov+1)
                    final.setAttribute("equipo",equipo)
                    inicial.textContent = ""
                    inicial.setAttribute("draggable","false")
                    inicial.setAttribute("mov","empty")
                    inicial.setAttribute("equipo","none")
                }else if (pieza == "♟" && distanciaY > -2 && distanciaY < 0){   
                    final.textContent = inicial.textContent
                    final.setAttribute("draggable","true")
                    final.setAttribute("mov",mov+1)
                    final.setAttribute("equipo",equipo)
                    inicial.textContent = ""
                    inicial.setAttribute("draggable","false")
                    inicial.setAttribute("mov","empty")
                    inicial.setAttribute("equipo","none")    
                }
            }
            
        }
    }

    else if (pieza == "♔" || pieza == "♚"){
        if (final.textContent != "" && inicial != final){
            if (comer(pieza,inicial,final)){
                inicial.textContent = ""
                inicial.setAttribute("draggable","false")
                inicial.setAttribute("mov","empty")
                inicial.setAttribute("equipo","none")
                leerTablero()
                return true
            }
            return false
        }
        else if (verificarMovimiento(pieza,inicial,final)){ 
            final.textContent = inicial.textContent
            final.setAttribute("draggable","true")
            final.setAttribute("mov",mov+1)
            final.setAttribute("equipo",equipo)
            inicial.textContent = ""
            inicial.setAttribute("draggable","false")
            inicial.setAttribute("mov","empty")
            inicial.setAttribute("equipo","none")
        }
        else {
            return false
        }
    }
    else if (pieza == "♕" || pieza == "♛"){
        if (final.textContent != "" && inicial != final){
            if (comer(pieza,inicial,final)){
                inicial.textContent = ""
                inicial.setAttribute("draggable","false")
                inicial.setAttribute("mov","empty")
                inicial.setAttribute("equipo","none")
                leerTablero()
                return true
            }
            return false
        }
        else if (verificarMovimiento(pieza,inicial,final)){
            final.textContent = inicial.textContent
            final.setAttribute("draggable","true")
            final.setAttribute("mov",mov+1)
            final.setAttribute("equipo",equipo)
            inicial.textContent = ""
            inicial.setAttribute("draggable","false")
            inicial.setAttribute("mov","empty")
            inicial.setAttribute("equipo","none")  
        }
        else {
            return false
        }
    }
    else if (pieza == "♖" || pieza == "♜"){
        if (final.textContent != "" && inicial != final){
            if (comer(pieza,inicial,final)){
                inicial.textContent = ""
                inicial.setAttribute("draggable","false")
                inicial.setAttribute("mov","empty")
                inicial.setAttribute("equipo","none")
                leerTablero()
                return true
            }
            return false
        }
        else if (verificarMovimiento(pieza,inicial,final)){
            final.textContent = inicial.textContent
            final.setAttribute("draggable","true")
            final.setAttribute("mov",mov+1)
            final.setAttribute("equipo",equipo)
            inicial.textContent = ""
            inicial.setAttribute("draggable","false")
            inicial.setAttribute("mov","empty")
            inicial.setAttribute("equipo","none")
        }
        else {
            return false
        }
    }
    else if (pieza == "♗" || pieza == "♝"){
        if (final.textContent != "" && inicial != final){
            if (comer(pieza,inicial,final)){
                inicial.textContent = ""
                inicial.setAttribute("draggable","false")
                inicial.setAttribute("mov","empty")
                inicial.setAttribute("equipo","none")
                leerTablero()
                return true
            }
            return false
        }
        else if (verificarMovimiento(pieza,inicial,final)){
            final.textContent = inicial.textContent
            final.setAttribute("draggable","true")
            final.setAttribute("mov",mov+1)
            final.setAttribute("equipo",equipo)
            inicial.textContent = ""
            inicial.setAttribute("draggable","false")
            inicial.setAttribute("mov","empty")
            inicial.setAttribute("equipo","none")
        }
        else {
            return false
        }
    }
    else if (pieza == "♘" || pieza == "♞"){
        if (final.textContent != "" && inicial != final){
            if (comer(pieza,inicial,final)){
                inicial.textContent = ""
                inicial.setAttribute("draggable","false")
                inicial.setAttribute("mov","empty")
                inicial.setAttribute("equipo","none")
                leerTablero()
                return true
            }
            return false
        }
        else if (verificarMovimiento(pieza,inicial,final)){
            final.textContent = inicial.textContent
            final.setAttribute("draggable","true")
            final.setAttribute("mov",mov+1)
            final.setAttribute("equipo",equipo)
            inicial.textContent = ""
            inicial.setAttribute("draggable","false")
            inicial.setAttribute("mov","empty")
            inicial.setAttribute("equipo","none")
            
        }
        else {
            return false
        }
    }
    leerTablero()
    return true
}

const verificarMovimiento = (pieza,inicio,fin) => {
    console.log("verificando Movimiento de " + pieza + " al lugar " + fin.getAttribute("id"))
    let distanciaY = parseInt(fin.getAttribute("number")) - parseInt(inicio.getAttribute("number"))
    let distanciaX = parseInt(fin.getAttribute("column")) - parseInt(inicio.getAttribute("column"))
    var distanciaXPos = distanciaX
    var distanciaYPos = distanciaY
    if (distanciaYPos < 0) distanciaYPos = distanciaYPos * -1
    if (distanciaXPos < 0) distanciaXPos = distanciaXPos * -1
    let letra1 = inicio.getAttribute("letter")
    let letra2 = fin.getAttribute("letter")
    let mov = parseInt(fin.getAttribute("mov"))
    if (pieza == "♔" ||pieza == "♚"){
        if (distanciaX == 0 && distanciaY == 0) return false
        else if ((distanciaY <= 1 && distanciaY >= -1) && (distanciaX <= 1 && distanciaX >= -1)) {
            return true
        }
        else return false
    }
    else if (pieza == "♕" || pieza == "♛"){
        if (distanciaX == 0 && distanciaY == 0) return false
        else if (distanciaYPos == distanciaXPos) {
            console.log("dia")
            if (verificarBloques(pieza,inicio,fin,"dia")[0]) return true
        }
        else if ((distanciaX == 0 && distanciaY > 0) || (distanciaX == 0 && distanciaY < 0)){
            console.log("ver")
            if(verificarBloques(pieza,inicio,fin,"ver")[0]) return true
        }
        else if ((distanciaY == 0 && distanciaX > 0) || (distanciaY == 0 && distanciaX < 0)){
            console.log("hor")
            if(verificarBloques(pieza,inicio,fin,"hor")[0]) return true
        }
    }
    else if (pieza == "♗" || pieza == "♝"){
        if (distanciaX == 0 && distanciaY == 0) return false
        else if (distanciaYPos == distanciaXPos) {
            console.log("dia")
            if (verificarBloques(pieza,inicio,fin,"dia")[0]) return true
        }
    }
    else if (pieza == "♖" || pieza == "♜"){
        if (distanciaX == 0 && distanciaY == 0) return false
        else if ((distanciaX == 0 && distanciaY > 0) || (distanciaX == 0 && distanciaY < 0)){
            console.log("ver")
            if(verificarBloques(pieza,inicio,fin,"ver")[0]) return true
        }
        else if ((distanciaY == 0 && distanciaX > 0) || (distanciaY == 0 && distanciaX < 0)){
            console.log("hor")
            if(verificarBloques(pieza,inicio,fin,"hor")[0]) return true
        }
    }
    else if (pieza == "♘" || pieza == "♞"){
        if (distanciaX == 0 && distanciaY == 0) return false
        else if ((distanciaXPos == 2 && distanciaYPos == 1) || (distanciaYPos == 2 && distanciaXPos == 1)){
            console.log("especial")
            if(verificarBloques(pieza,inicio,fin,"especial")[0]) return true
        }
    }
}

const verificarBloques = (pieza,inicio,fin,direccion) =>{    
    let distanciaY = parseInt(fin.getAttribute("number")) - parseInt(inicio.getAttribute("number"))
    let distanciaYPos = distanciaY
    let distanciaX = parseInt(fin.getAttribute("column")) - parseInt(inicio.getAttribute("column"))
    let distanciaXPos = distanciaX
    if (distanciaYPos < 0) distanciaYPos = distanciaYPos * -1
    if (distanciaXPos < 0) distanciaXPos = distanciaXPos * -1
    let letra1 = inicio.getAttribute("letter")
    let letra2 = fin.getAttribute("letter")
    let mov = parseInt(fin.getAttribute("mov"))
    let letter = inicio.getAttribute("letter")
    let row = inicio.getAttribute("number")

    let posIn = inicio.getAttribute("number")
    let posFn = fin.getAttribute("number")
    if (direccion == "ver"){
        if (letter == "a"){
            let contador = 1
            for (let i = 0; i < distanciaY && distanciaY > 0; i++){
                if (casLetterA[(8-(parseInt(inicio.getAttribute("number"))))-contador].textContent != ""){
                    return [false,casLetterA[(8-(parseInt(inicio.getAttribute("number"))))-contador]]
                }
                contador++
            }
            for (let i = 0; i > distanciaY && distanciaY < 0; i--){
                if (casLetterA[(8-(parseInt(inicio.getAttribute("number"))))+contador].textContent != ""){
                    return [false,casLetterA[(8-(parseInt(inicio.getAttribute("number"))))+contador]]
                }
                contador++
            }
            return [true]
        }
        else if (letter == "b"){
            let contador = 1
            for (let i = 0; i < distanciaY && distanciaY > 0; i++){
                if (casLetterB[(8-(parseInt(inicio.getAttribute("number"))))-contador].textContent != ""){
                    return [false,casLetterB[(8-(parseInt(inicio.getAttribute("number"))))-contador]]
                }
                contador++
            }
            for (let i = 0; i > distanciaY && distanciaY < 0; i--){
                if (casLetterB[(8-(parseInt(inicio.getAttribute("number"))))+contador].textContent != ""){
                    return [false,casLetterB[(8-(parseInt(inicio.getAttribute("number"))))+contador]]
                }
                contador++
            }
            return [true]
        }
        else if (letter == "c"){
            let contador = 1
            for (let i = 0; i < distanciaY && distanciaY > 0; i++){
                if (casLetterC[(8-(parseInt(inicio.getAttribute("number"))))-contador].textContent != ""){
                    return [false,casLetterC[(8-(parseInt(inicio.getAttribute("number"))))-contador]]
                }
                contador++
            }
            for (let i = 0; i > distanciaY && distanciaY < 0; i--){
                if (casLetterC[(8-(parseInt(inicio.getAttribute("number"))))+contador].textContent != ""){
                    return [false,casLetterC[(8-(parseInt(inicio.getAttribute("number"))))+contador]]
                }
                contador++
            }
            return [true]
        }
        else if (letter == "d"){
            let contador = 1
            for (let i = 0; i < distanciaY && distanciaY > 0; i++){
                if (casLetterD[(8-(parseInt(inicio.getAttribute("number"))))-contador].textContent != ""){
                    return [false,casLetterD[(8-(parseInt(inicio.getAttribute("number"))))-contador]]
                }
                contador++
            }
            for (let i = 0; i > distanciaY && distanciaY < 0; i--){
                if (casLetterD[(8-(parseInt(inicio.getAttribute("number"))))+contador].textContent != ""){
                    return [false,casLetterD[(8-(parseInt(inicio.getAttribute("number"))))+contador]]
                }
                contador++
            }
            return [true]
        }
        else if (letter == "e"){
            let contador = 1
            for (let i = 0; i < distanciaY && distanciaY > 0; i++){
                if (casLetterE[(8-(parseInt(inicio.getAttribute("number"))))-contador].textContent != ""){
                    return [false,casLetterE[(8-(parseInt(inicio.getAttribute("number"))))-contador]]
                }
                contador++
            }
            for (let i = 0; i > distanciaY && distanciaY < 0; i--){
                if (casLetterE[(8-(parseInt(inicio.getAttribute("number"))))+contador].textContent != ""){
                    return [false,casLetterE[(8-(parseInt(inicio.getAttribute("number"))))+contador]]
                }
                contador++
            }
            return [true]
        }
        else if (letter == "f"){
            let contador = 1
            for (let i = 0; i < distanciaY && distanciaY > 0; i++){
                if (casLetterF[(8-(parseInt(inicio.getAttribute("number"))))-contador].textContent != ""){
                    return [false,casLetterF[(8-(parseInt(inicio.getAttribute("number"))))-contador]]
                }
                contador++
            }
            for (let i = 0; i > distanciaY && distanciaY < 0; i--){
                if (casLetterF[(8-(parseInt(inicio.getAttribute("number"))))+contador].textContent != ""){
                    return [false,casLetterF[(8-(parseInt(inicio.getAttribute("number"))))+contador]]
                }
                contador++
            }
            return [true]
        }
        else if (letter == "g"){
            let contador = 1
            for (let i = 0; i < distanciaY && distanciaY > 0; i++){
                if (casLetterG[(8-(parseInt(inicio.getAttribute("number"))))-contador].textContent != ""){
                    return [false,casLetterG[(8-(parseInt(inicio.getAttribute("number"))))-contador]]
                }
                contador++
            }
            for (let i = 0; i > distanciaY && distanciaY < 0; i--){
                if (casLetterG[(8-(parseInt(inicio.getAttribute("number"))))+contador].textContent != ""){
                    return [false,casLetterG[(8-(parseInt(inicio.getAttribute("number"))))+contador]]
                }
                contador++
            }
            return [true]
        }
        else if (letter == "h"){
            let contador = 1
            for (let i = 0; i < distanciaY && distanciaY > 0; i++){
                if (casLetterH[(8-(parseInt(inicio.getAttribute("number"))))-contador].textContent != ""){
                    return [false,casLetterH[(8-(parseInt(inicio.getAttribute("number"))))-contador]]
                }
                contador++
            }
            for (let i = 0; i > distanciaY && distanciaY < 0; i--){
                if (casLetterH[(8-(parseInt(inicio.getAttribute("number"))))+contador].textContent != ""){
                    return [false,casLetterH[(8-(parseInt(inicio.getAttribute("number"))))+contador]]
                }
                contador++
            }
            return [true]
        }
    }
    else if (direccion == "hor"){
        if (row == "1"){
            let contador = 1
            for (let i = 0; i < distanciaX && distanciaX > 0; i++){
                if (casNumber1[(8-(parseInt(inicio.getAttribute("column"))))-contador].textContent != ""){
                    return [false,casNumber1[(8-(parseInt(inicio.getAttribute("column"))))-contador]]
                }
                contador++
            }
            for (let i = 0; i > distanciaX && distanciaX < 0; i--){
                if (casNumber1[(8-(parseInt(inicio.getAttribute("column"))))+contador].textContent != ""){
                    return [false,casNumber1[(8-(parseInt(inicio.getAttribute("column"))))+contador]]
                }
                contador++
            }
            return [true]
        }
        else if (row == "2"){
            let contador = 1
            for (let i = 0; i < distanciaX && distanciaX > 0; i++){
                if (casNumber2[(8-(parseInt(inicio.getAttribute("column"))))-contador].textContent != ""){
                    return [false,casNumber2[(8-(parseInt(inicio.getAttribute("column"))))-contador]]
                }
                contador++
            }
            for (let i = 0; i > distanciaX && distanciaX < 0; i--){
                if (casNumber2[(8-(parseInt(inicio.getAttribute("column"))))+contador].textContent != ""){
                    return [false,casNumber2[(8-(parseInt(inicio.getAttribute("column"))))+contador]]
                }
                contador++
            }
            return [true]
        }
        else if (row == "3"){
            let contador = 1
            for (let i = 0; i < distanciaX && distanciaX > 0; i++){
                if (casNumber3[(8-(parseInt(inicio.getAttribute("column"))))-contador].textContent != ""){
                    return [false,casNumber3[(8-(parseInt(inicio.getAttribute("column"))))-contador]]
                }
                contador++
            }
            for (let i = 0; i > distanciaX && distanciaX < 0; i--){
                if (casNumber3[(8-(parseInt(inicio.getAttribute("column"))))+contador].textContent != ""){
                    return [false,casNumber3[(8-(parseInt(inicio.getAttribute("column"))))+contador]]
                }
                contador++
            }
            return [true]
        }
        else if (row == "4"){
            let contador = 1
            for (let i = 0; i < distanciaX && distanciaX > 0; i++){
                if (casNumber4[(8-(parseInt(inicio.getAttribute("column"))))-contador].textContent != ""){
                    return [false,casNumber4[(8-(parseInt(inicio.getAttribute("column"))))-contador]]
                }
                contador++
            }
            for (let i = 0; i > distanciaX && distanciaX < 0; i--){
                if (casNumber4[(8-(parseInt(inicio.getAttribute("column"))))+contador].textContent != ""){
                    return [false,casNumber4[(8-(parseInt(inicio.getAttribute("column"))))+contador]]
                }
                contador++
            }
            return [true]
        }
        else if (row == "5"){
            let contador = 1
            for (let i = 0; i < distanciaX && distanciaX > 0; i++){
                if (casNumber5[(8-(parseInt(inicio.getAttribute("column"))))-contador].textContent != ""){
                    return [false,casNumber5[(8-(parseInt(inicio.getAttribute("column"))))-contador]]
                }
                contador++
            }
            for (let i = 0; i > distanciaX && distanciaX < 0; i--){
                if (casNumber5[(8-(parseInt(inicio.getAttribute("column"))))+contador].textContent != ""){
                    return [false,casNumber5[(8-(parseInt(inicio.getAttribute("column"))))+contador]]
                }
                contador++
            }
            return [true]
        }
        else if (row == "6"){
            let contador = 1
            for (let i = 0; i < distanciaX && distanciaX > 0; i++){
                if (casNumber6[(8-(parseInt(inicio.getAttribute("column"))))-contador].textContent != ""){
                    return [false,casNumber6[(8-(parseInt(inicio.getAttribute("column"))))-contador]]
                }
                contador++
            }
            for (let i = 0; i > distanciaX && distanciaX < 0; i--){
                if (casNumber6[(8-(parseInt(inicio.getAttribute("column"))))+contador].textContent != ""){
                    return [false,casNumber6[(8-(parseInt(inicio.getAttribute("column"))))+contador]]
                }
                contador++
            }
            return [true]
        }
        else if (row == "7"){
            let contador = 1
            for (let i = 0; i < distanciaX && distanciaX > 0; i++){
                if (casNumber7[(8-(parseInt(inicio.getAttribute("column"))))-contador].textContent != ""){
                    return [false,casNumber7[(8-(parseInt(inicio.getAttribute("column"))))-contador]]
                }
                contador++
            }
            for (let i = 0; i > distanciaX && distanciaX < 0; i--){
                if (casNumber7[(8-(parseInt(inicio.getAttribute("column"))))+contador].textContent != ""){
                    return [false,casNumber7[(8-(parseInt(inicio.getAttribute("column"))))+contador]]
                }
                contador++
            }
            return [true]
        }
        else if (row == "8"){
            let contador = 1
            for (let i = 0; i < distanciaX && distanciaX > 0; i++){
                if (casNumber8[(8-(parseInt(inicio.getAttribute("column"))))-contador].textContent != ""){
                    return [false,casNumber8[(8-(parseInt(inicio.getAttribute("column"))))-contador]]
                }
                contador++
            }
            for (let i = 0; i > distanciaX && distanciaX < 0; i--){
                if (casNumber8[(8-(parseInt(inicio.getAttribute("column"))))+contador].textContent != ""){
                    return [false,casNumber8[(8-(parseInt(inicio.getAttribute("column"))))+contador]]
                }
                contador++
            }
            return [true]
        }
    }
    else if (direccion == "dia"){
        let contador;
        let elegido;
        for (let i = 0;true;i++){
            if (cas[i].getAttribute("id")==inicio.getAttribute("id")){
               elegido = i
                break 
            }
        }
        if (distanciaY > 0){
            if (distanciaX < 0){
                contador = 7
                for (let i = 0; i < distanciaXPos;i++){
                    if (cas[elegido-contador].textContent != ""){
                        return [false,cas[elegido-contador]]
                    }
                    contador = contador + 7
                }
                return [true]
            }
            else if (distanciaX > 0){
                contador = 9
                for (let i = 0; i < distanciaXPos;i++){
                    if (cas[elegido-contador].textContent != ""){
                        return [false,cas[elegido-contador]]
                    }
                    contador = contador + 9
                }
                return [true]
            }

        }
        else if (distanciaY < 0){
            if (distanciaX < 0){
                contador = 9
                for (let i = 0; i < distanciaXPos;i++){
                    if (cas[elegido+contador].textContent != ""){
                        return [false,cas[elegido+contador]]
                    }
                    contador = contador + 9
                }
                return [true]
            }
            else if (distanciaX > 0){
                contador = 7
                for (let i = 0; i < distanciaXPos;i++){
                    if (cas[elegido+contador].textContent != ""){
                        return [false,cas[elegido+contador]]
                    }
                    contador = contador + 7
                }
                return [true]
            }
        }
    }
    else if (direccion == "especial"){
        return [true,fin]
    }
    return [false,false]
}

const comer = (pieza,inicio,fin)=>{    
    let distanciaY = parseInt(fin.getAttribute("number")) - parseInt(inicio.getAttribute("number"))
    let distanciaX = parseInt(fin.getAttribute("column")) - parseInt(inicio.getAttribute("column"))
    var distanciaXPos = distanciaX
    var distanciaYPos = distanciaY
    if (distanciaYPos < 0) distanciaYPos = distanciaYPos * -1
    if (distanciaXPos < 0) distanciaXPos = distanciaXPos * -1
    let victima;

    let mov = parseInt(inicio.getAttribute("mov"))
    let equipo = inicio.getAttribute("equipo")

    if (inicio.getAttribute("equipo") != fin.getAttribute("equipo")){
        if (pieza == "♙" || pieza == "♟"){
            if (pieza == "♙" && distanciaXPos == 1 && distanciaY == 1) {
                victima = fin
                console.log(inicio.textContent + " comio a " + victima.textContent)
                if (victima.textContent == "♚" || victima.textContent =="♔"){
                    alert("Juego Terminado")
                }
                victima.textContent = inicio.textContent
                victima.setAttribute("draggable","true")
                victima.setAttribute("mov",mov+1)
                victima.setAttribute("equipo",equipo)
                return true
            }
            if (pieza == "♟" && distanciaXPos == 1 && distanciaY == -1) {
                victima = fin
                console.log(inicio.textContent + " comio a " + victima.textContent)
                if (victima.textContent == "♚" || victima.textContent =="♔"){
                    alert("Juego Terminado")
                }
                victima.textContent = inicio.textContent
                victima.setAttribute("draggable","true")
                victima.setAttribute("mov",mov+1)
                victima.setAttribute("equipo",equipo)
                return true
            }
        }
        else if (pieza == "♘" || pieza == "♞"){
            if ((distanciaXPos == 2 && distanciaYPos == 1) || (distanciaYPos == 2 && distanciaXPos == 1)){
                if (verificarMovimiento(pieza,inicio,fin,"especial")){
                    victima = verificarBloques(pieza,inicio,fin,"especial")[1]
                    console.log(inicio.textContent + " comio a " + victima.textContent)
                    if (victima.textContent == "♚" || victima.textContent =="♔"){
                        alert("Juego Terminado")
                    }
                    victima.textContent = inicio.textContent
                    victima.setAttribute("draggable","true")
                    victima.setAttribute("mov",mov+1)
                    victima.setAttribute("equipo",equipo)
                    return true
                }
            }
            return false
        }
        else if (pieza == "♔" || pieza == "♚"){
            if ((distanciaY <= 1 && distanciaY >= -1) && (distanciaX <= 1 && distanciaX >= -1)){
                victima = fin
                console.log(inicio.textContent + " comio a " + victima.textContent)
                if (victima.textContent == "♚" || victima.textContent =="♔"){
                    alert("Juego Terminado")
                }
                victima.textContent = inicio.textContent
                victima.setAttribute("draggable","true")
                victima.setAttribute("mov",mov+1)
                victima.setAttribute("equipo",equipo)
                return true
            }
        }
        else if ((distanciaYPos == distanciaXPos) &&
                 (verificarBloques(pieza,inicio,fin,"dia")[1].getAttribute("equipo") != equipo) &&
                 (pieza == "♗" || pieza == "♝" || pieza == "♕" || pieza == "♛")){
            victima = verificarBloques(pieza,inicio,fin,"dia")[1]
            console.log(inicio.textContent + " comio a " + victima.textContent)
            if (victima.textContent == "♚" || victima.textContent =="♔"){
                alert("Juego Terminado")
            }
            victima.textContent = inicio.textContent
            victima.setAttribute("draggable","true")
            victima.setAttribute("mov",mov+1)
            victima.setAttribute("equipo",equipo)
            return true
        }
        else if (((distanciaX == 0 && distanciaY > 0) || (distanciaX == 0 && distanciaY < 0)) &&
                (verificarBloques(pieza,inicio,fin,"ver")[1].getAttribute("equipo") != equipo) &&
                ((pieza == "♖" || pieza == "♜" || pieza == "♕" || pieza == "♛"))){
            victima = verificarBloques(pieza,inicio,fin,"ver")[1]
            console.log(inicio.textContent + " comio a " + victima.textContent)
            if (victima.textContent == "♚" || victima.textContent =="♔"){
                alert("Juego Terminado")
            }
            console.log(victima)
            victima.textContent = inicio.textContent
            victima.setAttribute("draggable","true")
            victima.setAttribute("mov",mov+1)
            victima.setAttribute("equipo",equipo)
            return true
        }
        else if (((distanciaY == 0 && distanciaX > 0) || (distanciaY == 0 && distanciaX < 0))&&
                (verificarBloques(pieza,inicio,fin,"hor")[1].getAttribute("equipo") != equipo) &&
                ((pieza == "♖" || pieza == "♜" || pieza == "♕" || pieza == "♛"))){
                victima = verificarBloques(pieza,inicio,fin,"hor")[1]
                console.log(inicio.textContent + " comio a " + victima.textContent)
                if (victima.textContent == "♚" || victima.textContent =="♔"){
                    alert("Juego Terminado")
                }
                victima.textContent = inicio.textContent
                victima.setAttribute("draggable","true")
                victima.setAttribute("mov",mov+1)
                victima.setAttribute("equipo",equipo)
                return true
        }
    }
    else {
        return false
    }
}
function limpiar() {
    for (let i = 0; i < cas.length; i++){
        cas[i].textContent = ""
    }
    casLetterD[4].textContent = "♕"
    casLetterD[4].setAttribute("draggable","true")
}