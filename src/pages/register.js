import { Button, Divider, makeStyles, TextField } from "@material-ui/core"
import axios from "axios";
import { useState } from "react"
import "../index.css";

const useStyles = makeStyles((theme) => ({
    root:{
        width:'100%',
        boxSizing:'border-box',
        background:'rgba(255, 255, 255, 1)',
        padding:'30px 20px',
        borderRadius:'5px'
    },
    heading:{
        margin:'15px 0',
        fontFamily:'Balsamiq Sans',
        color:'rgba(0,0,0,0.7)',
    },
    text:{
        margin:'15px 0',
        fontFamily:'Arvo',
        fontSize:'15px',
    }
}))

export default function Register({_id}){
    const classes=useStyles();
    const [emailErr, setEmailErr]=useState('');
    const [userErr, setUserErr]=useState('');
    const [mobErr, setMobErr]=useState('');
    const [details, setDetails]=useState({});

    const checkUser=(str)=>{
        for(let i=0;i<str.length;i++){
            let c=str.charCodeAt(i);
            if((c>47&&c<58)||(c>64&&c<91)||(c>96&&c<123)){
                continue;
            }else{
                return false;
            }
        }
        return true;
    }
    const checkMobile=(str)=>{
        if(str.length!==10)return false;
        else{
            for(let i=0;i<10;i++){
                let c=str.charCodeAt(i);
                if(c>47&&c<58){
                    continue;
                }else{
                    return false;
                }
            }
        }
        return true;
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }

    const handleChange=(event)=>{
        if(event.target.name==="email"){
            setEmailErr('');
        }else if(event.target.name==="username"){
            setUserErr('');
        }else if(event.target.name==="mobile"){
            setMobErr('');
        }
        setDetails({...details, [event.target.name]:event.target.value});
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        if(checkUser(details.username)===false){
            setUserErr("Username should be alphanumeric only");
        }else if(!checkMobile(details.mobile)){
            setMobErr("Invalid mobile number");
        }else if(!validateEmail(details.email)){
            setEmailErr("Invalid email address");
        }
        axios.post("https://nemesistask-backend.herokuapp.com/update", details)
        .then(res=>{
            alert("User added successfully!");
        })
        .catch(err=>{
            alert(err.response.data.message);
        })
    }
    return(
        <div className={classes.root}>
            <h1 className={classes.heading}>Personal Details</h1>
            <p className={classes.text}>Fill up the form</p>
            <Divider style={{margin:'15px 0'}}/>
            <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={handleChange}
                    />
                    {emailErr?<p style={{color:'#F32013', margin:'5px 0', fontSize:'13px'}}>{emailErr}</p>:""}
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="username"
                    label="username"
                    type='text'
                    id="username"
                    onChange={handleChange}
                    />  
                    {userErr?<p style={{color:'#F32013', margin:'5px 0', fontSize:'13px'}}>{userErr}</p>:""}
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="mobile"
                    label="mobile"
                    type='text'
                    id="mobile"
                    onChange={handleChange}
                    />  
                    {mobErr?<p style={{color:'#F32013', margin:'5px 0', fontSize:'13px'}}>{mobErr}</p>:""}
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="address"
                    label="address"
                    type='text'
                    id="address"
                    onChange={handleChange}
                    />  
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{margin:'10px 0'}}
                    color="secondary"
                    className={classes.submit}
                    >
                    Submit
                    </Button>
                </form>
        </div>
    )
}