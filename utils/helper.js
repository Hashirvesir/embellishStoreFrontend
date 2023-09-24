export const discountedPercentage =(orignalprice,discountprice)=>{
    const discount = orignalprice - discountprice;
    const discountedper = (discount/orignalprice)*100
    return discountedper.toFixed(2)
}