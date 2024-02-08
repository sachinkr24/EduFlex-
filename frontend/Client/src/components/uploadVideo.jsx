import { Card, Grid, InputLabel } from "@mui/material";
import { useEffect, useState } from "react"
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from '@mui/material';
import { CourseCard } from "./courseCard.jsx";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import { ProgressBar } from "react-loader-spinner";


function UploadVid() {
    const location = useLocation();
    const course = location.state.course;

    return <div>
        <GrayTopper title={course.title}/>
        <Grid container>
            <Grid item lg={8} md={12} sm={12}>
                <VideoDisplay />
            </Grid>
            <Grid item lg={4} md={12} sm={12}>
                <CourseCard course={course} />
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


function VideoDisplay() {
    
    const { courseId } = useParams();
    const [selectedVideo, setSelectedVideo] = useState(null);
    const videoNameRef = useRef(); 
    const [selectedFile, setSelectedFile] = useState(null);
    const [videos, setVideos] = useState(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0]); 
      };
    
      const handleVideoUpload = async () => {

        setLoading(true);
    
        if (!selectedFile) {
          alert("Please select a file");
          setLoading(false); 
          return;
        }
    
        const videoFile = selectedFile;
        const videoName = videoNameRef.current.value;
    
        const formData = new FormData();
        formData.append("video", videoFile);
        formData.append("name", videoName);
    
        try {
          const response = await axios.post(
            `http://localhost:3000/admin/upload/video/` + courseId,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
          setVideos([
            ...videos,
            { name: response.data.videoName, path: response.data.downloadURL },
          ]);
          console.log(response.data);
        } catch (error) {
          console.error("Failed to upload video", error);
        } finally {
          setLoading(false);
        }
      };
    
      const handleVideoSelection = (videoPath) => {
        setSelectedVideo(videoPath);
    
        setLoading(false);
      };
    
      const handleVideoDelete = async (videoId) => {

        try {
          await axios.delete(
            `http://localhost:3000/admin/delete/video/ ` + courseId,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
    
          setVideos(videos.filter((video) => video.id !== videoId));
        } catch (error) {
          console.error("Failed to delete video", error);
        }
      };
    
      const handleClickOpen = (videoId) => {
        setSelectedVideo(videoId);
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
      const handleConfirmDelete = () => {
        handleVideoDelete(selectedVideo);
        setOpen(false);
      };

      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Dialog open={loading}>
            <DialogTitle
              style={{
                textAlign: "center",
              }}
            >
              Uploading
            </DialogTitle>
            <DialogContent>
              <ProgressBar
                // height="80"
                width="150"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass="progress-bar-wrapper"
                borderColor="#312F28"
                barColor="#3DD85C"
              />{" "}
            </DialogContent>
          </Dialog>
    
          <div>
            <Card
              style={{
                width: 400,
                // marginTop: 200,
                display: "flex",
                flexDirection: "column",
                padding: 20,
                maxHeight: 500,
                overflowY: "auto",
                marginTop: 250,
                marginLeft: 100,
              }}
            >
              <TextField inputRef={videoNameRef} label="Video Name" />
              <div style={{ padding: 10 }}>
                <input
                  style={{ display: "none" }}
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  accept="video/*"
                />
                {selectedFile && (
                  <Typography
                    fontFamily={{
                      fontFamily: "monospace",
                    }}
                    style={{
                      marginBottom: 10,
                    }}
                    variant="subtitle2"
                  >
                    Selected file: {selectedFile.name}
                  </Typography>
                )}
                <div
                  style={{
                    display: "flex",
                    // justifyContent: "center",
                    flexDirection: "row",
                    gap: 10,
                  }}
                >
                  <InputLabel
                    htmlFor="file-upload"
                    style={{
                      padding: 10,
                      color: "white",
                      backgroundColor: "#1a73e9",
                      cursor: "pointer",
                      borderRadius: 4,
                      // marginRight: 150,
                      textAlign: "center",
                      fontSize: 13,
                    }}
                  >
                    BROWSE
                  </InputLabel>
                  { selectedFile ? <Button variant={"contained"} onClick={handleVideoUpload}>
                    Upload Video
                  </Button> : <Button disabled variant={"contained"} onClick={handleVideoUpload}>
                    Upload Video
                  </Button>}
                </div>
              </div>
              {videos && videos.map(
                (video, index) => (
                  console.log(video.path),
                  (
                    <Accordion
                      variant={"outlined"}
                      key={index}
                      style={{
                        border: "0.05px solid #0513245f",
                        borderRadius: 2,
                        width: "100%",
                        height: "10%",
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
    
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleClickOpen(video._id)}
                        >
                          Delete Video
                        </Button>
    
                        <Dialog
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {"Delete Video"}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              Are you sure you want to delete this video?
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose} color="primary">
                              Cancel
                            </Button>
                            <Button
                              onClick={handleConfirmDelete}
                              color="error"
                              variant="outlined"
                              autoFocus
                            >
                              Delete
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </AccordionDetails>
                    </Accordion>
                  )
                )
              )}
            </Card>
          </div>
        </div>
      );
}

export default UploadVid;