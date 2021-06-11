import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect, withRouter } from 'react-router';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {  InputAdornment, IconButton } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress'



const useStyles = makeStyles((theme) => ({
  container:{
    minHeight: '100vh',
    width:'100%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fafafa',
  },
  root: {
    [theme.breakpoints.only("xs")]:{
        width:'100%',
        height:'100%',
    },
    [theme.breakpoints.only("sm")]:{
        width:'70%',
    },
    [theme.breakpoints.only("md")]:{
        width:'80%',
        minHeight:'75vh'
    },
    [theme.breakpoints.only("lg")]:{
        width:'70%',
        minHeight:'75vh'

    },
  },
  image: {
    backgroundImage: 'url(https://mail20.mymailcheap.com/web/assets/media/misc/bg_icon.svg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn() {
  const classes = useStyles();

  const [details, setDetails]=useState({});
  const [emailErr, setEmailErr]=useState('');
  const [passErr, setPassErr]=useState('');
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [id, setId]=useState('');

  const handleClickShowPassword = () => setShowPassword(!showPassword); 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange=(event)=>{
    if(event.target.name=='password'){
      setPassErr('');
    }else{
      setEmailErr('');
    }
    setDetails({...details, [event.target.name]:event.target.value});
  }

  const handleSubmit=(event)=>{
    handleClickOpen();
    event.preventDefault();
    axios.post("https://nemesistask-backend.herokuapp.com/signin", details)
    .then(res=>{
      localStorage.setItem(`token${res.data.user._id}`, res.data.token);
      handleClose();
      setId(res.data.user._id);
    })
    .catch(err=>{
      handleClose();
      if(err.response.data.message=="Invalid Email"){
        setEmailErr('Invalid email address');
      }else if(err.response.data.message=="Incorrect password"){
        setPassErr('Incorrect password');
      }
      alert(err.response.data.message);
    })
  }

  return (
    <>
      {id!==''?
        <Redirect from="/" to={`/${id}`}></Redirect>
        :
        <div className={classes.container}>
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={false} md={7} className={classes.image} />
            <Grid item xs={12} sm={12} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
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
                    name="password"
                    label="Password"
                    type={!showPassword?"password":'text'}
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    />  
                    {passErr?<p style={{color:'#F32013', margin:'5px 0', fontSize:'13px'}}>{passErr}</p>:""}
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    >
                    Sign In
                    </Button>
                </form>
                </div>
            </Grid>
        </Grid>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle>Loading</DialogTitle>
        <DialogContent>
          <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <CircularProgress/>
            <h3>Please wait...</h3>
          </div>
        </DialogContent>
      </Dialog>
    </div>}
    </>
  );
}

export default withRouter(SignIn);