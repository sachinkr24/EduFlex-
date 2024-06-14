

export const signIn = async (obj, navigate) => {
    const Role = obj.alignment;
    const endpoint = Role === 'ADMIN' ? 'admin' : 'users';

    fetch(`http://localhost:3000/${endpoint}/login`, {
        method: 'POST',
        body: JSON.stringify({
            email : obj.email,
            password : obj.password,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => {
        console.log(res.ok);
        return res.json();
    }).then((data) => {
        if (data && data.token) {
            alert('Login Successful');
            localStorage.setItem('token', data.token);
            sessionStorage.setItem('email', obj.email);
            navigate(`/${endpoint}`);
        }
    }).catch((err) => {
        console.error('Error:', err);
    });
};