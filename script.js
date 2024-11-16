document.getElementById('grocery-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const item = document.getElementById('item').value;

  const response = await fetch('/add-item', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ item }),
  });

  if (response.ok) {
    loadItems();
    document.getElementById('item').value = '';
  }
});

async function loadItems() {
  const response = await fetch('/get-items');
  const items = await response.json();

  const list = document.getElementById('grocery-list');
  list.innerHTML = '';

  items.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${item.name}</span><button onclick="deleteItem('${item._id}')">Delete</button>`;
    list.appendChild(li);
  });
}

async function deleteItem(id) {
  const response = await fetch(`/delete-item/${id}`, { method: 'DELETE' });

  if (response.ok) {
    loadItems();
  }
}

loadItems();
