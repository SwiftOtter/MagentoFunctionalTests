# Magento Functional Test Suite

1. Install [PhantomJS](http://phantomjs.org/).
2. `npm install` in this directory.
3. `casper test cart.js`

### Options

If you specify a `top-category`, `category`, or `product` option, it will skip all tests before that.

- `url` - specifies the base URL
- `top-category` - the relative URL of a top level category to start with
- `category` - relative path of a category to start testing with
- `product` - relative path of a product to test