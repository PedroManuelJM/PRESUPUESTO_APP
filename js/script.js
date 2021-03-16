document.getElementById('sub-btn').addEventListener('click', formSubmit);
document.getElementById('formData').addEventListener('click', editRow);
document.getElementById('formData').addEventListener('click', deleteRow);
document.addEventListener("DOMContentLoaded", getFromLocalStore); 

var forms = [];
var selectedRow = null;
var btn;
let items;
var validationStatus = '';

function formSubmit(e){
    validateForm();
    if(validationStatus == 'pass'){
    let formData = readForm();
    if(selectedRow == null){
        addNewRow(formData);
        forms.push(formData);
        storeLocal(formData); 
    }
    else{
        updateRow();
    }
    // console.log(forms);
    }
    e.preventDefault();
}

// validando los inputs del formulario 
function validateForm() {
   var fproduct = document.getElementById('fproduct');
   var fcateg = document.getElementById('fcateg');
   var fcant = document.getElementById('fcant');
   var fprec = document.getElementById('fprec');
    checkRequired([fproduct, fcateg, fcant, fprec]); 
}

function checkRequired(inputArr){
    for(i = 0; i < inputArr.length; i++){
        console.log(inputArr[i]);
        if(inputArr[i].value == ''){
            alert(`${inputArr[i].id} is required`);
            inputArr[i].focus();
            validationStatus = 'fail';
            return false;
        }
        else{
            validationStatus = 'pass';
        }
    }
}

function getFormId(){
    let formId;
    if(forms.length > 0){
        formId = forms[forms.length - 1].id + 1;
    }
    else{
        formId = 0;
    }
    return formId;
}

// almacenando los datos en el localstorage 
function getFromLocalStore(){
    let items;
    if(localStorage.getItem('items') === null){
        forms = [];
    }
    else{
        forms = JSON.parse(localStorage.getItem('items'));
        console.log(forms);
        forms.forEach(function(form){
        const tbody = document.getElementById('formData');  
        // insertando
        var newRow = tbody.insertRow();
    
        newRow.id = form.id;

        let sno = newRow.insertCell(0);  // id 
        sno.innerHTML = getSno();

        let fproduct = newRow.insertCell(1); // nombre producto o servicio
        fproduct.innerHTML = form.fproduct;
    
        let fcateg = newRow.insertCell(2);  // categoria 
        fcateg.innerHTML = form.fcateg;

        let fcant = newRow.insertCell(3);  // cantidad
        fcant.innerHTML = form.fcant;

        let fprec = newRow.insertCell(4);  // precio
        fprec.innerHTML = form.fprec;
        
        let fsubtotal =newRow.insertCell(5);  // subtotal 
        fsubtotal.innerHTML=(form.fcant*form.fprec).toFixed(2);
        
        let edit = newRow.insertCell(6);
        edit.innerHTML = `<a href="#" class="edit"><i class="fas fa-edit"></i></a></td>`;

        let del = newRow.insertCell(7);
        del.innerHTML = `<a href="#" class="delete"><i class="fas fa-trash"></i></a></td>`;
        });
        
    }
    return items;
}

function storeLocal(form){

    if(localStorage.getItem('items') === null){
        items = [];

        items.push(form);

        localStorage.setItem('items', JSON.stringify(items));
    }
    else{
        items = JSON.parse(localStorage.getItem('items')); 

        items.push(form);

        localStorage.setItem('items', JSON.stringify(items));
    }
}

function updateLocalStorage(id, data){
    // console.log( "data is  " + data)
    items = JSON.parse(localStorage.getItem('items'));
    console.log(id)
    items.forEach(function(item, index){
        if(item.id == id){
            console.log(`${item.id} and ${id}`)
            item.id = data.id;
            item.fproduct = data.fproduct;
            item.fcateg = data.fcateg;
            item.fcant = data.fcant;
            item.fprec = data.fprec;
            items.splice(index, 1, data);
        }
    });
    localStorage.setItem('items', JSON.stringify(items));
}

function deleteItemFromLocalStorage(id){
    items = JSON.parse(localStorage.getItem('items'));
    items.forEach(function(item, index){
        if(item.id == id){

            items.splice(index, 1);

        }
 
    });
    localStorage.setItem('items', JSON.stringify(items));
    // console.log(items);
}

function readForm(){
    var formData = {};
    formData['id'] = getFormId();
    formData['fproduct'] = document.getElementById('fproduct').value;
    formData['fcateg'] = document.getElementById('fcateg').value;
    formData['fcant'] = document.getElementById('fcant').value;
    formData['fprec'] = document.getElementById('fprec').value;

    return formData;
}

var serialNum = 0;
function getSno(){
    serialNum++;
    return serialNum;
}



function addNewRow(form){
    
    const tbody = document.getElementById('formData');  

    // insertando
    var newRow = tbody.insertRow();

    newRow.id = form.id;

    let sno = newRow.insertCell(0);
    sno.innerHTML = getSno();

    let fproduct = newRow.insertCell(1);
    fproduct.innerHTML = form.fproduct;
    
    let fcateg = newRow.insertCell(2);
    fcateg.innerHTML = form.fcateg;

    let fcant = newRow.insertCell(3);
    fcant.innerHTML = form.fcant;

    let fprec = newRow.insertCell(4);
    fprec.innerHTML = form.fprec;

    let fsubtotal =newRow.insertCell(5);
    fsubtotal.innerHTML=(form.fcant*form.fprec).toFixed(2);

    let edit = newRow.insertCell(6);
    edit.innerHTML = `<a href="#" class="edit"><i class="fas fa-edit"></i></a></td>`;

    let del = newRow.insertCell(7);
    del.innerHTML = `<a href="#" class="delete"><i class="fas fa-trash"></i></a></td>`;
    
    
    toastNotify(' Registro sastifactoriamente. ');
    // console.log(document.getElementById('formData'));
    resetForm();
   
}

function toastNotify(txt) {
    var toastDiv = document.getElementById('toast');
    toastDiv.classList.add('show');
    toastDiv.innerText = txt;
    setTimeout(function(){
        toastDiv.classList.remove("show");
      },5000);
}

/* Al momento editar los elementos seleccionados se muestran en los inputs */
function editRow(e){
    if(e.target.parentElement.classList.contains('edit')){
        selectedRow = e.target.parentElement.parentElement.parentElement;
        console.log(e.target.parentElement.parentElement.parentElement);
        forms.forEach(function(form){
            if(form.id == selectedRow.id){
                document.getElementById('fproduct').value = form.fproduct;
                document.getElementById('fcateg').value  = form.fcateg;
                document.getElementById('fcant').value  = form.fcant;
                document.getElementById('fprec').value  = form.fprec;
                console.log(form.id);
            }
        });
        btn = document.getElementById('sub-btn');
        btn.innerHTML = `Update <i class="fas fa-paper-plane"></i>`;     
    }
}

function updateRow(){
  forms.forEach(function(form){
    if(form.id == selectedRow.id){
        // estructura de la data
        form.fproduct = document.getElementById('fproduct').value;
        form.fcateg = document.getElementById('fcateg').value;
        form.fcant = document.getElementById('fcant').value;
        form.fprec = document.getElementById('fprec').value;
        form.fsubtotal = form.fcant*form.fprec;
        //  Para cambios en la interfaz de usuario
        selectedRow.cells[1].textContent = document.getElementById('fproduct').value;
        selectedRow.cells[2].textContent = document.getElementById('fcateg').value;
        selectedRow.cells[3].textContent = document.getElementById('fcant').value;
        selectedRow.cells[4].textContent = document.getElementById('fprec').value;   
        selectedRow.cells[5].textContent = form.fcant*form.fprec;   

        a = {'id': form.id, 'fproduct':form.fproduct, 'fcateg': form.fcateg, 'fcant': form.fcant, 'fprec':form.fprec,'fsubtotal':form.fsubtotal};
        updateLocalStorage(selectedRow.id, a);
    }
    btn = document.getElementById('sub-btn');
    btn.innerHTML = `Submit <i class="fas fa-paper-plane"></i>`;
  });
  resetForm();
}

function deleteRow(e){
    if(e.target.parentElement.classList.contains('delete')){
        selectedRow = e.target.parentElement.parentElement.parentElement;
        serialNum--;
        
        forms.forEach(function(form, index){
            if(form.id == selectedRow.id){
                selectedRow.remove();
                forms.splice(index, 1);
                toastNotify('Record Deleted Successfully');
                // console.log("index " + form.id)
                deleteItemFromLocalStorage(form.id);
            }
        });
        
        var tb = document.getElementById('formData');
        var tempSerial = 1;
        for(i = 0; i < tb.rows.length; i++){
            var d = tb.rows[i].cells[0];
            d.textContent = tempSerial++;
            console.log(i);
        }
        resetForm();
    }
}
// Limpiando formulario 
function resetForm(){
    document.getElementById('fproduct').value = '';
    document.getElementById('fcateg').value ="";
    document.getElementById('fcant').value = '';
    document.getElementById('fprec').value = '';
    selectedRow = null;
}