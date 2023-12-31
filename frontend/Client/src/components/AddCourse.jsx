import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import AdminBar from './AdminBar.jsx';
import { addCourse } from '../Logics/addCourse.js';
import { useNavigate } from 'react-router-dom';


export default function Addcourse() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    // const [category, setCategory] = useState([]);
    const [image, setImage] = useState('');

    const navigate = useNavigate();

    return <div>
        <AdminBar></AdminBar>
        <div style={{
                paddingTop : 150,
                marginBottom : '10', 
                display: 'flex',
                justifyContent: 'center',
            }}>
                <Typography variant="h6">
                    ADD COURSE DETAILS
                </Typography>
        </div>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
        }}>
            <Card variant='outlined' style={{
                padding : '10px',
                width : '400px',
            }}>
                <TextField label="Title" variant="outlined" style={{
                    width : "100%",
                    marginBottom : '10px',
                }} onChange={(e) => {
                    setTitle(e.target.value);
                }} required />
                <TextField label="Description" variant="outlined" style={{
                    width : "100%",
                    marginBottom : '10px',
                }} onChange={(e) => {
                    setDescription(e.target.value);
                }} required />
                <TextField label="Price" type='Number' variant="outlined" style={{
                    width : "100%",
                    marginBottom : '10px',
                }} onChange={(p) => {
                    setPrice(p.target.value);
                }} required />
                <TextField label="imageLink" variant="outlined" style={{
                    width : "100%",
                    marginBottom : '10px',
                }} onChange={(e) => {
                    setImage(e.target.value);
                }} required />
                {/* <TextField label="Category" variant="outlined" style={{
                    width : "100%",
                    marginBottom : '10px',
                }} onChange={(e) => {
                    setCategory(e.target.value);
                }} /> */}
                <Button size={'large'} variant='contained' onClick={() => addCourse({
                    title,
                    description,
                    price,
                    // category,
                    imgLink : image,
                    published : true,
                }, navigate)}>Publish</Button>
            </Card>
        </div>
    </div>
}