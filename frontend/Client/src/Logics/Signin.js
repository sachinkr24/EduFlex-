export const signIn = (obj) => {

    const Role = obj.alignment;

    if(Role === "ADMIN"){
        return fetch('http://localhost:3000/admin/login', {
            method: 'POST',
            body: JSON.stringify({
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
            return data;
        }).catch((err) => {
            console.log(err);
        });
    }
    else if(Role === "USER") {
        return fetch('http://localhost:3000/users/login', {
            method: 'POST',
            body: JSON.stringify({
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
            return data;
        }).catch((err) => { 
            console.log(err);
        });
    }
}