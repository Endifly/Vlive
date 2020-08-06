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
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyle = makeStyles(()=>({
    root : {
        width:"90%",
        background:"white",
        height:"calc((100vh - 64px)*0.5 - 32px - 40px)",
        // border:"2px solid gray",
        borderRadius:"8px",
        marginBottom:"20px",
        marginLeft:"5%",
        
    },
    itemList : {
        overflowY:"scroll",
        height:"calc((100vh - 64px)*0.5 - 32px - 80px - 24px - 40px)",
    },
}))

const mockItem = ["pen","airpods","ipad pro","wireless charger","paracetamal","router","apple watch","Rolex"]

function ItemDashboard({setItemSearch}) {
    const classes = useStyle()
    const [searchItem,setSearchItem] = useState("")
    const [menuOpen,setMenuOpen] = useState("")
    const [anchorEl, setAnchorEl] = useState(null);

    const handleSearch = (e) => {
        setSearchItem(e.target.value)
    }

    const search = (item) => {
        return !item||(item.slice(0,(searchItem).length).toLowerCase()===searchItem.toLowerCase())
    }

    const handleOpen = (e,item) => {
        setMenuOpen(item)
        setAnchorEl(e.currentTarget)
    }

    const handleClose = (e) => {
        setMenuOpen("")
        setAnchorEl(null)
    }

    const handleSearchitem = (item) => {
        setItemSearch(item)
        setMenuOpen("")
        setAnchorEl(null)
    }

    const menuRender = (item) => (
        <Menu
            anchorEl={anchorEl}
            open = {item===menuOpen}
            keepMounted
            onClose = {handleClose}
        >
            <MenuItem onClick={(e)=>{handleSearchitem(item)} }>search</MenuItem>
            <MenuItem >edit</MenuItem>
            <MenuItem >remove</MenuItem>
        </Menu>
    )
    return (
    <Grid container >
        <Card elevation={6} className={classes.root}>
            <CardContent >
            <Grid container justify="flex-start" alignItems="center" style={{height:"40px"}}>
                <Grid item><AddShoppingCartIcon style={{marginTop:"4px",fontSize:"40px"}}/></Grid>
                <Grid item><Typography variant="h5" style={{marginLeft:"16px"}}>ค้นหาสินค้า</Typography></Grid>
            </Grid>
            <Grid container justify="center" alignItems="center" style={{marginTop:"8px",height:"40px"}}>
                <TextField variant="outlined" fullWidth size="small" placeholder="ชื่อสินค้า" value={searchItem}
                    InputProps={{
                    endAdornment: <InputAdornment position="end"><IconButton><SearchIcon/></IconButton></InputAdornment>,
                    }}
                    onChange={handleSearch}
                ></TextField>
            </Grid>
            <Grid container justify="flex-start" direction="column" wrap="nowrap" className={classes.itemList}>
                {mockItem.map((item)=>(  search(item) &&
                    <Grid item>
                        <Card elevation={0} style={{display:"flex",flexDirection:"row"}}><CardActionArea onClick={(e)=>handleSearchitem(item)} style={{display:"flex",flexDirection:"row",height:"48px"}}>
                            {menuRender(item)}
                            <Typography style={{marginRight:"auto"}}>{item}</Typography>
                            
                        </CardActionArea>
                        <IconButton style={{marginTop:"0",padding:"8px"}} onClick={(e)=>handleOpen(e,item)}><MoreVertIcon/></IconButton></Card>
                        <Divider/>
                    </Grid>
                ))}
            </Grid>
            </CardContent>
        </Card>
    </Grid>
    )
}
export default ItemDashboard