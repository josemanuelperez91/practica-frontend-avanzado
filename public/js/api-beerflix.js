const APIURL = `https://beerflix-api.herokuapp.com/api/v1`;

import cookieManager from "./cookieManager.js";
import { API_KEY_COOKIE_NAME } from "./signin.js";

const apiKey = cookieManager.getCookie(API_KEY_COOKIE_NAME);

export default class BeerFlixAPI {
  static async getBeers(search, limit) {
    let params = new URLSearchParams({
      search: search,
      limit: limit
    });
    const requestURL = `${APIURL}/beers?${params}`;

    return fetch(requestURL, {
      method: "GET",
      headers: {
        "X-API-KEY": apiKey
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`API Error with beer catalog`);
        } else {
          return response.json();
        }
      })
      .then(result => {
        return result.beers;
      })
      .catch(error => {
        console.error(error);
      });
  }
  static async getBeer(beerID) {
    const requestURL = `${APIURL}/beers/${beerID}`;

    return fetch(requestURL, {
      method: "GET",
      headers: {
        "X-API-KEY": apiKey
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`API Error with beer ${id}`);
        }
        return response.json();
      })
      .then(result => {
        return result.beer;
      })
      .catch(err => {
        console.error(err.message);
        throw err;
      });
  }
  static async postComment(beerID, commentText) {
    const requestURL = `${APIURL}/beers/${beerID}/comment`;

    return fetch(requestURL, {
      method: "POST",
      headers: {
        "X-API-KEY": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ comment: commentText })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`API Error with comment in beer ${beerID}`);
        }
        return response.json();
      })
      .then(result => {
        return result.beer.comments;
      })
      .catch(err => {
        console.error(err.message);
        throw err;
      });
  }

  static async postLike(beerID) {
    const requestURL = `${APIURL}/beers/${beerID}/like`;

    return fetch(requestURL, {
      method: "POST",
      headers: {
        "X-API-KEY": apiKey,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`API Error with like in beer ${beerID}`);
        }
        return response.json();
      })
      .then(result => {
        return result.beer.likes;
      })
      .catch(err => {
        console.error(err.message);
        throw err;
      });
  }

  static async signIn(email) {
    const requestURL = `${APIURL}/user/login`;

    return fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email })
    })
      .then(response => {
        console.log(response);
        if (!response.ok) {
          throw new Error(`User not Found`);
        }
        return response.json();
      })
      .then(result => {
        return result.user.apiKey;
      })
      .catch(err => {
        console.error(err.message);
        throw err;
      });
  }
  static async signIn(email) {
    const requestURL = `${APIURL}/user/login`;

    return fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`API Error logining in ${email}`);
        }
        return response.json();
      })
      .then(result => {
        return result.user.apiKey;
      })
      .catch(err => {
        console.error(err.message);
        throw err;
      });
  }
}
