import React from 'react';

const getTime12HR = timeStamp => (
    new Date(timeStamp).toLocaleString('en-US', { hour: 'numeric', hour12: true })
)

const getDate = timeStamp => (
    new Date(timeStamp).getDate()
)

const getMonthShort = timeStamp => (
    new Date(timeStamp).toLocaleString('en-us', { month: 'short' })
)

const getCellTemplateForLoss = formatObj => (
    <div className="custom-cellRenderer" style={{ "backgroundColor": "#d62728", "color": "#fff" }}>{formatObj.value}</div>
)

const getCellTemplateForProfit = formatObj => (
    <div className="custom-cellRenderer" style={{ "backgroundColor": "#2ca02c", "color": "#fff" }}>{formatObj.value}</div>
)

const getCellTemplateForFirstUpdate = formatObj => (
    <div className="custom-cellRenderer" style={{ "backgroundColor": "#eee" }}>{formatObj.value}</div>
)

const getCellTemplateForAll = (formatObj) => (
    <div className="custom-cellRenderer">{formatObj.value}</div>
)

export {
    getDate,
    getMonthShort,
    getTime12HR,
    getCellTemplateForLoss,
    getCellTemplateForProfit,
    getCellTemplateForFirstUpdate,
    getCellTemplateForAll
}