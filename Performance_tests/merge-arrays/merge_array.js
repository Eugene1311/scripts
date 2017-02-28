const possibleStatuses = ['SCHEDULED', 'IN_PROGRESS', 'CANCELLED', 'FAILED', 'DONE'];
const statuses = ['SCHEDULED', 'IN_PROGRESS'];
var firstTimers = [],
    secondTimers = [],
    thirdTimers = [],
    mergedArray = [];

function mergeArraysSecond(incomingResults, existingResults) {
    var startTime = performance.now();

    incomingResults.forEach((incomingResult, i, arr) => {
        const existingResultIndex = existingResults.findIndex(el => el.jobId === incomingResult.jobId);

        if (!~existingResultIndex) {
            return;
        }

        if (!~statuses.indexOf(incomingResult.status)) {
            existingResults.splice(existingResultIndex, 1);
            return;
        }

        const existingResult = existingResults[existingResultIndex];
        const existingResultStatusIndex = statuses.indexOf(existingResult.status);

        if (!~existingResultStatusIndex
            || existingResultStatusIndex >= statuses.indexOf(incomingResult.status)) {
            arr.splice(i, 1);

            return;
        }

        existingResults.splice(existingResultIndex, 1);
    });

    incomingResults.concat(existingResults);

    console.log(performance.now() - startTime, 'second');
    secondTimers.push(performance.now() - startTime);
}

function mergeArraysFirst(incomingResults, existingResults) {
    var startTime = performance.now();

    incomingResults.forEach((result, i, arr) => {
        const existingResult = existingResults.find(item => item.jobId === result.jobId);

        if (!existingResult) {
            return;
        }

        if (!~statuses.indexOf(result.status)) {
            existingResults.splice(existingResults.indexOf(existingResult), 1);
            return;
        }

        if (!~statuses.indexOf(existingResult.status)
            || statuses.indexOf(existingResult.status) > statuses.indexOf(result.status)) {
            arr.splice(i, 1);
            return;
        }

        existingResults.splice(existingResults.indexOf(existingResult), 1);
    });

    incomingResults.concat(existingResults);

    console.log(performance.now() - startTime, 'first');
    firstTimers.push(performance.now() - startTime);
}

function mergeMaps(incomingResults, existingResults) {
    var startTime = performance.now();

    incomingResults = arrayToMap(incomingResults);

    incomingResults.forEach((incomingResult, key, map) => {
        const existingResult = existingResults.get(key);

        if (!existingResult) {
            return;
        }

        if (!~statuses.indexOf(incomingResult.status)) {
            existingResults.delete(key);
            return;
        }

        let existingResultStatusIndex = statuses.indexOf(existingResult.status);

        if (!~existingResultStatusIndex
            || existingResultStatusIndex > statuses.indexOf(incomingResult.status)) {
            incomingResults.delete(key);
            return;
        }

        existingResults.delete(key);
    });

    mergedArray =Array.from(new Map([...incomingResults, ...existingResults]));

    console.log(performance.now() - startTime, 'map');
    thirdTimers.push(performance.now() - startTime);
}

function createArray() {
    var arr = [];

    for(let i = 0; i < 1e4; i++) {
        arr[i] = {
            jobId: Math.floor(Math.random() * 1e4),
            status: possibleStatuses[Math.floor(Math.random() * possibleStatuses.length)]
        }
    }
    return arr;
}

function createMap() {
    var map = new Map();

    for(let i = 0; i < 1e4; i++) {
        let jobId = Math.floor(Math.random() * 1e4);

        map.set(jobId, {
            jobId,
            status: possibleStatuses[Math.floor(Math.random() * possibleStatuses.length)]
        });
    }
    return map;
}

function arrayToMap(arr) {
    var startTime = performance.now();
    var map = new Map();

    arr.forEach(item => map.set(item.jobId, {
        jobId: item.jobId,
        status: item.status
    }));

    console.log(performance.now() - startTime, arr.length, 'arrayToMap');
    return map;
}

var results = createArray(),
    oneMoreResults = createArray(),
    resultsInMap = createMap(),
    oneMoreResultsInMap = createMap();

var arr = [
    {
        jobId: results[1e4 - 1].jobId,
        status: 'CANCELLED'
    },
    {
        jobId: results[1e4 - 5].jobId,
        status: 'IN_PROGRESS'
    }
];

for(let i = 0; i < 10; i++) {
    mergeArraysFirst(arr, results);
    mergeArraysSecond(arr, results);
    mergeMaps(arr, arrayToMap(results));
}

console.log(firstTimers, secondTimers, thirdTimers);