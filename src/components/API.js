import axios from "axios";
import { React, useState } from "react";

import { Line } from 'react-chartjs-2';

const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
};

const lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const lineChartData = {
    lineChartLabels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [50, 100, 20, 50, 20, 60, 40],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
};

export default function API() {
    const [stockInfo, setStockInfo] = useState(null);
    const [stockInputText, setStockInputText] = useState('.DJI,.IXIC,.SPX');

    const updateStock = (e) => {
        e.preventDefault();

        const fidelityAPI = {
            method: 'GET',
            url: 'https://fidelity-investments.p.rapidapi.com/quotes/get-chart',
            params: {
              symbol: stockInputText, // '.DJI,.IXIC,.SPX'
              startDate: '2020/02/27-09:30:00',
              endDate: '2020/03/02-23:00:00',
              intraday: 'Y',
              granularity: '1'
            },
            headers: {
              'X-RapidAPI-Key': '18da6b6796mshef75c48f2dcd7f8p1dad5djsnd3d4c58dd378',
              'X-RapidAPI-Host': 'fidelity-investments.p.rapidapi.com'
            }
          };
    
        axios.request(fidelityAPI).then(function (response) {
            var obj = fidelityParser(response.data)
            setStockInfo(obj)
        }).catch(function (error) {
            console.error(error);
        });
    }

    const indexOfAll = (arr, val) => arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);
    const parseArrayNum = (arr) => arr.split(" ").map(Number);
    const fidelityParser = (data) => {
        var parse = data.replace('<?xml version="1.0" encoding="UTF-8"?>','');
        parse = parse.replace('\n', '');
        var list = parse.split('>');

        var searchElements = [ '\n<IDENTIFIER', '\n<DESCRIPTION', '\n<TIMESTAMPS', '\n<OPEN', '\n<CLOSE', '\n<HIGH', '\n<LOW' ];
        var obj = {}

        for (var i = 0; i < searchElements.length; i++) {
            // get indexes
            let indexes = indexOfAll(list, searchElements[i]);
            let newAttribute = [];
            for (var j = 0; j < indexes.length; j++) {
                let value = list[indexes[j] + 1];
                value = value.split('</')[0];
                newAttribute.push(value);
            }
            let name = searchElements[i].slice(2);
            obj[name] = newAttribute;
        }

        var reformat = [];
        for (var k = 0; k < obj['DESCRIPTION'].length; k++) {

            // allow & to display
            const strToDecode = obj['DESCRIPTION'][k];
            const parser = new DOMParser();
            const description = parser.parseFromString(`<!doctype html><body>${strToDecode}`, 'text/html').body.textContent;

            var newObj = { 'identifier': obj['IDENTIFIER'][k].slice(1), 'description': description, 'timestamps': parseArrayNum(obj['TIMESTAMPS'][k]), 'open': parseArrayNum(obj['OPEN'][k]), 'close': parseArrayNum(obj['CLOSE'][k]), 'high': parseArrayNum(obj['HIGH'][k]), 'low': parseArrayNum(obj['LOW'][k]) }
            reformat.push(newObj);
        }

        console.log(reformat);
        console.log(obj);
        console.log(data);
        return reformat;
    }

    return (
        <div>



            <form onSubmit={updateStock}>
                <h1>Stocks</h1>
                <input type="text" value={stockInputText} onChange={(event) => setStockInputText(event.value)} />
                <input type="submit" />
            </form>


            { stockInfo ?
                <>
                    {stockInfo.map(ticker => (
                        <p key={ticker['description']}>
                            {ticker['description']} ({ticker['identifier']})


                            <Line
                                options={lineChartOptions}
                                data={lineChartData}
                            />

                        </p>
                    ))}
                </> 
                : <></>
            }


        </div>
    );
}