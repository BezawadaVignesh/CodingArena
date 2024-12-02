import { MenuItem, Select } from '@mui/material';
import Axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AlertContext } from '../../../components/common/AlertProvider';
import LeaderBoardTable from '../../../components/common/LeaderBoardTable';
import './styles.css';

const PlatformImageDiv = ({ src }: { src: string; }) => {
  return (
    <div style={{ margin: "auto", width: "max-content", display: "flex", }}>
      <img src={src} alt="LeetCode" width={125} style={{ margin: "auto", minHeight: '30px' }} />
    </div>
  )
}

const headersMap = {
  allHeaders: [
    {
      "name": "Rank",

    },
    {
      "name": "Name",
    },

    {
      "name": <PlatformImageDiv src={"/leetcode.png"} />,
      "value": [
        // {
        //   "name": "Problems Solved",

        // },
        {
          "name": "Rating",

        },
        // {
        //   "name": "Score",

        // },
      ]
    },

    {
      "name": <PlatformImageDiv src={"/codechef.png"} />,
      "value": [
        // {
        //   "name": "Problems Solved",

        // },
        {
          "name": "Rating",

        },
        // {
        //   "name": "Score",

        // },
      ]
    },
    {
      "name": <PlatformImageDiv src={"/codeforces.png"} />,
      "value": [
        // {
        //   "name": "Problems Solved",

        // },
        {
          "name": "Rating",

        },
        // {
        //   "name": "Score",

        // },
      ]
    },
    {
      "name": "Total Score",
    },


  ],

  leetcodeHeaders: [
    // {
      // "name": <PlatformImageDiv src={"/leetcode.png"} />,
      // "value": [
        {
          "name": "Rank",
        },
        {
          "name": "Name",
        },
        // {
        //   "name": <PlatformImageDiv src={"/leetcode.png"} />,
        //   "value": [
        //     {
        //       "name": "Problems Solved",
        //     },
        //     {
        //       "name": "Rating",
        //     },
        //   ]
        // },
        {
          "name": "Rating",
        },
      // ]
    // }
  ],
  codechefHeaders: [
    // {
      // "name": <PlatformImageDiv src={"/leetcode.png"} />,
      // "value": [
        {
          "name": "Rank",
        },
        {
          "name": "Name",
        },
        // {
        //   "name": <PlatformImageDiv src={"/leetcode.png"} />,
        //   "value": [
        //     {
        //       "name": "Problems Solved",
        //     },
        //     {
        //       "name": "Rating",
        //     },
        //   ]
        // },
        {
          "name": "Rating",
        },
      // ]
    // }
  ],
  codeforcesHeaders: [
    // {
      // "name": <PlatformImageDiv src={"/leetcode.png"} />,
      // "value": [
        {
          "name": "Rank",
        },
        {
          "name": "Name",
        },
        // {
        //   "name": <PlatformImageDiv src={"/leetcode.png"} />,
        //   "value": [
        //     {
        //       "name": "Problems Solved",
        //     },
        //     {
        //       "name": "Rating",
        //     },
        //   ]
        // },
        {
          "name": "Rating",
        },
      // ]
    // }
  ]

}


const LeaderBoardPage = () => {
  const [rows, setRows] = useState({ all: [], leetcode: [], codechef: [], codeforces: [] });
  const [platform, setPlatform] = useState("all");
  const [loading, setLoading] = useState(true);
  const alert = useContext(AlertContext);
  useEffect(() => {
    (async () => {
      try {
        setLoading(false)
        const { data } = await Axios.get(`/api/ss/standings`);
        setRows(data);
        
      } catch(error) {
        alert?.showAlert("Couldn't Fetch Data", "error")
      } finally {
        setLoading(false)
      }
    })();
  }, []);
  return (
    <>
      <div style={{ marginBlock: 110, fontFamily: "Poppins" }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          // gap: 20,
        }}>
          <h1 style={{ fontSize: "1.9em", display: "flex", justifyContent: "justify", alignItems: "center", paddingInline: 20 }}>
            GCET Competitive Programming Standings
          </h1>

          <div style={{ display: "flex", justifyContent: "flex-end", width: "100%", marginTop: 50, paddingInline: 10 }}>
            <Select
              sx={{
                width: "200px",
                border: "1px solid black",
                '&:focus': {
                  outline: 'none',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: '1px solid black',
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: "white",
                },
              }}
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={platform}
              onChange={(e) => { setPlatform(e.target.value); }}
            >
              <MenuItem value={"all"}>All</MenuItem>
              <MenuItem value={"leetcode"}>LeetCode</MenuItem>
              <MenuItem value={"codechef"}>CodeChef</MenuItem>
              <MenuItem value={"codeforces"}>CodeForces</MenuItem>
            </Select>
          </div>
          <div style={{ width: "100%", marginTop: 20, paddingInline: 10 }}>
            {
              (platform === "all") ? <LeaderBoardTable loading={loading}  headers={headersMap['allHeaders']} rowWiseData={rows.all} /> :
                (platform === "leetcode") ? <LeaderBoardTable loading={loading} headers={headersMap['leetcodeHeaders']} rowWiseData={rows.leetcode} /> :
                  (platform === "codechef") ? <LeaderBoardTable loading={loading} headers={headersMap['codechefHeaders']} rowWiseData={rows.codechef} /> :
                    <LeaderBoardTable loading={loading} headers={headersMap['codeforcesHeaders']} rowWiseData={rows.codeforces} />
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaderBoardPage;
