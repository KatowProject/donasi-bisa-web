import { getGalangData } from '$lib/services';

export async function load() {
    const data = await getGalangData();

    return {
        props: {
            galangs: data
        }
    };
}