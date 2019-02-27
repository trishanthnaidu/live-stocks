import React from 'react';
import {
    getCellTemplateForLoss,
    getCellTemplateForProfit,
    getCellTemplateForFirstUpdate
} from '../constants.js';

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