import axios from "axios";
import { React, useState } from "react";

import LineChart from "./LineChart";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'bootstrap/dist/css/bootstrap.min.css';
  
const classifyNews = (newsHeadlineArray) => {
    const cohereOptions = {
        method: 'POST',
        url: 'https://api.cohere.ai/classify',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'Bearer vN4sf6wAW4K9xDDSx0fUNDwz1NqHuYTVgMkj1Wx4'
        },
        data: {
          inputs: newsHeadlineArray,
          examples: [
            {text: 'Dermatologists don\'t like her!', label: 'bad'},
            {text: 'Hello, open to this?', label: 'bad'},
            {text: 'I need help please wire me $1000 right now', label: 'bad'},
            {text: 'Nice to know you ;)', label: 'bad'},
            {text: 'Please help me?', label: 'bad'},
            {text: 'Your parcel will be delivered today', label: 'good'},
            {text: 'Review changes to our Terms and Conditions', label: 'good'},
            {text: 'Weekly sync notes', label: 'good'},
            {text: 'Re: Follow up from today’s meeting', label: 'good'},
            {text: 'Pre-read for tomorrow', label: 'good'}
          ],
          truncate: 'END'
        }
    };

    axios
        .request(cohereOptions)
        .then(function (response) {
        console.log(response.data);
            let confidenceArray = response.data['classifications'].map(item => item['confidence'] * (item['prediction'] === 'good' ? 1 : -1 + 1) );
            var overall = confidenceArray.reduce((partialSum, a) => partialSum + a, 0);
            console.log(overall/ newsHeadlineArray.length)
            return overall / newsHeadlineArray.length;
        })
        .catch(function (error) {
        console.error(error);
        });
  }

  

export default function API() {
    const [stockInfo, setStockInfo] = useState(null);
    const [lineChartData, setLineChartData] = useState(null);
    const [newsObj, setNewsObj] = useState({});
    const [stockInputText, setStockInputText] = useState('.DJI,.IXIC,.SPX');
    const updateStockFromInput = event => setStockInputText(event.target.value);


    const updateStock = (e) => {
        e.preventDefault();
        
        const fidelityAPI = {
            method: 'GET',
            url: 'https://fidelity-investments.p.rapidapi.com/quotes/get-chart',
            params: {
              symbol: stockInputText, // '.DJI,.IXIC,.SPX'
              startDate: '2022/12/28-15:00:00',
              endDate: '2023/01/28-15:00:00',
              intraday: 'Y',
              granularity: '1'
            },
            headers: {
              'X-RapidAPI-Key': '18da6b6796mshef75c48f2dcd7f8p1dad5djsnd3d4c58dd378',
              'X-RapidAPI-Host': 'fidelity-investments.p.rapidapi.com'
            }
        };

        const newsAPI = {
            method: 'GET',
            url: 'https://fidelity-investments.p.rapidapi.com/news/list-top',
            params: {symbol: stockInputText},
            headers: {
              'X-RapidAPI-Key': '18da6b6796mshef75c48f2dcd7f8p1dad5djsnd3d4c58dd378',
              'X-RapidAPI-Host': 'fidelity-investments.p.rapidapi.com'
            }
        };
    
        // pricing information
        axios.request(fidelityAPI).then(function (response) {
            var obj = fidelityParser(response.data)
            setStockInfo(obj)

            setNewsObj({});

            // update line charts
            var containerObj = {};
            for (let stockNum = 0; stockNum < obj.length; stockNum++) {


                // news information
                axios.request(newsAPI).then(function (newsResponse) {
                    let oldNewsObj = newsObj;
                    let newNews = newsResponse.data['headlineResults'];

                    oldNewsObj[obj[stockNum]['identifier']] = newNews;


                    // classify news
                    let newsArray = oldNewsObj[obj[stockNum]['identifier']][0]['headline'].map(item => item['text']);
                    var newsScore = classifyNews(newsArray);
                    console.log(newsScore);




                    console.log(oldNewsObj);
                    setNewsObj(oldNewsObj);
                }).catch(function (error) {
                    console.error(error);
                });


                const lineChartLabels = obj[stockNum]['timestamps'];
                for (let n = 0; n < lineChartLabels.length; n++) {
                    const ms = lineChartLabels[n] * 1000
                    const dateObject = new Date(ms);
                    lineChartLabels[n] = dateObject.toDateString();
                }

                const chartData = {
                    lineChartLabels,
                    datasets: [],
                };

                let currentStockInfo = obj[stockNum];

                var categories = [{ 'name': 'open' }, { 'name': 'close' }, { 'name': 'high' }, { 'name': 'low' }]
                
                for (let cat = 0; cat < categories.length; cat++) {
                    var pricingData = {};
                    for (let i = 0; i < currentStockInfo['timestamps'].length; i++) {
                        pricingData[lineChartLabels[i]] = currentStockInfo[categories[cat]['name']][i]; // closing data
                    }

                    var netGain = currentStockInfo[categories[cat]['name']].at(-1) - currentStockInfo[categories[cat]['name']].at(0) > 0;

                    var newDataset = {
                        label: currentStockInfo['identifier'] + ' - ' + categories[cat]['name'],
                        data: pricingData,
                        borderColor: netGain ? 'green' : 'red',
                        backgroundColor: netGain ? 'green' : 'red',
                    }
                    chartData['datasets'].push(newDataset);
                    containerObj[obj[stockNum]['identifier']] = chartData;
                }

            }

            setLineChartData(containerObj);
            
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

            var newObj = { 'identifier': obj['IDENTIFIER'][k].slice(0), 'description': description, 'timestamps': parseArrayNum(obj['TIMESTAMPS'][k]), 'open': parseArrayNum(obj['OPEN'][k]), 'close': parseArrayNum(obj['CLOSE'][k]), 'high': parseArrayNum(obj['HIGH'][k]), 'low': parseArrayNum(obj['LOW'][k]) }
            reformat.push(newObj);
        }

        console.log(reformat);
        console.log(obj);
        console.log(data);
        return reformat;
    }

    return (
        <div style={{ width: '100%' }}>



            <form onSubmit={updateStock}>
                <h1>Stocks</h1>
                <input type="text" value={stockInputText} onChange={updateStockFromInput} />
                <input type="submit" />
            </form>


            { stockInfo ?
                <>
                    {stockInfo.map(ticker => (
                        <Row key={ticker['identifier']} style={{ minHeight: '40rem', width: '100%' }}>
                            
                            <Col>
                                {ticker['description']} ({ticker['identifier']}) <br />
                                High: ${ticker['high'].sort((a,b)=>a-b).reverse()[0]}{'  '}|{'  '}Low: ${ticker['low'].sort((a,b)=>b-a).reverse()[0]}

                                { newsObj[ticker['identifier']] ? 
                                    <>
                                        {newsObj[ticker['identifier']][0]['headline'].slice(0, 3).map(newsArticle => ( 
                                            <p key={newsArticle['resId']}>{newsArticle['text']}</p> 
                                        ))}
                                    </> : <></> }

                            </Col>
                            <Col>
                                { lineChartData ? <LineChart lineChartData={lineChartData[ticker['identifier']] } /> : <></> }
                            </Col>

                        </Row>
                    ))}
                </> 
                : <></>
            }


        </div>
    );
}