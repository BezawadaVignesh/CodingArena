import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Button, Card, TextField, Typography } from "@mui/material";
import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { AlertContext } from "../components/common/AlertProvider";
import LoadingScreen from '../components/common/LoadingScreen';
import Navbar from "../components/common/Navbar";

function StarterCode({
  language,initialCode,onCodeChange
}:{
  language:string,
  initialCode:string,
  onCodeChange: (language: string, code: string) => void
}
){
  const [expanded, setExpanded] = useState(false);
  const [code, setCode] = useState(initialCode);



  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCode(e.target.value);
    onCodeChange(language, e.target.value); 
  };
  return(
    
    <Card
    sx={{
      width: "90%",
      margin: "20px auto",
      "& .data-grid-header": {
        backgroundColor: "rgba(150, 150, 150, 0.7)",
        color: 'white'
      },
      maxWidth:'1000px',
    }}
    >
  
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ fontWeight: 600, fontSize: '20px', textAlign: 'center' }}> {language}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          
            <TextField
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={code}
              onChange={handleCodeChange}
              placeholder="Enter your starter code here..."
            />
 
        </AccordionDetails>
      </Accordion>
    </Card>
    
  );
}


const AdvanceEditProblem = () => {
  // const { user } = useAuth()!;
  const problemId = parseInt(useParams()["id"] || "");
  const alert = useContext(AlertContext);
  const allLanguages :string[][]= [["c", "C (GCC 9.2.0)"],
  ["cpp", "C++ (GCC 9.2.0)"],
  ["python", "Python (3.8.1)"],
  ["javascript", "JavaScript (Node.js 12.14.0)"],
  ["go", "Go (1.13.5)"],
  ["java", "Java (OpenJDK 13.0.1)"],
  ["rust", "Rust (1.40.0)"],
  ["typeScript", "TypeScript (3.7.4)"]];

  const initStaterCode: { [key: string]: string } = {
    c: `#include <stdio.h>
  #include <stdint.h>
  
  int main()
  {
      uint64_t dx = 0x77E435B08;
      while (dx) {
          putchar(0x726F6C6564574820 >> (((dx >>= 3) & 7) << 3) & 0xFF);
      }
  }`,
    java: `
  import java.io.*;
  import java.util.*;
  
  public class Main {
  
      public static void main(String[] args) {
          /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Main. */
      }
  }`,
    "c#": `using System;
  using System.Collections.Generic;
  using System.IO;
  class Solution {
      static void Main(String[] args) {
          /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution */
      }
  }`,
    python: `# Enter your code here. Read input from STDIN. Print output to STDOUT`,
    go: `package main
  import "fmt"
  
  func main() {
    /* Enter your code here. Read input from STDIN. Print output to STDOUT */ 
  }`,
    javascript: `function processData(input) {
    /* Enter your code here. Read input from STDIN. Print output to STDOUT */ 
  } 
  
  process.stdin.resume();
  process.stdin.setEncoding("ascii");
  _input = "";
  process.stdin.on("data", function (input) {
      _input += input;
  });
  
  process.stdin.on("end", function () {
     processData(_input);
  });`,
  rust:`fn main() {
     /* Enter your code here. Read input from STDIN. Print output to STDOUT */ 
  }`,
  typeScript:`/*write code*/`
  };

  const [loading, setLoading] = useState(true);
  const [languages, setLanguages] = useState<string[][]>(allLanguages);
  const [scode,setscode] = useState(initStaterCode);
  const [problemTitle,setproblemTitle] = useState<string>("Problem title Comes here")

   useEffect(() => {
      (async () => {
        try{
          const { data:problemData } = await Axios.get(
            `/api/problem/${problemId}`
          );
          JSON.stringify(problemData)
          setproblemTitle(problemData.title);
        
          const { data :statercode} = await Axios.get(
            `/api/problem/statercode/${problemId}`
          );
          // console.log(statercode);
          if (statercode) {
            setLanguages(JSON.parse(statercode.languages)); 
            const scodeParsed = JSON.parse(statercode.scode);
            setscode((prev) => ({
              ...prev,
              ...scodeParsed,
            })); 
            // console.log(scode)
            
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false); 
      }})();
    }, []);

    const handleSave = async () => {
      const scodeObj:any={}
      languages.forEach((item) => {
        scodeObj[item[0]] = scode[item[0]]; // Assign a key-value pair
      });
      try {
        await Axios.post(`/api/problem/statercode`, {
          languages: languages,
          scode: scodeObj,
          problemId: problemId
        });
        // console.log(scodeObj);
        // console.log(languages)
        console.log('Codes saved successfully!');
        alert?.showAlert("Codes saved successfully!", "success");
      } catch (error) {
        console.error('Error saving codes:', error);
        alert?.showAlert("Error saving codes", "error");
      }
    };
  
    const handleCodeChange = (language:string, code:string) => {
      setscode((prev) => ({
        ...prev,
        [language]: code
      }));
    };
    
    if(loading) {
      console.log("loading..")
      return(
        <LoadingScreen />
      )
    }

  return (
    <div>
      <Navbar />
      <div style={{width:'max-content', marginInline:'auto', marginTop:'20px'}}>
        <Typography  sx={{fontWeight:600, fontSize: '25px'}} gutterBottom >Advance Settings</Typography>
      </div>
      <div style={{width:'max-content', marginInline:'auto', marginTop:'0px'}}>       
        <Typography  sx={{fontWeight:500, fontSize: '20px'}} gutterBottom >{problemTitle}</Typography>
      </div>
      <Card
      sx={{
        width: "90%",
        margin: "20px auto",
        "& .data-grid-header": {
          backgroundColor: "rgba(150, 150, 150, 0.7)",
          color: 'white'
        },
        maxWidth:'1000px',
        paddingBlock: '10px'
      }}
      >
        <div style={{width:'100%',display:"grid",placeItems:"center", marginTop:'10px'}}>       
          <Typography  sx={{fontWeight:500, fontSize: '20px'}} gutterBottom >Languages</Typography>
          {/* {languages} */}
        <Autocomplete sx={{width:"80%",marginInline:'auto'}}
            multiple
            disableCloseOnSelect
            filterSelectedOptions
            options={allLanguages}
            getOptionLabel={(param)=>{
              return param[1]
            }}  

            value={languages}
            renderInput={(params) => {
              console.log(params)
              return <TextField {...params} label="languages.." variant="outlined" />
            }}
            fullWidth
            className="col-span-5 rounded-md"
            onChange={(_, newValue) => {
              const uniqueLanguages = newValue.filter((v, i, arr) => 
                arr.findIndex(item => item[0] === v[0]) === i
              );
              setLanguages(uniqueLanguages);
              
            }}
            />
          </div>
          {languages.length === 0 ? (
          <Typography sx={{ marginTop: '10px', color: 'gray' }}>No languages selected</Typography>
          ) : (
            languages.map((lang) => (
              <StarterCode key={lang[0]} language={lang[0]} 
              initialCode={scode[lang[0]]||''} onCodeChange={handleCodeChange}/>
            ))
          )}
          <Box sx={{margin:'10px',display:'flex',justifyContent: 'flex-end'}}>
            <Button variant="contained" color="success" onClick={handleSave}>
              Save
            </Button>
          </Box>
      </Card>
    </div>
  );
};

export default AdvanceEditProblem;
