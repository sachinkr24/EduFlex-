import { Card, Grid, InputLabel, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import UserBar from "./userBar";

import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { useLocation } from "react-router-dom";

function Title() {
  const location = useLocation();
  const course = location.state?.course;

  return (
    <div>
      <UserBar  />
      <GrayTopper title={course.title} />
      <Grid container>
        <Grid item lg={8} md={12} sm={12}>
          <StudyCourse />
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
          <CommentsCard />
        </Grid>
      </Grid>
    </div>
  );
}

function GrayTopper({ title }) {
  return (
    <div
      style={{
        height: 250,
        background: "#212121",
        top: 0,
        width: "100vw",
        zIndex: 0,
        marginBottom: -250,
      }}
    >
      <div
        style={{
          height: 250,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <Typography
            style={{ color: "white", fontWeight: 600 }}
            variant="h3"
            textAlign={"center"}
          >
            {title}
          </Typography>
        </div>
      </div>
    </div>
  );
}

function StudyCourse() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const courseId = useParams().courseId;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/users/course/videos/${courseId}`,
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setVideos(data);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      }
    };
    fetchVideos();
  }, []);

  function handleVideoSelection(path) {
    setSelectedVideo(path);
  }

  return (
    <div>
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          width: 500,
          maxHeight: 500,
          padding: 20,
          marginTop: 260,
          overflowY: "auto",
          position: "absolute",
          left: "5%",
        }}
      >
        <Typography
          variant="h4"
          style={{
            textAlign: "center",
          }}
        >
          Course Content
        </Typography>
        <div
          style={{
            borderBlock: "0.05px solid #0513245f",
            borderRadius: 2,
          }}
        ></div>
        {videos &&
          videos.map((video, index) => {
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

function CommentsCard() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const courseId = useParams().courseId;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/users/course/comments/${courseId}`,
          {
            headers: {
              "authorization": "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setComments(res.data);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };
    fetchComments();
  }, []);

  const handleCommentSubmit = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3000/users/course/comments/${courseId}`,
        { text: newComment },
        {
          headers: {
            "authorization": "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setComments([...comments, res.data]);
      setNewComment("");
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

    const deleteComment = async (commentId) => {

        try {
            const res = await axios.delete(
                `http://localhost:3000/users/course/comments/${courseId}/${commentId}`,
                {
                    headers: {
                        "authorization": "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
            setComments(comments.filter((comment) => comment._id !== commentId));
            setNewComment("");
        } catch (error) {
            console.error("Failed to submit comment:", error);
        }
    }

  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        width: 500,
        maxHeight: 500,
        padding: 20,
        marginTop: 260,
        overflowY: "auto",
        position: "absolute",
        right: "5%",
      }}
    >
      <Typography
        variant="h4"
        style={{
          textAlign: "center",
        }}
      >
        Comments
      </Typography>
      <div
        style={{
          borderBlock: "0.05px solid #0513245f",
          borderRadius: 2,
          marginBottom: 10,
        }}
      ></div>
      <TextField
        label="Add a comment"
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        style={{ marginTop: 10 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCommentSubmit}
        style={{ marginTop: 10, marginBottom: 5}}
      >
        Submit
      </Button>
      {comments &&
        comments.map((text, index) => (
          <Card
            key={index}
            style={{
              marginTop: 5,
              marginBottom: 5,
              padding: 10,
              height: "auto",
              overflow: "visible",
            }}
          >
            <Typography variant = "subtitle2" style={{
                color: "gray",
            }}>{text.username}</Typography>
            <Typography>{text.comment}</Typography>
            <div>
                <Typography variant = "caption" style={{
                    color: "red",
                    padding: 10,
                    paddingLeft: 0,
                    cursor: "pointer",
                }} onClick = {() => deleteComment(text._id)}>
                    Delete
                </Typography>
                <Typography variant = "caption" style={{
                    color: "gray",
                    padding: 10,
                    cursor: "pointer",
                }} 
                // onClick = {handleReply}
                >
                    Reply
                </Typography>
            </div>
          </Card>
        ))}
    </Card>
  );
}

export default Title;
