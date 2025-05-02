// Định nghĩa URL cố định bên ngoài hàm
const baseURL = 'http://localhost:3000/call-function?';
function call(proc, params) {
  // Tạo chuỗi params (ví dụ: ["thamso1", 123])
  const paramsStr = JSON.stringify(params);

  // Tạo URL với tham số proc và params
  const url = `${baseURL}proc=${proc}&params=${paramsStr}`;

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
      output.innerHTML = '<h3>Kết quả từ hàm SQL:</h3>' + table;
    })
    .catch(error => {
      console.error('Lỗi:', error);
      document.getElementById('output').textContent = 'Đã xảy ra lỗi khi gọi API!';
    });
}

function callFunction(getDataFn) {
  // Gọi hàm getDataFn để lấy { proc, params }
  const { proc, params } = getDataFn();
  call(proc, params);
}
  

