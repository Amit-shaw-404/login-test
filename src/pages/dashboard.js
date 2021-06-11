import { Button, makeStyles } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router";
import "../index.css";
import Register from './register';
import UserInfo from "./userInfo";

const useStyles = makeStyles((theme) => ({
    container:{
      minHeight: '100vh',
      width:'100%',
      backgroundImage: 'url(http://www.bird-wittenbergdental.com/wp-content/uploads/2017/01/top-line-management-login-background-1.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
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
    nav:{
        display:'flex',
        width:'100%',
        boxSizing:'border-box',
        justifyContent:'space-between',
        [theme.breakpoints.only("xs")]:{
            padding:'30px 10px'
        },
        [theme.breakpoints.only("sm")]:{
            padding:'35px 20px',
        },
        [theme.breakpoints.only("md")]:{
            padding:'30px 25px'
        },
        [theme.breakpoints.only("lg")]:{
            padding:'40px 40px'
        },
    },
    title:{
        fontFamily:'Balsamiq Sans',
        fontSize:'1.2rem',
        color:'#fff',
    },
    dashboard:{
        display:'flex',
        justifyContent:'center',
        width:'100%',
    },
    main:{
        [theme.breakpoints.only("xs")]:{
            width:'90%',
            marginTop:'20px'
        },
        [theme.breakpoints.only("sm")]:{
            width:'75%',
            marginTop:'35px'
        },
        [theme.breakpoints.only("md")]:{
            width:'50%',
            marginTop:'50px'
        },
        [theme.breakpoints.only("lg")]:{
            width:'35%',
            marginTop:'60px'
    
        },
    }
}))

const DashBoard=(props)=>{
    const classes=useStyles();

    const [access, setAccess]=useState(false);
    const [msg, setMsg]=useState('Please wait, loading...');
    const [tab, setTab]=useState(1);
    const history=useHistory()
    const path=history.location.pathname.replace("/", "");

    useEffect(()=>{
        const request=async()=>{
            axios.get("https://nemesistask-backend.herokuapp.com/validate", {
                headers:{
                    "x-access-token":localStorage.getItem(`token${path}`),
                }
            }).then(res=>{
                setAccess(true);  
            })
            .catch(err=>{
                setMsg("Session expired, please login again!");
            })
        }
        request();
    }, [])
    return(
        <>
        {!access?<h1>{msg}</h1>:
            <div className={classes.container}>
                <div className={classes.nav}>
                    <div className={classes.title}>
                        <h1>Task</h1>
                    </div>
                    <div className={classes.tabs}>
                        <Button style={{color:'#fff'}} onClick={()=>setTab(1)}>Register</Button>
                        <Button style={{color:'#fff'}} onClick={()=>setTab(2)}>Profile</Button>
                    </div>
                </div>
                <div className={classes.dashboard}>
                    <div className={classes.main}>
                        {tab===1&&<Register/>}
                        {tab===2&&<UserInfo id={path}/>}
                    </div>
                </div>  
            </div>
        }
    </>
    );
}
export default withRouter(DashBoard);