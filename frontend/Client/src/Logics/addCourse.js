


export const addCourse = (course, navigate) => {
    fetch('http://localhost:3000/admin/courses', {
        method : 'POST',
        body : JSON.stringify(course),
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }
    }).then(res => {
        console.log(res);
        return res.json();
    }).then((data) => {
        alert(data.message);
        navigate('/admin/courses');
    })
}