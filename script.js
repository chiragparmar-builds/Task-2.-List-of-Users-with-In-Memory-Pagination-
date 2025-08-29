const API_URL = "https://6874ce63dd06792b9c954fc7.mockapi.io/api/v1/users";
const USERS_PER_PAGE = 10;

let users = [];
let currentPage = 1;
let sortKey = "name";
let searchTerm = "";

const tableBody = document.querySelector("#userTable tbody");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

const modal = document.getElementById("userModal");
const closeModal = document.getElementById("closeModal");
const modalAvatar = document.getElementById("modalAvatar");
const modalName = document.getElementById("modalName");
const modalEmail = document.getElementById("modalEmail");
const modalGender = document.getElementById("modalGender");
const modalLocation = document.getElementById("modalLocation");
const modalAge = document.getElementById("modalAge");
const modalDate = document.getElementById("modalDate");

async function fetchUsers() {
  const res = await fetch(API_URL);
  users = await res.json();
  render();
}

function render() {
  const filtered = users
    .filter(
      (u) =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortKey === "name") return a.name.localeCompare(b.name);
      if (sortKey === "date")
        return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

  const totalPages = Math.ceil(filtered.length / USERS_PER_PAGE);
  if (currentPage > totalPages) currentPage = totalPages || 1;

  const paginated = filtered.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  tableBody.innerHTML = "";
  paginated.forEach((user) => {
    const row = document.createElement("tr");
    row.className = "border-b hover:bg-gray-50 cursor-pointer";
    row.innerHTML = `
      <td class="p-3">${user.id}</td>
      <td class="p-3"><img src="${
        user.avatar
      }" class="w-10 h-10 rounded-full"></td>
      <td class="p-3">${user.name}</td>
      <td class="p-3">${user.email}</td>
      <td class="p-3">${user.gender || "—"}</td>
      <td class="p-3">${user.location || "—"}</td>
      <td class="p-3">${user.age || "—"}</td>
      <td class="p-3">${new Date(user.createdAt).toLocaleDateString()}</td>
    `;
    row.addEventListener("click", () => openModal(user));
    tableBody.appendChild(row);
  });

  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

function openModal(user) {
  modalAvatar.src = user.avatar;
  modalName.textContent = user.name;
  modalEmail.textContent = "Email: " + user.email;
  modalGender.textContent = "Gender: " + (user.gender || "—");
  modalLocation.textContent = "Location: " + (user.location || "—");
  modalAge.textContent = "Age: " + (user.age || "—");
  modalDate.textContent =
    "Created: " + new Date(user.createdAt).toLocaleString();
  modal.classList.remove("hidden");
}

closeModal.addEventListener("click", () => modal.classList.add("hidden"));
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});

searchInput.addEventListener("input", (e) => {
  searchTerm = e.target.value;
  currentPage = 1;
  render();
});

sortSelect.addEventListener("change", (e) => {
  sortKey = e.target.value;
  render();
});

prevBtn.addEventListener("click", () => {
  currentPage--;
  render();
});

nextBtn.addEventListener("click", () => {
  currentPage++;
  render();
});

fetchUsers();
