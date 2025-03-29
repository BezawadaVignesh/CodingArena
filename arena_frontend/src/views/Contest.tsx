import { Add, Create } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LaunchIcon from "@mui/icons-material/Launch";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Slide,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { default as Axios, default as axios } from "axios";
import dayjs from "dayjs";
import React, {
  ChangeEvent,
  FormEvent,
  memo,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { useAuth } from "../components/Auth/AuthProvider";
import { AlertContext } from "../components/common/AlertProvider";
import LoadingScreen from "../components/common/LoadingScreen";
import Markdown from "../components/common/Markdown";
import Navbar from "../components/common/Navbar";
import { StyledTab, StyledTabs } from "../components/common/StyleTabs";
import style from "./Problem.module.css";

const ContestDetails = memo(
  ({
    id,
    hidden,
    reload,
    setReload,
  }: {
    id: number;
    hidden: boolean;
    reload: boolean;
    setReload: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    type State = "manual" | "inactive" | "active" | "end" | "manualactive";
    const [state, setState] = useState<State>("manual");
    const [title, setTitle] = useState<string | null>();
    const [startTime, setStartTime] = useState(dayjs());
    const [endTime, setEndTime] = useState(dayjs());
    const [save, setSave] = useState(false);
    // const [reload,setReload] = useState(false);
    const [loading, setLoading] = useState(true);
    const alert = useContext(AlertContext);

    const handleSubmit = async () => {
      try {
        const response = await Axios.post(`/api/contest/edit?contestId=${id}`, {
          withCredentials: true,
          title,
          state,
          startTime,
          endTime,
        });
        return alert?.showAlert("details update successfully", "success");
      } catch (e) {
        if (axios.isAxiosError(e) && e.response)
          if (e.response.status)
            return alert?.showAlert(
              "end time should be larger then start time",
              "error"
            );
      }
      //   console.log(data);
      //   console.log("submit");
    };

    useEffect(() => {
      (async () => {
        const { data } = await Axios.get(`/api/contest?contestId=${id}`, {
          withCredentials: true,
        });
        setTitle(data.title);
        setStartTime(dayjs(data.startTime));
        setEndTime(dayjs(data.endTime));
        setState(data.state);
        setLoading(false);
        //   setReload(false);
      })();
    }, [reload]);

    if (loading) {
      return <LoadingScreen />;
    }

    const handleSave = async () => {
      if (save) {
        await handleSubmit();
        setReload(!reload);
      }
      setSave(!save);
    };

    return (
      <div hidden={hidden}>
        {/* {loading} */}

        <form
          // onSubmit={handleSubmit}
          style={{ margin: "auto", width: "max-content" }}
        >
          {/* {title} */}
          {/* {startTime} */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
              <TextField
                onChange={(e) => setTitle(e.target.value)}
                label="Title"
                disabled={!save}
                fullWidth
                defaultValue={title}
                inputProps={{ maxLength: 128 }}
                helperText={`${title ? title.length : 0}/128`}
              ></TextField>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="State-selection-lable">State</InputLabel>
                <Select
                  labelId="State-selection-lable"
                  id="State-selection-lable"
                  value={state}
                  label="State"
                  defaultValue={state}
                  disabled={!save}
                  onChange={(e) => setState(e.target.value as State)}
                  // size="small"
                  size="medium"
                >
                  <MenuItem value={"manual"}>manual</MenuItem>
                  <MenuItem value={"manualactive"}>manualactive</MenuItem>
                  <MenuItem value={"inactive"}>inactive</MenuItem>
                  <MenuItem value={"active"}>active</MenuItem>
                  <MenuItem value={"end"}>end</MenuItem>
                </Select>
              </FormControl>
              <DateTimePicker
                label="Start Time"
                disabled={!save}
                defaultValue={startTime}
                value={startTime}
                onChange={(newValue) => {
                  if (newValue != null) return setStartTime(newValue);
                }}
              />
              <DateTimePicker
                label="End Time"
                value={endTime}
                disabled={!save}
                defaultValue={endTime}
                onChange={(newValue) => {
                  if (newValue != null) return setEndTime(newValue);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <div style={{ display: "flex" }}>
            <div
              style={{
                marginInline: "auto",
                marginBlock: "5px",
                marginTop: "10px",
                width: "max-content",
              }}
            >
              {/* onClick={handleSave} */}
              <Button
                onClick={() => handleSave()}
                variant="contained"
                sx={{
                  marginBottom: "10px",
                  marginTop: "10px",
                  boxShadow: 3,
                  "&:hover": { bgcolor: "blue", color: "white", boxShadow: 6 },
                }}
              >
                {!save ? "Edit values" : "Save Changes"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function ProblemHelper({
  contestId,
  reload,
  setReload,
  initButton,
  problemId,
}: {
  contestId: number;
  problemId?: number | null;
  reload: boolean;
  initButton: React.ReactNode;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const [q, setQ] = useState("");
  const [title, setTitle] = useState("");
  const alert = useContext(AlertContext);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  // const [showPreview, setShowPreview] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    // console.log(problemId)
    if (problemId)
      (async () => {
        try {
          const { data } = await Axios.get(`/api/problem/${problemId}`);
          // console.log(data)
          setQ(data.q);
          setTitle(data.title);
        } catch (e) {
          alert?.showAlert("Couldn't loaad problems previous data", "error");
        }
      })();
  }, []);

  const handleClickOpen = (e: any) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setReload(!reload);
  };

  const handleSubmit = async () => {
    const { data } =
      problemId == undefined
        ? await Axios.post("/api/problem/create", {
            title,
            contestId: contestId,
            q,
            input,
            output,
          })
        : await Axios.post(`/api/problem/edit/${problemId}`, {
            title,
            q,
          });

    if ("error" in data) {
      // f*ing do something
    } else {
      setTitle("");
      setQ("");
      // TODO: SnackBar here
      handleClose();
    }
  };

  return (
    <>
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleClickOpen(e);
        }}
      >
        {initButton}
      </div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        // aria-labelledby="responsive-dialog-title"
        // style={{maxWidth:'800px'}}
      >
        <DialogTitle id="responsive-dialog-title">{"Add Problem"}</DialogTitle>
        <div>
          <DialogContent sx={{ padding: "15px", paddingRight: "10px" }}>
            <TextField
              sx={{ marginBlock: "10px" }}
              id="title"
              label="Title"
              defaultValue={title}
              variant="outlined"
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              inputProps={{ maxLength: 128 }}
              helperText={`${title ? title.length : 0}/128`}
            />
            <TextField
              id="Description"
              label="Description"
              // placeholder="Description"
              defaultValue={q}
              onChange={(e) => setQ(e.target.value)}
              fullWidth
              multiline
            />
            <TextField
              id="Sample Input"
              label="Sample Input"
              defaultValue={input}
              onChange={(e) => setInput(e.target.value)}
              fullWidth
              sx={{ marginBlock: "10px" }}
              inputProps={{ maxLength: 256 }}
              helperText={`${input.length}/256`}
              multiline
            />
            <TextField
              id="Sample Output"
              label="Sample Output"
              defaultValue={output}
              onChange={(e) => setOutput(e.target.value)}
              fullWidth
              inputProps={{ maxLength: 256 }}
              helperText={`${output.length}/256`}
              multiline
            />
          </DialogContent>
          <DialogContent sx={{ padding: "15px" }}>
            <Typography>Preview</Typography>
            <div
              style={{
                border: "-1px solid rgb(230,230,230)",
                height: "70%",
                width: "90%",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <Markdown children={q} />
            </div>
          </DialogContent>
        </div>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} color="success" variant="contained">
            {problemId ? "Edit" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
const FileUpload = ({
  problemId,
  handleClose,
}: {
  problemId: number;
  handleClose: () => void;
}) => {
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [outputFile, setOutputFile] = useState<File | null>(null);
  const [score, setScore] = useState(0);
  const theme = useTheme();
  const noflex = useMediaQuery(theme.breakpoints.down("sm"));
  const alert = useContext(AlertContext);

  const handleInputFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setInputFile(event.target.files[0]);
    }
  };

  const handleOutputFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setOutputFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputFile && outputFile) {
      const formData = new FormData();
      formData.append("input", inputFile);
      formData.append("output", outputFile);
      formData.append("score", "" + score);
      try {
        const response = await Axios.post(
          `/api/problem/addIO/${problemId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response);
        alert?.showAlert("Files uploaded successfully", "success");
        handleClose();
      } catch (error) {
        console.error("Error uploading files", error);
      }
    } else {
      alert?.showAlert("Please select both files.", "warning");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ margin: "auto", width: "max-content" }}
    >
      <div style={{ margin: "5px" }}>
        <TextField
          onChange={(e) => setScore(parseInt(e.target.value))}
          type="number"
          label="Score"
          fullWidth
        ></TextField>
      </div>
      <div style={noflex ? {} : { display: "flex" }}>
        <div>
          <input
            className={style.inputFile}
            type="file"
            name="input"
            accept=".txt"
            onChange={handleInputFileChange}
          />
        </div>
        <div>
          <input
            className={style.outputFile}
            type="file"
            name="output"
            accept=".txt"
            onChange={handleOutputFileChange}
          />
        </div>
      </div>
      <div
        style={{
          marginInline: "auto",
          marginBlock: "5px",
          width: "max-content",
        }}
      >
        <Button type="submit" variant="contained">
          Add
        </Button>
      </div>
    </form>
  );
};

function CreateTextCases({
  problemId,
  reload,
  setReload,
}: {
  problemId: number;
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setReload(!reload);
  };

  // const handleSubmit = async () => {
  //   const { data } = await Axios.post("/api/problem/create", {
  //     title,
  //     contestId: id,
  //     q,
  //   });
  //   if ("error" in data) {
  //     // f*ing do something
  //   } else {
  //     setTitle("");
  //     setQ("");
  //     // TODO: SnackBar here
  //     handleClose();
  //   }
  // };

  return (
    <>
      <Button
        sx={{ margin: "auto", width: 30 }}
        // color="success"
        variant="outlined"
        onClick={handleClickOpen}
      >
        <Add />
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Add TestCases"}
        </DialogTitle>
        <DialogContent>
          <FileUpload problemId={problemId} handleClose={handleClose} />
        </DialogContent>
        {/* <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} color="success" variant="contained">
              <Add/>
            </Button>
          </DialogActions> */}
      </Dialog>
    </>
  );
}
const ProblemsList = ({ contestId }: { contestId: number }) => {
  const [qs, setQs] = useState<any>([
    { title: "Problems Goes Here", id: 0, ProblemIOs: [] },
  ]);
  const [reload, setReload] = useState(true);
  // const [state, setState] = useState<number | null>(null);
  // const { userObj } = useAuth()!;

  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const { data } = await Axios.get(
        `/api/contest/admin/problems?contestId=${contestId}`
      );
      console.log(JSON.stringify(data));
      setQs(data.problems);
      // setState(data.state);
    })();
  }, [reload]);
  const alert = useContext(AlertContext);
  return (
    <div>
      <Box display={"flex"}>
        <div style={{ width: "80%", margin: "auto" }}>
          {qs.map(
            (
              {
                title,
                id: problemId,
                maxscore,
                ProblemIOs: pios,
              }: {
                title: string;
                id: number;
                maxscore: number;
                ProblemIOs: {
                  id: number;
                  input: string;
                  output: string;
                  score: number;
                }[];
              },
              index: number
            ) => (
              <Accordion
                // onClick={() => {
                //   console.log("Noo.....");
                //   return;
                //   navigate(`/code/${problemId}`);
                // }}
                variant="outlined"
                sx={{
                  fontFamily: "sans-serif",
                  // margin: "auto",
                  // width: "80%",
                  marginY: "10px",
                }}
                key={problemId}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      alignItems: "center",
                      margin: 0,
                      padding: 10,
                    }}
                  >
                    <div>
                      <Typography sx={{ paddingBottom: 1 }}>
                        {index + 1}. {title} {"\n"}
                      </Typography>
                      <Typography fontSize={11}>
                        <b>Max Score:</b> {maxscore}
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        marginLeft: "auto",
                        marginRight: 0,
                      }}
                    >
                      <div
                        style={{ marginInline: "10px", marginTop: "2px" }}
                        onClick={() =>
                          navigate(`/admin/problems/advance/${problemId}`)
                        }
                      >
                        <SettingsIcon />
                      </div>
                      {
                        <ProblemHelper
                          contestId={contestId}
                          initButton={
                            <Button
                              size="small"
                              color="info"
                              variant="contained"
                            >
                              Edit
                            </Button>
                          }
                          reload={reload}
                          setReload={setReload}
                          problemId={problemId}
                        />
                      }
                      <Button
                        sx={{ marginInline: 1, marginTop: "2px" }}
                        size="small"
                        color="error"
                        variant="contained"
                        onClick={async (e) => {
                          e.stopPropagation();
                          const { data } = await Axios.delete(
                            `/api/problem/${problemId}`
                          );
                          alert?.showAlert(data.message, "success");
                          setReload(!reload);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </AccordionSummary>
                {/* <Divider/> */}
                <AccordionDetails>
                  <Typography>Test Cases:</Typography>
                  <List>
                    {pios.map(
                      (
                        {
                          id,
                          input,
                          output,
                          score,
                        }: {
                          id: number;
                          input: string;
                          output: string;
                          score: number;
                        },
                        index: number
                      ) => {
                        return (
                          <ListItem>
                            <ListItemText primary={`Test Case: ${index}`} />
                            <ListItemButton
                              onClick={() =>
                                window.open(
                                  `/api/${input}`,
                                  "_blank",
                                  "rel=noopener noreferrer"
                                )
                              }
                            >
                              <ListItemText primary="Input" />
                              <ListItemIcon>
                                <LaunchIcon />{" "}
                              </ListItemIcon>{" "}
                            </ListItemButton>
                            <ListItemButton
                              onClick={() =>
                                window.open(
                                  `/api/${output}`,
                                  "_blank",
                                  "rel=noopener noreferrer"
                                )
                              }
                            >
                              <ListItemText primary="Output" />
                              <ListItemIcon>
                                <LaunchIcon />{" "}
                              </ListItemIcon>{" "}
                            </ListItemButton>
                            <ListItemText>Score: {score}</ListItemText>
                            <Button
                              sx={{
                                width: "40px",
                                paddingLeft: 0,
                                color: "black",
                              }}
                              onClick={async (e) => {
                                try {
                                  e.stopPropagation();
                                  const { data } = await Axios.delete(
                                    `/api/problem/IO/${id}`
                                  );
                                  alert?.showAlert(data.message, "success");
                                  setReload(!reload);
                                } catch (e: any) {
                                  alert?.showAlert(e.response.data, "error");
                                }
                              }}
                            >
                              <DeleteIcon />
                            </Button>
                          </ListItem>
                        );
                      }
                    )}
                  </List>
                  <CreateTextCases
                    problemId={problemId}
                    reload={reload}
                    setReload={setReload}
                  />
                </AccordionDetails>
              </Accordion>
            )
          )}

          {/* {user == "user1" || true ? ( */}
          {qs.length === 0 && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ height: "100px" }}
            >
              <Typography
                sx={{ fontWeight: 350, fontSize: "20px" }}
                gutterBottom
              >
                No Problems added
              </Typography>
            </Box>
          )}
          <div style={{ marginLeft: "auto", marginRight: 0, width: 100 }}>
            <ProblemHelper
              contestId={contestId}
              initButton={
                <Button
                  sx={{ margin: "auto", width: 90, marginBottom: "15px" }}
                  color="success"
                  variant="contained"
                >
                  <Create /> Add
                </Button>
              }
              reload={reload}
              setReload={setReload}
            />
          </div>
        </div>
      </Box>
    </div>
  );
};

const Contest = () => {
  const [tab, setTab] = useState(1);
  const [title, setTitle] = useState<string>("title");
  const [mode, setMode] = useState<string>("");
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs());
  const contestId = parseInt(useParams()["id"] || "");
  // const { user } = useAuth()!;
  const [reload, setReload] = useState(false);
  const alert = useContext(AlertContext);
  useEffect(() => {
    (async () => {
      const { data } = await Axios.get(`/api/contest?contestId=${contestId}`, {
        withCredentials: true,
      });
      console.log(data);
      setTitle(data.title);
      setMode(data.state);
      setEndTime(dayjs(data.endTime));
      setStartTime(dayjs(data.startTime));
      console.log(data);
    })();
  }, [reload]);

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          marginTop: "10px",
          marginBottom: "20px",
          padding: "20px",
          borderRadius: "8px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}

      >
        <Card
          variant="outlined"
          sx={{
            fontFamily: "sans-serif",
            margin: "auto",
            width: "100%",
            maxWidth: "1024px",
            //  marginY: "10px",
          }}
        >
          <div style={{ width: "100%" }}>
            <div
              style={{
                width: "max-width",
                marginInline: "auto",
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap-reverse",
                margin: "auto",
                padding: 20,
                paddingTop: 25,
              }}
            >
              <div>
                <Typography
                  sx={{ fontWeight: 500, fontSize: "30px", padding: 0 }}
                  gutterBottom
                >
                  {title}
                </Typography>
                <Typography
                  sx={{ fontWeight: 400, fontSize: "15px", padding: 0 }}
                  gutterBottom
                >
                  {mode}
                </Typography>
                <Typography
                  sx={{ fontWeight: 300, fontSize: "10px" }}
                  gutterBottom
                >
                  {startTime.format("YYYY-MM-DD HH:mm")}
                </Typography>
                <Typography
                  sx={{ fontWeight: 300, fontSize: "10px" }}
                  gutterBottom
                >
                  {endTime.format("YYYY-MM-DD HH:mm")}
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  marginLeft: "auto",
                  marginRight: 0,
                  // width: ''
                }}
              >
                <Button
                  sx={{ marginInline: 4 }}
                  size="large"
                  style={{ width: "170px" }}
                  color="error"
                  variant="contained"
                  onClick={async (_e) => {
                    try {
                      const { data } = await Axios.post(
                        `/api/contest/endcontest`,
                        {
                          contestId: contestId,
                        }
                      );
                      alert?.showAlert(data, "success");
                    } catch (e: any) {
                      alert?.showAlert(e.response.data, "error");
                    }
                  }}
                >
                  {"END CONTEST"}
                </Button>
              </div>
            </div>
            <div style={{ width: "100%" }}>
              <Box
                sx={{
                  width: "100%",
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <StyledTabs
                  onChange={(_e: any, t: React.SetStateAction<number>) =>
                    setTab(t)
                  }
                  aria-label="Problem and submissions lables"
                  value={tab}
                  variant="fullWidth"
                >
                  <StyledTab label="Details" value={1} />
                  <StyledTab label="Problems" value={2} />
                  {/* <StyledTab label="Advance" value={3} /> */}
                </StyledTabs>
              </Box>
              {/* hidden={tab != 1} */}

              <ContestDetails
                id={contestId}
                hidden={tab != 1}
                reload={reload}
                setReload={setReload}
              />
              <div hidden={tab != 2}>
                <div style={{ margin: "auto", width: "max-width" }}>
                  <ProblemsList contestId={contestId} />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Box>
    </div>
  );
};

export default Contest;
