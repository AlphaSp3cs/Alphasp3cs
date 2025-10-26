export const SYMBOLS = ['AMC', 'GME', 'BB', 'NOK', 'SNDL', 'KOSS', 'EXPR', 'AAL', 'CCL', 'RIG', 'PLTR', 'SPCE'];
export const SCAN_INTERVAL = 15000; // 15 seconds

// Scanning Criteria
export const VOLUME_MULTIPLIER = 5.0;
export const GAP_THRESHOLD = 5.0; // %
export const MIN_VOLUME = 100000;
export const MIN_PRICE = 1.0;
export const MAX_PRICE = 100.0;
export const NEW_HIGH_THRESHOLD = 95.0; // % of 52-week high
export const REVERSAL_BOUNCE_THRESHOLD = 2.0; // % bounce from low
export const MOMENTUM_RSI_THRESHOLD = 70;
