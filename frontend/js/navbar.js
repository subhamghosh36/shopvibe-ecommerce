document.addEventListener('DOMContentLoaded', () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const navLinks = document.querySelector('.nav-links');

    if (userInfo && navLinks) {
        // Find the Login link by its href attribute
        const loginLink = Array.from(navLinks.querySelectorAll('a')).find(a => a.getAttribute('href') === 'login.html');
        
        if (loginLink) {
            const listItem = loginLink.parentElement;
            
            // Extract first name for a friendly greeting
            const firstName = userInfo.name.split(' ')[0];
            
            // Replace the Login link with Name and Logout button
            listItem.innerHTML = `
                <span style="color: #17a2b8; margin-right: 15px; font-weight: bold;">Hi, ${firstName}</span>
                <a href="#" id="logout-btn" style="cursor: pointer; color: #dc3545;">Logout</a>
            `;

            // Attach logout event listener
            document.getElementById('logout-btn').addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('userInfo');
                
                // If they logout on a protected page, kick them to home/login
                const protectedPages = ['checkout.html'];
                const currentPage = window.location.pathname.split('/').pop();
                
                if (protectedPages.includes(currentPage)) {
                    window.location.href = 'login.html';
                } else {
                    window.location.reload();
                }
            });
        }
    }
});