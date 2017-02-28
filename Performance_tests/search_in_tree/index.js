const categories = require('./data/categories');

function searchCategoryById(categories, categoryId) {
    var categoriesLength = categories.length;
    var category;

    for(let i = categoriesLength; i--; ) {
        if(categories[i].id === categoryId) {
            category = categories[i];

            return {
                category,
                categoryArray: categories,
                index: i
            };
        }
    }

    for(let i = categoriesLength; i--;) {
        category = searchCategoryById(categories[i].subcategories , categoryId);

        if(typeof category !== 'undefined') {
            return category;
        }
    }
}

console.time('search');
var { category, categoryArray, index } = searchCategoryById(categories, 0);
console.timeEnd('search');

console.log(category);
console.log('---------------------');
console.log(categoryArray, index);

var lastCategoryIndex = getLastCategoryIndex(categories);

function getLastCategoryIndex(categories, maxIndex = 0) {
    var categoriesLength = categories.length;

    for(let i = 0; i < categoriesLength; i++) {
        if(categories[i].id > maxIndex) {
            maxIndex = categories[i].id;
        }

        if(categories[i].subcategories.length > 0) {
            maxIndex = getLastCategoryIndex(categories[i].subcategories, maxIndex);
        }
    }

    return maxIndex;
}

console.log(lastCategoryIndex);

console.time('get last task id');
var lastTaskId = getLastTaskId(categories);
console.timeEnd('get last task id');
console.log(lastTaskId);

function getLastTaskId(categories, maxId = 0) {
    var categoriesLength = categories.length;

    for(let i = 0; i < categoriesLength; i++) {
        let tasksLength = categories[i].tasks.length;

        for(let j = 0; j < tasksLength; j++) {
            if(categories[i].tasks[j].id > maxId) {
                maxId = categories[i].tasks[j].id;
            }
        }

        if(categories[i].subcategories.length > 0) {
            maxId = getLastTaskId(categories[i].subcategories, maxId);
        }
    }

    return maxId;
}