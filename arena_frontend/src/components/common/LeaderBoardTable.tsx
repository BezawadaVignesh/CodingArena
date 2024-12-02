import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export type Header = {
  name: string | JSX.Element;
  value?: Header[];
};

export type RowsData = {
  headers: Header[];
  rowWiseData: (string | JSX.Element | number)[][];
};


const findMaxDepth = (headers: any[]): number => {
  if (!headers || headers.length === 0) return 0;
  return headers.reduce(
    (maxDepth, header) => Math.max(maxDepth, findMaxDepth(header.value) + 1),
    0
  );
};

const findColumnWidth = (headers: any[]): number => {
  if (!headers || headers.length === 0) return 1;
  return headers.reduce((totalWidth, header) => {
    const childWidth = header.value ? findColumnWidth(header.value) : 1;
    return totalWidth + childWidth;
  }, 0);
};


const HeaderGenerator = ({ header }: { header: any }) => {
  let currRow = header;
  let nextRow: any[] = [], res = [];
  let index = -1, maxDepth = findMaxDepth(header);
  while (currRow.some((el: any) => el !== null)) {
    index++;
    res.push(
      <TableRow sx={{
        fontWeight: 700,
        background: "white",
        borderBottom: "none",
        fontFamily: "Poppins",
      }}>
        {
          currRow.map((data: any, idx: any) => {
            if (!data) return <></>
            else if (data.value) {
              nextRow = [...nextRow, ...data.value];
            }
            return (
              <TableCell
                align='center'
                colSpan={findColumnWidth(data.value)}
                rowSpan={(!data.value) ? maxDepth - index : 1}
                sx={{
                  position: idx + index === 0  ? "sticky" : undefined,
                  left: idx + index === 0 ? 0 : undefined,
                  background: "white",
                  border: "1px solid #bbb",
                  fontFamily: "Poppins",
                  fontSize: "1.05rem",
                  fontWeight: "bold",
                  width: idx + index === 0  ? "20px" : undefined,
                }}
              >
                {data.name}
              </TableCell>
            )
          })
        }
      </TableRow>
    )

    currRow = nextRow;
    nextRow = [];
  }
  return (<>{res}</>)
}

const LeaderBoardTable = ({loading=false, ...data}:RowsData & {loading?:boolean}) => {
  const borderRadius = "0.5rem";
  return (
    <TableContainer style={{ borderRadius: borderRadius, border: "1px solid #bbb" }}>
      <Table
        aria-label="simple table"
        style={{
          // tableLayout: "fixed",
          minWidth: 900,
          border: "1px solid #bbb",

        }}
      >
        <TableHead sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
          <HeaderGenerator header={data.headers} />
        </TableHead>
        <TableBody>
          <TableRow >

          </TableRow>
          {data.rowWiseData.length === 0 ? <div style={{ height: '300px', display: 'grid', placeContent: 'center', color: '#ccc', }}>{loading?"Loading data..":"No data"}</div> :
            data.rowWiseData.map((row, idx) => (
            <TableRow key={row.join('')}>
              {row.map((data, index) => (
                <TableCell
                  key={String(data) + idx + index}
                  align='center'
                  component="th"
                  scope="row"
                  sx={{
                    position: index === 0 ? "sticky" : undefined,
                    left: index === 0 ? 0 : undefined,
                    background: idx % 2 === 1 ? "white" : "#eee",
                    borderBottom: "none",
                    zIndex: index % 2 !== 0 ? 2 : 1,
                    fontFamily: "Poppins",
                    border: "1px solid #bbb",
                    width: index === 0  ? "20px" : undefined,
                  }}
                >
                  {data}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default LeaderBoardTable;