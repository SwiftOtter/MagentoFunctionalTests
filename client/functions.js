function testThisWorks() {
    __utils__.echo(defaults.baseUrl);
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function substring(needle, haystack) {
    return haystack.substring(haystack.indexOf(needle), haystack.indexOf(needle) + needle.length);
}

function pickRandomElement(selector, attribute) {
    var elements = null;

    if (typeof selector !== 'string') {
        elements = selector
    }

    if (elements === null) {
        elements = document.querySelectorAll(selector);
    }

    var targetElement = elements[Math.floor(Math.random() * elements.length)];

    if (!targetElement) {
        targetElement = elements[0];
        console.log('WARNING: choose first element from selector "'+ selector +'"');
    }

    return targetElement.getAttribute(attribute);
}

function determinePathOptions(inputArgs) {
    var targetKey = '';

    for (var key in inputArgs) {
        if (inputArgs.hasOwnProperty(key) && defaults.paths.indexOf(key) > -1) {
            targetKey = key;
        }
    }

    if (inputArgs[key]) {
        return {
            path: inputArgs[targetKey],
            key: targetKey
        };
    }

    return {
        path: '',
        key: '',
    };
}