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
const darkGreen = "#00610b"

const useStyle = makeStyles(()=>({
    root : {
        width:"100%",
        height:"calc((100vh - 64px) - 64px - 80px + 20px)",
        background:"white",
        // border:"1px solid gray",
        borderRadius:"8px",
    },
    showDetail:{
        border:"2px solid #00610b",
        height:"calc((100vh - 64px)*0.9 - 32px - 80px - 64px)",
        marginLeft:"16px",borderRadius:"8px"
    },
    divider : {
        background:darkGreen,
    }
}))
const mockCF = [
    {buyerName:"Tana",orderId:"1463846351",item:"pen",amount:"12",price:"230",date:date.toString(), location:"110/480 bangapi lardprow bangkok 10240"},
    {buyerName:"Kajonyos",orderId:"2463846351",item:"airpods",amount:"1",price:"7750",date:date.toString(),location:"110/480 bangapi lardprow bangkok 10240"},
    {buyerName:"John",orderId:"3463846351",item:"ipad pro",amount:"1",price:"25400",date:date.toString(),location:"110/480 bangapi lardprow bangkok 10240"},
    {buyerName:"Alexa",orderId:"4463846351",item:"Rasberi pi",amount:"2",price:"8400",date:date.toString(),location:"110/480 bangapi lardprow bangkok 10240"},
    {buyerName:"Somchai",orderId:"5463846351",item:"Microphone",amount:"1",price:"490",date:date.toString(),location:"110/480 bangapi lardprow bangkok 10240"},
    {buyerName:"Somchai",orderId:"5463846352",item:"Keyboard",amount:"1",price:"700",date:date.toString(),location:"110/480 bangapi lardprow bangkok 10240"},
    {buyerName:"Somchai",orderId:"5463846353",item:"Monitor",amount:"1",price:"140000",date:date.toString(),location:"110/480 bangapi lardprow bangkok 10240"},
    {buyerName:"Michale",orderId:"6463846351",item:"Iburofen",amount:"20",price:"260",date:date.toString(),location:"110/480 bangapi lardprow bangkok 10240"},
    {buyerName:"Pintip",orderId:"8463846355",item:"bluetooth headset",amount:"1",price:"2400",date:date.toString(),location:"110/480 bangapi lardprow bangkok 10240"},
    {buyerName:"John",orderId:"3463846351",item:"ipad pro",amount:"1",price:"25400",date:date.toString(),location:"110/480 bangapi lardprow bangkok 10240"},
    {buyerName:"John",orderId:"3463846351",item:"ipad pro",amount:"1",price:"25400",date:date.toString(),location:"110/480 bangapi lardprow bangkok 10240"},
    {buyerName:"John",orderId:"3463846351",item:"ipad pro",amount:"1",price:"25400",date:date.toString(),location:"110/480 bangapi lardprow bangkok 10240"},
    {buyerName:"Pintip",orderId:"8141146356",item:"18W adaptor",amount:"2",price:"1500",date:date.toString(),location:"110/480 bangapi lardprow bangkok 10240"},
]

const sortBy = ["date","item","price","orderId","buyerName"]

function CFDashboard({customserSearch,itemSearch}) {
    const classes = useStyle()
    const [searchOrder,setSearchOrder] = useState("")
    const [orderSelected,setOrderSelected] = useState(mockCF[0].orderId)

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
        let orderDetail = mockCF.filter(order => {
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
                    <Grid item><Typography variant="h5">{`แจ้งโอน/ชำระเงิน (${mockCF.length})`}</Typography></Grid>
                </Grid>

                <Grid container justify="flex-start" spacing={3} >
                    <Grid item xs={5}><TextField variant="outlined" fullWidth onChange={handleSearch} value={searchOrder}  size="small" placeholder="ค้นหารายการสั่งซื้อ"
                    InputProps={searchOrder ? {
                        endAdornment: <InputAdornment position="end"><IconButton onClick={(e)=>setSearchOrder("")}><ClearIcon/></IconButton></InputAdornment>,
                        
                    }:{
                        endAdornment: <InputAdornment position="end"><IconButton><KeyboardReturnIcon/></IconButton></InputAdornment>,
                    }}
                    /></Grid>
                    <Grid item xs={2}><TextField variant="outlined" fullWidth size="small" label="sort by" select>
                        {sortBy.map((sorter)=>(
                            <MenuItem value={sorter}>{sorter}</MenuItem>
                        ))}
                    </TextField></Grid>
                    {/* <Card style={{width:"40%",border:"1px solid black",height:"40px"}} elevation={0}></Card> */}
                </Grid>

                <Grid container spacing={0}>
                    <Grid container item xs={7} justify="flex-start" direction="column" wrap="nowrap" style={{overflowY:"scroll",height:"calc((100vh - 64px) - 64px - 80px + 20px - 32px - 80px - 48px)"}}>
                        
                        {mockCF.map((orderDetail)=>(  search(orderDetail) &&
                            <Grid item style={{marginRight:"16px"}}>
                                <Card elevation={0} style={{cursor:"pointer"}}><CardActionArea onClick={(e)=>setOrderSelected(orderDetail.orderId)} style={{display:"flex",flexDirection:"row",height:"40px",padding:"8px 0"}}>
                                    <Typography style={{marginRight:"auto"}}>{orderDetail.buyerName}</Typography>
                                    <Typography style={{color:"gray",marginRight:"16px"}}>{`${orderDetail.item} x ${orderDetail.amount}`}</Typography>
                                    <Typography style={{color:"gray"}}>{`#${orderDetail.orderId}`}</Typography>
                                </CardActionArea></Card>
                                <Divider className={classes.divider}/>
                            </Grid>
                        ))}
                    </Grid>
                    <Grid container item xs={5} justify="flex-start" direction="column" wrap="nowrap" style={{overflowY:"scroll",height:"calc((100vh - 64px) - 64px - 80px + 20px - 32px - 80px - 48px)"}}>
                        <Paper className={classes.showDetail}>
                            {showDetail()}
                        </Paper>
                    </Grid>
                </Grid>
            </CardContent>
        </Paper>
    </Grid>
    )
}
export default CFDashboard