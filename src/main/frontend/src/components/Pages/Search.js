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
import { ctSubcategoryDropdownOptions } from "../../util/ctSubcategories";
import { fhSubcategoryDropdownOptions } from "../../util/fhSubcategories";
import { mgSubcategoryDropdownOptions } from "../../util/mgSubcategories";
import { reactSelectTheme } from "../../util/customThemes";

const ITEM_CONDITION = ["Brand New", "Like New", "Well Used", "Heavily Used"];

const condtionDropdownOptions = ITEM_CONDITION.map((condition) => {
  return { value: condition, label: condition };
});

let subCategoryOptions = null;

const WTBList = ({ listing, index }) => {
  const [imgSrc, setImgSrc] = useState("");
  const history = useHistory();

  useEffect(() => {
    getImage(listing);
  }, [listing]);

  const wtbDetails = (listing) => {
    history.push({
      pathname: "/wtb-listing-details",
      state: { listing: listing },
    });
  };

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

  return (
    <div key={index} className="col-3">
      <ListingCard
        listingType="WTB"
        listing={listing}
        imgSrc={imgSrc}
        deleteMyListing={null}
        listingDetails={() => wtbDetails(listing)}
      />
    </div>
  );
};

const WTBListings = (props) => {
  const [listings, setListings] = useState([]);
  const history = useHistory();
  // Get user
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(UserService.getProfile());
  }, []);

  useEffect(() => {
    fetchListings();
  }, [
    props.keyword,
    props.fullCategoryName,
    props.itemCondition,
    props.searchLocation,
  ]);

  const fetchListings = () => {
    WTBService.getSearchListings(
      props.keyword,
      props.fullCategoryName,
      props.itemCondition,
      props.searchLocation
    ).then((res) => {
      console.log(res.data);
      setListings(res.data);
    });
  };

  return listings.map((listing, index) => {
    const wtbDetails = (listing) => {
      history.push({
        pathname: "/wtb-listing-details",
        state: { listing: listing },
      });
    };

    if (listing.status === "a" && listing.user.uid != user.uid)
      return (
        // <div className="col-3">
        //   {/* {getImage(listing)} */}
        //   <ListingCard
        //     listingType="WTB"
        //     listing={listing}
        //     imgSrc={null}
        //     deleteMyListing={null}
        //     listingDetails={() => wtbDetails(listing)}
        //   />
        // </div>
        <WTBList index={index} listing={listing} />
      );
  });
};

const IFSList = ({ listing, index }) => {
  const [imgSrc, setImgSrc] = useState("");
  const history = useHistory();

  useEffect(() => {
    getImage(listing);
  }, [listing]);

  const ifsDetails = (listing) => {
    history.push({
      pathname: "/ifs-listing-details",
      state: { listing: listing, deal: {} },
    });
  };

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

  return (
    <div key={index} className="col-3">
      <ListingCard
        listingType="IFS"
        listing={listing}
        imgSrc={imgSrc}
        deleteMyListing={null}
        listingDetails={() => ifsDetails(listing)}
      />
    </div>
  );
};

const IFSListings = (props) => {
  const [listings, setListings] = useState([]);
  const history = useHistory();
  // Get user
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(UserService.getProfile());
  }, []);

  useEffect(() => {
    fetchListings();
    console.log(props.keyword);
  }, [
    props.keyword,
    props.fullCategoryName,
    props.itemCondition,
    props.searchLocation,
  ]);

  const fetchListings = () => {
    IFSService.getSearchListings(
      props.keyword,
      props.fullCategoryName,
      props.itemCondition,
      props.searchLocation
    ).then((res) => {
      console.log(res.data);
      setListings(res.data);
    });
  };

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
      return <IFSList index={index} listing={listing} />;
  });
};

export default function Search() {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState(location.state.keyword);
  const [selectedListingType, setSelectedListingType] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [fullCategoryName, setFullCategoryName] = useState("");
  const [itemCondition, setItemCondition] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  

  useEffect(() => {
    setSearchTerm(location.state.keyword);
  }, [location.state.keyword]);

  // const changeSelectOptionHandler = (event) => {
  //   setSelectedListingType(event.target.value);
  // };

  const handleSetCategoryName = (value) => {
    console.log(value);
    setCategoryName(value);
    setFullCategoryName(value);
  };

  const handleSetFullCategoryName = (value) => {
    var temp = "";
    for (var i = 0; i < value.length; i++) {
      temp += "%";
      temp += value[i].value;
    }
    console.log(temp);
    var fullName = categoryName;
    fullName += temp;
    console.log(fullName);
    setFullCategoryName(fullName);
  };

  const handleSetCondition = (value) => {
    var temp = "";
    if (value.length > 0) {
      temp += value[0].value;
    }
    for (var i = 1; i < value.length; i++) {
      temp += "|";
      temp += value[i].value;
    }
    setItemCondition(temp);
  };

  if (categoryName === "Computers & Tech") {
    subCategoryOptions = ctSubcategoryDropdownOptions;
  } else if (categoryName === "Furniture & Home Living") {
    subCategoryOptions = fhSubcategoryDropdownOptions;
  } else if (categoryName === "Mobile Phones & Gadgets") {
    subCategoryOptions = mgSubcategoryDropdownOptions;
  }

  return (
    <div>
      <NavigationBar />
      <Tab.Container defaultActiveKey="ifs">
        <Nav fill variant="underline">
          <Nav.Item>
            <Nav.Link
              onSelect={(event) => setFullCategoryName("")}
              eventKey="ifs"
            >
              Items for Sale
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onSelect={(event) => setFullCategoryName("")}
              eventKey="wtb"
            >
              Want to Buy
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="ifs">
            <div className="container-fluid">
              <div className="row mt-3 vh-100">
                <div className="col-3 shadow-sm">
                  <b className="ml-3 mb-3">FILTER BY</b>
                  <div className="border-bottom p-3">
                    <div className="pb-1">
                      <b>Category</b>
                    </div>
                    <Select
                      options={categoryDropdownOptions}
                      theme={reactSelectTheme}
                      onChange={(value) => {
                        handleSetCategoryName(value.value);
                      }}
                    />
                  </div>
                  {subCategoryOptions !== null ? (
                    <div className="border-bottom p-3">
                      <div className="pb-1">
                        <b>Sub Category</b>
                      </div>
                      <Select
                        closeMenuOnSelect={false}
                        options={subCategoryOptions}
                        theme={reactSelectTheme}
                        isMulti
                        onChange={(value) => {
                          handleSetFullCategoryName(value);
                        }}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="border-bottom p-3">
                    <div className="pb-1">
                      <b>Condition</b>
                    </div>
                    <Select
                      closeMenuOnSelect={false}
                      options={condtionDropdownOptions}
                      theme={reactSelectTheme}
                      isMulti
                      onChange={(value) => {
                        handleSetCondition(value);
                      }}
                    />
                  </div>
                  <div className="border-bottom p-3">
                    <div className="pb-1">
                      <b>Location</b>
                    </div>
                    <input
                      class="form-control mr-sm-2"
                      type="search"
                      placeholder="Search for a Location"
                      value={searchLocation}
                      onChange={(event) =>
                        setSearchLocation(event.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="col-9">
                  <div className="row ml-4">
                    <IFSListings
                      keyword={searchTerm}
                      fullCategoryName={fullCategoryName}
                      itemCondition={itemCondition}
                      searchLocation={searchLocation}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="wtb">
            <div className="container-fluid">
              <div className="row mt-3 vh-100">
                <div className="col-3 shadow-sm">
                  <b className="ml-3 mb-3">FILTER BY</b>
                  <div className="border-bottom p-3">
                    <div className="pb-1">
                      <b>Category</b>
                    </div>
                    <Select
                      options={categoryDropdownOptions}
                      theme={reactSelectTheme}
                      onChange={(value) => {
                        handleSetCategoryName(value.value);
                      }}
                    />
                  </div>
                  {subCategoryOptions !== null ? (
                    <div className="border-bottom p-3">
                      <div className="pb-1">
                        <b>Sub Category</b>
                      </div>
                      <Select
                        closeMenuOnSelect={false}
                        options={subCategoryOptions}
                        theme={reactSelectTheme}
                        isMulti
                        onChange={(value) => {
                          handleSetFullCategoryName(value);
                        }}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="border-bottom p-3">
                    <div className="pb-1">
                      <b>Condition</b>
                    </div>
                    <Select
                      closeMenuOnSelect={false}
                      options={condtionDropdownOptions}
                      theme={reactSelectTheme}
                      isMulti
                      onChange={(value) => {
                        handleSetCondition(value);
                      }}
                    />
                  </div>
                  <div className="border-bottom p-3">
                    <div className="pb-1">
                      <b>Location</b>
                    </div>
                    <input
                      class="form-control mr-sm-2"
                      type="search"
                      placeholder="Search for a Location"
                      value={searchLocation}
                      onChange={(event) =>
                        setSearchLocation(event.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="col-9">
                  <div className="row ml-4">
                    <WTBListings
                      keyword={searchTerm}
                      fullCategoryName={fullCategoryName}
                      itemCondition={itemCondition}
                      searchLocation={searchLocation}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}
