import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';

export default class BearishSpinningTop extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'BearishSpinningTop';
        this.requiredCount  = 1;
    }
    logic (data:StockData) {
        let daysOpen  = data.open[0];
        let daysClose = data.close[0];
        let daysHigh  = data.high[0];
        let daysLow   = data.low[0];
        /*
        let bodyLength           = Math.abs(daysClose-daysOpen);
        let upperShadowLength    = Math.abs(daysHigh-daysOpen);
        let lowerShadowLength    = Math.abs(daysHigh-daysLow);
        let isBearishSpinningTop = bodyLength < upperShadowLength && 
                               bodyLength < lowerShadowLength;
        */
        let bodyLength           = Math.abs(daysClose-daysOpen); // this is good
        let upperShadowLength    = Math.abs(daysHigh-Math.max(daysOpen,daysClose)); // this should be daysHigh - Math.max(daysOpen, daysClose)
        let lowerShadowLength    = Math.abs(Math.min(daysOpen,daysClose)-daysLow); // this should be Math.min(daysOpen,days.close) - daysLow
        let isBearishSpinningTop = bodyLength < upperShadowLength &&
        bodyLength < lowerShadowLength && daysClose<daysOpen; // this should include check for daysClose < daysOpen
        

        return isBearishSpinningTop;
    }
}

export function bearishspinningtop(data:StockData) {
  return new BearishSpinningTop().hasPattern(data);
}