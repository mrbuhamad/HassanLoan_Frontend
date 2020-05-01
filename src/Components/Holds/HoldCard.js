import React, { Component } from "react";
import { observer } from "mobx-react";
import { TrashFill } from "react-bootstrap-icons";

import { Button, Modal } from "react-bootstrap";

//store
import holdStore from "../../stores/holdStore";

class HoldCard extends Component {
  state = {
    show: false,
  };

  handleClose = () => this.setState({ show: false });

  handleShow = () => this.setState({ show: true });

  handleSubmit = () => {
    holdStore.deleteHold(this.props.hold.id, this.props.index);
    this.handleClose();
  };

  render() {
    return (
      <>
        {/*   modal ---------------- modal  */}
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Pyment</Modal.Title>
          </Modal.Header>
          <Modal.Body>اكييد تبي تمسح؟ ترا ما فيها رجعه</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={this.handleSubmit}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        {/*   modal ---------------- modal  */}

        <tr>
          <td>{this.props.index + 1}</td>
          <td>{this.props.hold.date}</td>
          <td>{this.props.hold.part_hold_amount}</td>
          <td>{this.props.hold.reasoning}</td>
          <td>
            <Button variant="outline-light" onClick={this.handleShow}>
              <TrashFill color="red" size={25} />
            </Button>
          </td>
        </tr>
      </>
    );
  }
}
export default observer(HoldCard);
