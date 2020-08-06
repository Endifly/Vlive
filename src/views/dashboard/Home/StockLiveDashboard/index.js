import React, {useState, useEffect} from "react";
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
    Box,
    Paper,
    Divider,
    CardActionArea,
    MenuItem
} from "@material-ui/core/";
import ClearIcon from '@material-ui/icons/Clear';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const date = new Date()

const useStyle = makeStyles(()=>({
    root : {
        width:"100%",
        height:"calc((100vh - 64px) - 64px - 80px + 20px)",
        background:"white",
        // border:"1px solid gray",
        borderRadius:"8px",
    },
    showDetail:{
        border:"2px solid #525252",
        height:"calc((100vh - 64px)*0.9 - 32px - 80px - 64px)",
        marginLeft:"16px",borderRadius:"8px"
    }
}))
const stockCF = [
    {itemName:"เสื้อยืด",stockCount:"30",price:"99",description:"เสื้อยืดผ้า cotton",deliveryCost:"30",note:"",stockId:"123"},
    {itemName:"กางเกงยีน",stockCount:"30",price:"99",description:"เสื้อยืดผ้า cotton",deliveryCost:"30",note:"",stockId:"123"},
]

const sortBy = ["date","item","price","orderId","buyerName"]

function StockLiveDashboard({customserSearch,itemSearch}) {
    const classes = useStyle()
    const [searchOrder,setSearchOrder] = useState("")
    const [orderSelected,setOrderSelected] = useState(stockCF[0].stockId)

    const handleSearch = (e) => {
        setSearchOrder(e.target.value)
    }

    const search = (orderDetail) => {
        return (!searchOrder||
        (orderDetail.buyerName.slice(0,(searchOrder).length).toLowerCase()===searchOrder.toLowerCase()) ||
        (orderDetail.item.slice(0,(searchOrder).length).toLowerCase()===searchOrder.toLowerCase()) ||
        (orderDetail.orderId.slice(0,(searchOrder).length).toLowerCase()===searchOrder.toLowerCase()) 
        
        )
    }
    useEffect(()=>{
        setSearchOrder(customserSearch)
    },[customserSearch])

    useEffect(()=>{
        setSearchOrder(itemSearch)
    },[itemSearch])

    const showDetail = () => {
        let orderDetail = stockCF.filter(order => {
            return order.orderId === orderSelected
        })
        // Object.keys(orderDetail[0]).map((key)=>{
        //     console.log(orderDetail[0][key])
        // })
        return (
            <Grid style={{marginLeft:"16px",marginTop:"16px"}}>
                {Object.keys(orderDetail[0]).map((key)=>(
                    <Typography>{`${key} : ${orderDetail[0][key]}`}</Typography>
                ))}
            </Grid>
        )
    }


    return (
    <Grid container >
        <Paper elevation={6} className={classes.root}>
            <CardContent >
                <Grid container justify="flex-start" alignItems="center" >
                    <Grid item><IconButton><ShoppingCartIcon style={{marginTop:"4px",fontSize:"40px"}}/></IconButton></Grid>
                    <Grid item><Typography variant="h5">{`Stock (${stockCF.length})`}</Typography></Grid>
                </Grid>


                <Grid container spacing={0}>
                    <Grid container item xs={12} justify="space-evenly" direction="row"  style={{overflowY:"scroll",height:"calc((100vh - 64px) - 64px - 80px + 20px - 32px - 80px - 48px)"}}>
                        
                        {stockCF.map((orderDetail)=>(  search(orderDetail) &&
                            <Grid item style={{marginRight:"16px"}} xs={5}>
                                <Card elevation={3} style={{height:"80px"}}>
                                    <Typography style={{marginRight:"auto"}}>{orderDetail.itemName}</Typography>
                                </Card>
                                {/* <Divider /> */}
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </CardContent>
        </Paper>
    </Grid>
    )
}
export default StockLiveDashboard