/**
 * @jest-environment node
 */


import { productsService } from "./config/products-service-config"
import productsConfig from "./config/products-config.json"
import { getRandomNumber } from "./util/random";

let categories: string[];

beforeAll(() => {
    categories = productsConfig.map(p => p.name.split("-")[0]);
});

test("setProducts test", () => {
    productsService.setProducts().then(count => {
        expect(count).toEqual(100);
    });
});

test("category bread exists", () => {
    productsService.isCategoryExist("bread")
        .then(res => expect(res).toBeTruthy());
});

test("category kukureku doesn't exist", () => {
    productsService.isCategoryExist("kukureku")
        .then(res => expect(res).toBeFalsy());
});

test("random category exists", () => {
    productsService
        .isCategoryExist(categories[getRandomNumber(0, categories.length - 1)])
        .then(res => expect(res).toBeTruthy());
});

test("all category exists", () => {
    const promises = categories.map(c => productsService.isCategoryExist(c));
    Promise.all(promises).then(values => expect(values.every(val => val)).toBeTruthy());
});

test("remove category", () => {
    const category = categories[getRandomNumber(0, categories.length - 1)];
    productsService.removeCategory(category)
        .then(() => productsService.isCategoryExist(category))
        .then(res => expect(res).toBeFalsy());
});


test("add category", () => {
    const category = categories[getRandomNumber(0, categories.length - 1)] + "123";
    productsService
        .addCategory({ name: category })
        .then(() => productsService.isCategoryExist(category))
        .then(res => expect(res).toBeFalsy());
});