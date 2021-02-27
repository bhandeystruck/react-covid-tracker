export const sortData = (data) => {
    const sortedData = [...data];
    return sortedData.sort((a,b) => (a.cases > b.cases ? -1:1));

}


// export const buildChartData = (data,casesType="cases") =>{
//     const chartData = [];
//     let lastDataPoint;   

//     data[casesType].forEach((date)=>{
//         if(lastDataPoint){
//             const newDataPoint = {
//                 x:date,
//                 y:data[casesType][data] - lastDataPoint,
//             };

//            chartData.push(newDataPoint);
//         }
//         lastDataPoint = data[casesType][date];
//     });
//     return chartData;
// };