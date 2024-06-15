import { Card, Grid, Dialog, DialogTitle, DialogContent, DialogActions, Typography, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CourseCard } from "./courseCard.jsx";
import { getComments, getFeedbacks } from "../Logics/editCourse.js";
import { set } from "mongoose";

function EditCourse() {
    let { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [openCommentsDialog, setOpenCommentsDialog] = useState(false);
    const [openFeedbacksDialog, setOpenFeedbacksDialog] = useState(false);

    const openComments = async () => {
        setOpenCommentsDialog(true);
    };

    const openFeedbacks = async () => {
        setOpenFeedbacksDialog(true);
    };
    
    useEffect(() => {
        axios.get("http://localhost:3000/admin/courses/" + courseId, {
            method: "GET",
            headers: {
                "authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            setCourse(res.data);
        });
    }, []);

    if (!course) {
        return <div style={{height: "100vh", justifyContent: "center", flexDirection: "column"}}>
            Loading....
        </div>
    }

    return <div>
        <GrayTopper title={course.title}/>
        <Grid container>
            <Grid item lg={8} md={12} sm={12}>
                <UpdateCard course={course} setCourse={setCourse} />
            </Grid>
            <Grid item lg={4} md={12} sm={12}>
                <CourseCard course={course} />
                <div style={{
                    display: "flex",
                    justifyContent: 'space-around',
                }}>
                    <div style={{color: 'blueviolet', cursor: 'pointer',}} onClick={openComments}>
                        <Typography>Open Comments</Typography>
                    </div>
                    <div style={{color: 'blueviolet', cursor:'pointer'}} onClick={openFeedbacks}>
                        <Typography>Open Feedback</Typography>
                    </div>
                </div>
            </Grid>
        </Grid>
        <CommentsDialog 
            open={openCommentsDialog} 
            onClose={() => setOpenCommentsDialog(false)}
            courseId={courseId} 
        />
        <FeedbacksDialog 
            open={openFeedbacksDialog}
            onClose={() => setOpenFeedbacksDialog(false)}
            courseId={courseId}
        />
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

function UpdateCard({course, setCourse}) {
    const [title, setTitle] = useState(course.title);
    const [description, setDescription] = useState(course.description);
    const [image, setImage] = useState(course.image);
    const [price, setPrice] = useState(course.price);

    const navigate = useNavigate();

    return <div style={{display: "flex", justifyContent: "center"}}>
    <Card varint={"outlined"} style={{maxWidth: 600, marginTop: 200}}>
        <div style={{padding: 20}}>
            <Typography style={{marginBottom: 10}}>Update course details</Typography>
            <TextField
                value={title}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setTitle(e.target.value)
                }}
                fullWidth={true}
                label="Title"
                variant="outlined"
            />

            <TextField
                value={description}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setDescription(e.target.value)
                }}
                fullWidth={true}
                label="Description"
                variant="outlined"
            />

            <TextField
                value={image}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setImage(e.target.value)
                }}
                fullWidth={true}
                label="Image link"
                variant="outlined"
            />
            <TextField
                value={price}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setPrice(e.target.value)
                }}
                fullWidth={true}
                label="Price"
                variant="outlined"
            />
            <div style={{
                display: "flex",
                justifyContent: "space-between",
            }}>
                <div>
                <Button
                    variant="contained"
                    onClick={async () => {
                        axios.put("http://localhost:3000/admin/courses/" + course._id, {
                            title: title,
                            description: description,
                            imgLink: image,
                            published: true,
                            price
                        }, {
                            headers: {
                                "Content-type": "application/json",
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                        });
                        let updatedCourse = {
                            _id: course._id,
                            title: title,
                            description: description,
                            image: image,
                            price
                        };
                        setCourse(updatedCourse);
                    }}
                > Update course</Button>
                </div>
                <div>
                    <Button onClick={() => {navigate('/admin/upload/' + course._id, {state : {course : course}})}}>Upload Content</Button>
                </div>
            </div>
        </div>
    </Card>
</div>
}

function CommentsDialog({open, onClose, courseId}) {
    return <div>
        <Dialog open={open} onClose={onClose} PaperProps={{
                sx: { width: '600px', maxWidth: '80%', height: '80vh', 
                    maxHeight: '80vh', marginTop: 0 } 
            }}
            sx={{
                top: '50%',
                transform: 'translateY(-50%)',
            }}>
        <DialogContent>
            <CommentsCard />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Close</Button>
        </DialogActions>
        </Dialog>
    </div>
    
}

function FeedbacksDialog({open, onClose, courseId}) {
    return <div>
        <Dialog open={open} onClose={onClose} PaperProps={{
                sx: { width: '600px', maxWidth: '80%', height: '80vh', 
                    maxHeight: '80vh', marginTop: 0 } 
            }}
            sx={{
                top: '50%',
                transform: 'translateY(-50%)',
            }}>
        <DialogContent>
            <FeedbackCard />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Close</Button>
        </DialogActions>
        </Dialog>
    </div>
    
}

function FeedbackCard() {
    const [feedbacks, setFeedbacks] = useState([]);
    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const { data } = await axios.get(
                    `http://localhost:3000/admin/feedbacks/${courseId}`,
                    {
                        headers: {
                            "authorization": "Bearer " + localStorage.getItem("token"),
                        },
                    }
                );
                setFeedbacks(data);
            } catch (error) {
                console.error("Failed to fetch feedbacks:", error);
            }
        }
    }, []);
    return (
        <Card style={{
            display: "flex",
            flexDirection: "column",
            width: 500,
            maxHeight: 500,
            padding: 20,
            overflowY: "auto",
            position: "absolute",
            right: "5%",
          }}>
             <Typography
          variant="h4"
          style={{
            textAlign: "center",
          }}
        >
          Feedbacks
        </Typography>
        <div
          style={{
            borderBlock: "0.05px solid #0513245f",
            borderRadius: 2,
            marginBottom: 10,
          }}
        ></div>
        {
            feedbacks && feedbacks.map((feedback) => {
                return <Card key={feedback._id} style={{marginBottom: 10, padding: 10, overflow: "visible"}}>
                    <Typography variant='caption'>{feedback.username}</Typography>
                    <Typography>{feedback.feedback}</Typography>
                </Card>
            })
        }
        </Card>
    )
}

function CommentsCard() {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [replyText, setReplyText] = useState({});
    const [showReplyInput, setShowReplyInput] = useState({});
    const courseId = useParams().courseId;
    const [showReplies, setShowReplies] = useState({});
  
    const userEmail = sessionStorage.getItem("email");
  
    useEffect(() => {
      const fetchComments = async () => {
        try {
          const { data } = await axios.get(
            `http://localhost:3000/admin/comments/${courseId}`,
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
              `http://localhost:3000/admin/comments/${courseId}`,
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
          `http://localhost:3000/admin/comments/${courseId}/${commentId}`,
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
    };
  
  
  const handleReplySubmit = async (commentId) => {
      if (replyText[commentId].trim()) { 
        try {
          const { data } = await axios.post(
            `http://localhost:3000/admin/comments/replies/${courseId}/${commentId}`,
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
        } catch (error) {
          console.error("Failed to submit reply:", error);
        }
      }
    };
  
    const deleteReply = async (commentId, replyId) => {
      try {
  
        setComments((prevComments) => prevComments.map((comment) => {
          if (comment._id === commentId) {
            // Filter out the deleted reply
            const updatedReplies = comment.replies.filter((reply) => reply._id !== replyId);
            return { ...comment, replies: updatedReplies };
          }
          return comment;
        }));
  
        await axios.delete(`http://localhost:3000/admin/comments/replies/${courseId}/${commentId}/${replyId}`, {
          headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer " + localStorage.getItem("token"),
          },
        });
        // Update the comments state to remove the deleted reply
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
        //   marginTop: 260,
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
              {userEmail == comment.email ? 
                (<Typography variant='caption'>{comment.username}(YOU)</Typography>) : 
                (<Typography variant='caption'>{comment.username}</Typography>)
              }
              <Typography>{comment.comment}</Typography>
              {comment.email == userEmail && (
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
              )}
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
                Reply
              </Typography>
              <Typography variant='caption'
              style={{
                color: "gray",
                padding: 10,
                paddingLeft: 0,
                cursor: "pointer",
              }} 
              onClick={() => setShowReplies((prev) => ({
                ...prev,
                [comment._id]: !prev[comment._id], 
              }))}>
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
              {comment.replies && showReplies[comment._id] &&
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
                    <Typography variant='caption'>{reply.username}</Typography>
                    <Typography>{reply.text}</Typography>
                    {reply.email === userEmail && (
                      <Typography variant="caption" style={{color: "red", cursor: "pointer"}}
                      onClick = {() => deleteReply(comment._id, reply._id)}
                      >Delete</Typography>
                    )}
                  </Card>
                ))}
            </Card>
          ))}
      </Card>
    );
  }

export default EditCourse;