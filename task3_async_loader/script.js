// function fetchUsers() returning a Promise
const fetchUsers = (shouldSucceed = true) => {
    return new Promise((resolve, reject) => {
        // Use setTimeout() with 3 seconds delay
        setTimeout(() => {
            if (shouldSucceed) {
                // Resolve with array of user objects
                const users = [
                    { id: 1, name: "Sufyan", email: "sufyan@example.com" },
                    { id: 2, name: "Sarah", email: "sarah@example.com" },
                    { id: 3, name: "Ahmed", email: "ahmed@example.com" }
                ];
                resolve(users);
            } else {
                // Reject using a boolean flag if data fails
                reject("Error: Failed to fetch user data from server.");
            }
        }, 3000);
    });
};

const loadData = (flag = true) => {
    const statusBox = document.getElementById('loader-status');
    const userDisplay = document.getElementById('user-display');
    const btn = document.getElementById('reload-btn');

    statusBox.className = 'status-box loading';
    statusBox.innerHTML = '<p>Loading users... (Please wait 3s)</p>';
    userDisplay.innerHTML = '';
    btn.disabled = true;

    // Use .then() and .catch()
    fetchUsers(flag)
        .then(users => {
            statusBox.className = 'status-box success';
            statusBox.innerHTML = '<p>Data loaded successfully!</p>';

            // Display results in HTML
            userDisplay.innerHTML = users.map(user => `
                <div class="user-item">
                    <span>${user.name}</span>
                    <small style="color: #94a3b8;">${user.email}</small>
                </div>
            `).join('');
        })
        .catch(err => {
            statusBox.className = 'status-box error';
            statusBox.innerHTML = `<p>${err}</p>`;
        })
        .finally(() => {
            btn.disabled = false;
        });
};

// Event listener for button
document.getElementById('reload-btn').addEventListener('click', () => {
    // Randomly succeed or fail for demonstration
    const randomFlag = Math.random() > 0.2;
    loadData(randomFlag);
});

// Initial load
document.addEventListener('DOMContentLoaded', () => loadData(true));
