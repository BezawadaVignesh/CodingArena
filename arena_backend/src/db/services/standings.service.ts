import axios from "axios";
import dayjs from "dayjs";
import { Standings } from "../models/standings.model";

// const groupByCategory = (rows) => {
//   return rows.reduce((groups, row) => {
//     const category = row.name;
//     if (!groups[category]) {
//       groups[category] = [];
//     }
//     groups[category].push(row);
//     return groups;
//   }, {});
// };

// Function to fetch the standings and aggregate the profile data
// export async function updateStadings() {
//   try {
//     // console.log('hi')
//     const standings = await Standings.findAll();
//     Promise.all(standings.map(async (data) => {
//       const leetcode: any = await axios.get(`https://competeapi.vercel.app/user/leetcode/${data.leetcodeUsername}/`);
//       const codechef: any = await axios.get(`https://competeapi.vercel.app/user/codechef/${data.codechefUsername}/`);
//       const codeforces: any = await axios.get(`https://competeapi.vercel.app/user/codeforces/${data.codeforcesUsername}/`);
//       console.log(leetcode.data.data.userContestRanking.rating);
//       const leetcodeRating = Math.floor(leetcode.data.data.userContestRanking.rating);
//       const codechefRating = Math.floor(codechef.data.rating_number);
//       const codeforcesRating = Math.floor(codeforces.data[0].rating);
//       await Standings.update(
//         {
//           leetcodeRating: leetcodeRating,
//           leetcodeScore: leetcodeRating,
//           codechefRating: codechefRating,
//           codechefScore: codechefRating,
//           codeforcesRating: codeforcesRating,
//           codeforcesScore: codeforcesRating,
//           totalScore: leetcodeRating + codechefRating + codeforcesRating,
//         },
//         {
//           where: {
//             id: data.id,
//           },
//         },
//       );
//     }))
//   } catch (error) {
//     throw error;
//   }
// }

export async function updateStadings() {
  try {
    const standings = await Standings.findAll();
    await Promise.all(standings.map(async (data) => {
      const leetcodeRequest = axios.get(`https://competeapi.vercel.app/user/leetcode/${data.leetcodeUsername}/`);
      const codechefRequest = axios.get(`https://competeapi.vercel.app/user/codechef/${data.codechefUsername}/`);
      const codeforcesRequest = axios.get(`https://competeapi.vercel.app/user/codeforces/${data.codeforcesUsername}/`);
      const [leetcode, codechef, codeforces] = await Promise.all([leetcodeRequest, codechefRequest, codeforcesRequest])
      if (!leetcode.data.data.userContestRanking.rating || !codechef.data.rating_number || !codeforces.data[0]?.rating) {
        throw "Incorrect Details!!"
      }
      const leetcodeRating = Math.floor(leetcode.data.data.userContestRanking.rating);
      const codechefRating = Math.floor(codechef.data.rating_number);
      const codeforcesRating = Math.floor(codeforces.data[0]?.rating);
  
      await Standings.update(
        {
          leetcodeRating: leetcodeRating,
          leetcodeScore: leetcodeRating,
          codechefRating: codechefRating,
          codechefScore: codechefRating,
          codeforcesRating: codeforcesRating,
          codeforcesScore: codeforcesRating,
          totalScore: leetcodeRating + codechefRating + codeforcesRating,
        },
        {
          where: {
            id: data.id,
          },
        },
      );

    }));
  } catch (error) {
    console.error("Error updating standings:", error);
    throw error;
  }
}

async function putData(platform: string) {
  const standings = await Standings.findAll({
    order: [[platform, "DESC"]],
  });

  const rankedStandings = standings.map((standing, index) => {
    const row: (string | number)[] = [index + 1, standing.name];

    if (platform === "totalScore" || platform === "leetcodeScore") {
      row.push(standing.leetcodeRating);
    }

    if (platform === "totalScore" || platform === "codechefScore") {
      row.push(standing.codechefRating);
    }
    44

    if (platform === "totalScore" || platform === "codeforcesScore") {
      row.push(standing.codeforcesRating);
    }

    if (platform === "totalScore") {
      row.push(standing.totalScore);
    }

    return row;
  });

  return rankedStandings;
  
}

export async function getStandings() {
  try {
    const std = await Standings.findOne({ attributes: ['updatedAt'], });
    const updateDate = dayjs(std?.dataValues.updatedAt).format('YYYY-MM-DD');
    const currentDate = dayjs().format('YYYY-MM-DD');
    if (updateDate !== currentDate) {
      await updateStadings();
    }
    const data: { [key: string]: any } = {};
    const results = await Promise.all([
      putData("totalScore"),
      putData("leetcodeScore"),
      putData("codechefScore"),
      putData("codeforcesScore"),
    ]);
    data["all"] = results[0];
    data["leetcode"] = results[1];
    data["codechef"] = results[2];
    data["codeforces"] = results[3];

    return data;
  } catch (error) {
    throw error;
  }
}


