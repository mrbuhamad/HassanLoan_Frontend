import React, { Component } from "react";
import { observer } from "mobx-react";

import {
  Container,
  Spinner,
  Row,
  Button,
  Modal,
  FormControl,
} from "react-bootstrap";

//store
import masterStore from "../../stores/masterStore";

// Components
import PartCard from "./PartCard";

class PartList extends Component {
  state = {
    show: false,
    name: "",
  };

  handleClose = () => this.setState({ show: false });

  handleShow = () => this.setState({ show: true });

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };
  handleSubmit = () => {
    let nameItem = { name: this.state.name };
    masterStore.addParticipants(nameItem);
    this.handleClose();
  };
  render() {
    if (masterStore.loadingPart) {
      return <Spinner animation="border" variant="primary" size="l" />;
    } else {
      const partList = masterStore.PartList.map((item) => {
        return <PartCard participants={item} key={item.id} />;
      });

      return (
        <div>
          {/*   modal ---------------- modal  */}
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Participants</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormControl
                as="textarea"
                aria-label="With textarea"
                type="text"
                name="Participants Name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.handleSubmit}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
          {/*   modal ---------------- modal  */}

          <Container fluid>
            <Button variant="primary" onClick={this.handleShow}>
              إضافة مستفيد
            </Button>
            <Row>{partList} </Row>
          </Container>
        </div>
      );
    }
  }
}
export default observer(PartList);
