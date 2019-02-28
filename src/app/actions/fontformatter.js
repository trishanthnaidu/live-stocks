import React from 'react';
import {
    getCellTemplateForLoss,
    getCellTemplateForProfit,
    getCellTemplateForFirstUpdate
} from '../constants.js';

/**
 * function to provide appropriate formatting of the cells as configured
 * @param {*} formatObj : object returned from the formatted event in react-data-grid column definition
 */
const formatCellFonts = formatObj => {
    const row = formatObj.row;
    if (row.isFirstUpdate) {
        return getCellTemplateForFirstUpdate(formatObj);
    } else if (row.isInLoss) {
        return getCellTemplateForLoss(formatObj);
    } else {
        return getCellTemplateForProfit(formatObj);
    }
}

export {
    formatCellFonts
}