document.addEventListener('DOMContentLoaded', function () {
    const rekapList = document.getElementById('rekapList');

    function loadItems() {
        fetch('crud.php')
        .then(response => response.json())
        .then(items => {
            rekapList.innerHTML = '';
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
                rekapList.appendChild(row);
            });
        });
    }

    window.editItem = function (id, name, quantity, description) {
        document.location.href = `index.html?id=${id}&name=${name}&quantity=${quantity}&description=${description}`;
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
});

document.addEventListener("DOMContentLoaded", function () {
    loadRekapItems();

    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('keyup', function () {
        const searchText = searchBar.value.toLowerCase();
        const rekapItems = document.querySelectorAll('#rekapList tr');

        rekapItems.forEach(function (item) {
            const itemName = item.querySelector('td:nth-child(1)').textContent.toLowerCase();
            if (itemName.includes(searchText)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

function loadRekapItems() {
    // Load items dynamically (this is just a placeholder)
    const rekapList = document.getElementById('rekapList');

    // Example items
    const items = [
        { name: "Item 1", quantity: 10, description: "Description 1" },
        { name: "Item 2", quantity: 5, description: "Description 2" },
        { name: "Item 3", quantity: 15, description: "Description 3" },
    ];

    items.forEach(function (item) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.description}</td>
            <td>
                <button onclick="editItem('${item.name}')">Edit</button>
                <button onclick="deleteItem('${item.name}')">Delete</button>
            </td>
        `;
        rekapList.appendChild(tr);
    });
}

function editItem(name) {
    // Add edit functionality
    alert(`Edit ${name}`);
}

function deleteItem(name) {
    // Add delete functionality
    alert(`Delete ${name}`);
}
