import React, { Component } from "react";
import { observer } from "mobx-react";

import { Container, Spinner, Row } from "react-bootstrap";

//store
import masterStore from "../stores/masterStore";

// Components
import PartCard from "./PartCard";

class PartList extends Component {
  render() {
    if (masterStore.loadingPart) {
      return <Spinner animation="border" variant="primary" size="l" />;
    } else {
      const partList = masterStore.participants.map((item) => {
        return <PartCard participants={item} />;
      });

      return (
        <div>
          <Container fluid>
            <Row>{partList} </Row>
          </Container>
        </div>
      );
    }
  }
}
export default observer(PartList);
