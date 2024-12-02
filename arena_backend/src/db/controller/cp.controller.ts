import Axios from "axios";
import dayjs from 'dayjs';
import { NextFunction, Request, Response, Router } from "express";
const router = Router()
interface Contest {
    id: number;
    platform: string;
    title: string;
    subTitle: string;
    link: string;
    date: string;
    duration: string;
}
router.get('/contests', async (req: Request, res: Response, next: NextFunction) => {
    try {

        let i: number = 0;

        const leetcodeRequest = Axios.post(
            "https://leetcode.com/graphql/",
            {
                query: `
          query topTwoContests {
            topTwoContests {
              title
              titleSlug
              startTime
              cardImg
              duration
            }
          }
        `,
                variables: {},
                operationName: "topTwoContests",
            },
        );
        const codechefRequest = Axios.get(`https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all`)
        const codeforcesRequest = Axios.get(`https://competeapi.vercel.app/contests/codeforces/`)

        const [leetcode, codechef, codeforces] = await Promise.all([leetcodeRequest, codechefRequest, codeforcesRequest])

        let contests = leetcode.data.data.topTwoContests;
        let data: Contest[] = [];
        contests.map((contest: { title: string; startTime: number; duration: string; titleSlug: string; }) => {
            let temp: Contest = {
                id: i++,
                title: contest.title,
                date: dayjs.unix(contest.startTime).format('YYYY-MM-DD HH:mm:ss'),
                duration: contest.duration,
                platform: "leetcode",
                link: contest.titleSlug,
                subTitle: "leetcode" + contest.title
            }
            data.push(temp);
        })
        contests = codechef.data.future_contests;

        contests.map((contest: { contest_name: string; contest_start_date_iso: string; contest_duration: string; contest_code: string }) => {
            let temp: Contest = {
                id: i++,
                title: contest.contest_name,
                date: dayjs(contest.contest_start_date_iso).format('YYYY-MM-DD HH:mm:ss'),
                duration: contest.contest_duration,
                platform: "codechef",
                link: contest.contest_code,
                subTitle: "codechef " + contest.contest_name
            }
            data.push(temp);
        })
        contests = codeforces.data;
        contests.map((contest: { title: string; startTime: number; duration: string; endTime: number; url: string }) => {
            let temp: Contest = {
                id: i++,
                title: contest.title,
                date: dayjs(contest.startTime).format('YYYY-MM-DD HH:mm:ss'),
                duration: contest.duration,
                platform: "codeforces",
                link: contest.url,
                subTitle: "Codeforces  " + contest.title
            }
            data.push(temp);
        })

        data.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA.getTime() - dateB.getTime();
        });
        res.json(
            data
        )
    } catch (error) {
        console.log(error)
        next(error)
    }
})

export default router;

