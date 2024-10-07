const prop_head = document.querySelector('#prop_head');
const prop_list = document.querySelector('#prop_list');
const loadingIndicator = document.querySelector('#loading');
const pagination = document.querySelector('#list_pagination');

const itemsPerPage = 5;
let currentPage = 1;
const totalPages = Math.ceil(realEstateProperties.length / itemsPerPage);

// Create table header dynamically based on the keys of the first item
prop_head.innerHTML = Object.keys(realEstateProperties[0])
    .map(v => `<th scope="col">${v.toUpperCase()}</th>`)
    .join("");

// Function to render the current list based on the page
function renderList(page = 1) {
    setLoadingState(true);

    // Calculate start and end index based on current page and items per page
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;

    setTimeout(() => {
        // Display the slice of items for the current page
        prop_list.innerHTML = realEstateProperties.slice(start, end)
            .map(item => `
                <tr>
                   ${Object.keys(item).map(key => `<td class="${key === 'price' ? 'text-success' : ''}">${key === 'price' ? "$" : ''}${item[key]}</td>`).join("")}
                </tr>
            `).join("");

        // Hide the loading indicator after rendering
        setLoadingState(false);
    }, 500);
}

// Function to update pagination controls
function updatePagination() {
    pagination.innerHTML = '';

    // Previous Button
    pagination.innerHTML += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" aria-label="Previous" onclick="changePage(${currentPage - 1})">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
    `;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
            </li>
        `;
    }

    // Next Button
    pagination.innerHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" aria-label="Next" onclick="changePage(${currentPage + 1})">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    `;
}

// Function to change the page
function changePage(page) {
    if (page < 1 || page > totalPages) return;

    currentPage = page;
    renderList(currentPage);
    updatePagination();
}

// Function to toggle loading state
function setLoadingState(isLoading) {
    loadingIndicator.style.display = isLoading ? 'flex' : 'none';
    prop_list.style.display = isLoading ? 'none' : 'table-row-group';
}

// Initial render of the list and pagination
renderList(currentPage);
updatePagination();
