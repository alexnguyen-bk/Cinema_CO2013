function getTimSuatChieuParams() {
    const ngay = document.getElementById('ngay').value;
    const gio = document.getElementById('gio').value;
    const rap = document.getElementById('rap').value.trim();
    const theloai = document.getElementById('theloai').value.trim();
    return {
      proc: 'TimSuatChieu',
      params: [ngay, gio, rap, theloai]
    };
}
function getLietKeKhachHangParams() {
    const soDiem = document.getElementById('sodiem').value;
    const tgBatDau = document.getElementById('tgbatdau').value;
    const tgKetThuc = document.getElementById('tgketthuc').value;
    return {
      proc: 'LietKeKhachHangTheoDiem',
      params: [soDiem, tgBatDau, tgKetThuc]
    };
  }
    
function toggleForm(targetId) {
    const form = document.getElementById(targetId);
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
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