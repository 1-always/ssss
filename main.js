let listview = JSON.parse(localStorage.getItem('listview')) || [];
var f=document.getElementById('addForm');
var it=document.getElementById('items');
var fill=document.getElementById('filter');
//let button=document.getElementById('')
//f.addEventListener('submit',additem);
//add event listener to delete item 
//it.addEventListener('click',removeitem);
fill.addEventListener('keyup',filteritem);
//add item

function additem(){
   // e.preventDefault();
    //console.log("11233");
    //get input value 
    var newitem1 =document.getElementById('item').value;

    //create new element
    //var list1=document.createElement('li');
    //list1.className='list-group-item';
    //list1.appendChild(document.createTextNode(newitem1));
    var newitem2 =document.getElementById('item2').value;

    //create new element
    //var list2=document.createElement('li');
    //var list3=document.createElement('li');

    //list2.className='list-group-item';
    //list2.appendChild(document.createTextNode(newitem2));
    const newobj = {
        id: Date.now(), // Generate a unique ID for the expense
        st1:newitem1 ,
        nd2: newitem2};
    listview.push(newobj);
    localStorage.setItem('listview', JSON.stringify(listview));
    //var del=document.createElement('button');
    //add calsses
    
    //del.className="btn btn-danger btn-sm float-right delete";
   // del.onclick="delitem()";
    //append
    //del.appendChild(document.createTextNode('X'));
    //del.addEventListener('click', function delitem(event) {
        
     // });
    //var edit=document.createElement('button');
    
   // edit.className="btn  btn-sm float-right";
    //edit.appendChild(document.createTextNode('Edit'));
    //edit.addEventListener('click', function edititem(event) {
        
    //  });
   /* let c=newitem1+newitem2
    list2.textContent=c;
    //it.appendChild(c);
    it.appendChild(list2);
    list2.appendChild(del);
    list2.appendChild(edit);*/
    document.getElementById('item').value = '';
   document.getElementById('item2').value = '';

updatelistview();

}
function updatelistview(){
    const itemslist = document.getElementById('items');
    itemslist.innerHTML='';
    listview.forEach(i => {
        var list1=document.createElement('ul');
        list1.innerHTML=`<li class="list-group-item">${i.st1}${i.nd2}<button class="btn btn-danger btn-sm float-right delete" onclick="delitem(${i.id})" id="del btn">X</button><button  class="btn  btn-sm float-right " onclick="edititem(${i.id})" id="edit btn">Edit</button></li>`;
        itemslist.appendChild(list1);
     });
    


}
function edititem(itemid)
{
const itemindx=listview.findIndex(i=>i.id ===itemid)
if(itemindx!=-1)
{
    const i=listview[itemindx]
    document.getElementById('item').value=i.st1;
    document.getElementById('item2').value=i.nd2;
    const addButton = document.getElementById('addbtn');
    addButton.innerText = 'Update';
    addButton.onclick = function () {
      updateitem(itemid);
    };
}
}
function updateitem(itemid)
{
    const itemindx=listview.findIndex(i=>i.id ===itemid)
    if(itemindx!=1)
    {
        const updateditem={
            id:itemid,
            st1:document.getElementById('item').value,
            nd2:document.getElementById('item2').value
        };
        listview[itemindx]=updateditem;
        localStorage.setItem('listview', JSON.stringify(listview));
        document.getElementById('item').value='';
        document.getElementById('item2').value='';
        const addButton = document.getElementById('addbtn');
        addButton.innerText = 'Add';
        addButton.onclick = additem;

    // Update the expense list display
    updatelistview();
    }
}
function delitem(itemid)
{
    listview = listview.filter(i => i.id !== itemid);
    localStorage.setItem('listview', JSON.stringify(listview));
    updatelistview();
}
updatelistview();
/*function removeitem(e)
{
    if(e.target.classList.contains('delete'))
    {
        if(confirm('are u sure ?'))
        {
            let list1=e.target.parentElement;
            it.removeChild(list1);
        }
    }
    
}*/
function filteritem(e)
{
    //convert text to lower case
    var text = e.target.value.toLowerCase();
    var items=it.getElementsByTagName('li');
    Array.from(items).forEach(function(item){
        var name=item.firstChild.textContent;
        if(name.toLowerCase().indexOf(text)!=-1)
        {
            item.style.backgroundColor="grey";
            item.style.display='block';

        }
        else{
            item.style.display="none";
        }
    })

}
