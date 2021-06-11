import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import BlockIcon from '@material-ui/icons/Block';
import "../index.css";
import { IconButton } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });  

function UserInfo(){
    const [details, setDetails]=useState({email:'', username:'', mobile:'', address:''});
    const [open, setOpen] = React.useState(false);
    const [name, setName]=useState('');

    const handleClickOpen = (str) => {
        setOpen(true);
        setName(str);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const id=useHistory().location.pathname.replace("/", "");
    useEffect(()=>{
        const request=()=>{
            axios.post("https://nemesistask-backend.herokuapp.com/user", {id:id})
            .then(res=>{
                setDetails(res.data);
            })
            .catch(err=>{
            })
        }
        request();
    }, [])    
    const handleUpdate=()=>{
        const data={...details, [name]:''};
        axios.post("https://nemesistask-backend.herokuapp.com/update", data)
        .then(res=>{
            alert("Updated successfully")
            setDetails(data);
        })
        .catch(err=>{
            alert('Something went wrong, please try again');
        })
    }
    return(
        <div style={{background:'#fff', width:'100%'}}>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Value</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Email</td>
                    <td>{details.email}</td>
                    <td>
                        <div style={{display:'flex', justifyContent:'space-around'}}>
                            <BlockIcon style={{cursor:'not-allowed'}}/>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>Username</td>
                    <td>{details.username}</td>
                    <td>
                    <div style={{display:'flex', justifyContent:'space-around'}}>
                        <IconButton onClick={()=>handleClickOpen("username")}>
                            <DeleteIcon/>
                        </IconButton>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>Mobile</td>
                    <td>{details.mobile}</td>
                    <td>
                    <div style={{display:'flex', justifyContent:'space-around'}}>
                        <IconButton name="mobile" onClick={()=>handleClickOpen("mobile")}>
                            <DeleteIcon/>
                        </IconButton>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>Address</td>
                    <td>{details.address}</td>
                    <td>
                    <div style={{display:'flex', justifyContent:'space-around'}}>
                        <IconButton name="address" onClick={()=>handleClickOpen("address")}>
                            <DeleteIcon/>
                        </IconButton>
                        </div>
                    </td>
                    
                </tr>
            </tbody>
        </table>
        <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>Warning</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>{handleClose(); handleUpdate()}} variant="contained" color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    );
}
export default withRouter(UserInfo);