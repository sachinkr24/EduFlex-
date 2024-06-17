export const signIn = async (obj, navigate) => {
    const Role = obj.alignment;
    const endpoint = Role === 'ADMIN' ? 'admin' : 'users';

    fetch(`http://localhost:3000/${endpoint}/login`, {
        method: 'POST',
        body: JSON.stringify({
            email: obj.email,
            password: obj.password,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((res) => {
        if (!res.ok) {
            // If the response status is not 2xx, throw an error to be caught in the catch block
            return res.json().then((error) => {
                throw new Error(error.message || 'Invalid email or password');
            });
        }
        return res.json();
    })
    .then((data) => {
        if (data && data.token) {
            alert('Login Successful');
            localStorage.setItem('token', data.token);
            sessionStorage.setItem('email', obj.email);
            navigate(`/${endpoint}`);
        }
    })
    .catch((err) => {
        alert(err.message || 'Invalid email or password');
        console.error('Error:', err);
    });
};
