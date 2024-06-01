const cron = require('node-cron');
const db = require('../config/db');

cron.schedule('0 0 * * *', () => {
    console.log('Running daily maintenance task...');
    const sql = 'DELETE FROM users WHERE DATE(created_at) < DATE_SUB(NOW(), INTERVAL 1 YEAR)';
    db.query(sql, (err, result) => {
        if (err) console.error('Error running maintenance task:', err);
        else console.log('Maintenance task completed:', result);
    });
});

module.exports = cron;
