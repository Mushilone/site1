async function getId(id){
    if(!id){
        alert("null");
        return;
    }
    if(isNaN(id)){
        alert("nan value");
        return;
    }
    alert(id);
}