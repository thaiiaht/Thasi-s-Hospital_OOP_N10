document.addEventListener('DOMContentLoaded', function() {
    let patients = [];
    const tableBody = document.querySelector('#patientsTable tbody');
    const addBtn = document.getElementById('addBtn');
    const modal = document.getElementById('patientModal');
    const closeModal = document.getElementById('closePatientModal');
    const form = document.getElementById('patientForm');
    const modalTitle = document.getElementById('patientModalTitle');
    const editPatientId = document.getElementById('editPatientId');

    async function fetchPatients() {
        const res = await fetch('/api/patient');
        patients = await res.json();
        renderTable();
    }

    function renderTable() {
        tableBody.innerHTML = '';
        patients.forEach((p, i) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${i + 1}</td>
                <td>${p.firstName}</td>
                <td>${p.date}</td>
                <td>${p.gender}</td>
                <td>${p.phone}</td>
                <td>
                    <button class="editPatientBtn" data-id="${p.id}">Sửa</button>
                    <button class="deletePatientBtn" data-id="${p.id}">Xóa</button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }

    addBtn.onclick = function() {
        form.reset();
        editPatientId.value = '';
        modalTitle.textContent = 'Thêm bệnh nhân';
        modal.style.display = 'block';
    };

    closeModal.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    form.onsubmit = async function(e) {
        e.preventDefault();
        const data = {
            firstName: document.getElementById('firstName').value,
            date: document.getElementById('date').value,
            gender: document.getElementById('gender').value,
            phone: document.getElementById('phone').value
        };
        const id = editPatientId.value;
        if (!id) {
            // Tạo mới
            const res = await fetch('/api/patient', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!res.ok) alert("Lỗi khi thêm bệnh nhân");
        } else {
            // Cập nhật
            const res = await fetch(`/api/patient/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!res.ok) alert("Lỗi khi cập nhật bệnh nhân");
        }
        modal.style.display = 'none';
        await fetchPatients();
    };

    tableBody.onclick = async function(e) {
        const target = e.target;
        if (target.classList.contains('editPatientBtn')) {
            const id = target.dataset.id;
            const patient = patients.find(p => p.id == id);
            if (!patient) return alert("Không tìm thấy bệnh nhân");

            document.getElementById('firstName').value = patient.firstName;
            document.getElementById('date').value = patient.date;
            document.getElementById('gender').value = patient.gender;
            document.getElementById('phone').value = patient.phone;

            editPatientId.value = patient.id;
            modalTitle.textContent = 'Sửa bệnh nhân';
            modal.style.display = 'block';
        }

        if (target.classList.contains('deletePatientBtn')) {
            const id = target.dataset.id;
            if (confirm('Bạn có chắc muốn xóa bệnh nhân này?')) {
                const res = await fetch(`/api/patient/${id}`, {
                    method: 'DELETE'
                });
                if (!res.ok) alert("Lỗi khi xóa bệnh nhân");
                else await fetchPatients();
            }
        }
    };

    fetchPatients();
});
