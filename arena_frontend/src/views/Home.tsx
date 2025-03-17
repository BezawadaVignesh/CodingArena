import {
  Box,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grow,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField
} from "@mui/material";
import Axios from "axios";
import { SearchIcon, Tags, UsersRound, Zap } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../components/common/AlertProvider";
import CartoonButton from "../components/common/CButtons";
import LoadingScreen from "../components/common/LoadingScreen";
import Navbar from "../components/common/Navbar";

const Text4 = styled("div")(({ theme }) => ({
  color: theme.palette.text.primary, // Use the primary text color
  fontFamily: theme.typography.fontFamily,
  fontSize: "1.1rem",
  paddingBottom: 1,
  fontWeight: 700,
}));

const Text7 = styled("div")(({ theme }) => ({
  color: theme.palette.text.primary, // Use the primary text color
  fontSize: "0.8rem",
  display: "flex",
  alignItems: "center",
  fontFamily: theme.typography.fontFamily,
}));

const TextBasic = styled("div")(({ theme }) => ({
  color: theme.palette.text.primary, // Use the primary text color
  fontSize: "0.9rem",
  fontFamily: theme.typography.fontFamily,
}));

function getDifficultyStyle(difficulty: string): React.CSSProperties {
  const baseStyle: React.CSSProperties = {
    padding: "0.25rem 0.75rem",
    borderRadius: "9999px",
    fontSize: "0.875rem",
    fontWeight: "500",
  };

  switch (difficulty.toLowerCase()) {
    case "easy":
      return {
        ...baseStyle,
        backgroundColor: "#D1FAE5",
        color: "#059669",
      };
    case "medium":
      return {
        ...baseStyle,
        backgroundColor: "#FEF3C7",
        color: "#D97706",
      };
    case "hard":
      return {
        ...baseStyle,
        backgroundColor: "#FEE2E2",
        color: "#DC2626",
      };
    default:
      return baseStyle;
  }
}

const Home = () => {
  const [qs, setQs] = useState<any>(null);
  const alert = useContext(AlertContext);
  const [notAttempted, setNotAttempted] = useState(false);
  const [showAttempted, setShowAttempted] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const problems = useRef([]);

  useEffect(() => {
    if(!search) setQs(problems.current);
    else
      setQs(problems.current.filter(({title}:{title: string;}) => {
        return title.toLowerCase().includes(search.toLowerCase());
      }))
  }, [search]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await Axios.get(`/api/problem?contestId=1`);
        problems.current = data;
        setQs(data);
        alert?.showAlert("Welcome Back Coder!", "info");
      } catch (e) {
        alert?.showAlert("Couldn't load questions", "error");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Navbar />

      <Box display={"flex"} flexWrap={"wrap-reverse"}>
        <div style={{ width: "max(60%, 250px)", margin: "auto" }}>
          <div
            style={{
              width: "max-content",
              margin: "auto",
              fontSize: "1.5rem",
              fontWeight: 800,
              marginBlock: "10px",
            }}
          >
            Practice Problems
          </div>
          {/* <div style={{width: '90%', margin: 'auto'}}> */}
          <Card
            sx={{
              width: "90%",
              margin: "auto",
              transition: "box-shadow 0.3s ease-in-out",
              boxShadow: 2,
              "&:hover": {
                boxShadow: 6, // Increase shadow on hover
              },
            }}
          >
            <InputBase
              sx={{ ml: 1.5, flex: 1, width: "calc(100% - 60px)" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Problems"
              inputProps={{ "aria-label": "search a problem" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Card>
          <div style={{ width: "90%", margin: "auto" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBlock: "12px",
              }}
            >
              <div style={{ width: "max(45%, 250px)" }}>
                <FormControl
                  sx={{
                    width: "100%",
                    "&:hover": {
                      border: "none",
                      boxShadow: 6, // Increase shadow on hover
                    },
                  }}
                >
                  <InputLabel id="Difficulty-select-label" size="small">
                    Difficulty
                  </InputLabel>
                  <Select
                    sx={{ width: "100%" }}
                    labelId="Difficulty-select-label"
                    id="Difficulty-select"
                    
                    label="Difficulty"
                    // variant="outlined"
                    // onChange={(e) => setSearch(e.target.value)}
                    size="small"
                  >
                    <MenuItem value={"All"} defaultChecked>
                      All
                    </MenuItem>
                    <MenuItem value={"Easy"}>Easy</MenuItem>
                    <MenuItem value={"Medium"}>Medium</MenuItem>
                    <MenuItem value={"Hard"}>Hard</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <TextField
                size="small"
                label="Search by Tags"
                sx={{
                  width: "max(45%, 250px)",
                  "&:hover": {
                    boxShadow: 6, // Increase shadow on hover
                  },
                }}
              />
            </div>
          </div>

          {/* </div> */}
          {qs ? (
            qs
              .filter((obj: any) => {
                if (!showAttempted && !notAttempted) return obj;
                if (showAttempted && obj.attempted) return obj;
                if (notAttempted && !obj.attempted) return obj;
                return null;
              })
              .map(
                (
                  {
                    title,
                    id: problemId,
                    solved,
                    maxScore,
                    tried,
                    attempted,
                    difficulty,
                    tags,
                  }: {
                    title: string;
                    id: number;
                    solved: boolean;
                    maxScore: number;
                    tried: number;
                    attempted: boolean;
                    difficulty: string;
                    tags: string;
                  },
                  index: number
                ) => {
                  return (
                    <Grow in={true} timeout={200 * (index + 1)}>
                      <Card
                        onClick={() => {
                          // navigate(`/code/${problemId}`);
                        }}
                        // variant="outlined"

                        sx={{
                          fontFamily: "sans-serif",
                          margin: "auto",
                          width: "90%",
                          marginY: "10px",
                          minWidth: "250px",
                        }}
                        key={problemId}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            alignItems: "center",
                            margin: 0,
                            padding: 20,
                            paddingTop: 25,
                          }}
                        >
                          <div>
                            <Text4>
                              {index + 1}. {title} {"\n"}
                              <span style={getDifficultyStyle(difficulty)}>
                                {difficulty}
                              </span>
                            </Text4>
                            {tags && (
                              <Text7
                                style={{
                                  color: "rgb(136 128 245)",
                                  marginInline: "20px",
                                  marginBlock: "5px 10px",
                                }}
                              >
                                <Tags
                                  width={"1.1rem"}
                                  style={{ marginRight: "4px" }}
                                />{" "}
                                {tags}
                              </Text7>
                            )}
                            <div
                              style={{ display: "flex", marginBlock: "10px" }}
                            >
                              <Text7 style={{ marginInline: "10px" }}>
                                <Zap
                                  width={"1.1rem"}
                                  style={{ marginInline: "4px" }}
                                />
                                Max Score: <b>{maxScore}</b>
                              </Text7>
                              <Text7 style={{ marginInline: "10px" }}>
                                <UsersRound
                                  width={"1.1rem"}
                                  style={{ marginInline: "4px" }}
                                />{" "}
                                Users Tried: <b>{tried}</b>
                              </Text7>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              marginLeft: "auto",
                              marginRight: 0,
                              // width: ''
                            }}
                          >
                            <CartoonButton
                              onClick={(e) => {
                                navigate(`/code/${problemId}`);
                                e.stopPropagation();
                                e.preventDefault();
                              }}
                              variant={!attempted ? "success" : "secondary"}
                              customStyles={{
                                marginInline: "2rem",
                                marginBlock: "10px",
                                width: "170px",
                              }}
                            >
                              {solved
                                ? "Solved"
                                : attempted
                                ? "Try Again"
                                : "Solve"}
                            </CartoonButton>
                            {/* <Button
                              sx={{ marginInline: 4, marginBlock: '10px' }}
                              size="large"
                              style={{ width: "170px" }}
                              color="success"
                              variant={!attempted ? "contained" : "outlined"}
                              onClick={async (e) => {
                                navigate(`/code/${problemId}`);
                                e.stopPropagation();
                                e.preventDefault();
                                //   const { data } = await Axios.delete(
                                //     `/api/problem/${problemId}`
                                //   );
                                //   alert(JSON.stringify(data));
                                //   setReload(!reload);
                              }}
                            >
                              {solved
                                ? "Solved"
                                : attempted
                                ? "Try Again"
                                : "Solve"}
                            </Button> */}
                          </div>
                        </div>
                        {/* <Divider/> */}
                      </Card>
                    </Grow>
                  );
                }
              )
          ) : (
            <></>
          )}
        </div>
        <div style={{ margin: "0 auto" }}>
          <div
            style={{
              position: "sticky",
              margin: "auto",
              top: 15,
              height: "max-content",
              width: "250px",
            }}
          >
            <Card
              sx={{
                paddingInline: "20px",
                paddingBlock: "10px",
                marginBlock: "10px",
              }}
              onClick={() => navigate("leaderboard/1")}
            >
              <TextBasic>View Leaderboard</TextBasic>
            </Card>

            <Card
              sx={{
                padding: "25px",

                display: "flex",
                alignItems: "center",
              }}
            >
              <TextBasic>
                <FormControlLabel
                  value="not Attempted"
                  control={
                    <Checkbox
                      checked={notAttempted}
                      onChange={(e) => setNotAttempted(e.target.checked)}
                    />
                  }
                  label="Not Attempted"
                />
                <FormControlLabel
                  value="not accepted"
                  control={
                    <Checkbox
                      checked={showAttempted}
                      onChange={(e) => setShowAttempted(e.target.checked)}
                    />
                  }
                  sx={{ fontSize: 0.9 }}
                  label="Attempted"
                />
              </TextBasic>
            </Card>
          </div>
        </div>
      </Box>
    </>
  );
};

export default Home;
