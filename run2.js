let listview =  [];
let f = document.getElementById('addForm');
let it = document.getElementById('items');
let fill = document.getElementById('filter');
let c = 0;

f.addEventListener('submit', addItem);
it.addEventListener('click', removeItem);
fill.addEventListener('keyup', filterItem);
function getlistview(){
  axios.get("https://crudcrud.com/api/0b6639fb940b4fe78193d650257981f9/store2")
  .then((res)=>{
  listview=res.data
  updateListView();
  })
  .catch((error) => {
    console.log("Error fetching expenses:", error);
  });
  }
function addItem(e) {
  e.preventDefault();
  let newitem1 = document.getElementById('item').value;
  let newitem2 = document.getElementById('item2').value;
  let newitem3 = document.getElementById('item3').value;
  let newitem4 = document.getElementById('item4').value;

  const newobj = {
    st1: newitem1,
    nd2: newitem2,
    rd3: newitem3,
    th4: newitem4
  };

  //listview.push(newobj);
  //localStorage.setItem('listview', JSON.stringify(listview));
  axios.post("https://crudcrud.com/api/0b6639fb940b4fe78193d650257981f9/store2",newobj)
  .then((res)=>{
    listview.push(res.data);
    document.getElementById('item').value = '';
  document.getElementById('item2').value = '';
  document.getElementById('item3').value = '';
  document.getElementById('item4').value = '';

  updateListView();

  })
  .catch((err)=> {console.log(err)})

 
}

function updateListView() {
  it.innerHTML = '';

  listview.forEach(i => {
    let listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    listItem.innerHTML = `${i.st1} <span>   </span><div id="3rd${c}"> ${i.nd2}</div> <span>   </span> <div id="2nd${c}">${i.rd3}</div> <span>   </span> <div id="4th${c}">${i.th4}</div>
      <button class="btn btn-danger btn-sm float-right delete" onclick="delItem(${i._id})" id="del btn">X</button>
      <button class="btn  btn-sm float-right " onclick="changeQuantity1('4th${c}')">Buy1</button>
      <button class="btn  btn-sm float-right " onclick="changeQuantity2('4th${c}')">Buy2</button>
      <button class="btn  btn-sm float-right " onclick="changeQuantity3('4th${c}')">Buy3</button>`;

    it.appendChild(listItem);
    c++;
  });
}
function changeQuantity1(itemId) {
  let quantityElement = document.getElementById(itemId);
  let quantity = parseInt(quantityElement.textContent);
  const itemIndex = listview.findIndex(item => item._id === itemId);
  quantity--;
  
  if (quantity < 0) {
    quantityElement.textContent = 0;
  } else {
    quantityElement.textContent = quantity;
  }
  
  let obj1 = {
    th4: quantity
  };

  axios.put(`https://crudcrud.com/api/0b6639fb940b4fe78193d650257981f9/store2/${itemId}`, obj1)
    .then((res) => {
      listview[itemIndex] = res.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

function changeQuantity2(quantityId) {
  let quantityElement = document.getElementById(quantityId);
  let quantity = parseInt(quantityElement.textContent);
  quantity=quantity-2;
  if(quantity<0)
  {
    quantityElement.textContent=0;
  }
  else{
  quantityElement.textContent = quantity;
  }
}

function changeQuantity3(quantityId) {
  let quantityElement = document.getElementById(quantityId);
  let quantity = parseInt(quantityElement.textContent);
  quantity=quantity-3;
  if(quantity<0)
  {
    quantityElement.textContent=0;
  }
  else{
  quantityElement.textContent = quantity;
  }
}

function delItem(itemId) {
  listview = listview.filter(i => i._id !== itemId);
  localStorage.setItem('listview', JSON.stringify(listview));
  updateListView();
}

function removeItem(e) {
  if (e.target.classList.contains('delete')) {
    if (confirm('Are you sure?')) {
      let listItem = e.target.parentElement;
      it.removeChild(listItem);
    }
  }
}

function filterItem(e) {
  let text = e.target.value.toLowerCase();
  let items = it.getElementsByTagName('li');

  Array.from(items).forEach(function (item) {
    let name = item.firstChild.textContent.toLowerCase();

    if (name.indexOf(text) !== -1) {
      item.style.backgroundColor = 'grey';
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

updateListView();
getlistview();

