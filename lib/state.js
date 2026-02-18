
// lib/state.js
const fs = require('fs');
const path = require('path');

// Go up one level from lib/ to project root
const DATA_FILE = path.join(__dirname, '..', 'data.json');

function loadState() {
    if (fs.existsSync(DATA_FILE)) {
        try {
            const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
            console.log(`[State] Loaded ${data.length} items from ${DATA_FILE}`);
            return data;
        } catch (e) {
            console.error("[State] Failed to load data.json:", e);
        }
    }
    return [];
}

function saveState(data) {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        // console.log(`[State] Saved ${data.length} items to ${DATA_FILE}`);
    } catch (e) {
        console.error("[State] Failed to save data.json:", e);
    }
}

module.exports = {
    loadState,
    saveState
};
