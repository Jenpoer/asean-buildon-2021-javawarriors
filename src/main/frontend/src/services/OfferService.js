import axios from "axios";
import authHeader from "../util/authHeader";

const OFFER_API_BASE_URL = "http://localhost:8080/api/v1/offer";

class OfferService {
  postOffer(offer) {
    return axios.post(OFFER_API_BASE_URL + "/post", offer, {
      headers: authHeader(),
    });
  }

  getCurrentUserReceivedOffers(uid) {
    return axios.get(OFFER_API_BASE_URL + "/get/receivedby=" + uid, {
      headers: authHeader(),
    });
  }
}

export default new OfferService();
