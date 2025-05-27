document.addEventListener('DOMContentLoaded', () => {
    const userIcon = document.querySelector('.user');
    const popup = document.getElementById('auth-popup');
    const closeBtn = document.querySelector('.close-btn');
    const tabs = document.querySelectorAll('.tab');
    const forms = document.querySelectorAll('.form');

    const form = document.getElementById('upload-form');
    const fileInput = document.getElementById('file-input');
    const docList = document.querySelector('.documents-list');

    //  Thêm các phần tử liên quan đến sidebar
    const userSidebar = document.getElementById('user-sidebar');
    const overlay = document.querySelector('.overlay');
    const closeSidebarBtn = document.querySelector('.close-sidebar');
    const logoutBtn = document.getElementById('logout-btn');

    // Sự kiện click vào icon user ( chỉnh sửa logic)
    if (userIcon) {
        userIcon.addEventListener('click', () => {
            const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
            if (isLoggedIn) {
                userSidebar.classList.add('show');
                overlay.classList.remove('hidden');
            } else {
                popup.classList.remove('hidden');
            }
        });
    }

    // Đóng popup đăng nhập
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            popup.classList.add('hidden');
        });
    }

    // Tab đăng nhập / đăng ký
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
                localStorage.setItem('loggedIn', 'true');
                popup.classList.add('hidden');
                alert('Đăng nhập thành công!');
                window.location.href = '/home.html';
            } else {
                alert('Vui lòng nhập đầy đủ thông tin!');
            }
        });
    }

    // Đăng ký
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = registerForm.querySelector('input[placeholder="Email"]').value;
            const username = registerForm.querySelector('input[placeholder="Tên tài khoản"]').value;
            const password = registerForm.querySelector('input[placeholder="Mật khẩu"]').value;

            if (email && username && password) {
                alert('Đăng ký thành công! Vui lòng đăng nhập.');
                document.querySelector('[data-tab="login"]').click();
            } else {
                alert('Vui lòng nhập đầy đủ thông tin đăng ký!');
            }
        });
    }

    // Đóng sidebar
    if (closeSidebarBtn && overlay) {
        closeSidebarBtn.addEventListener('click', () => {
            userSidebar.classList.remove('show');
            overlay.classList.add('hidden');
        });

        overlay.addEventListener('click', () => {
            userSidebar.classList.remove('show');
            overlay.classList.add('hidden');
        });
    }

    // Đăng xuất
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('loggedIn');
            alert('Đã đăng xuất!');
            userSidebar.classList.remove('show');
            overlay.classList.add('hidden');
            window.location.href = '/index.html';
        });
    }

    // Kiểm tra đăng nhập ở trang documents.html
    if (window.location.pathname.includes('/documents.html')) {
        const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
        if (!isLoggedIn) {
            alert('Bạn cần đăng nhập để truy cập trang Tài liệu!');
            window.location.href = '/home.html';
        }
    }

    // Upload tài liệu
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
