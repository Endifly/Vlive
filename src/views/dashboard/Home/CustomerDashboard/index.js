import React, {useState} from "react";
import {
    CardActionArea,
    Grid,
    Card,
    CardContent,
    makeStyles,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
    Divider,
} from "@material-ui/core/";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import SearchIcon from '@material-ui/icons/Search';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyle = makeStyles(()=>({
    root : {
        width:"90%",
        background:"white",
        height:"calc((100vh - 64px)*0.5 - 32px - 40px)",
        // border:"1px solid gray",
        marginBottom:"20px",
        borderRadius:"8px",
        marginLeft:"5%",
    },
    customerList : {
        overflowY:"scroll",
        height:"calc((100vh - 64px)*0.5 - 32px - 80px - 24px - 40px)",
    },
}))

function CustomerDashboard({setCusomerSearch}) {
    const classes = useStyle()
    const [searchName,setSearchName] = useState("")
    const [menuOpen,setMenuOpen] = useState("")
    const [anchorEl, setAnchorEl] = useState(null);
    const mockCustomerOrder = ["Khajonyos","Tanakorn","Kanda","Kann","Somchai","Alex","John","Boonme","Chaka"]

    const CFDashboardSearch = document.getElementById("CFDashboard-textfield")

    const handleSearch = (e) => {
        setSearchName(e.target.value)
    }

    const search = (customer) => {
        return !customer||(customer.slice(0,(searchName).length).toLowerCase()===searchName.toLowerCase())
    }

    const handleOpen = (e,customerName) => {
        setMenuOpen(customerName)
        setAnchorEl(e.currentTarget)
    }

    const handleClose = (e) => {
        setMenuOpen("")
        setAnchorEl(null)
    }

    const handleSearchCustomer = (customName) => {
        setCusomerSearch(customName)
        setMenuOpen("")
        setAnchorEl(null)
    }

    const menuRender = (customerName) => (
        <Menu
            anchorEl={anchorEl}
            open = {customerName===menuOpen}
            keepMounted
            onClose = {handleClose}
        >
            <MenuItem onClick={(e)=>{handleSearchCustomer(customerName)} }>search</MenuItem>
        </Menu>
    )

    return (
        <Grid container >
            <Card elevation={6} className={classes.root}>
                <CardContent >
                    <Grid container justify="flex-start" alignItems="center" style={{height:"40px"}}>
                        <Grid item><PeopleOutlineIcon style={{marginTop:"4px",fontSize:"40px"}}/></Grid>
                        <Grid item><Typography variant="h5" style={{marginLeft:"16px"}}>ค้นหาลูกค้า</Typography></Grid>
                    </Grid>
                    <Grid container justify="center" alignItems="center" style={{marginTop:"8px",height:"40px"}}>
                        <TextField variant="outlined" fullWidth size="small" placeholder="ชื่อลูกค้า"
                            InputProps={{
                            endAdornment: <InputAdornment position="end"><IconButton><SearchIcon/></IconButton></InputAdornment>,
                            }}
                            onChange={handleSearch}
                        ></TextField>
                    </Grid>
                    <Grid container justify="flex-start" direction="column" wrap="nowrap" className={classes.customerList}>
                        {mockCustomerOrder.map((customer)=>(  search(customer) &&
                            <Grid item>
                                <Card elevation={0} style={{display:"flex",flexDirection:"row"}}><CardActionArea onClick={(e)=>handleSearchCustomer(customer)} style={{display:"flex",flexDirection:"row",height:"48px"}}>
                                    {menuRender(customer)}
                                    <Typography style={{marginRight:"auto"}}>{customer}</Typography>
                                    
                                </CardActionArea>
                                <IconButton style={{marginTop:"0",padding:"8px"}} onClick={(e)=>handleOpen(e,customer)}><MoreVertIcon/></IconButton></Card>
                                <Divider/>
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default CustomerDashboard