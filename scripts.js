document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('itemForm');
    const itemList = document.getElementById('itemList');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const id = document.getElementById('itemId').value;
        const name = document.getElementById('name').value;
        const quantity = document.getElementById('quantity').value;
        const description = document.getElementById('description').value;

        const data = new URLSearchParams();
        data.append('id', id);
        data.append('name', name);
        data.append('quantity', quantity);
        data.append('description', description);

        fetch('crud.php', {
            method: 'POST',
            body: data
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                loadItems();
                form.reset();
                document.getElementById('itemId').value = '';
            } else {
                alert('Error: ' + result.error);
            }
        });
    });

    function loadItems() {
        fetch('crud.php')
        .then(response => response.json())
        .then(items => {
            itemList.innerHTML = '';
            items.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>${item.description}</td>
                    <td>
                        <button class="edit" onclick="editItem(${item.id}, '${item.name}', ${item.quantity}, '${item.description}')">Edit</button>
                        <button class="delete" onclick="deleteItem(${item.id})">Delete</button>
                    </td>
                `;
                itemList.appendChild(row);
            });
        });
    }

    window.editItem = function (id, name, quantity, description) {
        document.getElementById('itemId').value = id;
        document.getElementById('name').value = name;
        document.getElementById('quantity').value = quantity;
        document.getElementById('description').value = description;
    }

    window.deleteItem = function (id) {
        fetch('crud.php', {
            method: 'DELETE',
            body: new URLSearchParams('id=' + id)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                loadItems();
            } else {
                alert('Error: ' + result.error);
            }
        });
    }

    loadItems();

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('id')) {
        const id = urlParams.get('id');
        const name = urlParams.get('name');
        const quantity = urlParams.get('quantity');
        const description = urlParams.get('description');
        editItem(id, name, quantity, description);
    }
});
