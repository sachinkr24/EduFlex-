


export const addCourse = (course) => {
    fetch('http://localhost:3000/admin/addcourse', {
        method : 'POST',
        body : JSON.stringify(course),
        headers : {
            'Content-Type' : 'application/json'
        }
    }).then(res => {
        return res.json();
    }).then((data) => {
        alert(data.message);
    })
}