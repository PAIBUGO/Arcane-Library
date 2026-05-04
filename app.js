// ===== SIMULAÇÃO DE DADOS =====
let currentUser = null;
let users = [
    { id: 1, name: 'Admin', email: 'admin@arcane.com', password: 'admin123', role: 'admin', joinDate: '2026-01-01' },
    { id: 2, name: 'João Silva', email: 'joao@email.com', password: 'senha123', role: 'user', joinDate: '2026-02-15' }
];

let books = [
    { id: 1, title: 'O Senhor dos Anéis', author: 'J.R.R. Tolkien', genre: 'fantasia', status: 'disponível', code: 'LIV001' },
    { id: 2, title: '1984', author: 'George Orwell', genre: 'ficção', status: 'disponível', code: 'LIV002' },
    { id: 3, title: 'O Código da Vinci', author: 'Dan Brown', genre: 'mistério', status: 'alugado', code: 'LIV003' },
    { id: 4, title: 'Sapiens', author: 'Yuval Noah Harari', genre: 'não-ficção', status: 'disponível', code: 'LIV004' },
    { id: 5, title: 'Orgulho e Preconceito', author: 'Jane Austen', genre: 'romance', status: 'disponível', code: 'LIV005' }
];

let rentals = [
    { id: 1, userId: 1, bookId: 3, rentalDate: '2026-04-20', dueDate: '2026-05-04', status: 'active' }
];

let fines = [
    { id: 1, userId: 1, amount: 25.00, reason: 'Atraso na devolução', paid: false }
];

// ===== FUNÇÕES DE NAVEGAÇÃO =====
function showSection(sectionId) {
    // Esconder todos os sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Mostrar o section selecionado
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');

        // Carregar dados quando necessário
        if (sectionId === 'profile' && currentUser) {
            loadProfileData();
        } else if (sectionId === 'admin' && currentUser?.role === 'admin') {
            loadAdminData();
        } else if (sectionId === 'books') {
            searchBooks();
        }
    }
}

function showTab(tabId) {
    // Esconder todos os tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remover classe active de todos os botões
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Mostrar o tab selecionado
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.add('active');
        event.target.classList.add('active');
    }
}

function showAdminTab(tabId) {
    // Esconder todos os tabs
    document.querySelectorAll('.admin-tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remover classe active de todos os botões
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Mostrar o tab selecionado
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.add('active');
        event.target.classList.add('active');
    }
}

// ===== AUTENTICAÇÃO =====
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = user;
        updateNavigation();
        alert(`Bem-vindo, ${user.name}!`);
        showSection('home');
        document.getElementById('login-email').value = '';
        document.getElementById('login-password').value = '';
    } else {
        alert('E-mail ou senha incorretos!');
    }
}

function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-password-confirm').value;

    if (password !== confirmPassword) {
        alert('As senhas não correspondem!');
        return;
    }

    if (users.some(u => u.email === email)) {
        alert('Este e-mail já está cadastrado!');
        return;
    }

    const newUser = {
        id: users.length + 1,
        name: name,
        email: email,
        password: password,
        role: 'user',
        joinDate: new Date().toISOString().split('T')[0]
    };

    users.push(newUser);
    currentUser = newUser;
    updateNavigation();
    alert('Conta criada com sucesso!');
    showSection('home');
    
    // Limpar formulário
    document.getElementById('register-name').value = '';
    document.getElementById('register-email').value = '';
    document.getElementById('register-password').value = '';
    document.getElementById('register-password-confirm').value = '';
}

function logout() {
    if (confirm('Deseja sair da sua conta?')) {
        currentUser = null;
        updateNavigation();
        showSection('home');
    }
}

function updateNavigation() {
    const navLogin = document.getElementById('nav-login');
    const navLogout = document.getElementById('nav-logout');
    const navPerfil = document.getElementById('nav-perfil');
    const navAdmin = document.getElementById('nav-admin');

    if (currentUser) {
        navLogin.style.display = 'none';
        navLogout.style.display = 'block';
        navPerfil.style.display = 'block';

        if (currentUser.role === 'admin') {
            navAdmin.style.display = 'block';
        } else {
            navAdmin.style.display = 'none';
        }
    } else {
        navLogin.style.display = 'block';
        navLogout.style.display = 'none';
        navPerfil.style.display = 'none';
        navAdmin.style.display = 'none';
    }
}

// ===== BUSCA DE LIVROS =====
function searchBooks() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const genreFilter = document.getElementById('genre-filter').value;
    const availabilityFilter = document.getElementById('availability-filter').value;

    let filtered = books.filter(book => {
        const matchesSearch = !searchTerm || 
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm) ||
            book.genre.toLowerCase().includes(searchTerm);

        const matchesGenre = !genreFilter || book.genre === genreFilter;
        const matchesAvailability = !availabilityFilter || book.status === availabilityFilter;

        return matchesSearch && matchesGenre && matchesAvailability;
    });

    displayBooks(filtered);
}

function displayBooks(booksToDisplay) {
    const resultsContainer = document.getElementById('books-results');
    resultsContainer.innerHTML = '';

    if (booksToDisplay.length === 0) {
        resultsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">Nenhum livro encontrado.</p>';
        return;
    }

    booksToDisplay.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <div class="book-cover">📖</div>
            <div class="book-info">
                <h4>${book.title}</h4>
                <p class="book-author">por ${book.author}</p>
                <span class="book-status ${book.status === 'disponível' ? 'available' : 'rented'}">
                    ${book.status.charAt(0).toUpperCase() + book.status.slice(1)}
                </span>
                <div class="book-actions">
                    <button class="btn-primary" onclick="viewBookDetails(${book.id})">Ver Detalhes</button>
                    ${book.status === 'disponível' && currentUser ? 
                        `<button class="btn-secondary" onclick="rentBook(${book.id})">Alugar</button>` : ''}
                </div>
            </div>
        `;
        resultsContainer.appendChild(bookCard);
    });
}

function viewBookDetails(bookId) {
    const book = books.find(b => b.id === bookId);
    if (book) {
        alert(`Título: ${book.title}\nAutor: ${book.author}\nGênero: ${book.genre}\nCódigo: ${book.code}\nStatus: ${book.status}`);
    }
}

function rentBook(bookId) {
    if (!currentUser) {
        alert('Você precisa fazer login para alugar um livro!');
        return;
    }

    const book = books.find(b => b.id === bookId);
    if (book && book.status === 'disponível') {
        const rentalDate = new Date();
        const dueDate = new Date(rentalDate.getTime() + 14 * 24 * 60 * 60 * 1000); // 14 dias

        const newRental = {
            id: rentals.length + 1,
            userId: currentUser.id,
            bookId: bookId,
            rentalDate: rentalDate.toISOString().split('T')[0],
            dueDate: dueDate.toISOString().split('T')[0],
            status: 'active'
        };

        rentals.push(newRental);
        book.status = 'alugado';
        alert(`Livro "${book.title}" alugado com sucesso!\nData de devolução: ${dueDate.toLocaleDateString('pt-BR')}`);
        searchBooks();
    }
}

// ===== PERFIL DO USUÁRIO =====
function loadProfileData() {
    if (!currentUser) return;

    document.getElementById('profile-name').textContent = currentUser.name;
    document.getElementById('profile-email').textContent = currentUser.email;
    document.getElementById('profile-join-date').textContent = new Date(currentUser.joinDate).toLocaleDateString('pt-BR');

    loadUserRentals();
}

function loadUserRentals() {
    const rentalsList = document.getElementById('user-rentals');
    rentalsList.innerHTML = '';

    const userRentals = rentals.filter(r => r.userId === currentUser.id);

    if (userRentals.length === 0) {
        rentalsList.innerHTML = '<p style="text-align: center; color: #666;">Você não possui aluguéis no momento.</p>';
        return;
    }

    userRentals.forEach(rental => {
        const book = books.find(b => b.id === rental.bookId);
        const rentalItem = document.createElement('div');
        rentalItem.className = 'rental-item';
        rentalItem.innerHTML = `
            <h4>${book.title}</h4>
            <p><strong>Autor:</strong> ${book.author}</p>
            <p><strong>Data de Aluguel:</strong> ${new Date(rental.rentalDate).toLocaleDateString('pt-BR')}</p>
            <p><strong>Data de Devolução:</strong> ${new Date(rental.dueDate).toLocaleDateString('pt-BR')}</p>
            <p><strong>Status:</strong> ${rental.status}</p>
        `;
        rentalsList.appendChild(rentalItem);
    });
}

function editProfile() {
    document.getElementById('profile-display').style.display = 'none';
    document.getElementById('profile-edit').style.display = 'block';

    document.getElementById('edit-name').value = currentUser.name;
    document.getElementById('edit-email').value = currentUser.email;
}

function saveProfile(event) {
    event.preventDefault();

    const newName = document.getElementById('edit-name').value;
    const newEmail = document.getElementById('edit-email').value;

    if (newEmail !== currentUser.email && users.some(u => u.email === newEmail)) {
        alert('Este e-mail já está cadastrado!');
        return;
    }

    currentUser.name = newName;
    currentUser.email = newEmail;

    // Atualizar no array de usuários
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
    }

    alert('Perfil atualizado com sucesso!');
    cancelEdit();
    loadProfileData();
}

function cancelEdit() {
    document.getElementById('profile-display').style.display = 'block';
    document.getElementById('profile-edit').style.display = 'none';
}

function deleteAccount() {
    if (confirm('Tem certeza que deseja deletar sua conta? Esta ação é irreversível!')) {
        users = users.filter(u => u.id !== currentUser.id);
        currentUser = null;
        updateNavigation();
        alert('Conta deletada com sucesso!');
        showSection('home');
    }
}

// ===== FUNÇÕES ADMINISTRATIVAS =====
function loadAdminData() {
    if (!currentUser || currentUser.role !== 'admin') return;

    loadActiveRentals();
    loadBooksList();
    loadUsersList();
    loadPendingFines();
}

function loadActiveRentals() {
    const activeRentalsList = document.getElementById('active-rentals');
    activeRentalsList.innerHTML = '';

    const activeRentals = rentals.filter(r => r.status === 'active');

    if (activeRentals.length === 0) {
        activeRentalsList.innerHTML = '<p style="text-align: center; color: #666;">Nenhum aluguel ativo.</p>';
        return;
    }

    activeRentals.forEach(rental => {
        const user = users.find(u => u.id === rental.userId);
        const book = books.find(b => b.id === rental.bookId);
        const item = document.createElement('div');
        item.className = 'admin-item';
        item.innerHTML = `
            <div class="admin-item-info">
                <p><strong>Livro:</strong> ${book.title}</p>
                <p><strong>Cliente:</strong> ${user.name}</p>
                <p><strong>Data de Aluguel:</strong> ${new Date(rental.rentalDate).toLocaleDateString('pt-BR')}</p>
                <p><strong>Vencimento:</strong> ${new Date(rental.dueDate).toLocaleDateString('pt-BR')}</p>
            </div>
        `;
        activeRentalsList.appendChild(item);
    });
}

function createRental(event) {
    event.preventDefault();

    const bookCode = document.getElementById('rental-book-code').value;
    const customerId = parseInt(document.getElementById('rental-customer-id').value);

    const book = books.find(b => b.code === bookCode);
    const customer = users.find(u => u.id === customerId && u.role === 'user');

    if (!book) {
        alert('Livro não encontrado!');
        return;
    }

    if (!customer) {
        alert('Cliente não encontrado!');
        return;
    }

    if (book.status !== 'disponível') {
        alert('Este livro não está disponível para aluguel!');
        return;
    }

    const rentalDate = new Date();
    const dueDate = new Date(rentalDate.getTime() + 14 * 24 * 60 * 60 * 1000);

    const newRental = {
        id: rentals.length + 1,
        userId: customer.id,
        bookId: book.id,
        rentalDate: rentalDate.toISOString().split('T')[0],
        dueDate: dueDate.toISOString().split('T')[0],
        status: 'active'
    };

    rentals.push(newRental);
    book.status = 'alugado';

    alert(`Aluguel criado com sucesso!\nLivro: ${book.title}\nCliente: ${customer.name}\nDevolução: ${dueDate.toLocaleDateString('pt-BR')}`);
    document.getElementById('rental-book-code').value = '';
    document.getElementById('rental-customer-id').value = '';
    loadActiveRentals();
}

function finishRental(event) {
    event.preventDefault();

    const rentalId = parseInt(document.getElementById('finish-rental-id').value);
    const rental = rentals.find(r => r.id === rentalId);

    if (!rental) {
        alert('Aluguel não encontrado!');
        return;
    }

    const book = books.find(b => b.id === rental.bookId);
    rental.status = 'completed';
    book.status = 'disponível';

    alert(`Aluguel finalizado com sucesso!\nLivro "${book.title}" devolvido.`);
    document.getElementById('finish-rental-id').value = '';
    loadActiveRentals();
}

function loadBooksList() {
    const booksList = document.getElementById('books-list');
    booksList.innerHTML = '';

    books.forEach(book => {
        const item = document.createElement('div');
        item.className = 'admin-item';
        item.innerHTML = `
            <div class="admin-item-info">
                <p><strong>${book.title}</strong> por ${book.author}</p>
                <p>Código: ${book.code} | Gênero: ${book.genre} | Status: ${book.status}</p>
            </div>
            <div class="admin-item-actions">
                <button class="btn-secondary" onclick="selectBookToEdit(${book.id})">Editar</button>
            </div>
        `;
        booksList.appendChild(item);
    });
}

function selectBookToEdit(bookId) {
    const book = books.find(b => b.id === bookId);
    if (book) {
        document.getElementById('edit-book-id').value = book.id;
        document.getElementById('edit-book-title').value = book.title;
        document.getElementById('edit-book-author').value = book.author;
        document.getElementById('edit-book-genre').value = book.genre;
    }
}

function editBook(event) {
    event.preventDefault();

    const bookId = parseInt(document.getElementById('edit-book-id').value);
    const title = document.getElementById('edit-book-title').value;
    const author = document.getElementById('edit-book-author').value;
    const genre = document.getElementById('edit-book-genre').value;

    const book = books.find(b => b.id === bookId);

    if (!book) {
        alert('Livro não encontrado!');
        return;
    }

    if (title) book.title = title;
    if (author) book.author = author;
    if (genre) book.genre = genre;

    alert('Livro atualizado com sucesso!');
    document.getElementById('edit-book-id').value = '';
    document.getElementById('edit-book-title').value = '';
    document.getElementById('edit-book-author').value = '';
    document.getElementById('edit-book-genre').value = '';
    loadBooksList();
}

function loadUsersList() {
    const usersList = document.getElementById('users-list');
    usersList.innerHTML = '';

    users.filter(u => u.role === 'user').forEach(user => {
        const item = document.createElement('div');
        item.className = 'admin-item';
        item.innerHTML = `
            <div class="admin-item-info">
                <p><strong>${user.name}</strong> (ID: ${user.id})</p>
                <p>E-mail: ${user.email} | Membro desde: ${new Date(user.joinDate).toLocaleDateString('pt-BR')}</p>
            </div>
        `;
        usersList.appendChild(item);
    });
}

function deleteUser(event) {
    event.preventDefault();

    const userId = parseInt(document.getElementById('delete-user-id').value);
    const user = users.find(u => u.id === userId && u.role === 'user');

    if (!user) {
        alert('Usuário não encontrado!');
        return;
    }

    if (confirm(`Tem certeza que deseja deletar o usuário "${user.name}"?`)) {
        users = users.filter(u => u.id !== userId);
        rentals = rentals.filter(r => r.userId !== userId);
        fines = fines.filter(f => f.userId !== userId);

        alert('Usuário deletado com sucesso!');
        document.getElementById('delete-user-id').value = '';
        loadUsersList();
    }
}

function loadPendingFines() {
    const finesList = document.getElementById('pending-fines');
    finesList.innerHTML = '';

    const pendingFines = fines.filter(f => !f.paid);

    if (pendingFines.length === 0) {
        finesList.innerHTML = '<p style="text-align: center; color: #666;">Nenhuma multa pendente.</p>';
        return;
    }

    pendingFines.forEach(fine => {
        const user = users.find(u => u.id === fine.userId);
        const item = document.createElement('div');
        item.className = 'admin-item';
        item.innerHTML = `
            <div class="admin-item-info">
                <p><strong>${user.name}</strong></p>
                <p>Valor: R$ ${fine.amount.toFixed(2)} | Motivo: ${fine.reason}</p>
            </div>
            <div class="admin-item-actions">
                <button class="btn-success" onclick="markFinePaid(${fine.id})">Marcar Paga</button>
            </div>
        `;
        finesList.appendChild(item);
    });
}

function applyFine(event) {
    event.preventDefault();

    const userId = parseInt(document.getElementById('fine-user-id').value);
    const amount = parseFloat(document.getElementById('fine-amount').value);
    const reason = document.getElementById('fine-reason').value;

    const user = users.find(u => u.id === userId);

    if (!user) {
        alert('Usuário não encontrado!');
        return;
    }

    const newFine = {
        id: fines.length + 1,
        userId: userId,
        amount: amount,
        reason: reason,
        paid: false
    };

    fines.push(newFine);

    alert(`Multa de R$ ${amount.toFixed(2)} aplicada ao usuário "${user.name}"!`);
    document.getElementById('fine-user-id').value = '';
    document.getElementById('fine-amount').value = '';
    document.getElementById('fine-reason').value = '';
    loadPendingFines();
}

function markFinePaid(fineId) {
    const fine = fines.find(f => f.id === fineId);
    if (fine) {
        fine.paid = true;
        alert('Multa marcada como paga!');
        loadPendingFines();
    }
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    updateNavigation();
    showSection('home');
});
