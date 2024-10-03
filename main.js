console.log("main.js running on");

import jsdom from "jsdom";
import fs from "fs";
import main__url from "./main__URL.js";
const { JSDOM } = jsdom;


console.log("main__url: ", main__url);

let first = 1;
const last = first + 5;



let catalog__URLS = [];

let product__URLS = [];

for (let index = first; index <= last; index++) {
  

  catalog__URLS.push(`${main__url}page/${index}`);
}

// console.log("urls: ", urls) //✅

async function URLS__extractor(url) {
  try {
    let productPageURLS = [];
    const response = await fetch(url);
    const html = await response.text();

    const dom = new JSDOM(html);

    const doc = dom.window.document;

    let urls = doc.querySelectorAll(".astra-shop-thumbnail-wrap a");
    //console.log("urls: ", Array.from(urls))//✅

    productPageURLS = Array.from(urls)
      .map((url) => url.href)

    //console.log("productPageURLS: ", productPageURLS);//✅

    return productPageURLS;
  } catch (error) {
    return error;
  }
}

//await URLS__extractor(  "https://www.importacioneshildemaro.com/categoria-producto/bomba-de-agua-2/bomba-de-agua-ihp-jbg/page/2") //✅

async function PRODUCT__extractor(url) {
  try {

    let product = {
      title: "undefined",
      SKU: "undefined",
      thumbnails: ["n/a"],
      categories: "undefined",
      specifications: "undefined",
      url: url,
    };

    /*
     http request using fetch method:*/
    const response = await fetch(url);
    const html = await response.text();

    const dom = new JSDOM(html);
    const doc = dom.window.document;
    /*
  productData updating:*/

    //title:

    if (doc.querySelector(".product_title") != null) {
      product.title = doc
        .querySelector(".product_title")
        .textContent.replace(/\n+/g, " ")
        .trim();
    }

    //SKU:

    if (doc.querySelector(".sku") != null) {
      product.SKU = doc.querySelector(".sku").textContent.replace(/\n|\t/g, "");
    }

    //thumbnails:

    const thumbnails = doc.querySelectorAll(
      ".woocommerce-product-gallery__wrapper img"
    );
    //console.log("thumbnails: ", Array.from(thumbnails));

    if (Array.from(thumbnails).length > 0) {
      product.thumbnails = Array.from(thumbnails).map(
        (thumbnail) => thumbnail.src
      );
    } else {
      console.log("not running here (ln102)");
    }

    //categories:

    const categories = doc.querySelectorAll(".posted_in a");
    if (Array.from(categories).length > 0) {
      product.categories = Array.from(categories)[0].textContent;
    }

    //specifications

    if (doc.querySelector("#tab-description") != null) {

      product.specifications = doc
        .querySelector("#tab-description")
        .textContent.replace(/\n+/g, " ")
        .trim();
    }

    //console.log("product: ", product)//✅

    return product;
  } catch (error) {
    console.error("Error al obtener el contenido del body:", error);
  }
}

//await PRODUCT__extractor(  "https://www.importacioneshildemaro.com/producto/bam-uh02-bomba-de-agua-mazda-bt50-ford-ranger/" )//✅

const catalog__URLS__Promises = catalog__URLS.map(async (url) => {
  const product__URL = await URLS__extractor(url);

  return product__URL;
});

product__URLS = await Promise.all(catalog__URLS__Promises);
product__URLS = product__URLS.flat();

//console.log("product__URLS: ", product__URLS)//✅

const PRODUCT__extractor__promises = product__URLS.map(async (product__URL) => {
  const product = await PRODUCT__extractor(product__URL);

  return product;
});

const data = await Promise.all(PRODUCT__extractor__promises);

//console.log("data: ", data)//✅

let dataFormater = [];
let categories = undefined;

data.forEach((e) => {
  if (e.categories != null) {
    categories = e.categories.toString();
  }
  const thumbnails = e.thumbnails.toString().replace(",", " | ");

  const product =
    e.title +
    " | " +
    e.SKU +
    " | " +
    e.specifications +
    " | " +
    e.url +
    " | " +
    categories +
    " | " +
    thumbnails +
    "\n";
  dataFormater.push(product);
});

const contenido = dataFormater.toString();
//console.log("content: ", content);

fs.writeFile("currentFile.txt", contenido, (err) => {
  if (err) throw err;
  console.log("El archivo ha sido guardado!");
});

console.log("codigo corrido en las paginas: ", catalog__URLS);
