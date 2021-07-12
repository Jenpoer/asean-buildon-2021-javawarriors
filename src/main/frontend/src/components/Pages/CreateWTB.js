import React, { useState, useEffect } from "react";

import {
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";

import { useHistory } from "react-router";

import WTBService from "../../services/WTBService";

export default function CreateWTB(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priceLower, setPriceLower] = useState(0);
  const [priceUpper, setPriceUpper] = useState(0);

  const history = useHistory();

  const createListing = (e) => {
    e.preventDefault();
    let listing = {
      title: title,
      description: description,
      picUri: null,
      priceLower: priceLower,
      priceUpper: priceUpper,
      status: "a",
      categoryName: null,
      uid: null,
    };
    
    WTBService.postWTBListing(listing).then((res) => {
      history.push({
        pathname: "/wtb",
      });
    });
  };

  return (
    <Row className="justify-content-md-center">
      <Col lg={12}>
        <Form.Row>
          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Title:</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                required
                autoComplete="off"
                type="text"
                name="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </InputGroup>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Description:</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                required
                autoComplete="off"
                type="text"
                name="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </InputGroup>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Price Lower:</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                required
                autoComplete="off"
                type="number"
                name="priceLower"
                value={priceLower}
                onChange={(event) => setPriceLower(event.target.value)}
              />
            </InputGroup>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Price Upper:</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                required
                autoComplete="off"
                type="number"
                name="priceUpper"
                value={priceUpper}
                onChange={(event) => setPriceUpper(event.target.value)}
              />
            </InputGroup>
          </Form.Group>
        </Form.Row>
        <Button onClick={createListing}> Submit </Button>
      </Col>
    </Row>
  );
}