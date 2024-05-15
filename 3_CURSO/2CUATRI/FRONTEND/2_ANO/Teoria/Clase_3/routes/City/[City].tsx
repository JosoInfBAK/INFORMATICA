import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import City from "../../components/city.tsx";

export type City = {
    name: string;
    population: string;
    country: string;
    region: string;
    currency: string;
};
export const handler:Handlers = {
    GET: async function (req:Request, ctx: FreshContext) {
        const city = ctx.params.name;
        //fetch data from the API
        const response = await fetch(`https://api.api-ninjas.com/v1/city/${city}`);
        if (response.status === 404) {
            return ctx.render({ciudad: "Not Found", status: 404});
        }
        const data = await response.json();
        return ctx.render({ciudad: data, status: 200});

    },
};
const Page = (props:PageProps & { ciudad: City }) => {
        return (
            <City {...props.ciudad} />
        );
    };
export default Page;
//