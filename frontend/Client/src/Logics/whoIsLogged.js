

export const whoIsLogged = async (role) => {
    const res = await fetch(`http://localhost:3000/${role}/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': "Bearer " + localStorage.getItem('token')
        }
    });
    const data = await res.json();
    if (data.role) return 1;
    else return 0;
}