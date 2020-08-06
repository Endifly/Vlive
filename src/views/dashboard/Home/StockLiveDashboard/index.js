import React, {useState, useEffect, Fragment} from "react";
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
    MenuItem,
    Tooltip ,
} from "@material-ui/core/";
import ClearIcon from '@material-ui/icons/Clear';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { lightGreen } from "@material-ui/core/colors";

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
        border:"2px solid #525252",
        height:"calc((100vh - 64px)*0.9 - 32px - 80px - 64px)",
        marginLeft:"16px",borderRadius:"8px"
    },
    stockTable:{
        height:"250px",
        border:"2px solid #00610b",
        borderRadius:"8px",
        margin:"16px auto 16px 0",
        "& .headerTab" : {
            background:darkGreen,
            display:"flex",
            flexDirection:"row",
            borderRadius:"0px"
        },
        "& .headerText" : {
            marginRight:"auto",
            color:"white",
            padding:"4px"
        },
        "& .addIcon" : {
            color:"white",
            margin:"4px 8px 0 0",
            cursor:"pointer",
        },
        "& .buyerList" : {
            padding:"8px",
        },
        "& .divider" : {
            background:darkGreen
        },
        "& .stockList" : {
            height:"calc(250px - 32px)",
            overflowY:"scroll",
            borderRadius:"8px",
        }
    },
    addStock:{
        marginLeft:"24px",
        background:darkGreen,
        color:"white",
        borderRadius:"8px",
        transition:"background 0.2s ease-in-out",
        "&:hover":{
            background:darkGreen
        }
    }
}))
var stockInit = [
    {itemName:"เสื้อยืด",stockCount:"10",price:"99",description:"เสื้อยืดผ้า cotton",deliveryCost:"10",note:"",stockId:uuidv4()},
    {itemName:"กางเกงยีน",stockCount:"10",price:"99",description:"เสื้อยืดผ้า cotton",deliveryCost:"10",note:"",stockId:uuidv4()},
    {itemName:"เสื้อกันหนาว",stockCount:"10",price:"99",description:"เสื้อยืดผ้า cotton",deliveryCost:"10",note:"",stockId:uuidv4()},
    {itemName:"เสื้อกันฝน",stockCount:"10",price:"99",description:"เสื้อยืดผ้า cotton",deliveryCost:"10",note:"",stockId:uuidv4()},

]

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

const sortBy = ["date","item","price","orderId","buyerName"]

function StockLiveDashboard({customserSearch,itemSearch}) {
    const classes = useStyle()
    const [searchOrder,setSearchOrder] = useState("")
    const [forceUpdate,setForceUpdate] = useState({})
    const [stockCF,setstockCF] = useState(stockInit)
    const [orderSelected,setOrderSelected] = useState("")
    const [stockList,setStockList] = useState({})
    // stockList = {
    //     เสื้อยืด : [
    //         "Chantra",
    //         "Tana",
    //     ]
    // }

    const handleSearch = (e) => {
        setSearchOrder(e.target.value)
    }

    const addMockStock = (e) => {
        let tmpStock = stockCF
        tmpStock.push({itemName:"เคสโทรศัพท์",stockCount:"10",price:"99",description:"เสื้อยืดผ้า cotton",deliveryCost:"30",note:"",stockId:uuidv4()})
        setstockCF(tmpStock)
        return setForceUpdate({})
    }

    const addMockBuyer = (stockId) => {
        if (stockList[stockId] ? stockList[stockId].length+1 <= 10 : true) {
            let mockStock = stockList[stockId] || []
            mockStock.push("Wanna")
            setStockList({...stockList,...{[stockId]:mockStock}})
        }
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
                    <Grid item><Typography variant="h5">{`Stock (${stockCF&&stockCF.length})`}</Typography></Grid>
                    <Grid item><Button className={classes.addStock} onClick={(e)=>{addMockStock()}}><AddBoxIcon style={{margin:"0 8px",fontSize:"20px"}}/><Typography style={{marginRight:"8px",fontSize:"12px"}}>Creare stock</Typography></Button></Grid>
                </Grid>


                <Grid container spacing={0}>
                    <Grid container item xs={12} justify="space-evenly" style={{overflowY:"scroll",height:"calc((100vh - 64px) - 64px - 80px + 20px - 32px - 80px - 48px)"}}>
                        
                        {stockCF&&stockCF.map((item,i)=>(  
                            <Grid item style={{marginRight:"16px"}} xs={11} sm={5} key={`${item.stockId}-${item.itemName}`}>
                                <Paper elevation={0} className={classes.stockTable}>
                                    <Paper elevation={0} className="headerTab">
                                        <Typography className="headerText" style={{marginRight:"16px"}}>{item.itemName}</Typography>
                                        <Typography className="headerText" >{`${stockList[item.stockId] ? stockList[item.stockId].length : "0"}/${item.stockCount}`}</Typography>
                                        <Tooltip title="Add mock user order"><AddBoxIcon className="addIcon" onClick={(e)=>{addMockBuyer(item.stockId)}}/></Tooltip>
                                    </Paper>
                                    <Grid className="stockList">
                                    {stockList[item.stockId]&&stockList[item.stockId].map((buyerDetail,index)=>(
                                        <Grid key={`${buyerDetail}-${item.stockId}-${index}`}>
                                            <Paper elevation={0} className="buyerList">{`${index+1} : ${buyerDetail}`}</Paper>
                                            <Divider className="divider" />
                                        </Grid>
                                    ))}
                                    </Grid>
                                </Paper>
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