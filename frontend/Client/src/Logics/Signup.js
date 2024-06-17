

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
        sessionStorage.setItem('email', obj.email);
        alert('User Signup Successful');
        navigate(`/${endpoint}`);
    }).catch((err) => {
        alert('Invalid password or emqail');
        console.error('Error:', err);
    });
};