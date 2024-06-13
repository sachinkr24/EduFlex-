import { Card, Grid, InputLabel, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";

import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { useLocation } from "react-router-dom";

function Title() {
  const location = useLocation();
  const course = location.state?.course;

  return (
    <div>
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
  const [replyText, setReplyText] = useState({});
  const [showReplyInput, setShowReplyInput] = useState({});
  const courseId = useParams().courseId;
  const [showReplies, setShowReplies] = useState({});

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/users/course/comments/${courseId}`,
          {
            headers: {
              "authorization": "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setComments(data);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };
    fetchComments();
  }, []);

  const handleCommentSubmit = async () => {
    if(newComment.trim()){
        try {
        const { data } = await axios.post(
            `http://localhost:3000/users/course/comments/${courseId}`,
            { text: newComment },
            {
            headers: {
                "Content-Type" : "application/json",
                "authorization": "Bearer " + localStorage.getItem("token"),
            },
            }
        );
        setComments([...comments, data]);
        setNewComment("");
        } catch (error) {
        console.error("Failed to submit comment:", error);
        }
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(
        `http://localhost:3000/users/course/comments/${courseId}/${commentId}`,
        {
          headers: {
            "authorization": "Bearer " + localStorage.getItem("token"),
          }
        }
      );
      setComments(comments.filter(comment => comment._id !== commentId));
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  const handleReply = (commentId) => {
    setShowReplyInput((prev) => ({
        ...prev,
        [commentId]: !prev[commentId],
      }));
      setShowReplies((prev) => ({
        ...prev,
        [commentId]: !prev[commentId], 
      }));
  };


const handleReplySubmit = async (commentId) => {
    if (replyText[commentId].trim()) { 
      try {
        const { data } = await axios.post(
          `http://localhost:3000/users/course/comments/replies/${courseId}/${commentId}`,
          { text: replyText[commentId] },
          {
            headers: {
              "Content-Type": "application/json",
              "authorization": "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? { ...comment, replies: [...(comment.replies || []), data] }
              : comment
          )
        );
        setReplyText((prev) => ({
          ...prev,
          [commentId]: "",
        }));
        // setShowReplyInput((prev) => ({
        //   ...prev,
        //   [commentId]: !prev[commentId],
        // }));
      } catch (error) {
        console.error("Failed to submit reply:", error);
      }
    }
  };

  const deleteReply = async (commentId, replyId) => {
    try {
      await axios.delete(`http://localhost:3000/users/course/comments/replies/${courseId}/${commentId}/${replyId}`, {
        headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + localStorage.getItem("token"),
        },
      });
      // Update the comments state to remove the deleted reply
      setComments((prevComments) => prevComments.map((comment) => {
        if (comment._id === commentId) {
          // Filter out the deleted reply
          const updatedReplies = comment.replies.filter((reply) => reply._id !== replyId);
          return { ...comment, replies: updatedReplies };
        }
        return comment;
      }));
    } catch (error) {
      console.error("Failed to delete reply:", error);
    }
  };

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
        rows={2}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        style={{ marginTop: 10 }}
        overflow="auto"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCommentSubmit}
        style={{ marginTop: 10, marginBottom: 10}}
      >
        Submit
      </Button>
      {comments &&
        comments.map((comment) => (
          <Card
            key={comment._id}
            style={{
              marginBottom: 10,
              padding: 10,
              overflow: "visible",
            }}
          >
            <Typography>{comment.comment}</Typography>
            <Typography
              variant="caption"
              style={{
                color: "red",
                padding: 10,
                paddingLeft: 0,
                cursor: "pointer",
              }}
              onClick={() => deleteComment(comment._id)}
            >
              Delete
            </Typography>
            <Typography
              variant="caption"
              style={{
                color: "blue",
                padding: 10,
                paddingLeft: 0,
                cursor: "pointer",
              }}
              onClick={() => handleReply(comment._id)}
            >
              Replies
            </Typography>
            {showReplyInput[comment._id] && (
              <div style={{ marginTop: 10 }}>
                <TextField
                  label="Reply"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={2}
                  value={replyText[comment._id] || ""}
                  onChange={(e) =>
                    setReplyText((prev) => ({
                      ...prev,
                      [comment._id]: e.target.value,
                    }))
                  }
                  style={{ marginBottom: 10 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleReplySubmit(comment._id)}
                >
                  Submit Reply
                </Button>
              </div>
            )}
            {comment.replies &&
              comment.replies.map((reply) => (
                <Card
                  key={reply._id}
                  style={{
                    marginTop: 10,
                    marginLeft: 20,
                    padding: 10,
                    overflow: "visible",
                  }}
                >
                  <Typography>{reply.text}</Typography>
                  <Typography variant="caption" style={{color: "red", cursor: "pointer"}}
                  onClick = {() => deleteReply(comment._id, reply._id)}
                  >Delete</Typography>
                </Card>
              ))}
          </Card>
        ))}
    </Card>
  );
}

export default Title;
