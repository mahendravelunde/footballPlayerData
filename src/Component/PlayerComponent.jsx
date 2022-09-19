import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Grid, Button, TextField } from "@material-ui/core";


const PlayerComponent = () => {
  const [playerData, setPlayerData] = useState("");
  const [initialPlayerData, setInitialPlayerData] = useState("");
  const [pfName, setPfName] = useState("");
  const [tName, setTName] = useState("");

  useEffect(() => {
    showPlayerCard();
  }, []);

  async function showPlayerCard() {
    const playerData = await fetch(
      "https://api.npoint.io/20c1afef1661881ddc9c/"
    );
    const data = await playerData.json();
    console.log(data);
    setPlayerData((data.playerList).sort((a, b) => parseFloat(a.Value) - parseFloat(b.Value)));
    setInitialPlayerData((data.playerList).sort((a, b) => parseFloat(a.Value) - parseFloat(b.Value)));
  }

  const handleChange = ({ target: { name, value } }) => {
    if (name === "pfName") {
      setPfName(value);
    }
    if (name === "tName") {
      setTName(value);
    }
  };

  const searchPlayerFun = (e) => {
    e.preventDefault();
    if (pfName == "" && tName == "") {
       setPlayerData(initialPlayerData);
      // showPlayerCard();
    } else {
      playerData.map((item) => {
        if (item.PFName == pfName && item.TName == tName) {
          setPlayerData([].concat(item));
        }
      });
    }
  };

  return (
    <>
      <Container>
        <Card style={{ marginLeft: "10px", marginTop: "10px" }}>
          <Grid container spacing={4} style={{ padding: "10px" }}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                autoFocus
                margin="dense"
                label="TName"
                type="text"
                fullWidth
                name="tName"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                autoFocus
                margin="dense"
                label="PFName"
                fullWidth
                variant="standard"
                type="text"
                name="pfName"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Button
                style={{
                  backgroundColor: "#00b9f5",
                  color: "white",
                  
                }}
                className="riskRuleButton"
                onClick={searchPlayerFun}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Card>

        <Row>
          {playerData.length > 0
            ? playerData.map((item) => {
                return (
                  <>
                    <Col sm={12} md={3} lg={3}>
                      <Card style={{ margin: "10px" }}>
                        <Card.Img
                          variant="top"
                          src={require(`../assets/player-images/${item.Id}.jpg`)}
                        />
                        <Card.Body>
                          <Card.Title>PFName : {item.PFName}</Card.Title>
                          <Card.Text>Desc : {item.SkillDesc}</Card.Text>
                          <Card.Subtitle className="mb-2 text-muted">
                            $ : {item.Value}
                          </Card.Subtitle>
                          {[].concat(
                            item.UpComingMatchesList.map((i) => {
                              return (
                                <>
                                  <Card.Text> CCode : {i.CCode}</Card.Text>
                                  <Card.Text> VsCCode : {i.VsCCode}</Card.Text>
                                  <Card.Text>
                                    {" "}
                                    Time : {i.MDate.replaceAll("/", "-")}
                                  </Card.Text>
                                </>
                              );
                            })
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                  </>
                );
              })
            : <>
            <h3>No Data</h3>
            </>}
        </Row>
      </Container>
    </>
  );
};

export default PlayerComponent;
