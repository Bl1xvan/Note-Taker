/*Character Counter Function*/
document.addEventListener("keyup", wordCount);

function wordCount(event){
    if (event.target.matches(".inputControls")) {
        const inputValue = event.target.value;
        let inputValueLength = inputValue.length;
        const maxInputLength = event.target.getAttribute("maxLength");
        const charLimit = event.target.nextElementSibling;
        const errorMessage = event.target.parentNode.nextElementSibling;
        console.log(errorMessage);
        charLimit.innerText = inputValueLength + "/" + maxInputLength + " characters";

        if(!inputValue){
          return[];
        }
        if(inputValueLength == maxInputLength){
            errorMessage.style.visibility = "visible";
        }else{
           errorMessage.style.visibility = "hidden";
        }
    }}


var dummyNotes = [];
let dateNote = new Date();

let newNoteTitle = document.getElementById("newNoteTitle");
let newNoteDetails = document.getElementById("newNoteDetails");
let labelTitle = document.getElementById("labelTitle");
let labelDetails = document.getElementById("labelDetails");

class NewNote {
    constructor(id, title, details, date) {
        this.id = id;
        this.title = title;
        this.details = details;
        this.date = date;
        this.titleFormat = function() {
            return `<span class="titleSpan">
                      <span class="title">
                        <span class="noteInfo">
                            <label class="theID">${this.id}</label>
                            <label class="theDate">${this.date}</label>
                        </span>
                        <span class="noteButtons"> 
    <button class="deleteNote" onclick="removeNote(${this.id})">X</button>
                        </span>
                       </span>
    <span class="whiteinput">
        <input type="text" class="noteTitle inputControls" value="${this.title}" maxlength="50">
        <label class="editLabel detailScript">0/50 characters</label>
    </span>
    <label class="editLabel errorMessage">Character limit reached!</label>
   </span>`;
        }
        this.detailsFormat = function() {
            return `<span class="detailsSpan">
                        <details><summary>Click for Details</summary>
                        <span class="whiteinput">
                            <textarea class="noteDetails inputControls" maxlength="100">${this.details}</textarea>
                            <label class="editLabel detailScript">0/100 characters</label>
                            </span>
                            <label class="editLabel errorMessage">Character limit reached!</label>
                        </details>  
                    </span>`;
                    }
                 }
                }

let newNoteInput = document.getElementById("newNoteInput");

/*submit the FORMS not the buttons!!*/
newNoteInput.addEventListener('submit', function(e) {
    e.preventDefault();
    addANote();
    searchTitles();
  });



function addANote(){
    if(newNoteTitle.value.trim() === "" && newNoteDetails.value.trim() === "")
    {       newNoteTitle.style.backgroundColor="red";
            newNoteDetails.style.backgroundColor="red";
            document.getElementById("fillMessage").style.display = "block";}
    else if(newNoteTitle.value.trim() === ""){
        newNoteTitle.style.backgroundColor="red";
        document.getElementById("fillMessage").style.display = "block";
    }else if(newNoteDetails.value.trim() === ""){
        newNoteDetails.style.backgroundColor="red";
        document.getElementById("fillMessage").style.display = "block";}

    else{
    /*If this fails, just copy paste what's under, insert values */
    const pushNote = new NewNote(generateID(), newNoteTitle.value, newNoteDetails.value, dateNote.toLocaleDateString());
    dummyNotes.push(pushNote);
    addNewNote(pushNote);
    newNoteTitle.value = "";
    newNoteDetails.value = ""; 
    labelTitle.innerText = "0/50 characters";
    labelDetails.innerText = "0/100 characters";
    newNoteTitle.style.backgroundColor="white";
    newNoteDetails.style.backgroundColor="white";
    document.getElementById("fillMessage").style.display = "none";


    }   
}

/*formats the note*/
function addNewNote(pushNote) {
    const theNewNote = document.createElement("div");
    theNewNote.classList.add("newNote");
    theNewNote.innerHTML = `<div class="noteForm">${pushNote.titleFormat()} ${pushNote.detailsFormat()}</div>`;
    noteList.appendChild(theNewNote); /*APPEND CHILD to get every item on the list*/
}

function removeNote(id){
    dummyNotes = dummyNotes.filter(pushNote => pushNote.id !== id);
    init();
    console.log(dummyNotes);
}

/*Gets note on the page*/
function init() {
    noteList.innerHTML = "";
    dummyNotes.forEach(addNewNote);
}

function generateID() {
    return parseInt(Math.random() * 10000);
}

init();