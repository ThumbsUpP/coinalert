import React, { Component } from 'react';
import { Line, defaults } from 'react-chartjs-2';

class chart extends Component {
    state = {
        isLoaded: false
    }

    render() {
        const coin = this.props.coin
        let data = { ...this.props.cData };

        let dataToConvert = Object.values(data[coin].historicData)
        

        let closeData = [];
        let timeStamp = [];

        dataToConvert.map((el, i) => {
            closeData.push(el.close);
            let date = new Date(el.time * 1000)
            let hour = date.getHours()
            timeStamp.push(hour + 'h')
            return el
        })

        //console.log(defaults);
        
        defaults.global.elements.point.backgroundColor = '#2196F3';
        defaults.global.elements.point.radius = 0;
        defaults.scale.display = false;
        defaults.global.elements.point.hitRadius = 10;
        defaults.global.elements.point.hoverBorderWidth = 10


        const options = {
            maintainAspectRatio: true,
            legend: {
                display: false
            },
        };

        const datas = {
            labels: timeStamp,
            type: 'line',
            datasets: [{
                label: '$',
                borderColor: '#52D3E7',
                backgroundColor: '#52D3E7',
                data: closeData,
            }]
        }
        return (
            <div>
                <Line data={datas} options={options} height={100} width={380}/>
            </div>
        );
    }
}

export default chart;
