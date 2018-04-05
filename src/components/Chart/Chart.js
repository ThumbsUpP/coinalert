import React from 'react';
import {Line, defaults} from 'react-chartjs-2';


const ChartJS = (props) => {

const dataToConvert = Object.values(props)[0];
let closeData = [];
let openData = [];
let timeStamp = [];

dataToConvert.map((el, i) =>{
    //console.log("el look like da : ",el);
    closeData.push(el.close);
    openData.push(el.open);
    let date = new Date(el.time * 1000)
    let hour = date.getHours()
    hour % 2 === 0 ? timeStamp.push(hour + 'h') : timeStamp.push('')
    return el

})
 


defaults.scale.gridLines.display = false;
defaults.scale.scaleLabel.display = false;
defaults.global.elements.point.backgroundColor ='#2196F3';
defaults.global.defaultFontColor = '#1565C0';
defaults.scale.gridLines.drawBorder = false;
defaults.global.elements.point.radius = 3;
defaults.scale.display = false;


const options = {
    maintainAspectRatio: true,
    legend: {
        display: false
      },
};

const data= {
    labels: timeStamp,
    type: 'line',
    datasets: [{
    label: '$',
    borderColor: '#2196F3',
    backgroundColor: '#90CAF9',
    data: closeData,
    }]
}

    return  <Line data={data} options={options} height={100}   />
}


export default ChartJS
