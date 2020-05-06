import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

import { Row, Col, Container, Card, Button } from "react-bootstrap";

//store
import masterStore from "../../stores/masterStore";

import style from "../style"

class PartCard extends Component {
  participants = this.props.participants;
  

  fetchdata = () => {
    const id = this.participants.id;
    masterStore.fetchLoans(id);
    masterStore.specifyPart(id)
  };

  style=()=> {if(this.participants.error){return "danger" }
  else if(this.participants.active_loans===0){return "dark"}
  else{return "primary"}}

  styleHeader=()=>{
    if(this.participants.error){return "#FADBD8"}
    else if(this.participants.active_loans===0){return "#CCD1D1"}
    else{ return "#e3f2fd"}}

    styletext=()=> {
      if(this.participants.error){return "danger" }else{return "dark"}}
   
  render() {
    return (
      <div>
        <Col>
            <Link
              to={`/Loans/${this.participants.id}`}
              style={{ textDecoration: 'none' }}
              onClick={this.fetchdata}
            >
          <Card border={this.style()} text={this.styletext()} className="text-center" style={style.activPart}>
              <Card.Header style={{ backgroundColor: this.styleHeader()}} >
                {this.participants.name}
                {(this.participants.error)? " Error":"" }
              </Card.Header>

            <Card.Body>
              <Row>
                <Col>
                  <Card.Text>
                    Active Loans {this.participants.active_loans}
                  </Card.Text>
                </Col>
                <Col>
                  <Card.Text>
                    settled Loans {this.participants.settled_loans}
                  </Card.Text>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Card.Text>
                    hold amount: {this.participants.part_hold_amount}KD
                  </Card.Text>
                </Col>
                <Col>
                  <Card.Text>
                    profit amount: {this.participants.part_profit_amount}KD
                  </Card.Text>
                </Col>
              </Row>

              <Button variant="primary">Add Loan </Button>
            </Card.Body>
          </Card>
            </Link>
        </Col>
      </div>
    );
  }
}
export default observer(PartCard);
