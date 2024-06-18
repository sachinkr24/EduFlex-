import axios from "axios";

export const getComments = async (courseId) => {
    try {
        const res = await fetch("http://localhost:3000/admin/comments/" + courseId, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "authorization": "Bearer " + localStorage.getItem("token")
            }
        });
        const data = res.json();
        return data;
    }catch(err) {
        console.log(err);
    }
}

export const getFeedbacks = async (courseId) => {
    try {
        const res = await fetch("http://localhost:3000/admin/feedbacks/" + courseId, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                'authorization' : 'Bearer ' + localStorage.getItem('token'),
            }
        });
        return res.json();
    }catch(err){
        console.log(err);
    }
}