// Xử lý active cho sidebar menu
const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
allSideMenu.forEach(item=> {
    const li = item.parentElement;
    item.addEventListener('click', function () {
        allSideMenu.forEach(i=> {
            i.parentElement.classList.remove('active');
        });
        li.classList.add('active');
    });
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');
if (menuBar && sidebar) {
    menuBar.addEventListener('click', function () {
        sidebar.classList.toggle('hide');
    });
}

// Tìm kiếm trên mobile
const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');
if (searchButton && searchButtonIcon && searchForm) {
    searchButton.addEventListener('click', function (e) {
        if(window.innerWidth < 576) {
            e.preventDefault();
            searchForm.classList.toggle('show');
            if(searchForm.classList.contains('show')) {
                searchButtonIcon.classList.replace('bx-search', 'bx-x');
            } else {
                searchButtonIcon.classList.replace('bx-x', 'bx-search');
            }
        }
    });
}

if(window.innerWidth < 768 && sidebar) {
    sidebar.classList.add('hide');
} else if(window.innerWidth > 576 && searchButtonIcon && searchForm) {
    searchButtonIcon.classList.replace('bx-x', 'bx-search');
    searchForm.classList.remove('show');
}

window.addEventListener('resize', function () {
    if(this.innerWidth > 576 && searchButtonIcon && searchForm) {
        searchButtonIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }
});

// Nếu có switch-mode thì mới gán sự kiện (tránh lỗi khi không có)
const switchMode = document.getElementById('switch-mode');
if (switchMode) {
    switchMode.addEventListener('change', function () {
        if(this.checked) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    });
}

// --- Quản lý người dùng (bác sĩ & tiếp tân) qua API ---
async function fetchUsers() {
    const res = await fetch('/admin/api/users');
    return await res.json();
}

async function updateUserTable() {
    const tbody = document.getElementById('user-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    const users = await fetchUsers();
    users.forEach((user, idx) => {
        const roleText = user.role === 'DOCTOR' ? 'Bác sĩ' : 'Tiếp tân';
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.id != null ? user.id : ''}</td>
            <td>${user.fullname || ''}</td>
            <td>${user.username}</td>
            <td>${user.password}</td>
            <td>${roleText}</td>
            <td>
                <button onclick="editUser('${user.username}')">Sửa</button>
                <button onclick="deleteUser('${user.username}')">Xóa</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    const count = document.getElementById('user-count');
    if (count) count.textContent = users.length;
}

function resetUserForm() {
    document.getElementById('user-id').value = '';
    document.getElementById('user-id-display').value = '';
    document.getElementById('user-fullname').value = '';
    document.getElementById('user-user').value = '';
    document.getElementById('user-pass').value = '';
    document.getElementById('user-role').value = 'DOCTOR';
    document.getElementById('user-submit-btn').textContent = 'Thêm cán bộ';
    document.getElementById('user-cancel-btn').style.display = 'none';
    // Cho phép nhập id
    document.getElementById('user-id-display').removeAttribute('disabled');
}

let editingUsername = null;

window.editUser = async function(username) {
    if (!username || username === 'undefined') return;
    const res = await fetch(`/admin/api/users/${encodeURIComponent(username)}`);
    if (!res.ok) {
        alert('Không tìm thấy cán bộ bệnh viện này!');
        return;
    }
    const u = await res.json();
    document.getElementById('user-id').value = u.id != null ? u.id : '';
    document.getElementById('user-id-display').value = u.id != null ? u.id : '';
    document.getElementById('user-fullname').value = u.fullname || '';
    document.getElementById('user-user').value = u.username;
    document.getElementById('user-pass').value = u.password;
    document.getElementById('user-role').value = u.role;
    document.getElementById('user-submit-btn').textContent = 'Cập nhật cán bộ';
    document.getElementById('user-cancel-btn').style.display = '';
    editingUsername = username;
    // Khi sửa thì không cho sửa id
    document.getElementById('user-id-display').setAttribute('disabled', 'disabled');
};

const userForm = document.getElementById('user-form');
if (userForm) {
    userForm.onsubmit = async function(e) {
        e.preventDefault();
        // Lấy id từ input cho phép nhập
        const id = document.getElementById('user-id-display').value.trim();
        if (!id) {
            alert('Id không được để trống!');
            return;
        }
        document.getElementById('user-id').value = id;
        const fullname = document.getElementById('user-fullname').value.trim();
        const username = document.getElementById('user-user').value.trim();
        const password = document.getElementById('user-pass').value.trim();
        const role = document.getElementById('user-role').value;
        const data = { fullname, username, password, role };
        if (id) data.id = id;
        let res;
        if (editingUsername && editingUsername !== 'undefined') {
            // Sửa user
            res = await fetch(`/admin/api/users/${encodeURIComponent(editingUsername)}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } else {
            // Thêm user mới
            res = await fetch('/admin/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        }
        if (!res.ok) {
            alert('Có lỗi xảy ra khi lưu cán bộ. Vui lòng kiểm tra lại thông tin!');
            return;
        }
        await updateUserTable();
        resetUserForm();
        editingUsername = null;
    };
}

window.deleteUser = async function(username) {
    if (!username || username === 'undefined') return;
    if (confirm('Bạn có chắc muốn xóa cán bộ bệnh viện này?')) {
        await fetch(`/admin/api/users/${encodeURIComponent(username)}`, { method: 'DELETE' });
        await updateUserTable();
        resetUserForm();
        editingUsername = null;
    }
};

const userCancelBtn = document.getElementById('user-cancel-btn');
if (userCancelBtn) userCancelBtn.onclick = function() {
    resetUserForm();
    editingUsername = null;
    // Cho phép nhập id lại khi hủy
    document.getElementById('user-id-display').removeAttribute('disabled');
};

updateUserTable();

// Tab switching logic for admin page
document.addEventListener('DOMContentLoaded', function() {
    const dashboardTab = document.getElementById('dashboard-tab');
    const userManageTab = document.getElementById('user-manage-tab');
    const dashboardSection = document.getElementById('dashboard-section');
    const userSection = document.getElementById('user-section');

    if (dashboardTab && userManageTab && dashboardSection && userSection) {
        dashboardTab.addEventListener('click', function() {
            dashboardTab.parentElement.classList.add('active');
            userManageTab.parentElement.classList.remove('active');
            dashboardSection.style.display = '';
            userSection.style.display = 'none';
        });
        userManageTab.addEventListener('click', function() {
            userManageTab.parentElement.classList.add('active');
            dashboardTab.parentElement.classList.remove('active');
            dashboardSection.style.display = 'none';
            userSection.style.display = '';
        });
    }
});
