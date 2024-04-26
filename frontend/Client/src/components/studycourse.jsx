import { Card, Grid, InputLabel } from "@mui/material";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";

import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { useLocation } from "react-router-dom";



function Title() {
    const location = useLocation();
    const course = location.state?.course;

    return <div>
        <GrayTopper title={course.title}/>
        <Grid container>
            <Grid item lg={8} md={12} sm={12}>
                <StudyCourse />
            </Grid>
        </Grid>
    </div>
}

function GrayTopper({title}) {
    return <div style={{height: 250, background: "#212121", top: 0, width: "100vw", zIndex: 0, marginBottom: -250}}>
        <div style={{ height: 250, display: "flex", justifyContent: "center", flexDirection: "column"}}>
            <div>
                <Typography style={{color: "white", fontWeight: 600}} variant="h3" textAlign={"center"}>
                    {title}
                </Typography>
            </div>
        </div>
    </div>
}

function StudyCourse() {

    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const courseId = useParams().courseId;

    useEffect(() => {
        const fetchVideos = async () => {
            try {
              const { data } = await axios.get(`http://localhost:3000/users/course/videos/${courseId}`, {
                headers: {
                    'authorization' : "Bearer " +  localStorage.getItem("token"),
                }
              });
              setVideos(data);
            } catch (error) {
              console.error('Failed to fetch videos:', error);
            }
          };
          fetchVideos();
    }, []);

    function handleVideoSelection(path) {
        setSelectedVideo(path);
    }

    return (
        <div>
          <Card style={{
            display: "flex",
            flexDirection: "column",
            width : 500,
            maxHeight: 500,
            padding: 20,
            marginTop: 260,
            overflowY: "auto",
            position: "absolute",
            left: "30%"
          }}>
            <Typography variant="h4" style={{
                textAlign: "center",
            }}>Course Content</Typography>
            <div style={{
                borderBlock: "0.05px solid #0513245f",
                borderRadius: 2,
            }}>
            </div>
            {videos && videos.map((video, index) => {
                return (
                <Accordion
                    variant={"outlined"}
                    key={index}
                    style={{
                    border: "0.05px solid #0513245f",
                    borderRadius: 2,
                    width: "100%",
                    height: "10%",
                    marginTop: 10,
                    }}
                >
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    onClick={() => handleVideoSelection(video.path)}
                    >
                    <Typography>{video.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    {selectedVideo === video.path && (
                        <video style={{ width: "100%", height: "auto" }} controls>
                        <source
                            src={`${selectedVideo}/preview`}
                            type="video/mp4"
                        />
                        </video>
                    )}
                    </AccordionDetails>
                </Accordion>
                );
            })}
        </Card>
        </div>
      );
}

export default Title;