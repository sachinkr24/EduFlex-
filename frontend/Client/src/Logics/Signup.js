

export const signUp = async (obj, navigate) => {

    const Role = obj.alignment;

    const endpoint = Role === 'ADMIN' ? 'admin' : 'users';
    console.log(`Endpoint: http://localhost:3000/${endpoint}/signup`);

    fetch(`http://localhost:3000/${endpoint}/signup`, {
        method: 'POST',
        body: JSON.stringify({
            username : obj.username,
            email : obj.email,
            password : obj.password,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => {
        return res.json();
    }).then((data) => {
        localStorage.setItem('token', data.token);
        alert('User Signup Successful');
        navigate(`/${endpoint}`);
    }).catch((err) => {
        console.error('Error:', err);
    });
};