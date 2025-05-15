document.addEventListener('DOMContentLoaded', function () {
    let appointments = [];
    const tableBody = document.querySelector('#appointmentsTable tbody');
    const addBtn = document.getElementById('addBtn');
    const modal = document.getElementById('appointmentModal');
    const closeModal = document.getElementById('closeModal');
    const form = document.getElementById('appointmentForm');
    const modalTitle = document.getElementById('modalTitle');
    const editIndexInput = document.getElementById('editIndex');

    async function fetchAppointments() {
        const res = await fetch('/api/appointment');
        appointments = await res.json();
        renderTable();
    }

    function renderTable() {
        tableBody.innerHTML = '';
        appointments.forEach((a, i) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${i + 1}</td>
                <td>${a.patientName}</td>
                <td>${a.date}</td>
                <td>${a.time}</td>
                <td>${a.doctor}</td>
                <td>${a.note || ''}</td>
                <td>
                    <button class="editBtn" data-id="${a.id}">Sửa</button>
                    <button class="deleteBtn" data-id="${a.id}">Xóa</button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }

    addBtn.onclick = function () {
        form.reset();
        editIndexInput.value = '';
        modalTitle.textContent = 'Thêm lịch khám';
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
            patientName: document.getElementById('patientName').value,
            date: document.getElementById('appointmentDate').value,
            time: document.getElementById('appointmentTime').value,
            doctor: document.getElementById('doctorName').value,
            note: document.getElementById('note').value,
        };
        const id = editIndexInput.value;

        if (!id) {
            await fetch('/api/appointment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
        } else {
            await fetch(`/api/appointment/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
        }
        modal.style.display = 'none';
        await fetchAppointments();
    };

    tableBody.onclick = async function (e) {
        if (e.target.classList.contains('editBtn')) {
            const id = e.target.dataset.id;
            const a = appointments.find(a => a.id == id);
            if (!a) return;
            document.getElementById('patientName').value = a.patientName;
            document.getElementById('appointmentDate').value = a.date;
            document.getElementById('appointmentTime').value = a.time;
            document.getElementById('doctorName').value = a.doctor;
            document.getElementById('note').value = a.note || '';
            editIndexInput.value = a.id;
            modalTitle.textContent = 'Sửa lịch khám';
            modal.style.display = 'block';
        }

        if (e.target.classList.contains('deleteBtn')) {
            const id = e.target.dataset.id;
            if (confirm('Bạn có chắc muốn xóa lịch khám này?')) {
                await fetch(`/api/appointment/${id}`, { method: 'DELETE' });
                await fetchAppointments();
            }
        }
    };

    fetchAppointments();
});
