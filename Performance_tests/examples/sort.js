var newBigArr = [
    {
        "id": 0,
        "value": "new"
    },
    {
        "id": 1,
        "value": "new"
    },
    {
        "id": 2,
        "value": "new"
    },
    {
        "id": 3,
        "value": "new"
    },
    {
        "id": 4,
        "value": "new"
    },
    {
        "id": 5,
        "value": "new"
    },
    {
        "id": 6,
        "value": "new"
    },
    {
        "id": 7,
        "value": "new"
    },
    {
        "id": 8,
        "value": "new"
    },
    {
        "id": 9,
        "value": "new"
    }
];

var oldBigArr = [
    {
        "id": 0,
        "value": "old"
    },
    {
        "id": 1,
        "value": "old"
    },
    {
        "id": 2,
        "value": "old"
    },
    {
        "id": 3,
        "value": "old"
    },
    {
        "id": 4,
        "value": "old"
    },
    {
        "id": 5,
        "value": "old"
    },
    {
        "id": 6,
        "value": "old"
    },
    {
        "id": 7,
        "value": "old"
    },
    {
        "id": 8,
        "value": "old"
    },
    {
        "id": 9,
        "value": "old"
    }
];

console.log(newBigArr.concat(oldBigArr).sort((a, b) => b.id - a.id));

var newArr = [
    {
        "id": 0,
        "value": "new"
    },
    {
        "id": 1,
        "value": "new"
    }
];

var oldArr = [
    {
        "id": 0,
        "value": "old"
    },
    {
        "id": 1,
        "value": "old"
    }
];

console.log(newArr.concat(oldArr).sort((a, b) => b.id - a.id));