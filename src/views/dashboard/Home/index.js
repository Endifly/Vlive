import React , {useState} from "react";
import {
    Button,
    Grid,
    Card,
    CardContent,
    makeStyles,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
    Tab,
    Tabs,
    Chip,
    CardActionArea,
    Hidden
} from "@material-ui/core/";
import ListIcon from '@material-ui/icons/List';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import CustomerDashboard from './CustomerDashboard'
import CFDashboard from './CFDashboard';
import ItemDashboard from './ItemDashboard'
import AcceptedDashboard from './AcceptedDashboard'
import StockLiveDashboard from './StockLiveDashboard'
import Clock from 'react-live-clock';

const lightGreen = "#fcfffd"
const darkGreen = "#2196f3"
const darkBlue = "#00610b"

const useStyle = makeStyles(()=>({
    root : {
        height:"calc(100vh - 64px)",
        // padding:"32px",
        background:lightGreen,
    },
    cfAccepted : {
        width:"100%",
        background:"white",
    },
    addItem : {
        width:"100%",
        background:"white",
    },
    clock : {
        fontSize:"32px",
        fontWeight:"450",
    },
    tabs : {
        color:"#00610b",
        "& .MuiTabs-indicator":{
            background:"#00610b",
            height:"3px",
            borderRadius:"8px",
        },
        "& .MuiTab-root" : {
            borderRadius:"8px"
        },
        padding:"0px 16px",
        marginTop:"6px",
    },
    hotbar : {
        height:"calc((100vh - 64px) - 64px - 80px + 40px)",
        overflowY:"scroll",
        paddingTop:"8px",
        "&::-webkit-scrollbar" : {
            display:"none"
        }
    },
}))

function Home ({}) {
    const classes = useStyle()
    const [customserSearch,setCusomerSearch] = useState("")
    const [itemSearch,setItemSearch] = useState("")
    const [customerAccepted,setCustomerAccepted] = useState("")
    const [itemAccepted,setItemAccepted] = useState("")
    const [value, setValue] = React.useState(2);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }

    return (
        <Grid container className={classes.root} direction="column">
            <Grid item container style={{height:"100px"}} justify="space-evenly" alignItems="center">
                <Grid item md={8} sm={11}>
                    <Card style={{width:"100%",height:"60px",borderRadius:"8px"}} elevation={6}>
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" className={classes.tabs} variant="fullWidth">
                        <Tab label="รายการสั่งซื้อ" {...a11yProps(0)} />
                        <Tab label="แจ้งชำระเงิน" {...a11yProps(1)} />
                        <Tab label="stock live" {...a11yProps(2)} />
                        <Tab label="ส่งข้อความ" {...a11yProps(3)} />
                    </Tabs>
                    </Card>
                </Grid>
                <Hidden smDown>
                    <Grid item xs={3}>
                        <Card style={{width:"90%",height:"60px",borderRadius:"8px",marginLeft:"5%",background:"#00610b"}} elevation={6}>
                            <CardActionArea style={{height:"100%",display:"flex",flexDirection:"row"}}>
                                <MenuIcon style={{color:"white",margin:"0 16px"}}/>
                                <Typography style={{color:"white",textAlign:"center"}} >MANAGE HOTBAR</Typography>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Hidden>
            </Grid>
            <Grid item container justify="space-evenly">
                <Grid item md={8} sm={11} style={{paddingTop:"8px"}}>
                    {(value===0)&&<CFDashboard customserSearch={customserSearch} itemSearch={itemSearch} customerAccepted={customerAccepted} itemAccepted={itemAccepted}/>}
                    {(value===1)&&<AcceptedDashboard customserSearch={customserSearch} itemSearch={itemSearch} customerAccepted={customerAccepted} itemAccepted={itemAccepted}/>}
                    {(value===2)&&<StockLiveDashboard customserSearch={customserSearch} itemSearch={itemSearch} customerAccepted={customerAccepted} itemAccepted={itemAccepted}/>}
                </Grid>
                <Hidden smDown>
                    <Grid item container xs={3}  direction="column" wrap="nowrap" className={classes.hotbar}>
                        <Grid item><CustomerDashboard setCusomerSearch={setCusomerSearch} setCustomerAccepted={setCustomerAccepted}/></Grid>
                        <Grid item><ItemDashboard setItemSearch={setItemSearch} setItemAccepted={setItemAccepted}/></Grid>
                        <Grid item><ItemDashboard setItemSearch={setItemSearch} setItemAccepted={setItemAccepted}/></Grid>
                    </Grid>
                </Hidden>
            </Grid>
            {/* <Grid item container xs={12} spacing={0} justify="space-evenly">
                <Grid item xs={8}><CFDashboard customserSearch={customserSearch} itemSearch={itemSearch} customerAccepted={customerAccepted} itemAccepted={itemAccepted}/></Grid>
                <Grid item xs={4}><CustomerDashboard setCusomerSearch={setCusomerSearch} setCustomerAccepted={setCustomerAccepted}/></Grid>
            </Grid>
            <Grid item container xs={12} spacing={0}>
                <Grid item xs={8}><AcceptedDashboard customserSearch={customserSearch} itemSearch={itemSearch} customerAccepted={customerAccepted} itemAccepted={itemAccepted}/></Grid>
                <Grid item xs={4}><ItemDashboard setItemSearch={setItemSearch} setItemAccepted={setItemAccepted}/></Grid>       
            </Grid> */}
        </Grid>
    )
}
export default Home