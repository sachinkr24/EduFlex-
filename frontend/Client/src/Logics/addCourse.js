import axios from 'axios'


export const addCourse = async (course, navigate) => {
    console.log(JSON.stringify(course));
    const token = 'Bearer ' + localStorage.getItem('token');
    console.log('token - ', token);
    await axios.post('http://localhost:3000/admin/courses', course, {
        headers : {
            'Content-Type' : 'application/json',
            'authorization' : token,
        }
        }).then((res) => {
            console.log('res data - ', res.data);
            alert(res.data.message);
            navigate('/admin/courses/' + res.data.courseId);
    }).catch((err) => {
        console.log('err - ', err);
    })
}