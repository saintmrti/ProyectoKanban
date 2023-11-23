import { useNavigate } from "react-router-dom";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";

import {
  Wrapper,
  Secc1,
  Secc2,
  MDBox,
  Title,
  StyledIcon,
  MuiCard1,
  MuiCard2,
  TitleSec,
  MuiCardMedia,
} from "./styled";
import Kanban from "../../assets/icons/kanban.png";
import Planeacion from "../../assets/icons/planeacion.png";
import Fmds from "../../assets/icons/fmds.png";
import TpzRender from "../../assets/img/tpz_render.png";
import MtyRender from "../../assets/img/mty_render.png";
import QroRender from "../../assets/img/qro_render.png";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div
        style={{
          gridColumn: "1/2",
          backgroundColor: "#FFFFFF",
          borderRadius: "5px",
        }}
      >
        <TitleSec>Reporteo e Indicadores</TitleSec>
        <Secc1>
          <MuiCard1
            sx={{
              "&:hover": {
                backgroundColor: "#eeeeee",
              },
            }}
            onClick={(f) => f}
          >
            <CardContent
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <MDBox>
                <StyledIcon src={Kanban} alt="Icono_Indicadores" />
              </MDBox>
              <div style={{ textAlign: "right", paddingTop: "10px" }}>
                <Title>Kanban</Title>
              </div>
            </CardContent>
          </MuiCard1>
          <MuiCard1
            sx={{
              "&:hover": {
                backgroundColor: "#eeeeee",
              },
            }}
            onClick={(f) => f}
          >
            <CardContent
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <MDBox style={{ backgroundColor: "#60A44D" }}>
                <StyledIcon src={Fmds} alt="Mi Icono" />
              </MDBox>
              <div style={{ textAlign: "right", paddingTop: "10px" }}>
                <Title>FMDS</Title>
              </div>
            </CardContent>
          </MuiCard1>
          <MuiCard1
            sx={{
              "&:hover": {
                backgroundColor: "#eeeeee",
              },
            }}
            onClick={() => navigate("/planeacion/programador")}
          >
            <CardContent
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <MDBox style={{ backgroundColor: "#477EE9" }}>
                <StyledIcon src={Planeacion} alt="Mi Icono" />
              </MDBox>
              <div style={{ textAlign: "right", paddingTop: "10px" }}>
                <Title>Planeación</Title>
              </div>
            </CardContent>
          </MuiCard1>
          {/* {n_pr > 0 && (
              <MuiCard1
                sx={{
                  "&:hover": {
                    backgroundColor: theme === "light" ? "#eeeeee" : "#212121",
                  },
                }}
                onClick={() => goTo("/hub/plantreadiness")}
              >
                <CardContent
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <MDBox style={{ backgroundColor: "#f51919" }}>
                    <StyledIcon src={PlantReadiness} alt="Mi Icono" />
                  </MDBox>
                  <div style={{ textAlign: "right", paddingTop: "10px" }}>
                    <Title>Plant Readiness</Title>
                  </div>
                </CardContent>
              </MuiCard1>
            )} */}
        </Secc1>
      </div>
      <div
        style={{
          gridColumn: "2/5",
          backgroundColor: "#FFFFFF",
          borderRadius: "5px",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <TitleSec>Operación Digital</TitleSec>
        <Secc2>
          <div>
            <CardActionArea onClick={(f) => f}>
              <MuiCard2
                sx={{
                  "&:hover": {
                    backgroundColor: "#eeeeee",
                  },
                }}
              >
                <CardContent>
                  <MuiCardMedia component="img" src={MtyRender} />
                  <Title style={{ paddingTop: "10px" }}>Monterrey</Title>
                </CardContent>
              </MuiCard2>
            </CardActionArea>
          </div>
          <div>
            <CardActionArea onClick={(f) => f}>
              <MuiCard2
                sx={{
                  "&:hover": {
                    backgroundColor: "#eeeeee",
                  },
                }}
              >
                <CardContent>
                  <MuiCardMedia component="img" src={TpzRender} />
                  <Title style={{ paddingTop: "10px" }}>Tepotzotlán</Title>
                </CardContent>
              </MuiCard2>
            </CardActionArea>
          </div>
          <div>
            <CardActionArea onClick={(f) => f}>
              <MuiCard2
                sx={{
                  "&:hover": {
                    backgroundColor: "#eeeeee",
                  },
                }}
              >
                <CardContent>
                  <MuiCardMedia component="img" src={QroRender} />
                  <Title style={{ paddingTop: "10px" }}>Querétaro</Title>
                </CardContent>
              </MuiCard2>
            </CardActionArea>
          </div>
          {/* <div>
              <CardActionArea onClick={() => goTo("/hub/uen/4")}>
                <MuiCard2
                  sx={{
                    "&:hover": {
                      backgroundColor:
                        theme === "light" ? "#eeeeee" : "#212121",
                    },
                  }}
                >
                  <CardContent>
                    <MuiCardMedia component="img" src={Construccion} />
                    <Title style={{ paddingTop: "10px" }}>Construcción</Title>
                  </CardContent>
                </MuiCard2>
              </CardActionArea>
            </div>
            <div>
              <CardActionArea onClick={() => goTo("/hub/uen/5")}>
                <MuiCard2
                  sx={{
                    "&:hover": {
                      backgroundColor:
                        theme === "light" ? "#eeeeee" : "#212121",
                    },
                  }}
                >
                  <CardContent>
                    <MuiCardMedia component="img" src={Multipak} />
                    <Title style={{ paddingTop: "15px" }}>Multipak</Title>
                  </CardContent>
                </MuiCard2>
              </CardActionArea>
            </div>
            <div>
              <CardActionArea onClick={() => goTo("/hub/uen/6")}>
                <MuiCard2
                  sx={{
                    "&:hover": {
                      backgroundColor:
                        theme === "light" ? "#eeeeee" : "#212121",
                    },
                  }}
                >
                  <CardContent>
                    <MuiCardMedia component="img" src={Vialutek} />
                    <Title style={{ paddingTop: "10px" }}>Vialutek</Title>
                  </CardContent>
                </MuiCard2>
              </CardActionArea>
            </div>
            <div style={{ gridColumn: "2/3" }}>
              <CardActionArea onClick={() => goTo("/hub/uen/8")}>
                <MuiCard2
                  sx={{
                    "&:hover": {
                      backgroundColor:
                        theme === "light" ? "#eeeeee" : "#212121",
                    },
                  }}
                >
                  <CardContent>
                    <MuiCardMedia component="img" src={LaSalle} />
                    <Title style={{ paddingTop: "10px" }}>LaSalle</Title>
                  </CardContent>
                </MuiCard2>
              </CardActionArea>
            </div> */}
        </Secc2>
      </div>
    </Wrapper>
  );
};

export default Home;
