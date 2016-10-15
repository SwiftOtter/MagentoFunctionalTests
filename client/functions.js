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

function determineProductFormValues() {
    var required = document.querySelectorAll('.product-options .required-entry'),
        formValues = {};

    for (var i = 0; i < required.length; i++) {
        if (required[i].tagName.toLowerCase() === 'select' || // select OR radio or checkbox
            (required[i].tagName.toLowerCase() === 'input' && ['radio', 'checkbox'].indexOf(required[i].getAttribute('type')) > -1)) {
            formValues['#' + required[i].getAttribute('id')] = required[i].options[1].value;
        } else {
            if (required[i].tagName.toLowerCase() === 'input' && required[i].getAttribute('type') === 'number') { // number input
                formValues['#' + required[i].getAttribute('id')] = 2;
            } else {
                formValues['#' + required[i].getAttribute('id')] = 'casperjs test'; // regular input
            }
        }
    }

    return formValues;
}