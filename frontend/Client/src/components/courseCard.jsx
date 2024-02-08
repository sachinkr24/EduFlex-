import { Typography } from "@mui/material";
import {Card} from "@mui/material";

export function CourseCard(props) {
    const course = props.course;
    return <div style={{display: "flex",  marginTop: 50, justifyContent: "center", width: "100%"}}>
     <Card style={{
        margin: 10,
        width: 350,
        minHeight: 200,
        borderRadius: 20,
        marginRight: 50,
        paddingBottom: 15,
        zIndex: 2
    }}>
        <img src={course.image} style={{width: 350, height: 200}} ></img>
        <div style={{marginLeft: 10}}>
            <Typography variant="h5">{course.title}</Typography>
            <Typography variant="subtitle2" style={{color: "gray"}}>
                {course.description}
            </Typography>
            <Typography variant="subtitle1">
                <b>Rs {course.price} </b>
            </Typography>
        </div>
    </Card>
    </div>
}
