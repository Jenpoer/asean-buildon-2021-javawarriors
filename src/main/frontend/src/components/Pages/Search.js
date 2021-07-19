import React, { useState, useEffect } from "react";
import { Button, Tab, Nav } from "react-bootstrap";
import FormControl from "react-bootstrap/FormControl";
import { useHistory, useLocation } from "react-router";
import WTBService from "../../services/WTBService";
import IFSService from "../../services/IFSService";
import NavigationBar from "../Navbar/NavigationBar";
import { categoryDropdownOptions } from "../../util/categories";
import Select from "react-select";
import UserService from "../../services/UserService";
import ListingCard from "../ListingCard";

const WTBListings = (props) => {
  const [listings, setListings] = useState([]);
  const history = useHistory();
  // Get user
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(UserService.getProfile());
  }, []);

  const fetchListings = () => {
    WTBService.getSearchListings(
      props.keyword,
      props.categoryName,
    ).then((res) => {
      console.log(res.data);
      setListings(res.data);
    });
  };

  useEffect(() => {
    fetchListings();
  }, [props.keyword, props.categoryName]);

  return listings.map((listing, index) => {
    const wtbDetails = (listing) => {
      history.push({
        pathname: "/wtb-listing-details",
        state: { listing: listing },
      });
    };

    if (listing.status === "a" && listing.user.uid != user.uid)
      return (
        <div className="col-3">
          <ListingCard
            listingType="WTB"
            listing={listing}
            imgSrc={null}
            deleteMyListing={null}
            listingDetails={() => wtbDetails(listing)}
          />
        </div>
      );
  });
};

const IFSListings = (props) => {
  const [listings, setListings] = useState([]);
  const history = useHistory();
  // Get user
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(UserService.getProfile());
  }, []);

  const fetchListings = () => {
    IFSService.getSearchListings(props.keyword, props.categoryName).then(
      (res) => {
        console.log(res.data);
        setListings(res.data);
      }
    );
  };

  useEffect(() => {
    fetchListings();
  }, [props.keyword, props.categoryName]);

  return listings.map((listing, index) => {
    const ifsDetails = (listing) => {
      history.push({
        pathname: "/ifs-listing-details",
        state: { listing: listing, deal: {} },
      });
    };

    if (
      listing.status === "a" &&
      listing.listingType === "s" &&
      listing.user.uid != user.uid
    )
      return (
        <div className="col-3">
          <ListingCard
            listingType="IFS"
            listing={listing}
            imgSrc={null}
            deleteMyListing={null}
            listingDetails={() => ifsDetails(listing)}
          />
        </div>
      );
  });
};

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedListingType, setSelectedListingType] = useState("");
  const [categoryName, setCategoryName] = useState("");
  // const [hashtags, setHashtags] = useState("");

  const location = useLocation();

  useEffect(() => {
    setSearchTerm(location.state.keyword);
  }, [location.state.keyword]);

  const changeSelectOptionHandler = (event) => {
    setSelectedListingType(event.target.value);
  };

  const handleSetCategoryName = (value) => {
    var temp = "";
    if (value.length > 0) {
      temp += value[0].value;
    }
    for (var i=1; i < value.length; i++) {
      temp += "%"
      temp += value[i].value;
    }
    console.log(temp);
    setCategoryName(temp);
  }

  return (
    <div>
      <NavigationBar />
      <Tab.Container defaultActiveKey="ifs">
        <div className="row">
          <Nav fill variant="pills">
            <Nav.Item>
              <Nav.Link eventKey="ifs">Items for Sale</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="wtb">Want to Buy</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        <Tab.Content>
          <Tab.Pane eventKey="ifs">
            <div className="row mt-3">
              <div className="col-3">
                <h1>Search</h1>
                <Select
                  closeMenuOnSelect={false}
                  options={categoryDropdownOptions}
                  isMulti
                  onChange={(value) => {
                    handleSetCategoryName(value);
                  }}
                />
              </div>
              <div className="col-9">
                <div className="row">
                  <IFSListings
                    keyword={searchTerm}
                    categoryName={categoryName}
                  />
                </div>
              </div>
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="wtb">
            <div className="row mt-3">
              <div className="col-3">
                <h1>Search</h1>
                <Select
                  closeMenuOnSelect={false}
                  options={categoryDropdownOptions}
                  isMulti
                  onChange={(value) => {
                    handleSetCategoryName(value);
                  }}
                />
                {/* <h4>Hashtags</h4>
                <div className="ui search">
                  <div className="ui icon input">
                    <input
                      type="text"
                      placeholder="Enter #hashtags"
                      onChange={(event) => {
                        setHashtags(event.target.value);
                      }}
                    ></input>
                  </div>
                </div> */}
              </div>
              <div className="col-9">
                <div className="row">
                  <WTBListings
                    keyword={searchTerm}
                    categoryName={categoryName}
                  />
                </div>
              </div>
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}
