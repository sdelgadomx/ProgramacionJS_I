const ingresos = [
    new Ingreso('Salario', 2100.00),
    new Ingreso('Venta de coche', 1500)
];

const egresos = [
    new Egreso('Renta Departamento', 900),
    new Egreso('Ropa', 400)
];

const cargarApp = () => {
    console.log(ingresos);
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
};

const cargarCabecero = () => {
   
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos(); 

    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());

    console.log(presupuesto);
    console.log(porcentajeEgreso);
    console.log(totalIngresos());
    console.log(totalEgresos());

}

const agregarDato = () => {
    console.log(`Proceso para agregar dato...`);
    
    let tipo = document.getElementById("tipo").value;
    let descripcion = document.getElementById("descripcion").value;
    let valor = document.getElementById("valor").value;

    console.log(forma);
    console.log(tipo);
    console.log(descripcion);
    console.log(valor);

    // Validar que existan valores tanto en descripcion como valor
    if (descripcion !== '' && valor !=='') {
        if (tipo === 'ingreso'){
            ingresos.push(new Ingreso(descripcion, +valor));
            cargarCabecero();
            cargarIngresos();
            cargarEgresos();
            // Limpiar inputs
            document.getElementById("descripcion").value = '';
            document.getElementById("valor").value = '';
        }
        else if (tipo==='egreso'){
            egresos.push(new Egreso(descripcion, +valor));
            cargarCabecero();
            cargarEgresos();
            // Limpiar inputs
            document.getElementById("descripcion").value = '';
            document.getElementById("valor").value = '';
        }
        console.log('con valores')
    }
    else {
        console.log('valores vacios')
        alert('Descripción o Valor estan vacios')
    } 
} 

let totalIngresos = () => {
    let totalIngreso = 0;

    for (let ingreso of ingresos){
        totalIngreso += ingreso.valor
        //console.log(`Total Ingresos ${totalIngresos}`)
    }

    //console.log(`Total Ingresos ${totalIngresos}`);
    return totalIngreso

}

let totalEgresos = () => {
    let totalEgreso = 0;

    for (let egreso of egresos){
        totalEgreso += egreso.valor;
        console.log(`Total Egresos ${totalEgresos}`);
    }
    
    return totalEgreso
}

const formatoMoneda = (valor) => {
    return valor.toLocaleString('es-MX',{style:'currency', currency:'MXN', minimumFractionDigits:2});

}

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('es-MX',{style:'percent', minimumFractionDigits:2});
}


const cargarIngresos = () => {
    console.log(ingresos)
    let ingresosHTML = '';
    for (let ingreso of ingresos) {
        console.log(ingreso)
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    console.log(ingresosHTML)
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso) => {
    
    console.log(ingreso);
    let ingresosHTML = `
    <div class = "elemento limpiarEstilos">
        <div class = "elemento_descripcion">${ingreso.descripcion}</div>
        <div class = "derecha limpiarEstilos">
            <div class = "elemento_valor"> + ${formatoMoneda(ingreso.valor)}</div>
            <div class = "elemento_eliminar">
                <button class = 'elemento_eliminar--btn'>
                    <ion-icon name = "close-circle-outline"
                    onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `
    console.log(ingresosHTML);
    return ingresosHTML;
}

const eliminarIngreso = (id) => {
    let indiceEliminar = ingresos.findIndex(ingreso=>ingreso.id===id);
    ingresos.splice(indiceEliminar,1);
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}


const cargarEgresos = () => {
    console.log(`Carga egresos ${egresos}`)
    let egresosHTML = '';
    for (let egreso of egresos) {
        console.log(egreso)
        egresosHTML += crearEgresoHTML(egreso);
    }
    console.log(egresosHTML)
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso) => {
    
    console.log(egreso);

    let porcentajeEgreso = egreso.valor/totalIngresos();
    console.log(`Porcentaje ${porcentajeEgreso}`)

    let egresosHTML = `
    <div class = "elemento limpiarEstilos">
        <div class = "elemento_descripcion">${egreso.descripcion}</div>
        <div class = "derecha limpiarEstilos">
            <div class = "elemento_valor"> + ${formatoMoneda(egreso.valor)}</div>
            <div class="elemento_porcentaje">${formatoPorcentaje(porcentajeEgreso)}</div>
            <div class = "elemento_eliminar">
                <button class = 'elemento_eliminar--btn'>
                    <ion-icon name = "close-circle-outline"
                    onclick='eliminarEgreso(${egreso.id})'></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `
    console.log(egresosHTML);
    return egresosHTML;
}

const eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex(egreso=>egreso.id===id);
    egresos.splice(indiceEliminar,1);
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();

}
