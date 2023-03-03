var form = document.getElementById('submit-form');
var items= document.getElementById('items');
var description = document.getElementById('description');
var title = document.getElementById('title');
var description = document.getElementById('description');
var tablediv = document.getElementById('tablediv');
var addrecords = document.getElementById('add-records');
var search = document.getElementById('search');
var resetbtn = document.getElementById('resetbtn');

// number of notes
var notecount = 0;

// append new notes
var newnote ='';

//View and update
isUpdate= false;
note = '';
record = '';
body = '';


// load view
window.onload = updateTable();

// view and update notes
items.addEventListener('click', viewNotes);

// delete notes
items.addEventListener('click', removeNotes);

// Search notes
search.addEventListener('keyup', searchNote);

// Add notes
form.addEventListener('submit', addNote);

// reset text fields
resetbtn.addEventListener('click', resetAll);


// table visibility
function updateTable(){

    if(notecount > 0){
        tablediv.style.display='';
        
        if(isUpdate){
            note.firstChild.textContent = title.value;
            note.lastChild.textContent = description.value;

            isUpdate = false;
            notecount--;
        }
        else{
            items.appendChild(newnote);
        }

    }
    else{
        tablediv.style.display = 'none';
        addrecords.style.margin= '0 auto';

    }
}


// Add new notes
function addNote(e){
    e.preventDefault();
    //new table row
    var tr= document.createElement('tr');
    // add a class name for use for searchings
    tr.className = 'item';

    // table data rows
    var td1 = document.createElement('td');
    td1.appendChild(document.createTextNode(notecount+1));

    var td2 = document.createElement('td');
    td2.className='item-section';
    td2.appendChild(document.createTextNode(title.value));
    var span = document.createElement('span');
    span.className='note-body';
    span.appendChild(document.createTextNode(description.value));
    td2.appendChild(span);


    var td3 = document.createElement('td');
    td3.className= 'btn-view';
    var btn1 = document.createElement('button');
    btn1.appendChild(document.createTextNode('View'));
    btn1.setAttribute('id','viewbtn');
    td3.appendChild(btn1);

    var td4 = document.createElement('td');
    td4.className= 'btn-delete';
    var btn2 = document.createElement('button');
    btn2.appendChild(document.createTextNode('Delete'));
    btn2.setAttribute('id','deletebtn');
    td4.appendChild(btn2);

    // append all data rows to table row
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    notecount++;
    newnote =tr;

    // append new notes to newnote variable
    updateTable();

    //reset all fields after update or add note
    resetAll();

}

//search note option
function searchNote(e){
    // convert to lowercase
    var searchText = e.target.value.toLowerCase();
    //get the all table items
    var list = items.getElementsByClassName('item');
    // convert table items into a array
    var listArray = Array.from(list);
    
    // check each array item
    listArray.forEach(function (itm){
        // get the title text from the above array
        var titletext = itm.children[1].textContent;
        // matching the title text vs searching text
        if(titletext.toLowerCase().indexOf(searchText) != -1){
            
            itm.style.display ='';
        }
        else{
            itm.style.display = 'none';
        }
    });

}

// Remove notes from table
function removeNotes(e){
    var removeitem = e.target.id;
    if(removeitem === 'deletebtn'){
        if(confirm('Are you sure?')){
            //select the whole row to delete
            var row = e.target.parentElement.parentElement;
            // delete the row
            items.removeChild(row);

            notecount--;
            if(notecount < 1){
                updateTable();
            }
        }
    }
}

// view and update notes
function viewNotes(e){
    var viewitem = e.target.id;
    if(viewitem === 'viewbtn'){

        record = e.target.parentElement.parentElement;
        note = record.children[1];
        title.value=note.firstChild.textContent;
        description.value = note.lastChild.textContent;

        isUpdate = true;
    }
}

// reset all text fields
function resetAll(){

    title.value = '';
    description.value = '';
    isUpdate = false;
    newnote = '';
}