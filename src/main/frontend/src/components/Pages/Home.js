import React, { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import NavigationBar from "../Navbar/NavigationBar";
import RecommendService from "../../services/RecommendService";
import WTBService from "../../services/WTBService";
import IFSService from "../../services/IFSService";
import ListingCard from "../ListingCard";
import banner from "../../img/homepage_banner.png";

import { Tab, Nav } from "react-bootstrap";

import { useHistory } from "react-router-dom";

function IFSRec({ rec, listingDetails }) {
  const [imgSrc, setImgSrc] = useState("");

  const getImage = (listing) => {
    IFSService.getListingImage(listing.ifsId).then((res) => {
      const byteCode = res.data;
      const firstChar = byteCode.charAt(0);
      var dataType = "";
      if (firstChar === "/") {
        dataType = "jpg";
      } else if (firstChar === "i") {
        dataType = "png";
      } else {
        dataType = "gif";
      }
      setImgSrc("data:image/" + dataType + ";base64," + byteCode);
    });
  };

  useEffect(() => {
    getImage(rec);
  }, [rec]);

  return (
    <ListingCard
      listingType="IFS"
      listing={rec}
      imgSrc={imgSrc}
      deleteMyListing={null}
      listingDetails={listingDetails}
    />
  );
}

function WTBRec({ rec, listingDetails }) {
  const [imgSrc, setImgSrc] = useState("");

  const getImage = (listing) => {
    WTBService.getListingImage(listing.wtbId).then((res) => {
      const byteCode = res.data;
      const firstChar = byteCode.charAt(0);
      var dataType = "";
      if (firstChar === "/") {
        dataType = "jpg";
      } else if (firstChar === "i") {
        dataType = "png";
      } else {
        dataType = "gif";
      }
      setImgSrc("data:image/" + dataType + ";base64," + byteCode);
    });
  };

  useEffect(() => {
    getImage(rec);
  }, [rec]);

  return (
    <ListingCard
      listingType="WTB"
      listing={rec}
      imgSrc={imgSrc}
      deleteMyListing={null}
      listingDetails={listingDetails}
    />
  );
}

function RecommendedItems({ uid, type }) {
  const [recs, setRecs] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetchRecommendations(uid);
  }, [uid]);

  const fetchRecommendations = (userId) => {
    if (type === "WTB") {
      RecommendService.getWTBRecsByUserId(userId)
        .then((res) => setRecs(res.data))
        .catch((err) => console.log(err));
    } else if (type === "IFS") {
      RecommendService.getIFSRecsByUserId(userId)
        .then((res) => setRecs(res.data))
        .catch((err) => console.log(err));
    }
  };

  const listingDetails = (listing) => {
    if (type === "WTB") {
      history.push({
        pathname: "/wtb-listing-details",
        state: { listing: listing },
      });
    } else if (type === "IFS") {
      history.push({
        pathname: "/ifs-listing-details",
        state: { listing: listing, deal: {} },
      });
    }
  };

  return recs.map((rec, index) => {
    if (type === "IFS") {
      return (
        <div key={index} className="col-3">
          <IFSRec
            rec={rec}
            listingDetails={() => {
              listingDetails(rec);
            }}
          />
        </div>
      );
    } else if (type === "WTB") {
      return (
        <div key={index} className="col-3">
          <WTBRec
            rec={rec}
            listingDetails={() => {
              listingDetails(rec);
            }}
          />
        </div>
      );
    }
  });
}

export default function Home() {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(UserService.getProfile());
  }, []);

  return (
    <div>
      <NavigationBar />
      <div
        style={{ height: "85vh", overflow: "hidden", borderBottom: "purple" }}
      >
        <img
          src={banner}
          style={{
            display: "block",
            maxHeight: "100%",
            margin: "auto",
            marginBottom: "8px",
          }}
        />
      </div>
      {/* <div className="container-fluid">
        <h2 className="mx-5 mt-4">What would you like to do today?</h2>
      </div> */}
      <Tab.Container defaultActiveKey="ifs">
        <Nav fill variant="pills" className="border ml-0 mr-0 my-5">
          <Nav.Item>
            <Nav.Link eventKey="ifs">Sell</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="wtb">Buy</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="ifs">
            <div className="container">
              <div className="row">
                <h4>People are Looking to Buy</h4>
                <p>(Recommended based on your listings)</p>
              </div>
              <div className="row">
                <RecommendedItems uid={user.uid} type="WTB" />
              </div>
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="wtb">
            <div className="container">
              <div className="row">
                <h4>People are Selling</h4>
                <p>(Recommended based on your listings)</p>
              </div>
              <div className="row">
                <RecommendedItems uid={user.uid} type="IFS" />
              </div>
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>

      <hr></hr>
    </div>
  );
}
