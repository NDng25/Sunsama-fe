export const mapOrder = (array, order, key)=>{
    array.sort((a,b)=>order.indexOf(a[key])-order.indexOf(a[key]));
    return array;
}