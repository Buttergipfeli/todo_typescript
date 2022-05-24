/*
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    revalidated: boolean;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
): Promise<void> {

    let revalidated = false;
    try {
        await res.unstable_revalidate('/api/persons');
        revalidated = true;
    } catch (err) {
        console.log(err);
    }
    res.json({ revalidated });

}
*/