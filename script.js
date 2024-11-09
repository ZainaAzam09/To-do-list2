window.onload=()=>{
    loadToDoList();
}
let inputText = document.querySelector(".input-text");
let addBtn = document.querySelector(".add-button");
addBtn.addEventListener("click",()=>{
    addToDoItem(inputText.value);
})
function addToDoItem(text="",done=false){
    console.log("entered addlist");
        //creating new elements
        const newItem = document.createElement("div");
        newItem.className = "new-item";
        const checkBtn = document.createElement("button");
        checkBtn.className = "check-btn";
        const checkIcon = document.createElement("i");
        checkIcon.className = "fa-regular fa-circle-check check-icon";
        const paragraph = document.createElement("p");
        paragraph.className = "text";
        const delBtn = document.createElement("button");
        delBtn.className = "del-btn";
        const delIcon = document.createElement("i");
        delIcon.className = "fa-solid fa-trash del-icon";
        paragraph.innerText = text;
        //apending child elements
        checkBtn.appendChild(checkIcon);
        delBtn.appendChild(delIcon);
        newItem.appendChild(checkBtn);
        newItem.appendChild(paragraph);
        newItem.appendChild(delBtn);
        document.querySelector(".to-do-items").appendChild(newItem);
        //Apply initial state
        if(done){
            newItem.classList.add("after-check");
            checkIcon.classList.add("check-clr-chng");
            paragraph.classList.add("text-strike-through");
        }
        //check button event
        checkBtn.addEventListener("click", () => {
            newItem.classList.toggle("after-check");
            checkIcon.classList.toggle("check-clr-chng");
            paragraph.classList.toggle("text-strike-through");
            saveToDoList();
        });
        //delete button event
        delBtn.addEventListener("click",()=>{
            console.log(newItem.remove());
            saveToDoList();
        });
        inputText.value="";
        saveToDoList();
}
function saveToDoList(){
    console.log("entered savelist");
    const currentItemsState=[];
    const htmlItems=document.querySelectorAll(".new-item");
    console.log(htmlItems);
    htmlItems.forEach(item =>{
        const text=item.querySelector(".text").innerText;
        const done=item.querySelector(".text").classList.contains("text-strike-through");
        console.log(done);
        currentItemsState.push({text,done});
    })
    console.log(currentItemsState);
    localStorage.setItem("toDoList",JSON.stringify(currentItemsState));
}
function loadToDoList(){
    console.log("entered load list");
    const listSaved=JSON.parse(localStorage.getItem("toDoList"));
    if(listSaved){
        listSaved.forEach(item =>{
            addToDoItem(item.text,item.done);
        })
    }
}

