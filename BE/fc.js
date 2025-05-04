// Định nghĩa URL cố định bên ngoài hàm
const baseURL = 'http://localhost:3000/call-function?';
let currentData = []; // Biến toàn cục để lưu dữ liệu hiện tại
let currentData2=[];
function call(proc, params) {
  const paramsStr = JSON.stringify(params);
  const url = `${baseURL}proc=${proc}&params=${paramsStr}&func=False`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      let output = document.getElementById('output');

      if (data.error) {
        output.textContent = 'Lỗi: ' + data.error;
        return;
      }

      if (!Array.isArray(data) || data.length === 0) {
        output.textContent = 'Không có dữ liệu.';
        return;
      }
      currentData = data; // Lưu dữ liệu để xử lý edit
      let tableHtml = '';

      if (proc === 'TimSuatChieu') {
        tableHtml = renderTableWithEditButton(data); // ✅ Gọi đúng dữ liệu
      } else {
        tableHtml = renderTableNormally(data); // 👈 Hàm khác hiển thị không có nút
      }

      output.innerHTML = '<h3>Kết quả:</h3>' + getTable(tableHtml);
    })
    .catch(error => {
      console.error('Lỗi:', error);
      document.getElementById('output').textContent = 'Đã xảy ra lỗi khi gọi API!';
    });
}

// ✅ Hàm tạo bảng bình thường (không có nút)
function renderTableNormally(data) {
  let table = '<table border="1" cellpadding="5" cellspacing="0"><thead><tr>';
  Object.keys(data[0]).forEach(key => {
    table += `<th>${key}</th>`;
  });
  table += '</tr></thead><tbody>';
  data.forEach(row => {
    table += '<tr>';
    Object.values(row).forEach(value => {
      table += `<td>${value}</td>`;
    });
    table += '</tr>';
  });
  table += '</tbody></table>';
  return table;
}

function renderTableWithEditButton(data) {
  currentData = data; 

  let table = '<table border="1" cellpadding="5" cellspacing="0"><thead><tr>';
  
  // Tạo tiêu đề cột
  Object.keys(data[0]).forEach(key => {
    table += `<th>${key}</th>`;
  });
  table += `<th>Hành động</th>`;
  table += '</tr></thead><tbody>';

  // Tạo các hàng dữ liệu
  data.forEach((row, index) => {
    table += '<tr>';
    Object.values(row).forEach(value => {
      table += `<td>${value}</td>`;
    });

    table += `<td>
                <button style="background-color: #4CAF50; color: white; padding: 5px 10px; border: none; border-radius: 4px;"
                        onclick="editRow(${index})">Cập nhật</button>
                <button style="background-color: #f44336; color: white; padding: 5px 10px; border: none; border-radius: 4px; margin-left: 5px;"
                        onclick="deleteRow(${index})">Xóa</button>
              </td>`;
    table += '</tr>';
  });

  table += '</tbody></table>';
  return table;
}



function deleteRow(index) {
  const row = currentData[index];
  const form = document.forms['deleteForm'];
  form.p_ID_SuatChieu.value = row.ID_SuatChieu;
  openModal('editModal2');
}


function getsuatchieu() {
  const paramsStr = JSON.stringify([]);
  const url = `${baseURL}proc=get_all_showtimes&params=${paramsStr}&func=False`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      let output = document.getElementById('output');
      currentData2 = data; 
      output.innerHTML = 'success';
    })
    .catch(error => {
      console.error('Lỗi:', error);
      document.getElementById('output').textContent = 'Đã xảy ra lỗi khi gọi API!';
    });
}
function editRow(index) {
  // Tìm kiếm suất chiếu trong currentData dựa trên showtime_id
  const row1=currentData[index];
  id=row1.ID_SuatChieu;
  const date = new Date(row1.NgayChieu);
  date.setUTCDate(date.getUTCDate() + 1); // cộng thêm 1 ngày ở UTC

  const formattedDate = date.toISOString().split("T")[0]; 
  const row = currentData2.find(item => item.showtime_id === id);
  const form = document.forms['updateForm'];

  form.reset();

  // Gán dữ liệu vào các trường form
  form.p_ID_SuatChieu.value = row.showtime_id;       // ID suất chiếu
  form.p_DinhDangPhim.value = row.movie_format;      // Định dạng phim
  form.p_NgonNgu.value = row.language;               // Ngôn ngữ
  form.p_NgayBatDau.value = formattedDate;          // Ngày bắt đầu
  form.p_ThoiGianBatDau.value = row.ThoiGianBatDau;  // Thời gian bắt đầu
  form.p_MaRap.value = row.cinema_id;                // Mã rạp
  form.p_PhongSo.value = row.room_number;            // Phòng số
  form.p_ID_Phim.value = row.movie_id;               // ID phim

  // Hiển thị modal để chỉnh sửa
  openModal('editModal');
}







function call2(proc, params, unit ) {
  // Tạo chuỗi params (ví dụ: ["thamso1", 123])
  const paramsStr = JSON.stringify(params);

  // Tạo URL với tham số proc và params, thêm func='True' vào URL
  const url = `${baseURL}proc=${proc}&params=${paramsStr}&func=True`;

  // Gọi API với URL chứa tham số chuỗi
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const firstRow = data[0];
      const value = firstRow[Object.keys(firstRow)[0]];
      const formattedValue = value.toLocaleString().replace(/\./g, ' ');
      output.innerHTML = `<h3>Kết quả:</h3> Doanh thu: ${formattedValue} ${unit}`;
    })
    .catch(error => {
      console.error('Lỗi:', error);
      document.getElementById('output').textContent = 'Đã xảy ra lỗi khi gọi API!';
    });
}

function call3(proc, params) {
  // Tạo chuỗi params (ví dụ: ["thamso1", 123])
  const paramsStr = JSON.stringify(params);

  // Tạo URL với tham số proc và params
  const url = `${baseURL}proc=${proc}&params=${paramsStr}&func=Jason`;

  // Gọi API với URL chứa tham số chuỗi
  fetch(url)
    .then(response => response.json())
    .then(data => {
      let output = document.getElementById('output');
      if (data.error) {
        output.textContent = 'Lỗi: ' + data.error;
        return;
      }

      if (!Array.isArray(data) || data.length === 0) {
        output.textContent = 'Không có dữ liệu.';
        return;
      }

      // Tạo bảng từ dữ liệu
      let table = '<table border="1" cellpadding="5" cellspacing="0"><thead><tr>';
      Object.keys(data[0]).forEach(key => {
        table += `<th>${key}</th>`;
      });
      table += '</tr></thead><tbody>';

      data.forEach(row => {
        table += '<tr>';
        Object.values(row).forEach(value => {
          table += `<td>${value}</td>`;
        });
        table += '</tr>';
      });
      table += '</tbody></table>';

      // Hiển thị kết quả
      output.innerHTML = '<h3>Kết quả:</h3>' + table;
    })
    .catch(error => {
      console.error('Lỗi:', error);
      document.getElementById('output').textContent = 'Đã xảy ra lỗi khi gọi API!';
    });
}
function call4(proc, params) {
  const paramsStr = encodeURIComponent(JSON.stringify(params));
  const url = `${baseURL}proc=${proc}&params=${paramsStr}&func=INSERT`;

  fetch(url, {
    method: "GET",  // 👈 đổi từ POST sang GET
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json().then(data => ({ status: response.status, ok: response.ok, body: data })))
    .then(({ status, ok, body }) => {
      const output = document.getElementById('output');
      if (ok && body.success) {
        output.innerHTML = `<h3 style="color: green;">✅ Thành công: ${body.message}`;
      } else {
        output.innerHTML = `<h3 style="color: red;">❌ Thất bại: ${body.error || body.message}</h3>`;
      }
    })
    .catch(error => {
      const output = document.getElementById('output2');
      output.innerHTML = `<h3 style="color: red;">❌ Lỗi kết nối: ${error.message}</h3>`;
    });
}
function call5(proc, params) {
  const paramsStr = encodeURIComponent(JSON.stringify(params));
  const url = `${baseURL}proc=${proc}&params=${paramsStr}&func=UPDATE`;

  fetch(url, {
    method: "GET",  
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json().then(data => ({ status: response.status, ok: response.ok, body: data })))
    .then(({ status, ok, body }) => {
      const output = document.getElementById('output2');
      if (ok && body.success) {
        output.innerHTML = `<h3 style="color: green;">✅ Thành công: ${body.message}`;
        setTimeout(() => {
          output.innerHTML = '';
        }, 2000);
      } else {
        output.innerHTML = `<h3 style="color: red;">❌ Thất bại: ${body.error || body.message}</h3>`;
        setTimeout(() => {
          output.innerHTML = '';
        }, 5000);
      }
    })
    .catch(error => {
      const output = document.getElementById('output');
      output.innerHTML = `<h3 style="color: red;">❌ Lỗi kết nối: ${error.message}</h3>`;
    });
}

function call6(proc, params) {
  const paramsStr = encodeURIComponent(JSON.stringify(params));
  const url = `${baseURL}proc=${proc}&params=${paramsStr}&func=DELETE`;

  fetch(url, {
    method: "GET",  
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json().then(data => ({ status: response.status, ok: response.ok, body: data })))
    .then(({ status, ok, body }) => {
      const output = document.getElementById('output3');
      if (ok && body.success) {
        output.innerHTML = `<h3 style="color: green;">✅ Thành công: ${body.message}`;
        setTimeout(() => {
          output.innerHTML = '';
        }, 2000);
      } else {
        output.innerHTML = `<h3 style="color: red;">❌ Thất bại: ${body.error || body.message}</h3>`;
        setTimeout(() => {
          output.innerHTML = '';
        }, 5000);
      }
    })
    .catch(error => {
      const output = document.getElementById('output');
      output.innerHTML = `<h3 style="color: red;">❌ Lỗi kết nối: ${error.message}</h3>`;
    });
}

function callFunction(getDataFn,unit) {
  // Gọi hàm getDataFn để lấy { proc, params }
  const { proc, params } = getDataFn();
  if (unit==null ) {
    call(proc, params);
  }
  else if (unit=='Jason') call3(proc, params);
  else if(unit=='insert') call4(proc, params);
  else if(unit=='update') call5(proc, params);
  else if(unit=='delete') call6(proc,params);
  else call2(proc, params, unit);
}
  

function getTable(table) {
  // Chuyển chuỗi table thành HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = table;
  
  // Lấy tất cả các hàng trong bảng
  const rows = tempDiv.querySelectorAll('tr');
  
  // Duyệt qua từng hàng và các ô trong bảng để xử lý ngày tháng
  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    cells.forEach(cell => {
      const value = cell.textContent.trim();
      
      // Kiểm tra nếu giá trị là một ngày (định dạng ISO)
      if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
        const date = new Date(value);
        if (!isNaN(date)) {
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();
          
          // Chỉ lấy ngày/tháng/năm (không có giờ, phút, giây)
          cell.textContent = `${day}/${month}/${year}`;
        }
      }
    });
  });

  // Trả về HTML của bảng đã xử lý
  return tempDiv.innerHTML;
}


