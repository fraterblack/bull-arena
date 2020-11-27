const Arena = require('bull-arena');
const Bull = require('bull');
const express = require('express');

const app = express();

const redis = {
    port: 6379,
    host: 'localhost',
};

////

const arenaConfig = Arena(
    {
        Bull,
        queues: [
            {
                type: 'bull',
                name: "timesheet_main_queue",
                hostId: "Main Queue",
                redis,
            },
            {
                type: 'bull',
                name: "timesheet_calculation_queue",
                hostId: "Calculation Queue",
                redis,
            },
            {
                type: 'bull',
                name: "timesheet_reprocessing_queue",
                hostId: "Reprocessing Queue",
                redis,
            },
        ],
    },
    {
        basePath: '/',
        disableListen: true
    });

app.use('/', arenaConfig);

app.listen(5678, function () {
    console.log('Listening on port 5678');
});