document.addEventListener('DOMContentLoaded', function () {
    let prescriptions = [];
    const tableBody = document.querySelector('#prescriptionsTable tbody');
    const addBtn = document.getElementById('addBtn');
    const modal = document.getElementById('prescriptionModal');
    const closeModal = document.getElementById('closePrescriptionModal');
    const form = document.getElementById('prescriptionForm');
    const modalTitle = document.getElementById('prescriptionModalTitle');
    const editIdInput = document.getElementById('editPrescriptionIndex');

    async function fetchPrescriptions() {
        const res = await fetch('/api/prescription');
        prescriptions = await res.json();
        renderTable();
    }

    function renderTable() {
        tableBody.innerHTML = '';
        prescriptions.forEach((p, i) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${i + 1}</td>
                <td>${p.patientName}</td>
                <td>${p.date}</td>
                <td>${p.doctor}</td>
                <td>${p.drugs}</td>
                <td>${p.note || ''}</td>
                <td>
                    <button class="editBtn" data-id="${p.id}">Sửa</button>
                    <button class="deleteBtn" data-id="${p.id}">Xóa</button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }

    addBtn.onclick = function () {
        form.reset();
        editIdInput.value = '';
        modalTitle.textContent = 'Thêm đơn thuốc';
        modal.style.display = 'block';
    };

    closeModal.onclick = function () {
        modal.style.display = 'none';
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    form.onsubmit = async function (e) {
        e.preventDefault();
        const data = {
            patientName: document.getElementById('prescriptionPatientName').value,
            date: document.getElementById('prescriptionDate').value,
            doctor: document.getElementById('prescriptionDoctor').value,
            drugs: document.getElementById('prescriptionDrugs').value,
            note: document.getElementById('prescriptionNote').value
        };
        const id = editIdInput.value;

        if (!id) {
            // Create
            await fetch('/api/prescription', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } else {
            // Update
            await fetch(`/api/prescription/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        }
        modal.style.display = 'none';
        await fetchPrescriptions();
    };

    tableBody.onclick = async function (e) {
        if (e.target.classList.contains('editBtn')) {
            const id = e.target.dataset.id;
            const p = prescriptions.find(p => p.id == id);
            if (!p) return;
            document.getElementById('prescriptionPatientName').value = p.patientName;
            document.getElementById('prescriptionDate').value = p.date;
            document.getElementById('prescriptionDoctor').value = p.doctor;
            document.getElementById('prescriptionDrugs').value = p.drugs;
            document.getElementById('prescriptionNote').value = p.note || '';
            editIdInput.value = p.id;
            modalTitle.textContent = 'Sửa đơn thuốc';
            modal.style.display = 'block';
        }

        if (e.target.classList.contains('deleteBtn')) {
            const id = e.target.dataset.id;
            if (confirm('Bạn có chắc muốn xóa đơn thuốc này?')) {
                await fetch(`/api/prescription/${id}`, { method: 'DELETE' });
                await fetchPrescriptions();
            }
        }
    };

    fetchPrescriptions();
});
