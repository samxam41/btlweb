document.addEventListener('DOMContentLoaded', () => {
    const userIcon = document.querySelector('.user');
    const popup = document.getElementById('auth-popup');
    const closeBtn = document.querySelector('.close-btn');
    const tabs = document.querySelectorAll('.tab');
    const forms = document.querySelectorAll('.form');

    const form = document.getElementById('upload-form');
    const fileInput = document.getElementById('file-input');
    const docList = document.querySelector('.documents-list');

     // Kiểm tra trạng thái đăng nhập
    if (userIcon) {
        userIcon.addEventListener('click', () => {
            const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
            if (isLoggedIn) {
                window.location.href = '/account.html';
            } else {
                popup.classList.remove('hidden');
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            popup.classList.add('hidden');
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            forms.forEach(f => f.classList.remove('active'));
            if (tab.dataset.tab === 'login') {
                document.getElementById('login-form').classList.add('active');
            } else {
                document.getElementById('register-form').classList.add('active');
            }
        });
    });

    // Đăng nhập
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = loginForm.querySelector('input[placeholder="Tên tài khoản"]').value;
            const password = loginForm.querySelector('input[placeholder="Mật khẩu"]').value;

            if (username && password) {
                // Giả sử đăng nhập thành công
                localStorage.setItem('loggedIn', 'true');
                popup.classList.add('hidden');
                alert('Đăng nhập thành công!');
                window.location.href = '/home.html';
            } else {
                alert('Vui lòng nhập đầy đủ thông tin!');
            }
        });
    }

    // Đăng ký (tùy chọn - không cần xử lý backend ở đây)
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = registerForm.querySelector('input[placeholder="Email"]').value;
            const username = registerForm.querySelector('input[placeholder="Tên tài khoản"]').value;
            const password = registerForm.querySelector('input[placeholder="Mật khẩu"]').value;

            if (email && username && password) {
                alert('Đăng ký thành công! Vui lòng đăng nhập.');
                document.querySelector('[data-tab="login"]').click(); // Chuyển sang form đăng nhập
            } else {
                alert('Vui lòng nhập đầy đủ thông tin đăng ký!');
            }
        });
    }

    // Nếu đang ở trang documents.html và chưa đăng nhập thì chuyển hướng
    if (window.location.pathname.includes('/documents.html')) {
        const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
        if (!isLoggedIn) {
            alert('Bạn cần đăng nhập để truy cập trang Tài liệu!');
            window.location.href = '/home.html';
        }
    }
    
    // Tải lên và hiển thị tài liệu
    

    if (form && fileInput && docList) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const files = fileInput.files;
            for (const file of files) {
                const item = document.createElement('div');
                item.className = 'document';
                item.innerHTML = `
                    <h4>${file.name}</h4>
                    <p>Uploaded just now.</p>
                    <a href="#">Download</a>
                `;
                docList.appendChild(item);
            }
            fileInput.value = '';
        });
    }
});

