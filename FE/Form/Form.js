function getTimSuatChieuParams() {
  const ngay = document.getElementById('ngay').value || null;
  const gio = document.getElementById('gio').value || null;
  const rap = document.getElementById('rap').value.trim() || null;
  const theloai = document.getElementById('theloai').value.trim() || null;
  const tuade = document.getElementById('tuade').value.trim() || null;

  return {
    proc: 'TimSuatChieu',
    params: [ngay, gio, rap, theloai, tuade]
  };
}
function getTinhDoanhThuTheoNgayParams() {
  const ngayBatDau = document.getElementById('ngayBatDau').value || null;
  const ngayKetThuc = document.getElementById('ngayKetThuc').value || null;

  return {
    proc: 'ThongKeDoanhThuTheoKhoangNgay',
    params: [ngayBatDau, ngayKetThuc]
  };
}

function gettinhDoanhThu() {
  const id = document.getElementById('idSuatChieu').value;
  if (!id || id <= 0) {
    document.getElementById('result').innerText = "Vui lòng nhập ID hợp lệ.";
    return;
  }
  return {
    proc: 'TinhDoanhThuSuatChieu',
    params: [id]
  };
  
}
function getTopPhim(){
  const date = document.getElementById('ngay_chieu').value;
  return {
    proc: 'GetTopPhim',
    params: [date]
  };
}
function getinsert(){
  const movie_format = document.getElementById('movie_format').value.trim() || null;
  const language = document.getElementById('language').value.trim() || null;
  const date = document.getElementById('date').value || null;
  const start_time = document.getElementById('start_time').value || null;
  const cinema_id = document.getElementById('cinema_id').value.trim() || null;
  const room_number = parseInt(document.getElementById('room_number').value) || null;
  const movie_id = document.getElementById('movie_id').value.trim() || null;
  return {
    proc: 'insert_showtime',
    params: [movie_format, language, date, start_time , cinema_id, room_number, movie_id]
  };
}   
function getupdate() {
  const form = document.getElementById('updateForm');

  const showtime_id = parseInt(form.elements['p_ID_SuatChieu'].value) || null;
  const movie_format = form.elements['p_DinhDangPhim'].value.trim() || null;
  const language = form.elements['p_NgonNgu'].value.trim() || null;
  const date = form.elements['p_NgayBatDau'].value || null;
  const start_time = form.elements['p_ThoiGianBatDau'].value || null;
  const cinema_id = form.elements['p_MaRap'].value.trim() || null;
  const room_number = parseInt(form.elements['p_PhongSo'].value) || null;
  const movie_id = form.elements['p_ID_Phim'].value.trim() || null;

  return {
    proc: 'update_suatchieu',
    params: [showtime_id, movie_format, language, date, start_time, cinema_id, room_number, movie_id]
  };
}
function getdelete() {
  const form = document.getElementById('deleteForm');

  const showtime_id = parseInt(form.elements['p_ID_SuatChieu'].value) || null;

  return {
    proc: 'delete_suatchieu',
    params: [showtime_id]
  };
}


function toggleForm(targetId) {
    const form = document.getElementById(targetId);
    form.style.display = form.style.display === 'none' ? 'flex' : 'none';
}
function get_Form(formName, targetId) {
    const targetElement = document.getElementById(targetId);
    
    
    if (targetElement.innerHTML.trim() !== "") {
        toggleForm(targetId);
        return;
    }

    const filePath = `Form/${formName}.html`;  
    fetch(filePath)
      .then(res => res.text())
      .then(html => {
        targetElement.innerHTML = html;
        targetElement.style.display = 'block';  
      })
      .catch(error => {
        console.error('Lỗi tải form:', error);
      });
}

function loadModal(containerId, filePath) {
  const targetElement = document.getElementById(containerId);

  // Kiểm tra nếu modal đã được tải trước đó
  if (targetElement.innerHTML.trim() !== "") {
    targetElement.style.display = "flex";  // Nếu đã tải, chỉ cần hiển thị modal
    return;
  }

  // Nếu chưa tải modal, thực hiện fetch từ filePath
  fetch(filePath)
    .then(res => res.text())
    .then(html => {
      targetElement.innerHTML = html;  // Chèn nội dung modal vào container
      targetElement.style.display = "flex";  // Hiển thị modal

      // Thêm sự kiện đóng modal (nút ×)
      const closeButton = targetElement.querySelector('.close-btn');
      if (closeButton) {
        closeButton.onclick = () => {
          targetElement.style.display = 'none';  // Ẩn modal
        };
      }

      // Thêm sự kiện hủy modal (nút Hủy)
      const cancelButton = targetElement.querySelector('.cancel-btn');
      if (cancelButton) {
        cancelButton.onclick = () => {
          targetElement.style.display = 'none';  // Ẩn modal
        };
      }
    })
    .catch(error => {
      console.error('Lỗi tải modal:', error);
    });
}


function closeModal(a) {
  const modal = document.getElementById(a);
  modal.style.display = 'none';  // Đóng modal
}
function openModal(a) {
  const modal = document.getElementById(a);
  modal.style.display = 'flex';  
}
function showCheckMark(a,b,c) {
  const checkMark = document.createElement('span');
  checkMark.textContent = '✔';
  checkMark.style.color = 'green';
  checkMark.style.fontSize = c;
  checkMark.style.marginLeft = '8px';
  checkMark.style.position = 'absolute';
  checkMark.style.right = a;
  checkMark.style.top = b;
  checkMark.id = 'tempCheckmark';

  document.body.appendChild(checkMark);

  setTimeout(() => {
    checkMark.remove();
  }, 1000);
}
function closeAndReloadModal() {
  // 1. Ẩn modal
  document.getElementById('editModal').style.display = 'none';

  // 2. Load lại nội dung modal (nếu bạn có file Update.html bên ngoài)
  loadModal('modalContainer', 'Update.html');
}
function sleep(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}
function wait(seconds, callback) {
  setTimeout(callback, seconds * 1000);
}