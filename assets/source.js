function getCurrentTimeString() {
    const now = new Date();
    return now.toLocaleString('vi-VN');
}

document.addEventListener('DOMContentLoaded', () => {
    // --- Element references ---
    const userIcon = document.querySelector('.user');
    const popup = document.getElementById('auth-popup');
    const closeBtn = document.querySelector('.close-btn');
    const tabs = document.querySelectorAll('.tab');
    const forms = document.querySelectorAll('.form');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const form = document.getElementById('upload-form');
    const fileInput = document.getElementById('file-input');
    const docList = document.querySelector('.documents-list');
    const userSidebar = document.getElementById('user-sidebar');
    const overlay = document.querySelector('.overlay');
    const closeSidebarBtn = document.querySelector('.close-sidebar');
    const logoutBtn = document.getElementById('logout-btn');

    //
//     document.addEventListener('click', (e) => {
//     if (e.target.closest('.user')) {
//         const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
//         if (isLoggedIn && userSidebar && overlay) {
//             userSidebar.classList.add('show');
//             overlay.classList.remove('hidden');
//         } else {
//             if (typeof popup !== 'undefined' && popup) {
//                 popup.classList.remove('hidden');
//             } else {
//                 alert('Vui lòng đăng nhập để sử dụng!');
//                 window.location.href = 'index.html';
//             }
//         }
//     }
// });

    // --- Sidebar logic ---
        if (userIcon) {
            userIcon.addEventListener('click', () => {
                const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
                if (isLoggedIn && userSidebar && overlay) {
                    userSidebar.classList.remove('hidden'); // Đảm bảo không bị display: none
                    overlay.classList.remove('hidden');
                    userSidebar.classList.add('show');
                    
                } else if (popup) {
                    popup.classList.remove('hidden');
                }
            });
        }

        // Gắn sự kiện đóng sidebar
        if (closeSidebarBtn && overlay && userSidebar) {
            closeSidebarBtn.addEventListener('click', () => {
                overlay.classList.add('hidden');
                userSidebar.classList.remove('show');
                
            });

            overlay.addEventListener('click', () => {
                 overlay.classList.add('hidden');
                userSidebar.classList.remove('show');
               
            });
        }

        // Gắn sự kiện logout
        if (logoutBtn && userSidebar && overlay) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('loggedIn');
                alert('Đã đăng xuất!');
                overlay.classList.add('hidden');
                userSidebar.classList.remove('show');
                
                window.location.href = './index.html';
            });
        }

        

    // --- Auth popup logic ---
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

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = loginForm.querySelector('input[placeholder="Tên tài khoản"]').value;
            const password = loginForm.querySelector('input[placeholder="Mật khẩu"]').value;

            if (username && password) {
                localStorage.setItem('loggedIn', 'true');
                popup.classList.add('hidden');
                alert('Đăng nhập thành công!');
                window.location.href = './home.html';
            } else {
                alert('Vui lòng nhập đầy đủ thông tin!');
            }
        });
    }

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

    // --- Upload documents ---
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

    // --- Background animation ---
    if (document.querySelector('#slider')) {
        let slider = document.querySelector('#slider');
        let images = [
            './assets/ima/huong1.jpg',
            './assets/ima/trinh1.jpg'
        ];
        let i = 0;
        setInterval(() => {
            i = (i + 1) % images.length;
            slider.style.background = `url('${images[i]}') center / cover no-repeat`;
        }, 5000);
    }

    // --- Restrict access ---
    function restrictUnauthAccess() {
        const pathname = window.location.pathname;
        const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
        if (!isLoggedIn && (pathname.includes('home.html') || pathname.includes('documents.html'))) {
            alert('Bạn cần đăng nhập để truy cập trang này!');
            window.location.href = 'index.html';
        }

        document.querySelectorAll('#nav a[href$="home.html"], #nav a[href$="documents.html"]').forEach(link => {
            link.addEventListener('click', e => checkAuthAndRedirect(e, link.getAttribute('href')));
        });
    }

    function checkAuthAndRedirect(e, url) {
        const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
        if (!isLoggedIn) {
            e.preventDefault();
            alert('Vui lòng đăng nhập để truy cập!');
        } else {
            window.location.href = url;
        }
    }

    restrictUnauthAccess();

    // --- Post interaction logic ---
    document.querySelectorAll('.post').forEach(post => {
        const createdTimeSpan = post.querySelector('.created-time');
        const likeBtn = post.querySelector('.like-btn');
        const likeCountSpan = post.querySelector('.like-count');
        const commentBtn = post.querySelector('.comment-btn');
        const commentsDiv = post.querySelector('.comments');

        if (createdTimeSpan) {
            createdTimeSpan.textContent = getCurrentTimeString();
        }

        let liked = false;
        let likeCount = 0;

        likeBtn.addEventListener('click', () => {
            liked = !liked;
            likeCount += liked ? 1 : -1;
            likeCountSpan.textContent = likeCount;
            likeBtn.style.color = liked ? 'red' : 'black';
        });

        commentBtn.addEventListener('click', () => {
            commentsDiv.classList.toggle('hidden');
            if (!commentsDiv.querySelector('input')) {
                const input = document.createElement('input');
                input.className = 'comment-input';
                input.placeholder = 'Nhập bình luận...';

                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter' && input.value.trim()) {
                        const p = document.createElement('p');
                        const timestamp = document.createElement('small');
                        timestamp.className = 'comment-time';
                        timestamp.textContent = ` - Phản hồi lúc ${getCurrentTimeString()}`;

                        p.textContent = input.value;
                        p.appendChild(timestamp);
                        commentsDiv.appendChild(p);
                        input.value = '';
                    }
                });

                commentsDiv.appendChild(input);
            }
        });
    });
});